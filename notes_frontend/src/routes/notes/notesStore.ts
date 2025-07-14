import { writable } from 'svelte/store';

// Types
export interface Note {
    id: string;
    title: string;
    content: string;
    created: number;
    updated: number;
}

function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// -- Notes writable store with localStorage persistence --
function createNotesStore() {
    let stored = [];
    if (typeof localStorage !== 'undefined') {
        try {
            stored = JSON.parse(localStorage.getItem('notes_data') || '[]');
        } catch { stored = [] }
    }
    const { subscribe, set, update } = writable<Note[]>(stored);

    subscribe(val => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('notes_data', JSON.stringify(val));
        }
    });

    return {
        subscribe,
        // PUBLIC_INTERFACE
        addNote: () => update(notes => {
            const now = Date.now();
            const n: Note = {
                id: uid(),
                title: "",
                content: "",
                created: now,
                updated: now,
            };
            return [n, ...notes];
        }),
        // PUBLIC_INTERFACE
        updateNote: (id: string, fields: Partial<Omit<Note, 'id' | 'created'>>) => update(notes =>
            notes.map(note =>
                note.id === id ? { ...note, ...fields, updated: Date.now() } : note
            )
        ),
        // PUBLIC_INTERFACE
        deleteNote: (id: string) => update(notes => notes.filter(n => n.id !== id)),
        set
    }
}

export const notes = createNotesStore();

export const selectedNoteId = writable<string | null>(null);

// Re-export functions for convenience
export const addNote = () => notes.addNote();
export const updateNote = (id: string, fields: Partial<Omit<Note, 'id' | 'created'>>) => notes.updateNote(id, fields);
export const deleteNote = (id: string) => notes.deleteNote(id);

// Ensure a note is selected on first load if available
notes.subscribe(list => {
    if (list.length > 0 && typeof window !== 'undefined' && !window.location.hash?.includes('notes/')) {
        selectedNoteId.update(curId => curId ?? list[0].id);
    }
    if (list.length === 0) selectedNoteId.set(null);
});
