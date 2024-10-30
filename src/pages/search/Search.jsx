import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { MovieCard } from '../../components/MovieCard';

export function Search() {
    const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
    const API_KEY = import.meta.env.VITE_API_KEY;
    

    const POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/discover/movie" + "?api_key=" + API_KEY + "&sort_by=popularity.desc&include_adult=false&vote_average.gte=7&certification_country=DE&certification.lte=FSK 16&page="
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

async function fetchMovies(url){
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la búsqueda');
        }
        const data = await response.json();
        return data
    }
    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);
        if (!searchQuery){
            try {
                const urls = [
                    POPULAR_MOVIES_URL + "4",
                    POPULAR_MOVIES_URL + "3",
                    POPULAR_MOVIES_URL + "2",
                    POPULAR_MOVIES_URL + "1"
                ]
                const responses = await Promise.all(urls.map((url)=>fetch(url)))
                const data = await Promise.all(responses.map(res => res.json()))
                setMovies([...data[0].results, ...data[1].results, ...data[2].results,...data[3].results] || [])
            } catch (err){
                setError(err.message)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const data = await fetchMovies(`${MOVIE_SEARCH_URL}?api_key=${API_KEY}&certification_country=DE&certification.lte=FSK 16&query=${searchQuery}`)
                if(data.total_pages > 1){
                    const newData = await fetchMovies(`${MOVIE_SEARCH_URL}?api_key=${API_KEY}&certification_country=DE&certification.lte=FSK 16&page=2&query=${searchQuery}`)
                    setMovies([...data.results , ...newData.results] || [])
                } else {
                    setMovies(data.results || []);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 500); 

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            <div className="flex flex-col items-center md:mt-24 space-y-6">
                <div className="relative w-full max-w-md">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Buscar título de película o serie..."
                        className="w-full py-2 pl-10 pr-4 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                <button 
                    className="flex items-center py-3 px-10 text-[15px] font-medium bg-angled-blue-gradient rounded-lg shadow-md text-white transition duration-75 ease-in-out hover:shadow-lg hover:scale-110"
                    onClick={() => handleSearch(query)}
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2 text-[17px] font-bold" />
                    BÚSQUEDA
                </button>
            </div>

            {loading && <p className="text-center mt-4">Cargando...</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10 mt-10 p-10'>
                {movies.length > 0 ? (
                    movies.map((movie, i) => movie.poster_path && (
                        <MovieCard key={i} movie={movie} />
                    ))
                ) : (
                    <p className="text-center mt-4">No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
}
