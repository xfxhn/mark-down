const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron');
const menuTemplate = require('./menuTemplate');
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
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
    mainWindow.loadURL('http:localhost:3000')
});

ipcMain.on('open-directory-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        if (result) {
            mainWindow.webContents.send('selectedItem', result)
            // event.sender.send('selectedItem', result)
        }
    }).catch(err => {
        console.log(err)
    })
})


