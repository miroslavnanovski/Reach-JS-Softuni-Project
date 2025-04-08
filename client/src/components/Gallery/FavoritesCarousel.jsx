// components/FavoritesCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';


import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

export default function FavoritesCarousel({ favorites, loading }) {
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
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, favorites.length]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Favorite Photos</h2>

            {loading ? (
                <div className="text-center text-gray-500">Loading favorites...</div>
            ) : favorites.length === 0 ? (
                <div className="text-center text-gray-500">You haven't favorited any photos yet.</div>
            ) : (
                <>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        onSlideChange={(swiper) => {
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

                    <div className="text-center mt-6 text-gray-700 text-lg">
                        {favorites[activeCaption]?.caption || `Favorite ${activeCaption + 1}`}
                    </div>
                </>
            )}

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center"
                        onClick={() => setSelectedIndex(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <img
                                src={selectedPhoto.imageUrl}
                                alt={selectedPhoto.caption}
                                className="max-w-full max-h-[90vh] object-contain rounded-xl"
                            />
                            <button
                                className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
                                onClick={() => setSelectedIndex(null)}
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
