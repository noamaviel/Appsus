console.log('email-filter');
import { eventBus } from '../../../services/event-bus-service.js';



export default {
    template: `
        <section class="email-filter flex-between">

            <div class="email-filter-container flex">
                <button @click="onResetFilter">X</button>
                <form @submit.prevent="emitFilter"> 
                    <label> 
                        <input  class="email-input" type="text" v-model="filterBy.byText" placeholder="Search here" />
                    </label>

                <!-- <button @click="resetFilter">X</button> -->
                    <button class="email-search">
                    <input type="submit" value="Submit"><i class="fas fa-search"></i>
                    
                    </button>
                </form>
            </div>


                <label> Read
                    <input @change="emitFilter" type="checkbox" v-model="filterBy.isRead"/>
                </label>

                <label> Unread
                    <input @change="emitFilter" type="checkbox" v-model="filterBy.isUnread"/>
                </label>
        </section>
    `,
    data() {
        return {
            filterBy: { byText: '', isRead: true, isUnread: true }

        }
    },
    methods: {
        emitFilter() {
            eventBus.$emit('doFilter', this.filterBy);
            // this.$emit('doFilter', this.filterBy);
        },
        onResetFilter() {
            console.log('Email on reset filter')
            eventBus.$emit('doFilter', { byText: '', isRead: true, isUnread: true })
            document.querySelector('.email-input').value = ''
        }
    },
    mounted() {
        // this.$refs.txtInput.value = '';
        // let h1 = this.$refs.myH1
        // console.log('h1:', h1)
    },
}