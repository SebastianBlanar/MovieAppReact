import { useEffect, useState } from "react";
import { CarouselComponent } from "./CarouselComponent";

export function CarouselContainer( { section } ) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?" + "api_key=" + API_KEY;
    const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`;
    const SERIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=`;

    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [contentMatrix, setContentMatrix] = useState([]);

    useEffect(() => {
        fetch(GENRES_URL)
            .then(res => res.json())
            .then(data => {
                setGenres(data.genres);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        console.log(genres)
        if (genres.length === 0) return;

        const uniqueContentIds = new Set();
        const uniqueContent = new Set();
        const page1 = Math.floor(Math.random() * 3) + 1;   
        const page2 = Math.floor(Math.random() * 3) + 4;   
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
        if(section == "home") urls = [MOVIES_BY_GENRE_URL, SERIES_BY_GENRE_URL] 
        else if (section == "movies") urls = [MOVIES_BY_GENRE_URL] 
        else if (section == "series") urls = [SERIES_BY_GENRE_URL]
        
        fetchContentByGenre(genres, urls)
            .catch(e => console.error(e));
    }, [genres]);


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
                if (contentMatrix[i].length === 30) {
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

    return (
        <section className="p-12">
            {content.length != 0 && contentMatrix.map((contentArray, i) => (
                <CarouselComponent
                    key={genres[i].id}
                    genre={genres[i]}
                    content={contentArray}
                />
            ))}
        </section>
    );
}
