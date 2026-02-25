
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer id="contact" className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-2">{t('company_name')} HVACR</h3>
            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
              {t('footer_description')}
            </p>
            <div className="flex flex-col gap-1">
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+973 39412344</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">mailus@citycoolhvacr.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-2">{t('our_services')}</h4>
            <ul className="space-y-0.5 text-gray-300 text-sm">
              <li>{t('window_split_title')}</li>
              <li>{t('central_split_title')}</li>
              <li>{t('cold_room_title')}</li>
              <li>{t('duct_works_title')}</li>
              <li>{t('maintenance_title')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">{t('contact_info')}</h4>
            <div className="space-y-2">
              <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-gray-300 text-sm">
                    Shop 1036-G, Road 539,<br />
                    Block 405, Tashan<br />
                    Kingdom of Bahrain
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">{t('emergency_service')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-2 md:mb-0">
              © 2024 {t('company_name')} HVACR CONTRACTING CO W.L.L. {t('all_rights_reserved')}
            </p>
            <div className="text-xs text-gray-400">
              Developed by{' '}
              <a 
                href="https://www.avvaitech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Avvai Tech Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
