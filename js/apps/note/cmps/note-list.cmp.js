// console.log('note-list');

import notePreview from './note-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'


export default {
    props: ['notes'],
    template: `
        <section class="note-list-container">
            <!-- <h3>{{notes}}</h3> -->

            <ul class="notes flex">
                <li v-for="currNote in notes" :style="{ 'background-color' : currNote.style.backgroundColor }" :key="currNote.id" class="note"  >
                    <!-- <button @click="emitRemove"><i class="fas fa-times"></i></button>    -->
                <note-preview :note="currNote" @click.native="noteClicked" />
                </li>
                
            </ul>
        </section>
    `,
    methods: {

        emitRemove(noteId) {
            this.$emit('remove', noteId)
        },
      
        noteClicked() {
            // alert('cliked');
        }
    },
    created() {
        eventBus.$on('removeNote', (id) => {
            this.emitRemove(id);
        });

    },
    components: {
        notePreview,
    },
}