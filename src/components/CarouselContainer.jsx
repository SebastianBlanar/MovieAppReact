import { useEffect, useState } from "react"; 
import { CarouselComponent } from "./CarouselComponent";

export function CarouselContainer() {
    const API_KEY = "api_key=1f5958ade9bb88f8352b23189296f880";
    const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?" + API_KEY;
    const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&with_genres=`;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(GENRES_URL)
            .then(res => res.json())
            .then(data => {
                setGenres(data.genres);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (genres.length === 0) return;

        const uniqueMovieIds = new Set(); 

        const fetchMoviesByGenre = async () => {
            for (const g of genres) {
                const res = await fetch(MOVIES_BY_GENRE_URL + g.id);
                const data = await res.json();
                
                data.results.forEach(movie => {
                    const prevSize = uniqueMovieIds.size; 
                    uniqueMovieIds.add(movie.id); 

                    if (uniqueMovieIds.size > prevSize) {
                        setMovies(prevMovies => [...prevMovies, movie]);
                    }
                });
            }
        };

        fetchMoviesByGenre().catch(e => console.error(e));
    }, [genres]);

    useEffect(() => {
        console.log(movies);
    }, [movies]);

    return (
        <section className="p-12">
            {genres.map((g) => (
                <CarouselComponent 
                    key={g.id}  
                    genre={g} 
                    movies={movies.filter(m => m.genre_ids[0] == g.id)} 
                />
            ))}
        </section>
    );
}
