<script lang="ts">
    import NotesSidebar from './NotesSidebar.svelte';
    import NotesMain from './NotesMain.svelte';
    import { selectedNoteId, notes } from './notesStore';

    // Derived note for display/edit based on current selection
    $: selectedNote = $notes.find(n => n.id === $selectedNoteId);
</script>

<div class="notes-wrapper">
    <NotesSidebar />
    <NotesMain {selectedNote} />
</div>

<style>
.notes-wrapper {
    display: flex;
    min-height: 70vh;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(45, 156, 219, 0.06), 0 1.5px 6px rgba(39,174,96,0.03);
    overflow: hidden;
    margin: 2rem auto;
    max-width: 960px;
}
@media (max-width: 700px) {
    .notes-wrapper { flex-direction: column; max-width: 100vw; min-height: unset;}
}
</style>
