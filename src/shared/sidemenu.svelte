<script>
    import { get } from "svelte/store";

    let width = 200

    let expanding = null;
    let start = null;
    let initial_width = null;

    function startExpand(event) {
        expanding = true
        start = event.pageX
        initial_width = width
    }
    
    function stopExpand() {
        expanding = start = initial_width = null;
    }

    function expand(event) {
        if (!expanding) return

        if (expanding) {
            const delta = event.pageX - start
            width = initial_width + delta
            return
        }
    }
</script>

<svelte:window on:mouseup={stopExpand}  on:mousemove={expand} />
<div class="sidebar">
    <div class="side_menu" style="width: {width}px">
        <slot></slot>
    </div>
    <aside class='expand_grabber' class:expanding on:mousedown={startExpand.bind(this)}></aside>
</div>


<style>
    .sidebar {
        position: relative;
        max-width: min(850px, 85%);
    }

    .side_menu {
        position: relative;
        background-color: rgb(75, 75, 75);
        color: rgb(223, 223, 223);
        height: 101%;
        min-width: 60px;
        max-width: 100%;
        z-index: 20;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .side_menu:not(:hover)::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    
    .expand_grabber {
        background-color: rgb(75, 75, 75);
        position: absolute;
        height: 101%;
        width: 4px;
        min-width: 4px;
        top: 0;
        right: 0;
        cursor: ew-resize;
        z-index: 25;
    }
    
    .expanding {
        background-color: cornflowerblue;
    }
</style>