import React from 'react';
import PropType from 'prop-types'
import {Editor} from "./../style/index";

function Menu({coords, isMenu, item, command}) {
    const {clientX, clientY} = coords;

    return (
        <Editor x={clientX} y={clientY} block={isMenu}>
            {
                item.map(item => {
                    return (
                        <li
                            onClick={() => {
                                command(item.command)
                            }}
                            key={item.id}
                        >{item.content}</li>
                    )
                })
            }
        </Editor>
    )
}

Menu.prototype = {
    coords: PropType.object,
    isMenu: PropType.string,
    item: PropType.array,
    command: PropType.func
};


export default Menu