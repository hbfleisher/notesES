const { remote, ipcRenderer } = require('electron');
const { Menu } = remote;
const path = require('path');
const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();


const noteListMenu = Menu.buildFromTemplate([
    {
        label: 'Set Category'
    },
    {
        label: 'Rename'
    },
    {
        label: 'Delete'
    }
])