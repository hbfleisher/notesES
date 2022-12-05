<script>
    import { createEventDispatcher } from "svelte";
    import { select_multiple_value } from "svelte/internal";
    import { Notes } from '../storage/current_note';

    const dispatch = createEventDispatcher()
    const handleClose = () => {
        dispatch('close')
    }
    const handleMinimize = () => {
        dispatch('minimize')
    }

    export let active_note;

    const addNote = () => {
        Notes.update(notes => {
            for (let note of notes) {
                if (note.last_active) {
                    note.last_active = false
                }
            }
            notes.unshift( {
                'id': Math.random(),
                'title': 'New Note',
                'content': '',
                'last_active': true
            })
            return notes
        })
    }

    let original = active_note.title

    function submit() {
        if (active_note.title != original && active_note.title !== '') {
            Notes.update(notes => {
                let note = notes.find(note => note.id == active_note.id)
                note = active_note
                return notes
            })
        }
        else {
            active_note.title = original
        }
    }

    function keydown(e) {
        if (e.key == 'Escape'){
            e.preventDefault()
            active_note.title = original
            editing = false
        }
        if (e.key == 'Enter') {
            e.currentTarget.blur()
        }
    }

    const handleKeybinds = (e) => {
        if ((e.ctrlKey && e.shiftKey && e.keyCode == 65)) {
            anchor_top()
        }
        if ((e.ctrlKey && e.keyCode == 78)) {
            addNote()
        }
    }

    let anchor_active = false;
    function anchor_top() {
        window.api.anchorTop()
        anchor_active = !anchor_active
    }
</script>
<svelte:window on:keydown={handleKeybinds}></svelte:window>
<!--
    &minus; -- minus character
    &#10006; -- close character
    &#mx2630; -- hamburger menu
    TODO extend minimize sign to be a bit wider and lower
-->
<div class="main_menu">
    <nav class="menubar">
        <div class="menubar__left-nav">
            <span class="nav-item add-note" on:click={addNote} on:keydown={addNote}>+</span>
            <span class="nav-item anchor" id="anchor_button" class:anchor-active={anchor_active} on:click={anchor_top} on:keydown={anchor_top}>
                <svg width="10" height="10" viewBox="0 0 1280 1280"
                        preserveAspectRatio="xMidYMid meet" class="anchor-svg">
                        <g transform="translate(0.000000,1280) scale(.10,-.10)"
                        fill="rgb(223,223,223)" stroke="none">
                        <path d="M6170 10116 c-197 -42 -343 -127 -491 -284 -131 -140 -203 -277 -240
                        -457 -34 -163 -20 -360 35 -522 75 -219 215 -381 486 -562 144 -95 145 -96
                        159 -146 9 -34 13 -117 14 -265 1 -189 -2 -222 -19 -269 -34 -95 -36 -96 -317
                        -96 l-242 0 -84 73 c-120 105 -146 117 -256 117 -81 0 -95 -3 -144 -30 -112
                        -62 -167 -172 -159 -320 5 -105 39 -178 119 -257 63 -63 101 -78 189 -78 69 0
                        123 25 175 80 56 59 136 108 208 127 135 35 381 12 479 -46 l36 -22 6 -622
                        c14 -1459 15 -1979 6 -2030 -32 -167 -166 -306 -362 -374 -99 -34 -281 -43
                        -418 -19 -241 42 -488 159 -750 357 -63 47 -146 116 -185 152 l-70 65 82 76
                        c89 83 123 130 123 168 0 20 -19 37 -102 93 -290 196 -571 427 -661 545 -28
                        36 -57 65 -66 65 -32 0 -86 -240 -101 -454 -24 -332 30 -684 133 -876 28 -53
                        36 -60 65 -63 27 -3 43 5 85 41 64 54 88 67 125 67 24 0 36 -11 82 -77 189
                        -271 449 -534 686 -693 176 -120 329 -188 704 -315 420 -142 481 -169 656
                        -290 100 -70 153 -132 205 -237 18 -38 39 -68 46 -68 6 0 26 27 43 59 57 107
                        127 181 251 264 137 91 153 99 534 243 452 172 541 212 716 320 257 159 514
                        401 731 689 49 66 99 123 110 127 28 11 75 -13 132 -67 29 -28 54 -44 63 -41
                        8 3 23 6 32 6 21 0 77 115 111 225 57 189 86 549 61 764 -15 127 -50 270 -87
                        351 -41 93 -46 93 -93 3 -84 -160 -186 -259 -446 -430 -251 -165 -315 -214
                        -315 -236 0 -13 42 -62 109 -129 l109 -108 -76 -71 c-144 -135 -373 -294 -547
                        -381 -316 -159 -651 -193 -870 -88 -184 88 -292 273 -310 531 -6 87 -16 1155
                        -19 1964 -1 347 6 445 36 510 21 46 94 60 328 60 204 0 205 0 250 -27 25 -14
                        78 -55 118 -91 56 -51 84 -68 123 -77 100 -24 183 4 268 92 62 64 88 115 103
                        199 20 116 -15 232 -93 310 -61 61 -118 83 -214 83 -98 0 -125 -12 -220 -104
                        -38 -37 -85 -75 -104 -84 -52 -27 -220 -40 -361 -28 -147 13 -182 27 -202 78
                        -34 86 -56 368 -39 502 17 132 22 139 159 202 101 48 128 66 201 135 110 105
                        172 188 232 310 84 174 116 345 98 533 -38 404 -311 726 -704 828 -124 32
                        -350 42 -455 20z m373 -431 c142 -30 269 -118 321 -222 64 -129 78 -330 31
                        -468 -64 -193 -198 -325 -371 -366 -76 -18 -229 -15 -299 5 -156 46 -296 156
                        -353 277 -42 90 -57 160 -56 269 0 221 116 388 326 471 119 47 277 61 401 34z"/>
                        </g>
                        </svg>
                <span>
            <!-- <span class="nav-item">&#x2630;</span> -->
        </div>
        <div class="menubar__mid-nav" on:keydown>
            <h1 class="note-title" contenteditable="true" id="note_title"
             on:keydown={keydown} on:blur={submit} on:change={submit}
              bind:textContent={active_note.title}></h1>
        </div>
        <div class="menubar__right-nav">
            <span class="nav-item app-minimize" on:click={handleMinimize} on:keydown={handleMinimize}>&minus;</span>
            <span class="nav-item app-close" on:click={handleClose} on:keydown={handleClose}>&#10006;</span>
        </div>
    </nav>
