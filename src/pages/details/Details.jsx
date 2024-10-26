import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';

export function Details() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    console.log(API_KEY)
    const IMG_URL = "https://image.tmdb.org/t/p/original";
    const { movieId } = useParams()
    const [movie, setMovie] = useState(null);

    const BASE_URL = "https://api.themoviedb.org/3/movie/"
    const MOVIE_DETAILS_URL = BASE_URL + movieId + "?" + "api_key=" + API_KEY
    const VIDEOS_URL =  BASE_URL + movieId + "/videos" + "?" + "api_key=" + API_KEY

    const [ trailerURL, setTrailerURL ] = useState("")

    useEffect(() => {
        fetch(MOVIE_DETAILS_URL)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(()=>{
        const fetchTrailer = async () => {
            const results = await fetch(VIDEOS_URL)
            const data = await results.json()

            const trailer = data.results.find( video => video.type == "Trailer" )
            trailer && setTrailerURL("https://www.youtube.com/watch?v=" + trailer.key)
        }
        fetchTrailer()
    },[movieId])

    if (!movie) return <p>Cargando...</p>;

    return (
        <div className="relative h-[95vh] min-h-[450px] bg-custom-gradient">
            <img 
                src={IMG_URL + movie.backdrop_path} 
                alt={movie.title} 
                className="absolute inset-0 h-full w-full object-cover object-center" 
                style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent)' }}
            />

            <div className="relative z-10 p-8 bg-gradient-to-t from-black to-transparent h-full flex flex-col justify-end">
                <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">{movie.title}</h1>
                <p className="text-white text-lg">{movie.release_date.slice(0, 4)}</p>
                <p className="text-white mt-2 max-w-2xl line-clamp-3">{movie.overview}</p>

                <div className="flex mt-4 space-x-4">
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        onClick={() => {
                            const movieName = encodeURIComponent(movie.title); // Codifica el título para URL
                            window.open(`https://soaper.tv/search.html?keyword=${movieName}`, "_blank");
                        }}
                    >
                        Search on Soaper.tv
                    </button>
                    { trailerURL != "" ? (
                        <a href={trailerURL} target="_blank" rel="noopener noreferrer">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Watch Trailer
                            </button> 
                        </a>
                        ) : (
                            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                            Trailer unavailable
                        </button>
                        )
                    }
                    
                    <button className="flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                        <FaPlus className="h-5" />
                        <span>Add to Wishlist</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
