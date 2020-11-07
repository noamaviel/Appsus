// console.log('note-filter');

export default {
    props: [],
    template: `
        <section class="note-filter-container">
            <div class="note-filter flex"> 
                <button @click="onResetFilter">X</button>
            
                <form @submit.prevent="emitFilter" > 

                <!-- <h3>Note Filter</h3> -->

                <!-- <label>
                    <input class="created-note-input" type="date" v-model.number="filterBy.created" placeholder="" @change="emitFilter"/>
                </label> -->

                
                <label>
                    <input class="note-input" type="text" v-model="filterBy.byText" placeholder="Search here" />
                </label>
                <button class="note-search">
                <input type="submit" value="Search"><i class="fas fa-search"></i>
                </button>
                
                <!-- <label> Pinned notes:
                    <input class="pined-input" @change="emitFilter" type="checkbox" v-model="filterBy.isPinned"/>
                </label> -->
                
                </form>
            
            <!-- <hr />
            {{filterBy}} -->
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