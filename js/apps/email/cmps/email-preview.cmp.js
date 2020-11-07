console.log('email-preview');

export default {
    name: 'email-preview',
    props: ['email'],
    template: `
<<<<<<< HEAD
    <section :style="bcgStyleObject" class="email-preview" @click="$router.push('/email/' +email.id)">
        <span class="email-sentby">{{email.sendTo}}</span>
        <span :style="subjectStyleObject"   class="email-subject">{{email.subject}}</span>
        <span class="email-body">{{email.body}}</span>
        <span class="email-sentat">{{email.sentAt}}</span>
=======
    <section :style="bcgStyleObject" class="email-preview" @click="$router.push('/email/'+email.id)">

     <span class="email-sentby">{{email.sendTo}}</span>
     <span :style="subjectStyleObject"   class="email-subject">{{email.subject}}</span>
     <span class="email-body">{{email.body}}</span>
     <span class="email-sentat">{{email.sentAt}}</span>
>>>>>>> 2d2061112463ee03fc63662de6e330ca701ff3be
     <!-- <router-link :to="'/email/' +email.id " exact>Read</router-link> -->
       
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {


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