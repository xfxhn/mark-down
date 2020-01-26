import React, {useState, useEffect} from 'react';
import {Icon} from 'antd';
import Menu from './Menu'
import PropTypes from 'prop-types'
import {
    ListBox,
    SelectInput,
    Container
} from './../style'

const edit1 = [
    {
        id: 1,
        content: '删除',
        command: 'delete'
    },
    {
        id: 2,
        content: '重命名',
        command: 'rename'
    }
];
const edit2 = [

    {
        id: 1,
        content: '删除',
        command: 'delete'
    },
    {
        id: 2,
        content: '重命名',
        command: 'rename'
    },
    {
        id: 3,
        content: '新建',
        command: 'new-file'
    },
];

function Lists({
                   files,
                   command,
                   selectItem,
                   activeItem,
                   doubleClick,
                   changeDetail,
                   selectInput
               }) {

    /*右键坐标*/
    const [coords, setCoords] = useState({
        clientX: 0,
        clientY: 0
    });
    const [isMenu, setMenu] = useState('none');
    const [redact, setRedact] = useState([]);

    function bindEditor(e, item) {
        let redactHeight;
        if (item.type === 'dir') {
            setRedact(edit2);
            redactHeight = edit2.length * 80;
        } else {
            setRedact(edit1);
            redactHeight = edit1.length * 80;
        }
        let {clientX, clientY} = e;
        const winHeight = document.documentElement.clientHeight;
        let height = winHeight - clientY;
        if (height < redactHeight) {
            clientY = clientY - (redactHeight - height)
        }
        setCoords({
            clientY,
            clientX
        });
        selectItem(item)
        setMenu('block');
        e.stopPropagation();
        e.preventDefault();
    }


    useEffect(function () {
        function isMenu() {
            setMenu('none')
        }

        document.addEventListener('click', isMenu);
        return function () {
            document.removeEventListener('click', isMenu);
        }
    }, []);

    function IsIcon({type}) {
        let el;
        if (type === 'file') {
            el = <Icon style={{fontSize: '20px', marginRight: '5px'}} type="file"/>
        } else if (type === 'dir') {
            el = <Icon style={{fontSize: '20px', marginRight: '5px'}} type="folder"/>
        } else {
            el = <p>12</p>
        }
        return el
    }

    function Nav({files}) {
        return files.map(item => {
            return (
                <ListBox key={item.id}>
                    <div
                        className="container"
                        style={selectItem.id === item.id ?
                            {
                                background: '#ccc'
                            } : undefined}
                        onContextMenu={(e) => {
                            bindEditor(e, item)
                        }}
                        onClick={(e) => {
                            selectItem(item);
                            e.stopPropagation();
                        }}
                        onDoubleClick={(e) => {
                            doubleClick(item);
                            e.stopPropagation();
                        }}
                    >
                        {
                            item.type === 'dir' &&
                            <div
                                className="arrow"
                                onClick={e => {
                                    changeDetail(item.id);
                                    e.stopPropagation()
                                }}
                            >
                                <Icon
                                    style={{marginRight: '5px'}}
                                    type={item.isOpen ? 'down' : 'right'}
                                />
                            </div>
                        }
                        <IsIcon type={item.type}/>
                        <p>{item.name}</p>
                    </div>
                    <div className={item.isOpen ? 'show' : 'close'}>
                        {item.children && <Nav files={item.children}/>}
                    </div>
                </ListBox>
            )
        });
    }

    return (
        <div>
            <Menu
                coords={coords}
                isMenu={isMenu}
                command={command}
                item={redact}
            />
            <Container>
                <Nav files={files}/>
                {
                    !files.length &&
                    <SelectInput onClick={selectInput}>请选择文件</SelectInput>
                }
            </Container>
        </div>
    );
}


Lists.propTypes = {
    selectItem: PropTypes.func,
    files: PropTypes.array,
    command: PropTypes.func,
    doubleClick: PropTypes.func
};
export default Lists;