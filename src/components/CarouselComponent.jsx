import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export function CarouselComponent({ genreName, content }) {
    const IMG_URL = "https://image.tmdb.org/t/p/w500";
    
    return (
        content.length > 0 && (
                <div className="my-8">
                    <h2 className="text-left text-white text-3xl font-bold mb-4">{genreName}</h2> 
                    <Swiper
                        spaceBetween={15} 
                        slidesPerView={6} 
                        slidesPerGroup={1}
                        pagination={{ clickable: false }}
                        loop={false}
                        grabCursor={true}
                        className="rounded-lg overflow-visible"
                        breakpoints={{
                            320: { 
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            640: { 
                                slidesPerView: 3,
                                spaceBetween: 12
                            },
                            1024: { 
                                slidesPerView: 6,
                                spaceBetween: 15
                            },
                        }}
                    >
                        {content.map((c) => (
                            c.poster_path && (
                            <SwiperSlide key={c.id} className="flex justify-center">
                                <Link to={c.original_title ? `/movie/${c.id}` : `/tv/${c.id}`}>
                                    <div className="relative group overflow-visible">
                                        <img 
                                            src={IMG_URL + c.poster_path} 
                                            alt={c.title || c.name} 
                                            className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105 group-hover:border-4 group-hover:border-white" 
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                            ) 
                        ))}
                    </Swiper>
                </div>
            )
        
    );
}
