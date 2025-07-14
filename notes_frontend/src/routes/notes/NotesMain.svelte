<script lang="ts">
    import { updateNote } from './notesStore';
    import type { Note } from './notesStore';

    export let selectedNote: Note | undefined = undefined;
    let title = "";
    let content = "";
    let editTimeout: ReturnType<typeof setTimeout> | null = null;

    $: if (selectedNote) {
        title = selectedNote.title ?? "";
        content = selectedNote.content ?? "";
    }

    function handleInput() {
        if (editTimeout) clearTimeout(editTimeout);
        // Save changes after a short delay
        editTimeout = setTimeout(() => {
            if (!selectedNote) return;
            updateNote(selectedNote.id, { title, content });
        }, 600);
    }

    function handleBlur() {
        // Guarantee latest changes on blur/defocus
        if (selectedNote) updateNote(selectedNote.id, { title, content });
    }
</script>

<main class="main-panel" aria-live="polite">
    {#if selectedNote}
        <form class="note-edit">
            <input
                type="text"
                bind:value={title}
                class="note-title"
                maxlength="128"
                placeholder="Title"
                on:input={handleInput}
                on:blur={handleBlur}
                aria-label="Note title"
            >

            <textarea
                bind:value={content}
                class="note-content"
                placeholder="Write your note here..."
                rows="12"
                on:input={handleInput}
                on:blur={handleBlur}
                aria-label="Note content"
            ></textarea>

        </form>
    {:else}
        <section class="nopick">
            <h3>Select a note to view or edit</h3>
            <p>Or create a new note from the sidebar.</p>
        </section>
    {/if}
</main>

<style>
.main-panel {
    flex: 1 1 72%;
    padding: 2.6rem 2.5rem 2.5rem 2.2rem;
    min-width: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.note-edit {
    display: flex;
    flex-direction: column;
    gap: 1.3em;
    margin-top: 0.6em;
}
.note-title {
    background: #F5FCFF;
    color: #114360;
    border: none;
    font-size: 1.55em;
    padding: 1em 0.5em 1em 0.1em;
    font-weight: 700;
    border-radius: 4px;
    margin-bottom: 0.7em;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 2.3px solid #2D9CDB;
    outline: none;
    transition: border .15s;
}
.note-title:focus {
    border-bottom: 2.8px solid #F2994A;
    background: #fff8f5;
}
.note-content {
    width: 100%;
    min-height: 16em;
    font-size: 1.07em;
    border: 1.3px solid #D7E9F5;
    font-family: inherit;
    padding: 1.1em 1em;
    border-radius: 4px;
    resize: vertical;
    background: #fafeff;
    color: #195a72;
    outline: none;
    transition: border .13s;
}
.note-content:focus { border-color: #27AE60; background: #f5fff7;}
.nopick { text-align: center; margin-top: 5em; color: #aaa;}
.nopick h3 { color: #2D9CDB; font-weight: 700; margin-bottom: 1.2em; }
.nopick p { color: #888;}
@media (max-width: 700px) {
    .main-panel { padding: 1.1rem 1.2rem 1.2rem 1.2rem;}
}
</style>
