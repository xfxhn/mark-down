import React from 'react';
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
                                changeFile(item)
                            }}
                            key={item.id}
                            className={item.id === activeId ? 'current aa' : 'aa'}
                        >
                            {item.name}
                            <i onClick={(e) => {
                                deleteTab(item.id);
                                e.stopPropagation();
                            }}>×</i>
                            {
                                item.isChange &&
                                <p className="aa"/>
                            }

                        </li>
                    )
                })
            }
        </TabBox>
    )
}

export default Tab