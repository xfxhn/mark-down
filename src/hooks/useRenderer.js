import {useEffect} from 'react'

const {ipcRenderer} = require('electron');

function useRenderer(keyCallbackMap) {
    useEffect(function () {
        console.log('急促');
        Object.keys(keyCallbackMap).forEach(key => {
            ipcRenderer.on(key, keyCallbackMap[key])
        });
        return function () {
            Object.keys(keyCallbackMap).forEach(key => {
                ipcRenderer.removeListener(key, keyCallbackMap[key])
            })
        }
    })
}

export default useRenderer