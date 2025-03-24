import { Link } from "react-router-dom";

export default function NoContent(){
    return (
        <>
        <div className="border-2 border-gray-300 p-6 rounded-lg text-center max-w-md mx-auto">
        <p className="text-lg text-gray-600">
          You don’t have any content yet 😔
        </p>
        <p className="mt-2 text-gray-500">
          It's ok, we know it's probably hard to choose what to upload from all
          your amazing photos. You can come back and upload at any time.
        </p>
        <p className="mt-2 text-gray-500">
          In the meantime, how about some inspiration from the main gallery!
        </p>
        <Link to="/gallery" 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Go explore!
        </Link>
      </div>
      </>
    )
}