import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function BannerComponent() {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const TMDB_POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/movie/popular?" + "api_key=" + API_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/original"

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(TMDB_POPULAR_MOVIES_URL)
            .then(res => res.json())
            .then(data => {
                const shuffledMovies = data.results.sort(() => 0.5 - Math.random());
                setMovies(shuffledMovies.slice(0, 6)); 
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="h-[40vh] min-h-[450px] md:h-[95vh] filter saturate-150 bg-custom-gradient">
            <Carousel>
                {movies.map((m) => (
                    <div key={m.id} className="relative h-full w-full">
                        <img src={IMG_URL + m.backdrop_path} alt={m.title} className="h-full w-full object-cover object-center"
                            style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent)' }} />

                        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black to-transparent md:bg-none ">
                            <h2 className="text-2xl md:text-3xl text-white font-bold">{m.title}</h2>
                            <p className="text-white mt-2 max-w-2xl">{m.release_date.slice(0, 4)}</p>
                            <p className="text-white mt-2 max-w-2xl text-ellipsis line-clamp-2 md:line-clamp-3">{m.overview}</p>
                            <Link to={`movie/${m.id}`}>
                                <button className="mt-2 mb-4 mx-auto md:mx-0 h-10 w-36 sm:h-8 sm:w-20 md:h-10 md:w-28 lg:h-12 lg:w-32 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-300">
                                    Go to the movie
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}