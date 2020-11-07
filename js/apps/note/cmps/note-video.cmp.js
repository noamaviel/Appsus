

export default {
    props: ['info'],
    name: 'note-video',
    template: `
         <section class="note-audio">
                <h3 class="note-title">{{info.title}}</h3>
            <iframe v-if="info.videoUrl" :src="info.videoUrl" frameborder="0" allowfullscreen></iframe>

        </section>
    `
}
