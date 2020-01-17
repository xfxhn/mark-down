import React from 'react';
import {
    TabBox
} from './../style'

function Tab({files, deleteTab, activeId, changeFile, flag}) {
    return (
        <TabBox block={flag ? 'block' : 'none'}>
            {
                files.map(item => {
                    return (
                        <li
                            onClick={() => {
                                changeFile(item)
                            }}
                            key={item.id}
                            className={item.id === activeId ? 'current' : ''}
                        >
                            {item.name}
                            <i onClick={(e) => {
                                deleteTab(item.id);
                                e.stopPropagation();
                            }}>×</i>
                        </li>
                    )
                })
            }
        </TabBox>
    )
}

export default Tab