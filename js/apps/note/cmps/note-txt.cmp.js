

export default {
    props: ['info'],
    name: 'note-txt',
    template: `
        <section class="note-txt">
             <h3> {{info.txt}} </h3>
            </section>
    `
}
