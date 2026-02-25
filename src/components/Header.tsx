
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdminLogin from "./AdminLogin";

const Header = () => {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/743f99cc-9b9f-44c2-99e3-2d863fcbeb4c.png" 
                  alt="Company Logo" 
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('company_name')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('company_subtitle')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
  {/* Navigation Links */}
  <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-700">
    <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
    <a href="#services" className="hover:text-blue-600 transition-colors">Our Services</a>
    <a href="#projects" className="hover:text-blue-600 transition-colors">Our Projects</a>
    <a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a>
  </nav>

  {/* Admin Login Button - Icon Only */}
  <Button
    variant="outline"
    size="icon"
    onClick={() => setShowAdminLogin(true)}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300 w-10 h-10"
    title="Admin Login"
  >
    <Shield className="h-4 w-4" />
  </Button>

  {/* Language Selector - Icon with Dropdown */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300 w-10 h-10"
        title="Select Language"
      >
        <Globe className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-white border border-gray-200">
      {languages.map((lang) => (
        <DropdownMenuItem 
          key={lang.code} 
          onClick={() => setLanguage(lang.code)}
          className="cursor-pointer flex items-center gap-2"
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>
          </div>
        </div>
      </header>

      {/* Admin Login Modal */}
      <AdminLogin 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
      />
    </>
  );
};

export default Header;
