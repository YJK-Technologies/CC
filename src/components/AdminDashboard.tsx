
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import { BASE_URL } from "./global";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  start_date?: string;
  completion_date?: string;
  completion_percentage: number;
  project_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  image_5?: string | null;
}

interface Customer {
  id: string;
  name: string;
  logo?: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = ({ isOpen, onClose, onLogout }: AdminDashboardProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      if (activeTab === "customers") {
        fetchCustomers();
      }
    }
  }, [isOpen, activeTab]);

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      console.log("Fetching projects from Node API...");

      const response = await fetch(`${BASE_URL}/getAllProjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        console.log("Successfully fetched projects:", data.length);
        setProjects(data);
        setConnectionStatus("connected");
      } else {
        console.warn("No data found from server");
        setProjects([]);
        setConnectionStatus("connected");
      }

    } catch (error) {
      console.error("Error fetching projects:", error);
      setConnectionStatus("disconnected");

      let errorMessage = "Failed to fetch projects";

      if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }

      toast({
        title: "Database Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setIsLoading(true);

    try {
      console.log("Fetching customers from Node API...");

      const response = await fetch(`${BASE_URL}/City_Customers_SelectAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        console.log("Successfully fetched customers:", data.length);
        setCustomers(data);
        setConnectionStatus("connected");
      } else {
        console.warn("No customers found");
        setCustomers([]);
        setConnectionStatus("connected");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setConnectionStatus("disconnected");

      let errorMessage = "Failed to fetch customers";
      if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }

      toast({
        title: "Database Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSave = () => {
    fetchProjects();
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleCustomerSave = () => {
    fetchCustomers();
    setShowCustomerForm(false);
    setEditingCustomer(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${BASE_URL}/deleteProject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
          company_code: sessionStorage.getItem("Company_code") || "CC",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete project");

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`${BASE_URL}/City_Customers_Delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: customerId,
          Company_code: sessionStorage.getItem("Company_code") || "CC",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete customer");

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });

      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

  const ongoingProjects = projects.filter(p => p.status === 'ongoing');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "customers") {
      fetchCustomers();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl flex items-center gap-2">
                Admin Dashboard
                {connectionStatus === 'disconnected' && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {connectionStatus === 'connected' && (
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                )}
              </DialogTitle>
              <div className="flex gap-2">
                <Button
                  onClick={activeTab === "customers" ? fetchCustomers : fetchProjects}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                {activeTab === "customers" ? (
                  <Button
                    onClick={() => setShowCustomerForm(true)}
                    className="flex items-center gap-2"
                    disabled={connectionStatus === 'disconnected'}
                  >
                    <Plus className="h-4 w-4" />
                    Add Customer
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowProjectForm(true)}
                    className="flex items-center gap-2"
                    disabled={connectionStatus === 'disconnected'}
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </DialogHeader>

          {connectionStatus === 'disconnected' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold">Database Connection Error</h3>
              </div>
              <p className="text-red-700 mt-1">
                Unable to connect to the database. Please check your connection and try again.
              </p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ongoing">
                Ongoing Projects ({ongoingProjects.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed Projects ({completedProjects.length})
              </TabsTrigger>
              <TabsTrigger value="customers">
                Customers ({customers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing" className="mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                  Loading projects...
                </div>
              ) : (
                <ProjectsList
                  projects={ongoingProjects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  type="ongoing"
                />
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                  Loading projects...
                </div>
              ) : (
                <ProjectsList
                  projects={completedProjects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  type="completed"
                />
              )}
            </TabsContent>

            <TabsContent value="customers" className="mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                  Loading customers...
                </div>
              ) : (
                <CustomersList
                  customers={customers}
                  onEdit={handleEditCustomer}
                  onDelete={handleDeleteCustomer}
                />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => {
          setShowProjectForm(false);
          setEditingProject(null);
        }}
        onSave={handleProjectSave}
        editingProject={editingProject}
      />

      <CustomerForm
        isOpen={showCustomerForm}
        onClose={() => {
          setShowCustomerForm(false);
          setEditingCustomer(null);
        }}
        onSave={handleCustomerSave}
        editingCustomer={editingCustomer}
      />
    </>
  );
};

export default AdminDashboard;
