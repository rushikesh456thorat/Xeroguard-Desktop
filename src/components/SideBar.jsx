import {useState} from "react";
import {
  FaTimes,
  FaHome,
  FaCog,
  FaUser,
  FaQrcode ,
  FaBars,
} from "react-icons/fa";


const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <aside
      className={`bg-white shadow-md p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className={`flex justify-between items-center ${isSidebarOpen ? '':"justify-center"}`}>
        <h1
          className={`text-xl font-bold text-gray-800 transition-all ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          XeroxGuard
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`text-gray-600 text-lg `}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="mt-6">
        {[
          { icon: <FaHome />, label: "Home", href: "/" },
          { icon: <FaCog />, label: "Settings", href:"/settings" },
          { icon: <FaUser />, label: "Profile", href:"/profile" },
          { icon: <FaQrcode />, label: "Show QrCode", href:"/qr" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg text-gray-700 hover:bg-gray-200 ${isSidebarOpen ? "p-3" : "mb-4 w-8 h-8 justify-center"}`}
          >
            {item.icon}
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
