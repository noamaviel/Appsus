import { noteService } from '../services/note-service.js';

export default {
    props: ['info', 'noteId'],
    name: 'note-todo',
    template: `
        <section class="note-todo">
            <h3>{{info.title}}</h3> 
            <ul v-if="info.todos">
                <li v-for="(todo,index) in info.todos" :index="index" :key="todo.txt">
                    <label v-if="todo.isDone" :style="{'text-decoration': 'line-through'}">
                        <input type="checkbox" v-model="todo.isDone" @change="onCheckbox">
                        {{ todo.txt }}
                    </label>

                    <label v-else :style="{'text-decoration': 'none'}"> 
                        <input type="checkbox" v-model="todo.isDone" @change="onCheckbox">
                        {{ todo.txt }}
                    </label>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            index: this.index
        }
    },
    created() {
       
    },
    computed: {
        todoFontStyle() {
           
        }
    },
    methods: {
        onCheckbox() {
            noteService.updateLocalStorage();
        }
    }
}
