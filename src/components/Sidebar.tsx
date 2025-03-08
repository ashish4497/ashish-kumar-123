import { Link } from "react-router-dom";
import {
  FaStore,
  FaBoxOpen,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen  text-black p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-black">📊 Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/stores"
            className="flex items-center gap-3 p-3 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            <FaStore className="text-lg" />
            <span>Stores</span>
          </Link>
        </li>
        <li>
          <Link
            to="/skus"
            className="flex items-center gap-3 p-3 rounded-lg transition duration-300 hover:bg-green-500 hover:text-white"
          >
            <FaBoxOpen className="text-lg" />
            <span>SKUs</span>
          </Link>
        </li>
        <li>
          <Link
            to="/planning"
            className="flex items-center gap-3 p-3 rounded-lg transition duration-300 hover:bg-yellow-500 hover:text-gray-900"
          >
            <FaClipboardList className="text-lg" />
            <span>Planning</span>
          </Link>
        </li>
        <li>
          <Link
            to="/chart"
            className="flex items-center gap-3 p-3 rounded-lg transition duration-300 hover:bg-purple-500 hover:text-white"
          >
            <FaChartBar className="text-lg" />
            <span>Chart</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
