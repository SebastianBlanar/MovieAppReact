import { useEffect, useState,useContext } from 'react';
import { FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { WishlistContext } from '../../contexts/WishListContext';

export function Details() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/original";
    const { type, id } = useParams(); 

    const [content, setContent] = useState(null);
    const { wishlist, addContentToWishlist, removeContentFromWishlist } = useContext(WishlistContext) 

    const BASE_MOVIE_URL = "https://api.themoviedb.org/3/movie/";
    const BASE_TV_URL = "https://api.themoviedb.org/3/tv/";

    const DETAILS_URL = type === "movie" 
        ? `${BASE_MOVIE_URL}${id}?api_key=${API_KEY}` 
        : `${BASE_TV_URL}${id}?api_key=${API_KEY}`;

    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        fetch(DETAILS_URL)
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error(err));
    }, [DETAILS_URL]);

    useEffect(() => {
        const fetchTrailer = async () => {
            const VIDEOS_URL = type === "movie" 
                ? `${BASE_MOVIE_URL}${id}/videos?api_key=${API_KEY}` 
                : `${BASE_TV_URL}${id}/videos?api_key=${API_KEY}`;
                
            const results = await fetch(VIDEOS_URL);
            const data = await results.json();

            const trailer = data.results.find(video => video.type === "Trailer");
            trailer && setTrailerURL("https://www.youtube.com/watch?v=" + trailer.key);
        };
        fetchTrailer();
    }, [id, type, API_KEY]);

    if (content == null) return <p className='text-white text-center'>Cargando...</p>;

    return (
        <div className="relative h-[95vh] min-h-[450px] bg-custom-gradient">
            <img 
                src={IMG_URL + content.backdrop_path} 
                alt={type === "movie" ? content.title : content.name} 
                className="absolute inset-0 h-full w-full object-cover object-center" 
                style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent)' }}
            />

            <div className="relative z-10 p-8 bg-gradient-to-t from-black to-transparent h-full flex flex-col justify-end">
                <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">{type === "movie" ? content.title : content.name}</h1>
                <p className="text-white text-lg">{content.release_date ? content.release_date.slice(0, 4) : content.first_air_date.slice(0, 4)}</p>
                <p className="text-white mt-2 max-w-2xl line-clamp-3">{content.overview}</p>

                <div className="flex mt-4 space-x-4">
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        onClick={() => {
                            const contentName = encodeURIComponent(type === "movie" ? content.title : content.name);
                            window.open(`https://soaper.tv/search.html?keyword=${contentName}`, "_blank");
                        }}
                    >
                        Search on Soaper.tv
                    </button>
                    {trailerURL ? (
                        <a href={trailerURL} target="_blank" rel="noopener noreferrer">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Watch Trailer
                            </button> 
                        </a>
                    ) : (
                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                            Trailer unavailable
                        </button>
                    )}
                    
                    {wishlist.some(c => c.id == id) ? (
                        <button 
                        className="flex items-center space-x-2 text-white border border-red-600 px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
                        onClick={() => removeContentFromWishlist(id)}
                        >
                            <span>Remove from watchlist</span>
                        </button>
                    ) : (
                        <button 
                            className="flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
                            onClick={() => addContentToWishlist(content)}
                        >
                            <FaPlus className="h-5" />
                            <span>Add to Wishlist</span>
                        </button>
                    )
                    }
                    
                </div>
            </div>
        </div>
    );
}
