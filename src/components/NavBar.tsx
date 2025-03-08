import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full bg-white-500 text-white shadow-md ">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold flex items-center">
          🏢 <span className="ml-2 text-black">GSynergy</span>
        </Link>
        <h2>Data Viewer App</h2>
        <button className="bg-blue-200 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          Sign In/Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
