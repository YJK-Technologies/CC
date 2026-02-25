
import { Award, Users, Wrench, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: Award, label: t('years_experience'), value: "15+" },
    { icon: Users, label: t('satisfied_clients'), value: "500+" },
    { icon: Wrench, label: t('projects_completed'), value: "1000+" },
    { icon: Clock, label: t('support_247'), value: t('always') }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about_title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('about_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('why_choose_title')}
              </h3>
              <ul className="space-y-4">
                <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{t('why_choose_1')}</span>
                </li>
                <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{t('why_choose_2')}</span>
                </li>
                <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{t('why_choose_3')}</span>
                </li>
                <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{t('why_choose_4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">{t('our_mission')}</h4>
              <p className="text-blue-100 leading-relaxed">
                {t('mission_text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
