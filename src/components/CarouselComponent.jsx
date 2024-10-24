import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export function CarouselComponent({ genre , movies }) {
    const IMG_URL = "https://image.tmdb.org/t/p/w300"
    return (
        <>
            {movies.length > 0 ? (
                <div>
                    <h2 className='text-center text-white'>{genre.name}</h2>
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={6}
                        slidesPerGroup={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={false}
                        grabCursor={true}
                    >
                        {movies.map((m) => (
                            <SwiperSlide key={`${m.id}-${genre.id}`}>
                                <img src={IMG_URL + m.poster_path} alt={m.name} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </>
    );
    
};

