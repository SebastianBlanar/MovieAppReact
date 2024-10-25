import { useEffect, useState } from 'react';

export function Details({ movieId }) {
    const API_KEY = "api_key=1f5958ade9bb88f8352b23189296f880";
    const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?${API_KEY}`;
    const IMG_URL = "https://image.tmdb.org/t/p/original";
    
    const [movie, setMovie] = useState(null);
    useParams

    useEffect(() => {
        fetch(MOVIE_DETAILS_URL)
            .then(res => res.json())
            .then(data => setMovie(data.results))
            .catch(err => console.error(err));
    }, [movieId]);

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
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Watch Trailer
                    </button>
                    <button className="flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                        <img src="/img/heart-icon.svg" alt="Add to Wishlist" className="h-5" />
                        <span>Add to Wishlist</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
