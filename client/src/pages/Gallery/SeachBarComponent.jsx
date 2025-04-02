import { useEffect, useState } from "react";
import useFetchMultiplePhotos from "../../hooks/useFetchMultiplePhotos";
import axios from "axios";
import SearchModal from "./SearchModal";
import { motion } from "framer-motion";

export default function SearchBarComponent({ onSearch }) {
  const [query, setQuery] = useState('');
  const [number, setNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = import.meta.env.VITE_API_BASE_URL;

  const photosCount = 10;

  const photos = useFetchMultiplePhotos(photosCount);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * photosCount);
    setNumber(randomNumber);
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(`${URL}/api/photos?search=${encodeURIComponent(query)}&count=10`);
      const data = await res.data;
      setResults(data);
      setShowModal(true);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${photos[number]?.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Upload your photos and explore images shared by people from all over the world.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-full shadow-md w-full max-w-2xl mx-auto overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search for free photos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 focus:outline-none text-gray-800"
            />

            <motion.button
              type="submit"
              className="px-4 py-3 text-gray-600 hover:text-black"
              whileHover={{
                scale: 1.15,
                rotate: -5,
                color: "#000", // optional, to match `hover:text-black`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              🔍
            </motion.button>
          </form>
        </div>
      </div>

      {showModal && (
        <SearchModal
          query={query}
          loading={loading}
          results={results}
          onClose={() => {
          setShowModal(false)
          setQuery('')}}
        />
      )}
    </>
  );
}