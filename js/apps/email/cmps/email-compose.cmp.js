import { emailService } from '../services/email-service.js'
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus-service.js'


export default {
    name: 'email-compose',
    props: [],
    template: `
    <section class="email-compose">
    <form class="compose-form" @submit.prevent="addEmail">
                <input type="text" placeholder="Send to" v-model="emailToAdd.sendTo" />
                <input type="text" placeholder="Subject" v-model="emailToAdd.subject" />
                <textarea class="text-body" name="email-body" placeholder="Write your message" rows="20" cols="50" v-model="emailToAdd.body"> fddesfdf</textarea>
                <div class="new-mail-btns flex">
                    <button class="sendBtn"><i class="far fa-paper-plane"></i> Send</button>
                    <button class="sendTodraft">
                        <router-link :to="'/email/filter'" exact class="inbox-button"><i class="fas fa-trash"></i></router-link>
                    </button>
                </div>
            </form>            
    </section>
    `,
    data() {
        return {
            emailToAdd: emailService.getEmptyEmail()
        }
    },
    methods: {
        addEmail() {
            emailService.add(JSON.parse(JSON.stringify(this.emailToAdd)))
            this.emailToAdd = emailService.getEmptyEmail();
            this.$router.push('/email/filter')
            const msg = {
                txt: 'Email sent successfuly',
                type: 'success'
            }
            eventBus.$emit(EVENT_SHOW_MSG, msg)
            // .catch(err => {
            //     console.log('ERR:', err);
            //     const msg = {
            //         txt: 'Couldnt save your car',
            //         type: 'danger'
            //     }
            //     eventBus.$emit(EVENT_SHOW_MSG, msg)

            // }) 
        }
    },
    computed: {
        // showSentAt() {
        //     let date = new Date(this.email.sentAt);
        //     return date.toLocaleDateString() + date.toLocaleTimeString();
        // }
    },
    mounted() {

    },
    created() {

    },
    components: {

    }

}