import userMsg from './user-msg.cmp.js';

export default {
    template: `
    <header class="app-header">
    <user-msg/>
        <router-link to="/" class= "header-logo">Appsus</router-link>
    
        <nav>
                <router-link to="/email">Email</router-link>
                <router-link to="/note">Note</router-link>
                <router-link to="/about">About Us</router-link>
        </nav>   
            
    </header>
    `,
    components: {
        userMsg
    }
}