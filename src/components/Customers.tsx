
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { insertExistingCustomers } from "@/utils/insertCustomers";
import { BASE_URL } from "./global";

interface Customer {
  id: string;
  name: string;
   logo?: string | { type: string; data: number[] } | null;
  created_at: string;
  updated_at: string;
}

const Customers = () => {
  const { t } = useLanguage();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

 const fetchCustomers = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/City_Customers_SelectAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log("No customers found.");
        // Optionally handle inserting existing customers if needed
        // await insertExistingCustomers();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  } finally {
    setIsLoading(false);
  }
};


  if (isLoading) {
    return (
      <section id="customers" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading customers...</div>
          </div>
        </div>
      </section>
    );
  }

  function arrayBufferToBase64(buffer: number[] | ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer as ArrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <section id="customers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('customers_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('customers_description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {customers.map((customer) => (
            <div 
              key={customer.id} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {customer.logo ? (
                   <img
                      src={
                        typeof customer.logo === "string"
                          ? customer.logo
                          : `data:image/png;base64,${arrayBufferToBase64(customer.logo.data)}`
                      }
                      alt={`${customer.name} logo`}
                      className="w-8 h-8 object-cover rounded"
                    />
                ) : (
                  <div className="text-4xl">🏢</div>
                )}
              </div>
              <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {customer.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('join_family_title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('join_family_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:mailus@citycoolhvacr.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                {t('get_quote')}
              </a>
              <a 
                href="https://wa.me/97339412344" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                {t('chat_whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
