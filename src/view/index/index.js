import React, {useState, useEffect} from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Search from './components/Search'
import List from './components/List'
import Model from './components/Model'
import Tab from './components/Tab'
import {
    toArray,
    toObject
} from "./../../utils/helper";
import filesHelper from './../../utils/files'
import {
    Box,
    LeftBox,
    RightBox,
    Title
} from "./style/index";

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


    /*当前选择的菜单id*/
    const [activeId, setActiveId] = useState('');
    /*当前选择的菜单*/
    const [activeFile, setActiveFile] = useState(null);

    useEffect(function () {
        console.log('急促');
        ipcRenderer.on('selectedItem', function (e, path) {
            path = path.filePaths[0];
            filesHelper.readDir(path).then(res => {
                return Promise.all(res)
            }).then(res => {
                const pathArr = path.split('\\');
                const obj = {
                    ...toObject(res),
                    root: {
                        name: pathArr[pathArr.length - 1],
                        type: 'dir',
                        id: 'root',
                        path: path,
                        isOpen: true,
                        children: res
                    }
                };
                setFiles(obj)
            })

        })
    }, []);

    function editor(flag, directive, name) {
        if (flag) {
            const fileObj = {...files};
            const tabFile = {...tabFiles};
            switch (directive) {
                case 'delete':
                    delete fileObj[activeId];
                    setFiles(fileObj);
                    if (tabFile[activeId]) {
                        delete tabFile[activeId];
                        setTabFiles(tabFile);
                    }
                    break;
                case 'rename':
                    fileObj[activeId].name = name;
                    setFiles(fileObj);
                    break
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
            setActiveFile(item)
        }

    }

    /*删除标签*/
    function deleteTab(id) {
        const tabFile = {...tabFiles};
        delete tabFile[id];
        const arr = Object.keys(tabFile);
        // setActiveFile(null);
        setActiveId(arr[0]);
        setTabFiles(tabFile);

    }

    /*开关目录*/
    function changeDetail(id) {
        const obj = {...files};
        console.log(obj)
        obj[id].isOpen = !obj[id].isOpen;

        setFiles(obj)
    }

    function selectInput() {
        ipcRenderer.send('open-directory-dialog');
    }


    function handleChange(val) {
        console.log(val)
    }


    function readFile(path) {
        filesHelper.readFile(path).then(res => {
            setContainer(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Box>
            <LeftBox>
                <Search/>
                <List
                    command={command}
                    files={files['root'].children}
                    selectItem={(id) => {
                        setActiveId(id)
                    }}
                    activeId={activeId}
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
                                activeId={activeId}
                                deleteTab={deleteTab}
                                changeFile={(id, path) => {
                                    setActiveId(id);
                                    setActiveFile(tabFiles[id]);
                                    readFile(path)
                                }}
                            />
                            <div className="editor">
                                <SimpleMDE
                                    key={activeFile.id}
                                    value={container}
                                    onChange={handleChange}
                                    options={{
                                        minHeight: '80vh',
                                    }}
                                />
                            </div>
                        </div> :
                        <Title>请选择文件</Title>
                }

            </RightBox>

            {/*对话框*/}
            <Model
                flag={visible}
                transmit={editor}
                directive={directive}
            />
        </Box>
    )
}


export default Index;