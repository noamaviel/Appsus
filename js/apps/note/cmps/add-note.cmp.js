import { noteService } from '../services/note-service.js'
import { eventBus, EVENT_SHARE_AS_NOTE } from '../../../services/event-bus-service.js'


export default {
    name: 'add-note',
    props: [''],
    template: `
      <section class="add-note-container flex">
        <!-- <h3>Add A Note</h3> -->
            <div class="add-input-container flex">

            <form @submit.prevent="addNote" class="add-note-input" >
               <input type="text" v-model="noteData.val" :placeholder="placeholder">
            </form>

            <button @click="setType('noteText')"><i class="fas fa-font"></i></button>
            <button @click="setType('noteImg')"><i class="fas fa-image"></i></button>
            <button @click="setType('noteTodo')"><i class="fas fa-list-ul"></i></button>
            <button @click="setType('noteVideo')"><i class="fab fa-youtube"></i></button>

            </div>
    </section>
    `,

    data() {
        return {
            noteData: {
                val: '',
                type: 'noteText',
            }
        }
    },
    computed: {
        placeholder() {
            switch (this.noteData.type) {
                case 'noteText':
                    return 'Write something...'
                case 'noteImg':
                    return 'Insert img url...'
                case 'noteTodo':
                    return 'Things to do...'
                case 'noteVideo':
                    return 'Insert video url...'
            }
        }
    },

    methods: {
        addNote() {
            // console.log(this.noteData);
            noteService.addNote({ ...this.noteData })
            this.noteData.val = '';
        },
        setType(type) {
            this.noteData.type = type;
        },
        addFromMail(data) {
            console.log('addFromMail', data);
            this.noteData.val = data;
            this.setType('noteText');
            this.addNote();
        }

    },
    created() {
        eventBus.$on(EVENT_SHARE_AS_NOTE, data => {
              this.addFromMail(data);
        })

    }


}