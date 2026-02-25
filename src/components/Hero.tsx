
import { Phone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/Hero-BG.jpeg";

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    // Code modified by Dinesh Gokul - 09/01/2026 -- BG change 
    <section
  className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: `url(${heroBg})`
  }}
>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative container mx-auto px-4 pt-16 pb-20 flex flex-col justify-start min-h-screen">      
        {/* Modification ended here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t('company_name')}
            </h1>
            <h2 className="text-xl md:text-3xl font-light mb-4 text-blue-100">
              {t('company_subtitle')}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-200 leading-relaxed">
              {t('hero_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button 
                className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('our_services')}
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('get_quote')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base">
              <div className={`flex items-center justify-center md:justify-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-5 w-5 text-blue-300" />
                <span>+973 39412344</span>
              </div>
              <div className={`flex items-center justify-center md:justify-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-5 w-5 text-blue-300" />
                <span>mailus@citycoolhvacr.com</span>
              </div>
              <div className={`flex items-center justify-center md:justify-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-5 w-5 text-blue-300" />
                <span>Tashan, Bahrain</span>
              </div>
            </div>
          </div>
          
          {/* <div className="flex justify-center lg:justify-end">
            <img 
              src="/lovable-uploads/9f914a1f-356d-4754-b9a4-f22054cf9af7.png" 
              alt="City Cool HVACR - 24x7 AC Installation, Repair & Maintenance" 
              className="max-w-full h-auto rounded-2xl shadow-2xl"
            />
          </div> */}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
