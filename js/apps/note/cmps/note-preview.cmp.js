import noteText from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodo from './note-todo.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteEdit from './note-edit.cmp.js';



export default {
    props: ['note'],
    name: 'note-preview',
    template: `
        <section class="note-preview">
            
            <component :is="note.type" :info="note.info" :noteId="note.id" class="note-content" />
            <hr/>
            <note-edit :noteId = "note.id" class="note-edit flex"></note-edit>
    
        </section>
    `,
    computed: {
        previewClass() {
            return { isPinned: this.note.isPinned }
        },
        imgUrl() {
            return `${this.note.info.url}`
        },
    },
    components: {
        noteText,
        noteImg,
        noteTodo,
        noteVideo,
        noteEdit,
    }

}

