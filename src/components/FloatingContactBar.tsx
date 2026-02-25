import { Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FloatingContactBar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  // ✅ Show only on home page
  const isHomePage = location.pathname === "/";

  // ✅ Hide when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ❌ Don't render if not home or not visible
  if (!isHomePage || !visible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 sm:justify-between items-center">

        {/* Phone */}
        <a
          href="tel:+97339412344"
          className="flex items-center gap-2 bg-white shadow-xl rounded-full px-5 py-3 border border-gray-200 hover:scale-105 transition"
        >
          <Phone className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-800">Phone</span>
        </a>

        {/* Email */}
        <a
          href="mailto:mailus@citycoolhvacr.com"
          className="flex items-center gap-2 bg-white shadow-xl rounded-full px-5 py-3 border border-gray-200 hover:scale-105 transition"
        >
          <Mail className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-gray-800">Email</span>
        </a>

        {/* Address */}
        <a
          href="https://maps.google.com/?q=Tashan,Bahrain"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white shadow-xl rounded-full px-5 py-3 border border-gray-200 hover:scale-105 transition"
        >
          <MapPin className="w-5 h-5 text-red-600" />
          <span className="text-sm font-semibold text-gray-800">Address</span>
        </a>

      </div>
    </div>
  );
};

export default FloatingContactBar;
