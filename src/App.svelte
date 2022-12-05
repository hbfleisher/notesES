<script>
    import Menubar from "./components/menubar.svelte";
    import NotesList from "./components/notes_list.svelte";
    import NoteDisplay from "./components/note_display.svelte";
    import Actionmenu from "./shared/actionmenu.svelte";
    import Sidemenu from "./shared/sidemenu.svelte";
	import {Notes} from "./storage/current_note";

	const handleClose = () => {
		window.api.closeApp()
	}

	function sendMsg(item) {
		window.api.sendMessage(item);
	}

	const handleMinimize = () => {
		window.api.minimize()
	}

	let note_handler;
	Notes.subscribe(notes => note_handler = notes)
	$: note_handler && window.note_api.updateNotes(note_handler)
	
	let active_note;
    Notes.subscribe(notes => {
		active_note = notes[0]
        for (let note of notes) {
			if (note.last_active) {
				active_note = note
            }
        }
    })
	
	function handleDeleteNote(e) {
		if (!(e.ctrlKey && e.shiftKey && e.keyCode == 46)) return
		Notes.update(notes => {
			const active_index = notes.map(note => note.id).indexOf(active_note.id)
			notes.splice(active_index, 1)
			notes[0].last_active = true
			return notes
		})
	}
</script>

<main on:keydown={(e)=> handleDeleteNote(e)}>
	<Menubar on:close={() => handleClose()} on:minimize={() => handleMinimize()} {active_note}/>
	<Actionmenu><Sidemenu><NotesList {active_note}/></Sidemenu><NoteDisplay {active_note}/></Actionmenu>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		position: relative;
		height: 100%;
	}

	::-webkit-scrollbar {
		width: 5px;
		color: aquamarine;
		background-color: blueviolet;
	}

	::-webkit-scrollbar-thumb {
		color: brown;
	}

	::-webkit-scrollbar-track {
		background-color: blue;
		color: bisque;
	}


</style>