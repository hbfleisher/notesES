import { writable } from "svelte/store";

const Notes = writable(window.note_api.get_notes())

export {Notes}
