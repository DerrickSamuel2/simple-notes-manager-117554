<script lang="ts">
    import { notes, selectedNoteId, addNote, deleteNote } from './notesStore';

    function handleAdd() {
        addNote();
    }

    function handleDelete(e, id) {
        e.stopPropagation();
        if (confirm("Delete note?")) deleteNote(id);
    }
</script>

<aside aria-label="Notes list" class="sidebar">
    <header>
        <h2>Notes</h2>
        <button class="add-btn" aria-label="Add Note" title="Add Note" on:click={handleAdd}><span>＋</span></button>
    </header>
    <nav>
        {#if $notes.length === 0}
            <p class="empty-list">No notes yet.</p>
        {:else}
        <ul>
            {#each $notes as note (note.id)}
                <li>
                    <button
                        type="button"
                        class:selected={note.id === $selectedNoteId}
                        class="note-list-btn"
                        aria-current={note.id === $selectedNoteId ? 'page' : undefined}
                        on:click={() => selectedNoteId.set(note.id)}
                    >
                        <span>{note.title || "Untitled Note"}</span>
                    </button>
                    <button
                        class="delete-btn"
                        aria-label="Delete note"
                        title="Delete"
                        on:click|stopPropagation={(e) => handleDelete(e, note.id)}
                    >🗑️</button>
                </li>
            {/each}
        </ul>
        {/if}
    </nav>
</aside>

<style>
.sidebar {
    min-width: 240px;
    background: #f5fbfe;
    border-right: 1.5px solid #e3eff8;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 1px 0 0 #e3eff8;
}
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2D9CDB;
    color: #fff;
    padding: 1.4rem 1rem 1rem 1.2rem;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.02em;
}
.add-btn {
    background: #27AE60;
    color: #fff;
    border: none;
    font-size: 1.3em;
    border-radius: 8px;
    padding: 0.2em 0.5em;
    cursor: pointer;
    transition: background .15s;
}
.add-btn:hover { background: #219150; }
nav {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1em 0;
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
li {
    display: flex;
    align-items: center;
    padding: 0.2em 1.3em 0.2em 1.1em;
    border-left: none;
    background: none;
    user-select: none;
    gap: 0.5em;
}
.note-list-btn {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: #114360;
    padding: 0.7em 0.5em 0.7em 0;
    text-align: left;
    font-size: 1em;
    font-weight: 500;
    border-radius: 6px 2.5px 2.5px 6px;
    transition: background 0.13s, color 0.13s;
    border-left: 3.4px solid transparent;
    cursor: pointer;
}
.note-list-btn.selected,
.note-list-btn[aria-current='page'] {
    background: #eaf6fb;
    border-left: 3.4px solid #2D9CDB;
    color: #1b7db7;
}
.note-list-btn:focus {
    box-shadow: 0 0 0 2px #2D9CDB33 inset;
    background: #eaf6fb;
}
.note-list-btn:hover:not(.selected) {
    background: #f6fafd;
}
.delete-btn {
    background: none;
    border: none;
    color: #F2994A;
    font-size: 1.05em;
    cursor: pointer;
    margin-left: 0.7em;
    padding: 2px 5px;
    border-radius: 4px;
    transition: background .13s;
}
.delete-btn:hover { background: #fff3ec; color: #B96E1D; }
.empty-list {
    color: #9bb3c2;
    text-align: center;
    margin-top: 2em;
    font-style: italic;
    font-size: 1.04em;
}
@media (max-width: 700px) {
    .sidebar { min-width: unset; width: 100vw; border-right: none; border-bottom: 1.5px solid #e3eff8; }
}
</style>
