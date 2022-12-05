<script>
    import {Notes} from '../storage/current_note';

    export let active_note;

    function handleWriting() {
        Notes.update(notes => {
            let note = notes.find(note => note.id == active_note.id)
            note.content = active_note.content;
            return notes
        })
    }

    function handleTab(e) {
        if (e.keyCode === 9) {
            if (!e.crtlKey) {
                e.preventDefault()
                let note = document.getElementById("note_writings")
                note.setRangeText('    ', note.selectionStart, note.selectionEnd, 'end')
            }
        }
    }

</script>

<div id="active_note_contents" class="note">
    <textarea id="note_writings" class="note__contents" bind:value={active_note.content} on:input={handleWriting} on:keydown={handleTab}></textarea>
</div>

<style>
    .note {
        justify-self: stretch;
        align-self: stretch;
        min-width: 15%;
        width: 100%;
        max-width: calc(100%-60px);
    }

    .note .note__contents {
        min-height: 101%;
        min-width: 100%;
        align-self: stretch;
        background-color: inherit;
        border: none;
        outline: none;
        color: rgb(223, 223, 223);
        font-size: 20px;
        font-family: sans-serif;
        resize: none;
        margin: 0;
        padding: 5px 0 0 5px;
    }

    .note .note__contents::-webkit-scrollbar {
        background-color: rgb(63, 63, 63);
        width: 3px;
    }

    .note .note__contents::-webkit-scrollbar-thumb {
        background-color: rgb(150, 150, 150);
        border-radius: 100px;
    }
</style>
