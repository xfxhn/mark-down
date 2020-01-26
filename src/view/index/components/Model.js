import React, {useState} from 'react';
import {Modal, Input} from 'antd';
import PropTypes from 'prop-types'

function Model({flag, transmit, directive}) {
    const [value, setValue] = useState('');
    return (
        <Modal
            title={directive}
            visible={flag}
            onOk={() => {
                setValue('');
                transmit(true, directive, value)
            }}
            onCancel={() => {
                transmit(false)
            }}
        >
            {
                (directive === 'rename' || directive === 'new-file') &&
                <Input
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    value={value}
                    placeholder="请输入名字"/>
            }
            {
                directive === 'delete' &&
                '是否删除'
            }

        </Modal>
    )
}

Model.prototype = {
    directive: PropTypes.string,
    transmit: PropTypes.func,
    flag: PropTypes.boolean
};


export default Model;
