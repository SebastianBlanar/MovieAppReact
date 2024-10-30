import { Link } from "react-router-dom"


export function MovieCard({ movie }) {
    const IMG_URL = "https://image.tmdb.org/t/p/w500";
    return(
        <Link to={`/movie/${movie.id}`}>
            <div className="relative group overflow-visible">
                <img
                    src={IMG_URL + movie.poster_path}
                    alt={movie.title}
                    className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105 group-hover:border-4 group-hover:border-white"
                />
            </div>
        </Link>

    )
}