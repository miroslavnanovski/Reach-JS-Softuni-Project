import useRecentPhotos from "../../hooks/useRecentPhotos";


export default function RecentUploads() {
  const recentPhotos = useRecentPhotos(5);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Uploads</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentPhotos.map((photo) => (
          <div key={photo._id} className="rounded overflow-hidden shadow">
            <img
              src={photo.imageUrl}
              alt={photo.title || "User photo"}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
