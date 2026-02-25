
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "./global";

interface Customer {
  id: string;
  name: string;
  logo?: string | { type: string; data: number[] } | null;
  created_at: string;
  updated_at: string;
}

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingCustomer: Customer | null;
}

const CustomerForm = ({ isOpen, onClose, onSave, editingCustomer }: CustomerFormProps) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<string | { type: string; data: number[] } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setLogo(editingCustomer.logo || null);
    } else {
      setName("");
      setLogo(null);
    }
  }, [editingCustomer]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);

    try {
      const base64String = await convertToBase64(file);
      setLogo(base64String);

      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error) {
      console.error('Error converting logo to base64:', error);
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    toast({
      title: "Success",
      description: "Logo removed successfully",
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Logo must be smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      uploadLogo(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Customer name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for sending file or base64
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("Company_code", sessionStorage.getItem("Company_code") || "CC");

      if (logo) {
        let blob: Blob;

        if (typeof logo === "string" && logo.startsWith("data:image")) {
          const byteCharacters = atob(logo.split(",")[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          blob = new Blob([byteArray], { type: "image/png" });
        } else if (typeof logo === "object" && logo.data) {
          const byteArray = new Uint8Array(logo.data);
          blob = new Blob([byteArray], { type: logo.type || "image/png" });
        } else {
          throw new Error("Invalid logo format");
        }

        formData.append("logo", blob, "logo.png");
      }

      let response;
      if (editingCustomer) {
        // UPDATE
        formData.append("id", editingCustomer.id);
        response = await fetch(`${BASE_URL}/City_Customers_Update`, {
          method: "POST",
          body: formData,
        });
      } else {
        // INSERT
        response = await fetch(`${BASE_URL}/City_Customers_Insert`, {
          method: "POST",
          body: formData,
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request failed");
      }

      toast({
        title: "Success",
        description: editingCustomer
          ? "Customer updated successfully"
          : "Customer created successfully",
      });

      onSave();
      handleClose();
    } catch (error: any) {
      console.error("Error saving customer:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save customer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setLogo(null);
    onClose();
  };

  function arrayBufferToBase64(buffer: number[] | ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer as ArrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCustomer ? "Edit Customer" : "Add New Customer"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Customer Name *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <Label>Customer Logo</Label>
            <div className="mt-2">
              {logo ? (
                <div className="relative inline-block">
                  <img
                    src={
                      typeof logo === "string"
                        ? logo
                        : `data:image/png;base64,${arrayBufferToBase64(logo.data)}`
                    }
                    alt="Customer logo"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={removeLogo}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Label
                    htmlFor="logo-upload"
                    className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                  >
                    {uploading ? (
                      <div className="animate-spin">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                    ) : (
                      <>
                        <Image className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Upload Logo</span>
                      </>
                    )}
                  </Label>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || uploading}>
              {isLoading ? "Saving..." : editingCustomer ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerForm;