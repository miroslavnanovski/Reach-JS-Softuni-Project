import axios from "axios";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [userCount, setUserCount] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);

  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Replace these with your actual API calls
    const fetchStats = async () => {
      try {
        const userRes = await axios.get(`${URL}/api/user/count`);
        const photoRes = await axios.get(`${URL}/api/photos/count`);

        const userData = await userRes.data;
        const photoData = await photoRes.data;

        setUserCount(userData.userCount);
        setPhotoCount(photoData.photoCount);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to our photo-sharing platform where creativity meets community.
          We aim to give everyone a place to share their favorite moments, express themselves visually,
          and connect with like-minded photographers and enthusiasts.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our goal is to empower users to tell their stories through images.
            Whether you're an amateur or a pro, we provide the tools and space
            to showcase your work, gather inspiration, and engage with a vibrant creative community.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">Meet the Team</h2>
          <p className="text-gray-600">
            We are a small but passionate group of developers, designers, and photo lovers.
            This project is built with love using modern web technologies like React, Tailwind, Node.js, and MongoDB.
          </p>

          {/* Platform Stats Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Platform Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-semibold text-indigo-600">{userCount}</p>
                <p className="text-gray-700 mt-1">Registered Users</p>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-semibold text-indigo-600">{photoCount}</p>
                <p className="text-gray-700 mt-1">Photos Uploaded</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
