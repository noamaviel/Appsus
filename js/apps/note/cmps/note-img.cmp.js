

export default {
    props: ['info'],
    name: 'note-img',
    template: `
        <section class="note-img">  
            <h3>{{info.title}}</h3>
            <img :src="info.url"/>
        </section>
    `
}
