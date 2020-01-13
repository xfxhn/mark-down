import React, {useState, useEffect} from 'react';
import {Icon} from 'antd';
import Menu from './Menu'
import PropTypes from 'prop-types'
import {
    ListBox,
    SelectInput
} from './../style'

function Lists({files, command, selectItem, activeId, doubleClick, changeDetail, selectInput}) {

    /*右键坐标*/
    const [coords, setCoords] = useState({
        clientX: 0,
        clientY: 0
    });
    const [isMenu, setMenu] = useState('none');

    function bindEditor(e, id) {
        let {clientX, clientY} = e;
        const winHeight = document.documentElement.clientHeight;
        let height = winHeight - clientY;
        if (height < 160) {
            clientY = clientY - (160 - height)
        }
        setCoords({
            clientY,
            clientX
        });
        selectItem(id)
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
                        style={activeId === item.id ?
                            {
                                background: '#ccc'
                            } : undefined}
                        onContextMenu={(e) => {
                            bindEditor(e, item.id)
                        }}
                        onClick={(e) => {
                            selectItem(item.id);
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
                                <Icon style={{marginRight: '5px'}} type="right"/>
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
            <Nav files={files}/>
            {
                !files.length &&
                <SelectInput onClick={selectInput}>请选择文件</SelectInput>
            }

            <Menu
                coords={coords}
                isMenu={isMenu}
                command={command}
                item={[
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
                ]}
            />
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