</div>



<style>
    .main_menu {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background-color: rgb(91, 91, 91);
    }

    .menubar {
        background-color: rgb(91, 91, 91);
        display: flex;
        height: 28px;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        -webkit-app-region: drag;
        margin-left: 2px;
    }

    .menubar .nav-item {
        color: rgb(223, 223, 223);
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        font-size: 1.3rem;
        -webkit-app-region: no-drag;
    }

    .menubar .note-title {
        font-size: 1rem;
        color: rgb(223, 223, 223);
        z-index: 40;
        text-decoration: none;
    }

    .menubar .menubar__left-nav {
        transform: scale(1.3,1.3) translateX(2px) translateY(-2px);
        font-weight: bold;
    }

    .menubar .menubar__mid-nav {
        text-overflow: ellipsis;
        -webkit-app-region: no-drag;
    }

    .menubar .menubar__right-nav {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .app-close {
        padding: 0 15px;
        text-align: center;
        transform: translateY(2px);
    }

    .app-minimize {
        text-align: center;
        padding: 10px 15px;
        transform: translateY(6px) scaleX(1.2);
        font-weight: bold;
    }

    .app-close:hover {
        background-color: rgb(209, 46, 46);
    }

    .app-minimize:hover {
        background-color: rgb(110, 110, 110);
    }

    .menubar .add-note {
        transform: translateX(3px);
    }

    .menubar .add-note:hover {
        background-color: rgb(110, 110, 110);
    }

    .anchor {
        color: rgb(223, 223, 223);
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        font-size: 1.3rem;
        margin-left: -6px;
        -webkit-app-region: no-drag;
    }

    .anchor-svg {
        transform: scale(300%) translateY(-1px);
    }

    .anchor:hover {
        background-color: rgb(110, 110, 110);
    }

    .anchor-active {
        background-color: rgb(89, 133, 130);
    }
</style>