<script>
    // import {ContextMenu, ContextMenuDivider, ContextMenuOption, ContextMenuGroup} from "carbon-components-svelte";
    let target

    let selected_ids = [];

    import {Notes} from '../storage/current_note'
    let note_list;
    
    Notes.subscribe(notes => note_list = notes)
    export let active_note;


    function handleSwitchNote(note_to_set) {
        Notes.update(notes => {
            for (let note of notes) {
                if (note.last_active === true) {
                    note.last_active = false
                }
                if (note.id === note_to_set.id){
                    note.last_active = true
                }
            }
            return notes
        })
    }
</script>
<!-- 
<ContextMenu {target}>
    <ContextMenuOption
      indented
      labelText="Copy"
      shortcutText="⌘C"
    />
    <ContextMenuOption indented labelText="Cut" shortcutText="⌘X" />
    <ContextMenuDivider />
    <ContextMenuOption indented labelText="Export as">
      <ContextMenuGroup labelText="Export options" bind:selected_ids>
        <ContextMenuOption id="pdf" labelText="PDF" />
        <ContextMenuOption id="txt" labelText="TXT" />
        <ContextMenuOption id="mp3" labelText="MP3" />
      </ContextMenuGroup>
    </ContextMenuOption>
    <ContextMenuDivider />
    <ContextMenuOption selectable labelText="Remove metadata" />
    <ContextMenuDivider />
    <ContextMenuGroup labelText="Style options">
      <ContextMenuOption id="0" labelText="Font smoothing" selected />
      <ContextMenuOption id="1" labelText="Reduce noise" />
      <ContextMenuOption id="2" labelText="Auto-sharpen" />
    </ContextMenuGroup>
    <ContextMenuDivider />
    <ContextMenuOption indented kind="danger" labelText="Delete" />
  </ContextMenu> -->



<div class="note_list" id="note_list">
    <ul class="note_list">
        {#each note_list as note}
            <li class="note_list__item" class:note_list__item--active={note.id == active_note.id} on:click={()=>handleSwitchNote(note)} on:keydown>
                <h1>{note['title']}</h1>
                <p>{note['content'].slice(0, 120)}
                    {#if note['content'].length > 120}<span>...</span>{/if}
                </p>
            </li>
        {/each}
    </ul>
</div>

<style>
    .note_list {
        width: 100%;
        padding: 0;
        transform: translateY(-10px);
        scrollbar-color: red;
        
    }

    .note_list .note_list__item {
        padding: 2px 0 5px 5px;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        cursor: pointer;
    }

    .note_list .note_list__item--active {
        background-color: rgb(120, 120, 120);
    }

    .note_list .note_list__item > * {
        padding: 0;
        margin: 0;
    }

    .note_list .note_list__item h1 {
        font-size: 18px;
    }

    .note_list .note_list__item p {
        font-size: 14px;
    }

    .note_list .note_list__item:not(:last-child) {
        border-bottom: 1px solid rgba(223, 223, 223, .3);
    }

</style>