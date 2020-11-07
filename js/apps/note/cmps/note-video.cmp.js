

export default {
    props: ['info'],
    name: 'note-video',
    template: `
        <section class="note-audio">
            <h3 class="note-title">{{info.title}}</h3>
            <iframe v-if="info.videoUrl" title="YouTube video player" width="400" height="400" :src="info.videoUrl" frameborder="0" allowfullscreen></iframe>
        </section>
    `
}
