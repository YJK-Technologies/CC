
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  logo?: string | { type: string; data: number[] } | null;
  created_at: string;
  updated_at: string;
}

interface CustomersListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const CustomersList = ({ customers, onEdit, onDelete }: CustomersListProps) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No customers found.</p>
        <p className="text-sm">Click "Add Customer" to create your first customer.</p>
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((customer) => (
        <Card key={customer.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
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
                    <div className="text-2xl">🏢</div>
                  )}
                </div>
                <span className="truncate whitespace-normal break-words">{customer.name}</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(customer)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(customer.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">
              Added: {new Date(customer.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomersList;
