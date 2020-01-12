const {app, BrowserWindow} = require('electron');

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