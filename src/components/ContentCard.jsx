import { Link } from "react-router-dom"


export function ContentCard({ content , type }) {
    const linkUrl = type === "movie" 
        ? `/movie/${content.id}` 
        : `/tv/${content.id}`;
    const IMG_URL = "https://image.tmdb.org/t/p/w500"; 
    return(
        <Link to={linkUrl}>
            <div className="relative group overflow-visible">
                <img
                    src={IMG_URL + content.poster_path}
                    alt={content.title}
                    className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105 group-hover:border-4 group-hover:border-white"
                />
            </div>
        </Link>
    )
}