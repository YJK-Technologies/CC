
import { Wrench, Wind, Snowflake, FileText, Building, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Wrench,
      title: t('window_split_title'),
      description: t('window_split_desc'),
      features: [t('installation'), t('maintenance'), t('repair'), t('replacement')]
    },
    {
      icon: Building,
      title: t('central_split_title'),
      description: t('central_split_desc'),
      features: [t('design'), t('installation'), t('service'), t('optimization')]
    },
    {
      icon: Snowflake,
      title: t('cold_room_title'),
      description: t('cold_room_desc'),
      features: [t('cold_storage'), t('temperature_control'), t('energy_efficiency'), t('monitoring_247')]
    },
    {
      icon: Wind,
      title: t('duct_works_title'),
      description: t('duct_works_desc'),
      features: [t('design'), t('installation'), t('cleaning'), t('sealing')]
    },
    {
      icon: FileText,
      title: t('maintenance_title'),
      description: t('maintenance_desc'),
      features: [t('preventive_care'), t('priority_service'), t('cost_savings'), t('extended_lifespan')]
    },
    {
  icon: Zap,
  title: "Electrical Connectivity",
  description:
    "Reliable electrical wiring and connectivity solutions for safe HVAC operation.",
  features: [
    "Power Wiring",
    "Control Panel Setup",
    "Load Testing",
    "Safety Compliance"
  ]
}
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('services_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-gray-50 rounded-lg p-2 text-sm font-medium text-gray-700">
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">{t('emergency_service_title')}</h3>
          <p className="text-xl text-blue-100 mb-6">
            {t('emergency_service_desc')}
          </p>
          <a 
            href="https://wa.me/97339412344" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
          >
            {t('contact_us_now')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
