import React, {useState} from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Search from './components/Search'
import List from './components/List'
import Model from './components/Model'
import Tab from './components/Tab'
import {
    toArray,
    toObject
} from "@/utils/helper";
import filesHelper from '@/utils/files'
import useRenderer from '@/hooks/useRenderer'
import {
    Box,
    LeftBox,
    RightBox,
    Title
} from "./style/index";

const {basename} = require('path');
const {ipcRenderer} = require('electron');

function Index() {

    /*控制弹出框显示隐藏*/
    const [visible, setVisible] = useState(false);
    /*右键菜单的指令*/
    const [directive, setDirective] = useState('');

    /*存储文件内容*/
    const [container, setContainer] = useState('');

    /*选中编辑菜单*/
    const [tabFiles, setTabFiles] = useState(Object.create(null));

    const [files, setFiles] = useState({
        root: {children: []}
    });
    /*当前选择的菜单*/
    const [activeFile, setActiveFile] = useState(null);

    /*当前选中的ID*/
    const [activeId, setActiveId] = useState('');
    const [flag, setFlag] = useState(false);

    function editor(flag, directive, name) {
        if (flag) {
            const fileObj = {...files};
            const tabFile = {...tabFiles};
            const id = activeId;
            switch (directive) {
                case 'delete':
                    delete fileObj[id];
                    setFiles(fileObj);
                    if (tabFile[id]) {
                        delete tabFile[id];
                        setTabFiles(tabFile);
                    }
                    break;
                case 'rename':
                    fileObj[id].name = name;
                    setFiles(fileObj);
                    break;
                default:
            }
        }
        setVisible(false);
    }

    /*选择菜单*/
    function command(dir) {
        setDirective(dir);
        setVisible(true);
    }

    /*双击次菜单*/
    function doubleClick(item) {
        if (item.type === 'file') {
            if (!tabFiles[item.id]) {
                setTabFiles({
                    ...tabFiles,
                    [item.id]: item
                });
                setActiveFile(item)
            }
            readFile(item.path);
            setActiveFile(item);
        } else {
            changeDetail(item.id)
        }
    }

    /*删除标签*/
    function deleteTab(id) {
        const tab = {...tabFiles};
        delete tab[id];
        const arr = Object.keys(tab);
        setTabFiles(tab);
        setActiveFile(tab[arr[0]]);
        readFile(tab[arr[0]].path)

    }

    /*开关目录*/
    function changeDetail(id) {
        const obj = {...files};
        obj[id].isOpen = !obj[id].isOpen;
        setFiles(obj)
    }

    function selectInput() {
        ipcRenderer.send('open-directory-dialog');
    }

    function handleChange(val) {
        if (container !== val) {
            setFlag(true)
        }

    }

    function readFile(path) {
        filesHelper.readFile(path).then(res => {
            setContainer(res)
        }).catch(err => {
            console.log(err)
        })
    }

    useRenderer({
        'save-edit-file': function () {
            console.log('保存')
        },
        'selectedItem': function (e, path) {
            path = path.filePaths[0];
            if (path) {
                filesHelper.readDir(path).then(res => {
                    return Promise.all(res)
                }).then(res => {
                    const obj = {
                        ...toObject(res),
                        root: {
                            name: basename(path),
                            type: 'dir',
                            id: 'root',
                            path: path,
                            isOpen: true,
                            children: res
                        }
                    };
                    setFiles(obj)
                })
            }
        }
    });

    return (
        <Box>
            <LeftBox>
                <Search/>
                <List
                    command={command}
                    files={files['root'].children}
                    selectItem={item => {
                        setActiveId(item.id)
                    }}
                    activeItem={activeFile}
                    doubleClick={doubleClick}
                    changeDetail={changeDetail}
                    selectInput={selectInput}
                />
            </LeftBox>

            <RightBox>
                {
                    activeFile ?
                        <div>
                            <Tab
                                files={toArray(tabFiles)}
                                activeId={activeFile.id}
                                deleteTab={deleteTab}
                                changeFile={item => {
                                    setActiveFile(item);
                                    readFile(item.path)
                                }}
                                flag={flag}
                            />
                            <div className="editor">
                                <SimpleMDE
                                    key={activeFile.id}
                                    value={container}
                                    onChange={handleChange}
                                    options={{
                                        minHeight: '500px'
                                    }}
                                />
                            </div>
                        </div> :
                        <Title onClick={selectInput}>请选择文件</Title>
                }

            </RightBox>
            <Model
                flag={visible}
                transmit={editor}
                directive={directive}
            />
        </Box>
    )
}


export default Index;