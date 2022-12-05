const Store = require("electron-store");

const SettingStorage = new Store()
const NoteStorage = new Store();


function getWindowSettings() {
    const default_bounds = [1050, 650]
    const size = SettingStorage.get('win-size')

    if (size) return size;
    else {
        SettingStorage.set('win-size', default_bounds)
        return default_bounds
    }
}

function getNotes() {
    const notes = NoteStorage.get('notes')
    if (notes) return notes;
    else {
        NoteStorage.set('notes', [{
            'id': Math.random(),
            'title': 'Click here to change the title',
            'content': 'You can write notes here',
            'last_active': true
        }])
        const new_notes = NoteStorage.get('notes')
        return new_notes
    }
}

function getWindowPosition() {
    const position = SettingStorage.get('win-pos')
    if (position) return position
    return null
}

function saveBounds(bounds) {
    SettingStorage.set("win-size", bounds)
}

function savePosition(position) {
    SettingStorage.set('win-pos', position)
}

module.exports = {
    getWindowSettings: getWindowSettings,
    saveBounds: saveBounds,
    savePosition: savePosition,
    getWindowPosition: getWindowPosition,
    getNotes: getNotes,
    NoteStorage: NoteStorage,
}