
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    company_name: "CITY COOL",
    company_subtitle: "HVACR CONTRACTING CO W.L.L.",
    hero_description: "Professional HVACR Solutions for Commercial & Residential Properties in Bahrain",
    our_services: "Our Services",
    get_quote: "Get Quote",
    
    // About Section
    about_title: "About City Cool",
    about_description: "CITY COOL HVACR CONTRACTING CO W.L.L. is a leading provider of comprehensive heating, ventilation, air conditioning, and refrigeration services in Bahrain. With years of experience and a commitment to excellence, we deliver reliable solutions for both commercial and residential clients.",
    years_experience: "Years Experience",
    satisfied_clients: "Satisfied Clients",
    projects_completed: "Projects Completed",
    support_247: "24/7 Support",
    always: "Always",
    why_choose_title: "Why Choose City Cool?",
    why_choose_1: "Licensed and certified HVACR professionals",
    why_choose_2: "24/7 emergency service availability",
    why_choose_3: "Competitive pricing and transparent quotes",
    why_choose_4: "Quality workmanship with warranty coverage",
    our_mission: "Our Mission",
    mission_text: "To provide exceptional HVACR services that ensure optimal comfort, energy efficiency, and air quality for our clients. We are committed to building long-term relationships through reliable service, technical expertise, and customer satisfaction.",
    
    // Services Section
    services_title: "Our Core Services",
    services_description: "Comprehensive HVACR solutions tailored to meet your specific needs, from residential comfort to commercial climate control systems.",
    window_split_title: "Window/Split Units",
    window_split_desc: "Professional installation, maintenance, and repair services for window and split AC units.",
    central_split_title: "Central Split/Package Units",
    central_split_desc: "Complete solutions for central air conditioning systems and package units.",
    cold_room_title: "Cold Room Units",
    cold_room_desc: "Specialized cold room and package unit services for commercial refrigeration needs.",
    duct_works_title: "Duct Works",
    duct_works_desc: "Professional ductwork design, installation, and maintenance for optimal air distribution.",
    maintenance_title: "Annual Maintenance Contracts",
    maintenance_desc: "Comprehensive maintenance packages to keep your HVACR systems running efficiently.",
    installation: "Installation",
    maintenance: "Maintenance",
    repair: "Repair",
    replacement: "Replacement",
    design: "Design",
    service: "Service",
    optimization: "Optimization",
    cold_storage: "Cold Storage",
    temperature_control: "Temperature Control",
    energy_efficiency: "Energy Efficiency",
    monitoring_247: "24/7 Monitoring",
    cleaning: "Cleaning",
    sealing: "Sealing",
    preventive_care: "Preventive Care",
    priority_service: "Priority Service",
    cost_savings: "Cost Savings",
    extended_lifespan: "Extended Lifespan",
    emergency_service_title: "Need Emergency Service?",
    emergency_service_desc: "Our expert technicians are available 24/7 for emergency HVACR repairs and maintenance.",
    contact_us_now: "Contact Us Now",
    
    // Customers Section
    customers_title: "Trusted by Leading Organizations",
    customers_description: "We proudly serve a diverse portfolio of clients across Bahrain, from hospitality and healthcare to finance and retail sectors.",
    join_family_title: "Join Our Growing Family of Satisfied Clients",
    join_family_desc: "Experience the difference of working with Bahrain's trusted HVACR professionals.",
    chat_whatsapp: "Chat on WhatsApp",
    
    // Projects Section
    projects_title: "Our Projects",
    projects_description: "Explore our portfolio of successful HVACR installations and maintenance projects across various sectors in Bahrain.",
    ongoing_projects: "Ongoing Projects",
    completed_projects: "Completed Projects",
    complete: "Complete",
    started: "Started",
    completed: "Completed",
    ready_project_title: "Ready to Start Your Project?",
    ready_project_desc: "Let's discuss your HVACR needs and create a custom solution for your property.",
    free_consultation: "Get Free Consultation",
    whatsapp_us: "WhatsApp Us",
    
    // Footer
    footer_description: "Your trusted partner for comprehensive HVACR solutions in Bahrain. We provide professional installation, maintenance, and repair services for residential and commercial properties.",
    contact_info: "Contact Info",
    emergency_service: "24/7 Emergency Service",
    licensed_contractor: "Licensed HVACR Contractor",
    serving_since: "Serving Bahrain Since 2009",
    all_rights_reserved: "All rights reserved."
  },
  ar: {
    // Hero Section
    company_name: "سيتي كول",
    company_subtitle: "شركة المقاولات للتدفئة والتهوية وتكييف الهواء والتبريد ذ.م.م.",
    hero_description: "حلول احترافية للتدفئة والتهوية وتكييف الهواء للعقارات التجارية والسكنية في البحرين",
    our_services: "خدماتنا",
    get_quote: "احصل على عرض سعر",
    
    // About Section
    about_title: "عن سيتي كول",
    about_description: "شركة سيتي كول للتدفئة والتهوية وتكييف الهواء والتبريد ذ.م.م. هي مزود رائد لخدمات التدفئة والتهوية وتكييف الهواء والتبريد الشاملة في البحرين. مع سنوات من الخبرة والالتزام بالتميز، نقدم حلولاً موثوقة للعملاء التجاريين والسكنيين.",
    years_experience: "سنوات الخبرة",
    satisfied_clients: "العملاء الراضون",
    projects_completed: "المشاريع المكتملة",
    support_247: "الدعم على مدار الساعة",
    always: "دائماً",
    why_choose_title: "لماذا تختار سيتي كول؟",
    why_choose_1: "محترفون مرخصون ومعتمدون في مجال التدفئة والتهوية وتكييف الهواء",
    why_choose_2: "خدمة طوارئ متاحة على مدار الساعة طوال أيام الأسبوع",
    why_choose_3: "أسعار تنافسية وعروض أسعار شفافة",
    why_choose_4: "جودة في العمل مع تغطية الضمان",
    our_mission: "مهمتنا",
    mission_text: "تقديم خدمات استثنائية للتدفئة والتهوية وتكييف الهواء التي تضمن الراحة المثلى وكفاءة الطاقة وجودة الهواء لعملائنا. نحن ملتزمون ببناء علاقات طويلة الأمد من خلال الخدمة الموثوقة والخبرة التقنية ورضا العملاء.",
    
    // Services Section
    services_title: "خدماتنا الأساسية",
    services_description: "حلول شاملة للتدفئة والتهوية وتكييف الهواء مصممة خصيصاً لتلبية احتياجاتك المحددة، من الراحة السكنية إلى أنظمة التحكم في المناخ التجاري.",
    window_split_title: "وحدات النوافذ/المنفصلة",
    window_split_desc: "خدمات التركيب والصيانة والإصلاح المهنية لوحدات تكييف النوافذ والمنفصلة.",
    central_split_title: "الوحدات المركزية المنفصلة/الحزم",
    central_split_desc: "حلول كاملة لأنظمة التكييف المركزي ووحدات الحزم.",
    cold_room_title: "وحدات الغرف الباردة",
    cold_room_desc: "خدمات متخصصة للغرف الباردة ووحدات الحزم لاحتياجات التبريد التجاري.",
    duct_works_title: "أعمال القنوات",
    duct_works_desc: "تصميم وتركيب وصيانة القنوات المهنية لتوزيع الهواء الأمثل.",
    maintenance_title: "عقود الصيانة السنوية",
    maintenance_desc: "حزم صيانة شاملة للحفاظ على تشغيل أنظمة التدفئة والتهوية وتكييف الهواء بكفاءة.",
    installation: "التركيب",
    maintenance: "الصيانة",
    repair: "الإصلاح",
    replacement: "الاستبدال",
    design: "التصميم",
    service: "الخدمة",
    optimization: "التحسين",
    cold_storage: "التخزين البارد",
    temperature_control: "التحكم في درجة الحرارة",
    energy_efficiency: "كفاءة الطاقة",
    monitoring_247: "المراقبة على مدار الساعة",
    cleaning: "التنظيف",
    sealing: "الختم",
    preventive_care: "الرعاية الوقائية",
    priority_service: "خدمة الأولوية",
    cost_savings: "توفير التكاليف",
    extended_lifespan: "عمر أطول",
    emergency_service_title: "تحتاج خدمة طوارئ؟",
    emergency_service_desc: "فنيونا الخبراء متاحون على مدار الساعة طوال أيام الأسبوع لإصلاحات وصيانة طوارئ التدفئة والتهوية وتكييف الهواء.",
    contact_us_now: "اتصل بنا الآن",
    
    // Customers Section
    customers_title: "موثوق به من قبل المؤسسات الرائدة",
    customers_description: "نحن فخورون بخدمة محفظة متنوعة من العملاء في جميع أنحاء البحرين، من الضيافة والرعاية الصحية إلى قطاعات التمويل والتجزئة.",
    join_family_title: "انضم إلى عائلتنا المتنامية من العملاء الراضين",
    join_family_desc: "اختبر الفرق في العمل مع محترفي التدفئة والتهوية وتكييف الهواء الموثوقين في البحرين.",
    chat_whatsapp: "دردشة على واتساب",
    
    // Projects Section
    projects_title: "مشاريعنا",
    projects_description: "استكشف محفظة مشاريعنا الناجحة لتركيبات وصيانة التدفئة والتهوية وتكييف الهواء عبر القطاعات المختلفة في البحرين.",
    ongoing_projects: "المشاريع الجارية",
    completed_projects: "المشاريع المكتملة",
    complete: "مكتمل",
    started: "بدأ",
    completed: "مكتمل",
    ready_project_title: "مستعد لبدء مشروعك؟",
    ready_project_desc: "دعنا نناقش احتياجاتك للتدفئة والتهوية وتكييف الهواء وإنشاء حل مخصص لممتلكاتك.",
    free_consultation: "احصل على استشارة مجانية",
    whatsapp_us: "راسلنا على واتساب",
    
    // Footer
    footer_description: "شريكك الموثوق للحلول الشاملة للتدفئة والتهوية وتكييف الهواء في البحرين. نقدم خدمات التركيب والصيانة والإصلاح المهنية للعقارات السكنية والتجارية.",
    contact_info: "معلومات الاتصال",
    emergency_service: "خدمة طوارئ على مدار الساعة",
    licensed_contractor: "مقاول مرخص للتدفئة والتهوية وتكييف الهواء",
    serving_since: "نخدم البحرين منذ عام 2009",
    all_rights_reserved: "جميع الحقوق محفوظة."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
