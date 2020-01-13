const {app, BrowserWindow, Menu, MenuItem, ipcMain, dialog} = require('electron');


let template = [{
    label: '文件',
    submenu: [{
        label: '新建笔记',
        accelerator: 'CmdOrCtrl+N',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_create');
            }
        }
    }, {
        label: '新建标签',
        accelerator: 'CmdOrCtrl+Shift+N',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_create_label');
            }
        }
    }, {
        type: 'separator'
    }, {
        label: '导入',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_open');
            }
        }
    }, {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_save');
            }
        }
    }, {
        label: '导出',
        accelerator: 'CmdOrCtrl+Shift+W',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_out');
            }
        }
    }, {
        type: 'separator'
    }, {
        label: '删除笔记',
        accelerator: 'CmdOrCtrl+D',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_remove');
            }
        }
    }, {
        label: '删除标签',
        accelerator: 'CmdOrCtrl+Shift+D',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_remove_label');
            }
        }
    }]
}, {
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: '插入',
        accelerator: 'CmdOrCtrl+I',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_insert');
            }
        }
    }, {
        type: 'separator'
    }, {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: '展示',
    submenu: [{
        label: '生成',
        accelerator: 'CmdOrCtrl+P',
        click: function () {
            if (mainWindow) {
                mainWindow.webContents.send('info_show');
            }
        }
    }, {
        type: 'separator'
    }, {
        label: '切换开发者工具',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: '刷新',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.reload();
            } else {
                app.emit('activate');
            }
        }
    }]
}];

const menu = new Menu()

menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: () => {
        console.log('time to print stuff')
    }
}))
let mainWindow;
app.on('ready', function () {
    require('devtron').install();
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL('http:localhost:3000')
});

ipcMain.on('open-directory-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        if (result) {
            event.sender.send('selectedItem', result)
        }
    }).catch(err => {
        console.log(err)
    })
})


