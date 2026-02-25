
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
  ];

  return (
    <div className="fixed top-20 right-6 z-50">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
