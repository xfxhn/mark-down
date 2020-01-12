import React from 'react';
import {Input} from 'antd';

function Search() {

    function bindSearch(value) {
        console.log(value)
    }

    return (
        <div>
            <Input.Search
                placeholder="input search text"
                onSearch={bindSearch}
                enterButton
            />
        </div>
    )
}


export default Search