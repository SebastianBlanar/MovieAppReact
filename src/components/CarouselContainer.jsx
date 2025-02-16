import { useEffect, useState, useContext } from "react";
import { CarouselComponent } from "./CarouselComponent";
import { WishlistContext } from "../contexts/WishListContext";

export function CarouselContainer({ section }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const MOVIE_GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?" + "api_key=" + API_KEY;
    const SERIES_GENRES_URL = "https://api.themoviedb.org/3/genre/tv/list?" + "api_key=" + API_KEY;
    const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`;
    const SERIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=`;

    const { wishlist } = useContext(WishlistContext);
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [contentMatrix, setContentMatrix] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
              if (section === "home") {
                    const [moviesResponse, seriesResponse] = await Promise.all([
                        fetch(MOVIE_GENRES_URL),
                        fetch(SERIES_GENRES_URL),
                    ]);
                    const moviesData = await moviesResponse.json();
                    const seriesData = await seriesResponse.json();
                    const filteredDataArray = moviesData.genres.filter(movieGenre =>
                        !seriesData.genres.some(seriesGenre => seriesGenre.id === movieGenre.id)
                    );
                    setGenres([...filteredDataArray, ...seriesData.genres]);
                } else if (section === "movies") {
                    const response = await fetch(MOVIE_GENRES_URL);
                    const data = await response.json();
                    setGenres(data.genres);
                } else if (section === "series") {
                    const response = await fetch(SERIES_GENRES_URL);
                    const data = await response.json();
                    setGenres(data.genres);
                }
            } catch (err) {
                console.error("Error fetching genres:", err);
            }
        };

        fetchGenres();
    }, [section, MOVIE_GENRES_URL, SERIES_GENRES_URL,wishlist]);

    useEffect(() => {
        console.log(genres)
        if (genres.length === 0) return;

        const uniqueContentIds = new Set();
        const uniqueContent = new Set();
        const page1 = 1 
        // Math.floor(Math.random() * 3) + 1;
        //1
        const page2 = 2
        //Math.floor(Math.random() * 3) + 2;
        const pages = [page1, page2];


        const fetchContentByGenre = async (genres, urls) => {
            const fetchPromises = genres.map(genre => {
                const urlPromises = urls.flatMap((url) =>
                    pages.map(async (page) => {
                        const path = `${url}${genre.id}&page=${page}`;

                        const res = await fetch(path);
                        const data = await res.json();

                        data.results.forEach(content => {
                            const prevSize = uniqueContentIds.size;
                            uniqueContentIds.add(content.id);
                            if (uniqueContentIds.size > prevSize) {
                                const isMovie = !!content.release_date;
                                uniqueContent.add({ ...content, isMovie });
                            }
                        });
                    })
                );

                return Promise.all(urlPromises);
            });

            await Promise.all(fetchPromises);
            setContent(Array.from(uniqueContent).sort(() => Math.random() - 0.5));
        };

        let urls;
        if (section == "home") urls = [MOVIES_BY_GENRE_URL, SERIES_BY_GENRE_URL]
        else if (section == "movies") urls = [MOVIES_BY_GENRE_URL]
        else if (section == "series") urls = [SERIES_BY_GENRE_URL]

        fetchContentByGenre(genres, urls)
            .catch(e => console.error(e));
    }, [genres, MOVIES_BY_GENRE_URL, SERIES_BY_GENRE_URL, section]);


    useEffect(() => {
        if (content.length > 0) {
            const sortedcontent = sortContentByGenre();
            setContentMatrix(sortedcontent);
        }
    }, [content]);

    function sortContentByGenre() {
        const contentMatrix = [];
        for (let i = 0; i < genres.length; i++) {
            contentMatrix[i] = [];
        }

        outerloop: for (let j = 0; j < content.length; j++) {
            for (let i = 0; i < genres.length; i++) {
                if (section == "home" ? contentMatrix[i].length === 30 : contentMatrix[i].length === 20) {
                    continue;
                }
                for (let categoryId of content[j].genre_ids) {
                    if (categoryId === genres[i].id) {
                        contentMatrix[i].push(content[j]);
                        continue outerloop;
                    }
                }
            }
        }
        return contentMatrix;
    }
    const filteredWishlist = section === "movies"
    ? wishlist.filter(c => c.original_title)
    : section === "series"
    ? wishlist.filter(c => c.original_name)
    : wishlist;


    return (
        <section className="p-12">
            {wishlist.length != 0 && <CarouselComponent genreName={"Wishlist"} content={filteredWishlist} />}
            {content.length != 0 && contentMatrix.map((contentArray, i) => (
                genres[i] && genres[i].name ? (
                    <CarouselComponent
                        key={genres[i].id}
                        genreName={genres[i].name}
                        content={contentArray}
                    />
                ) : null
            ))}
        </section>
    );
}
