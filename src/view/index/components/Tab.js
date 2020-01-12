import React, {useState} from 'react';
import {
    TabBox
} from './../style'

function Tab({files, deleteTab, activeId, changeFile}) {
    return (
        <TabBox>
            {
                files.map(item => {
                    return (
                        <li
                            onClick={() => {
                                changeFile(item.id, item.path)
                            }}
                            key={item.id}
                            className={item.id === activeId ? 'current' : ''}
                        >
                            {item.name}
                            <i onClick={() => {
                                deleteTab(item.id)
                            }}>×</i>
                        </li>
                    )
                })
            }
        </TabBox>
    )
}

export default Tab