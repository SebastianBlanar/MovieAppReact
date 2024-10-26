import { useEffect, useState } from "react"; 
import { CarouselComponent } from "./CarouselComponent";

export function CarouselContainer() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?" + "api_key=" + API_KEY;
    const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieMatrix, setMovieMatrix] = useState([]); 

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
        const uniqueMovies = new Set(); 

        const fetchMoviesByGenre = async () => {
            for (const g of genres) {
                const res = await fetch(MOVIES_BY_GENRE_URL + g.id);
                const data = await res.json();
                
                data.results.forEach(movie => {
                    const prevSize = uniqueMovieIds.size; 
                    uniqueMovieIds.add(movie.id); 

                    if (uniqueMovieIds.size > prevSize) {
                        uniqueMovies.add(movie);
                    }
                });
            }
            setMovies(Array.from(uniqueMovies)); 
        };

        fetchMoviesByGenre().catch(e => console.error(e));
        
    }, [genres]);

    useEffect(() => {
        if (movies.length > 0) {
            const sortedMovies = sortMoviesByGenre(); 
            setMovieMatrix(sortedMovies); 
        }
    }, [movies]);

    function sortMoviesByGenre() {
        const movieMatrix = [];
        for (let i = 0; i < genres.length; i++) {
            movieMatrix[i] = [];
        }        
        
        outerloop: for(let j = 0; j < movies.length; j++) {
            for(let i = 0; i < genres.length; i++) {
                if (movieMatrix[i].length === 10) {
                    continue;
                }
                for(let categoryId of movies[j].genre_ids) {
                    if (categoryId === genres[i].id) {
                        movieMatrix[i].push(movies[j]);
                        continue outerloop;
                    }
                }
            }  
        }
        return movieMatrix;
    }

    return (
        <section className="p-12">
            {movies.length != 0 && movieMatrix.map((moviesArray, i) => (
                <CarouselComponent 
                    key={genres[i].id}  
                    genre={genres[i]} 
                    movies={moviesArray} 
                />
            ))}
        </section>
    );
}
