import React, {useState, useEffect} from 'react';
import Search from '@/common/search/Search'
import NavList from '@/common/list/List'
import Menu from '@/common/menu/Menu'
import Model from '@/hooks/useModel'


function Nav() {

    const [files, setFiles] = useState([
        {
            id: 1,
            title: '1',
            body: '1'
        },
        {
            id: 2,
            title: '1',
            body: '1'
        }
    ]);
    const [data, setData] = useState([
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
    ]);







    return (
        <div>
            <Search/>
            <NavList
                bindEditor={bindEditor}
                files={files}
            />
            <div>
                <Menu
                    coords={coords}
                    isMenu={isMenu}
                    command={command}
                    item={data}
                />
            </div>

        </div>
    )
}


export default Nav;