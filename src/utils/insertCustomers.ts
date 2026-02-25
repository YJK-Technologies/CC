
import { supabase } from "@/integrations/supabase/client";

const existingCustomers = [
  { name: "Bahrain National Bank", logo: null },
  { name: "Gulf Hotel", logo: null },
  { name: "Seef Mall", logo: null },
  { name: "Bahrain Airport", logo: null },
  { name: "Al Areen Resort", logo: null },
  { name: "Ramee Grand Hotel", logo: null },
  { name: "City Centre Bahrain", logo: null },
  { name: "Four Seasons Hotel", logo: null },
  { name: "Diplomat Radisson", logo: null },
  { name: "Bahrain Financial Harbor", logo: null },
  { name: "Royal Hospital", logo: null },
  { name: "University of Bahrain", logo: null }
];

export const insertExistingCustomers = async () => {
  try {
    console.log('Inserting existing customers into database...');
    
    const { data, error } = await supabase
      .from('customers')
      .insert(existingCustomers);

    if (error) {
      console.error('Error inserting customers:', error);
      throw error;
    }

    console.log('Successfully inserted customers:', data);
    return data;
  } catch (error) {
    console.error('Failed to insert customers:', error);
    throw error;
  }
};
