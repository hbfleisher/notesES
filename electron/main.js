const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const { get } = require('http');
const { join } = require('path');
const url = require('url');
const { getWindowSettings, saveBounds, savePosition, getWindowPosition, getNotes, NoteStorage } = require('./settings');

// Live Reload
require('electron-reload')(__dirname, {
    electron: join(__dirname, '../node_modules', '.bin', 'electron'),
    awaitWriteFinish: true
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}


const app_menu_template = [
    {
        label:'Menu',
        submenu:[
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Alt+Command+Q' : 'Alt+Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];



// init win
let win;

function createWindow(){
    // create broswer window
    const bounds = getWindowSettings()

    let window_settings = {
        width: bounds[0],
        height: bounds[1],
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            show: false,
            preload: join(__dirname, 'preload.js'),
        },
        frame: false,
        minWidth: 353,
        minHeight: 331,
        icon: __dirname + '/includes/notesEStemp_logo.png'
    }

    const win_position = getWindowPosition()
    if (win_position) {
        window_settings.x = win_position[0]
        window_settings.y = win_position[1]
    }
    else {
        window_settings.x = 0
        window_settings.y = 0
    }
    

    win = new BrowserWindow(window_settings)


    win.on('moved', () => savePosition(win.getPosition()))
    win.on("resized", () => saveBounds(win.getSize()))

    // load index.html
    win.loadFile(join(__dirname, "../public/index.html"))

    const mainMenu = Menu.buildFromTemplate(app_menu_template)
    Menu.setApplicationMenu(mainMenu)


    win.on('ready-to-show', win.show)

    win.on('Closed', ()=> {
        win = null
    })
}



// start app
app.on('ready', createWindow);
// app.whenReady(() => {
//     createWindow()
//     ipcMain.handle('getNotes', getNotes())
// })

// quit when all windows closed

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})


if(process.platform === 'darwin'){
    app_menu_template.unshift({})
}

// devtools
if (process.env.NODE_ENV !== 'production') {
    app_menu_template.push({
        label: 'Developer Tools',
        submenu:[
            {
              role: 'reload'
            },
            {
              label: 'Toggle DevTools',
              accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
              click(item, focusedWindow){
                focusedWindow.toggleDevTools();
              }
            }
        ]
    });
}


ipcMain.on('sendMessage', (event, args)  => {
    console.log(args)
})

ipcMain.on('closeApp', (event, args)  => {
    app.quit()
})

ipcMain.on('minimizeApp', (event, args) => {
    win.minimize()
})

ipcMain.handle('getNotes', getNotes)

ipcMain.on('updateNotes', (event, args) => {
    NoteStorage.set('notes', args)
})

ipcMain.on('anchorTop', (event, args) => {
    if (win.isAlwaysOnTop()) {
        win.setAlwaysOnTop(false)
    }
    else {
        win.setAlwaysOnTop(true)
    }
})