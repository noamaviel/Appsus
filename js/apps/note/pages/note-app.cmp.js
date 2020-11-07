
import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.cmp.js';
import notePreview from '../cmps/note-preview.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import addNote from '../cmps/add-note.cmp.js'



export default {
    name: 'note-app',
    template: `
    <section class="note-app">
        
        <add-note/>
        <note-filter class= "flex" @doFilter="setFilter" />
        <note-details v-if="selectedNote"  :note="selectedNote"/>
        <note-list :notes="notesToShow" @remove="removeNote" @selected="selectNote" />

    </section>
    `,
    data() {
        return {
            notes: null,
            selectedNote: null,
            filterBy: null,
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const txt = this.filterBy.byText.toLowerCase()
            return this.notes.filter(note => {
                let found = false;

                if (typeof note.info.title === 'string') {
                    found = note.info.title.toLowerCase().includes(txt)
                };
                if (!found)
                    if (typeof note.info.txt === 'string') {
                        found = note.info.txt.toLowerCase().includes(txt)
                    }
                if (!found)
                    if (typeof note.info.url === 'string') {
                        found = note.info.url.toLowerCase().includes(txt)
                    }
                if (!found)
                    if (typeof note.info.videoUrl === 'string') {
                        found = note.info.videoUrl.toLowerCase().includes(txt)
                    }
                return found;
            });
        }
    },
    methods: {

        removeNote(noteId) {
            noteService.remove(noteId);
        },
        setFilter(filterBy) {
            let filter = {};
            filter = { ...filterBy };
            this.filterBy = filter;
        },
        selectNote(noteId) {
            const selectedNote = this.notes.find(note => note.id === noteId);
            this.selectedNote = selectedNote;
        },
    },

    created() {
        noteService.getNotes()
            .then(notes => {
                this.notes = notes;
            });

    },
    components: {
        noteList,
        noteService,
        notePreview,
        noteFilter,
        addNote
    }
}
