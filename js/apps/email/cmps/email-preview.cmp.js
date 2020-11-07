console.log('email-preview');
import { emailService } from '../services/email-service.js'

export default {
    name: 'email-preview',
    props: ['email'],
    template: `
    <section :style="bcgStyleObject" class="email-preview" @click="$router.push('/email/'+email.id)">

    <i v-if="email.isStar" class="fas fa-star" @click.stop="onStarToggle"></i>
    <i v-else class="far fa-star" @click.stop="onStarToggle"></i>
    <span class="email-sentby">{{email.sendTo}}</span>
     <span :style="subjectStyleObject"   class="email-subject">{{email.subject}}</span>
     <span class="email-body">{{email.body}}</span>
     <span class="email-sentat">{{email.sentAt}}</span>
     <!-- <router-link :to="'/email/' +email.id " exact>Read</router-link> -->
       
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        onStarToggle() {
            emailService.toggleStar(this.email.id);
        }

    },
    computed: {
        subjectStyleObject() {
            return {
                fontWeight: (this.email.isRead) ? 'normal' : 'bold',
            }
        },
        bcgStyleObject() {
            return {
                backgroundColor: (this.email.isRead) ? 'rgba(242,245,245,0.8)' : 'rgba(255,255,255,0.902)'
            }
        }

    },
    mounted() {

    },
    created() {
     
    },
    components: {

    }

}