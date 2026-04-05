function Home(){
    return(
    <main>
        <form class="search-form" action="results.html" method="get">
            <input type="text" class="" name="searchData" placeholder="Buscar..." value=""/>
            <button type="submit" class="btn btn-success btn-sm">Buscar</button>
        </form>

        <h2 class="alert alert-primary">Popular movies this week</h2>
        <section class="row cards" id="movies">
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/tzrJulItjttxzoX0t3B2My46TS7.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">The Thursday Murder Club</h5>
                    <p class="card-text">A group of senior sleuths passionate about solving cold cases get plunged into
                        a real-life murder mystery in this comic crime caper.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                    <a href="" class="btn alert-primary">🩶</a>
                </div>
            </article>
        </section>

        <h2 class="alert alert-primary">Movies now playing</h2>
        <section class="row cards" id="now-playing">
            <article class="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">War of the Worlds</h5>
                    <p class="card-text">Will Radford is a top analyst for Homeland Security who tracks potential
                        threats through a mass surveillance program, until one day an attack by an unknown entity leads
                        him to question whether the government is hiding something from him... and from the rest of the
                        world.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                    <a href="" class="btn alert-primary">🩶</a>
                </div>
            </article>
        </section>
    </main>  
    );
}

export default Home