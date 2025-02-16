import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentCard } from "../../components/ContentCard";

// Diccionario de categorías (nombre → ID)
const CATEGORY_MAP = {
  "action": 28,
  "adventure": 12,
  "fantasy": 14,
  "history": 36,
  "horror": 27,
  "music": 10402,
  "romance": 10749,
  "science-fiction": 878,
  "tv-movie": 10770,
  "thriller": 53,
  "war": 10752,
  "action-adventure": 10759,
  "animation": 16,
  "comedy": 35,
  "crime": 80,
  "documentary": 99,
  "drama": 18,
  "family": 10751,
  "kids": 10762,
  "mystery": 9648,
  "news": 10763,
  "reality": 10764,
  "sci-fi-fantasy": 10765,
  "soap": 10766,
  "talk": 10767,
  "war-politics": 10768,
  "western": 37
};

export function CategoryPage() {
  const { category } = useParams(); 
  const [content, setContent] = useState([]);

  const categoryId = CATEGORY_MAP[category];

  const type = categoryId < 10000 ? "movie" : "tv";
  const FILTER_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/${type}?api_key=1f5958ade9bb88f8352b23189296f880&sort_by=popularity.desc&without_genres=16&with_genres=`;

  useEffect(() => {
    async function searchContent() {
      let urls = [];
      for (let i = 1; i < 10; i++) {
        urls.push(`${FILTER_BY_GENRE_URL}${categoryId}&page=${i}`);
      }

      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((response) => response.json()));
        const flatArray = data.flatMap(entry => entry.results || []);
        setContent(flatArray);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }

    searchContent();
  }, [categoryId]);
  
  if (!categoryId) {
    return <h1 className="text-white text-4xl text-center mt-20">Category Not Found</h1>;
  }
  
  return (
    <>
      <h1 className="text-white text-4xl text-center mt-20">{category.toUpperCase()}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10 mt-10 p-10">
        {content.length > 0 ? (
          content.map((c, i) => c.poster_path && (
            <ContentCard key={`content-${i}`} content={c} type={type} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No results found</p>
        )}
      </div>
    </>
  );
}
