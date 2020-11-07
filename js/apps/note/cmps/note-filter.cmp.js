// console.log('note-filter');

export default {
    props: [],
    template: `
        <section class="note-filter-container">
            <div class="note-filter flex"> 
                <button @click="onResetFilter">X</button>
            
                <form @submit.prevent="emitFilter" > 

                <label>
                    <input class="note-input" type="text" v-model="filterBy.byText" placeholder="Search here" />
                </label>
                <button class="note-search">
                <input type="submit" value="Search"><i class="fas fa-search"></i>
                </button>
                
                </form>
            
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: { byText: '', created: '', isPinned: true }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('doFilter', this.filterBy);
            console.log('emitFilter')
        },
        onResetFilter() {
            this.$emit('doFilter', { byText: '', created: '', isPinned: this.filterBy.isPinned })
            document.querySelector('.search-input').value = ''
        }

    }

}