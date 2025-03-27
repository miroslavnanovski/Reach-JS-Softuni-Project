// components/FavoritesCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

export default function FavoritesCarousel({ favorites }) {
    const [activeCaption, setActiveCaption] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const selectedPhoto = selectedIndex !== null ? favorites[selectedIndex] : null;


    useEffect(() => {
        const handleKeyDown = (e) => {
          if (selectedIndex === null) return;
      
          if (e.key === 'ArrowRight' && selectedIndex < favorites.length - 1) {
            setSelectedIndex((prev) => prev + 1);
          } else if (e.key === 'ArrowLeft' && selectedIndex > 0) {
            setSelectedIndex((prev) => prev - 1);
          } else if (e.key === 'Escape') {
            setSelectedIndex(null);
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [selectedIndex, favorites.length]);


    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Favorite Photos</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                onSlideChange={(swiper) => {
                    // Swiper slides loop, so use `realIndex` for correct indexing
                    setActiveCaption(swiper.realIndex);
                }}
                className="rounded-2xl shadow-md"
            >
                {favorites.map((photo, index) => (
                    <SwiperSlide key={photo._id || index}>
                        <div className="w-full aspect-video relative bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src={photo.imageUrl}
                                alt={photo.caption || `Favorite ${index + 1}`}
                                className="w-full h-full object-contain cursor-pointer"
                                onClick={() => setSelectedIndex(index)}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center animate-fade"
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedPhoto.imageUrl}
                            alt={selectedPhoto.caption}
                            className="max-w-full max-h-[90vh] object-contain rounded-xl transition-opacity duration-300"
                        />

                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
                            onClick={() => setSelectedIndex(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}





            <div className="text-center mt-6 text-gray-700 text-lg">
                {favorites[activeCaption]?.caption || `Favorite ${activeCaption + 1}`}
            </div>
        </div>
    );
}
