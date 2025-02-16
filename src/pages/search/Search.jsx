import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { ContentCard } from '../../components/ContentCard';

export function Search() {
    const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
    const SERIES_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const POPULAR_SERIES_URL = "https://api.themoviedb.org/3/tv/popular" + "?api_key=" + API_KEY + "&page="
    const POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/discover/movie" + "?api_key=" + API_KEY + "&sort_by=popularity.desc&include_adult=false&vote_average.gte=7&certification_country=DE&certification.lte=FSK 16&page="

    //sin anime
    const FILTER_BY_GENRE_URL = "https://api.themoviedb.org/3/discover/tv?api_key=1f5958ade9bb88f8352b23189296f880&sort_by=popularity.desc&without_genres=16&with_genres=";
    //normal
    // const FILTER_BY_GENRE_URL = "https://api.themoviedb.org/3/discover/tv?api_key=1f5958ade9bb88f8352b23189296f880&sort_by=popularity.desc&with_genres="
    // /tv

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=` 
    const familyFriendlyUrls = [
        FILTER_BY_GENRE_URL + "10759" + "&page=1",
        FILTER_BY_GENRE_URL + "10759" + "&page=2",
        FILTER_BY_GENRE_URL + "10759" + "&page=3",
        FILTER_BY_GENRE_URL + "10759" + "&page=4",
        FILTER_BY_GENRE_URL + "10759" + "&page=5",
        FILTER_BY_GENRE_URL + "10759" + "&page=6",
        FILTER_BY_GENRE_URL + "10759" + "&page=7",
        FILTER_BY_GENRE_URL + "10759" + "&page=8",
        FILTER_BY_GENRE_URL + "10759" + "&page=9",
        FILTER_BY_GENRE_URL + "10759" + "&page=10",
        FILTER_BY_GENRE_URL + "10759" + "&page=11",
        FILTER_BY_GENRE_URL + "10759" + "&page=12"
    ]

    async function fetchContent(url) {
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
        if (!searchQuery) {
            try {
                const urls = [
                    POPULAR_SERIES_URL + "2",
                    POPULAR_MOVIES_URL + "3",
                    POPULAR_SERIES_URL + "1",
                    POPULAR_MOVIES_URL + "2"
                ]
                const responses = await Promise.all(familyFriendlyUrls.map((url) => fetch(url)))
                const data = await Promise.all(responses.map(res => res.json()))
                const movies = data.flatMap(item => item.results);
                // Solo de prueba para poder filtrar las que yo quiero, luego borrar el set series y dejar las 2 lineas comentadas
                setSeries(movies || [])
                // setMovies([...data[1].results, ...data[3].results] || [])
                // setSeries([...data[0].results, ...data[2].results] || [])
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        } else {
            try { 
              const urls = [
                  `${MOVIE_SEARCH_URL}?api_key=${API_KEY}&certification_country=DE&certification.lte=FSK 16&query=${searchQuery}&sort_by=popularity.desc&page=`,
                  `${SERIES_SEARCH_URL}?api_key=${API_KEY}&query=${searchQuery}&sort_by=popularity.desc&page=`
              ];
              
              const data = await Promise.all(urls.map(url => fetchContent(url + "1")));
          
              let movies = data[0].results || [];
              let series = data[1].results || [];
          
              if (data[0].total_pages > 1 && data[1].total_pages > 1) {
                  const newData = await Promise.all(urls.map(url => fetchContent(url + "2")));
          
                  // Unimos los resultados y ordenamos por popularidad
                  movies = [...movies, ...newData[0].results].sort((a, b) => b.popularity - a.popularity);
                  series = [...series, ...newData[1].results].sort((a, b) => b.popularity - a.popularity);
              } else {
                  // Ordenamos directamente si no hay más páginas
                  movies = movies.sort((a, b) => b.popularity - a.popularity);
                  series = series.sort((a, b) => b.popularity - a.popularity);
              }
          
              setMovies(movies);
              setSeries(series);
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10 mt-10 p-10">
                {series.length > 0 && series.map((serie, i) => serie.poster_path && (
                    <ContentCard key={`series-${i}`} content={serie} type="series" />
                ))}
                {movies.length > 0 && movies.map((movie, i) => movie.poster_path && (
                    <ContentCard key={`movie-${i}`} content={movie} type="movie" />
                ))}
            </div>

        </div>
    );
}
