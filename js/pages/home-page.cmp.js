
export default {
    name: 'home-page-app',
    template: `
    <section class="home-page-app">
        <div class="home-page-background flex">
                <div class="buttons-container flex">
                    <button><router-link to="/email"><i class="fas fa-envelope"></i></router-link></button>
                    <button><router-link to="/note"><i class="fas fa-sticky-note"></i></router-link></button>
                </div>    
                <div class="content-container">
                     <p>"Most of us love timesavers
                          because they give us more time to waste"...
                          <br/>    
                          ENJOY APPSUS!
                     </p>
                </div>
        </div>
    </section>
    `
}