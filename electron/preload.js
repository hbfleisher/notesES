const {contextBridge, ipcRenderer} = require("electron")
const { getNotes } = require('./settings');

const API = {

    sendMessage: async (msg) => ipcRenderer.send("sendMessage", msg),
    closeApp: () => ipcRenderer.send('closeApp'),
    minimize: () => ipcRenderer.send('minimizeApp'),
    anchorTop: () => ipcRenderer.send('anchorTop'),

}

const NoteApi = {
    get_notes: getNotes,
    updateNotes: async (notes) => ipcRenderer.send('updateNotes', notes)
}

contextBridge.exposeInMainWorld("api", API)
contextBridge.exposeInMainWorld("note_api", NoteApi)