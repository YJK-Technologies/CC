
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminDashboard from "./AdminDashboard";
import { BASE_URL } from "./global";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogin = ({ isOpen, onClose }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/loginAdmin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        company_code: "CC", 
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: `Welcome ${data.admin.email}`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: data.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }

  setIsLoading(false);
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    onClose();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  if (isAuthenticated) {
    return <AdminDashboard isOpen={isOpen} onClose={onClose} onLogout={handleLogout} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-blue-600" />
            Admin Login
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@citycoolhvacr.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
