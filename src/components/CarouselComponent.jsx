import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function CarouselComponent({ genre, movies }) {
    const IMG_URL = "https://image.tmdb.org/t/p/w500";
    
    return (
        <>
            {movies.length > 0 ? (
                <div className="my-8">
                    <h2 className="text-left text-white text-3xl font-bold mb-4">{genre.name}</h2> 
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
                        {movies.map((m) => (
                            <SwiperSlide key={m.id} className="flex justify-center">
                                <div className="relative group overflow-visible">
                                    <img 
                                        src={IMG_URL + m.poster_path} 
                                        alt={m.title} 
                                        className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105 group-hover:border-4 group-hover:border-white" 
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <p className="text-center text-white">Cargando...</p>
            )}
        </>
    );
}
