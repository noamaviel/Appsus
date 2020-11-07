import { noteService } from '../services/note-service.js';

export default {
    props: ['info', 'noteId'],
    name: 'note-todo',
    template: `
        <section class="note-todo">
            <h3>{{info.title}}</h3> 
            <!-- <h4>{{info.todos}}</h4> -->
            <ul v-if="info.todos">
                <li v-for="(todo,index) in info.todos" :index="index" :key="todo.txt">

                    <!-- <p :txt= "todo.txt"></p> -->
                    
                    <!-- <label>
                    <input type="checkbox" v-model="info.isDone">
                    {{todo.txt}}
                    </label> -->
                    <label v-if="todo.isDone" :style="{'text-decoration': 'line-through'}">
                    <input type="checkbox" v-model="todo.isDone" @change="onCheckbox">
                    {{ todo.txt }}</label>

                    <label v-else :style="{'text-decoration': 'none'}"> 
                  <input type="checkbox" v-model="todo.isDone" @change="onCheckbox">
                  {{ todo.txt }}</label>
                    <!-- <i class="fa fa-check-square"></i>  -->
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
        //    console.log('addToDoNote in NOTE TO DO', noteService.addTodoNote())
    },
    computed: {
        todoFontStyle() {
            //    if (this.todo.isDone) return "{'text-decoration': 'line-through'}"
            //    else return "{'text-decoration': 'none'}"
        }
    },
    methods: {
        onCheckbox() {

        }
    }
}
