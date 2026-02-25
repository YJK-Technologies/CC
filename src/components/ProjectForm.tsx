import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import { BASE_URL } from "./global";

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
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  image_5?: string | null;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingProject?: Project | null;
}

const projectTypes = [
  'Commercial',
  'Hospitality',
  'Retail',
  'Healthcare',
  'Education',
  'Residential'
];

const ProjectForm = ({ isOpen, onClose, onSave, editingProject }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    start_date: '',
    completion_date: '',
    completion_percentage: 0,
    project_type: '',
    status: 'ongoing'
  });
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const bufferToBase64 = (buffer: any) => {
      if (!buffer || !buffer.data) return null;
      const base64String = btoa(
        new Uint8Array(buffer.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      return `data:image/png;base64,${base64String}`;
    };

    if (editingProject) {
      setFormData({
        title: editingProject.title,
        location: editingProject.location,
        description: editingProject.description,
        start_date: editingProject.start_date || '',
        completion_date: editingProject.completion_date || '',
        completion_percentage: editingProject.completion_percentage,
        project_type: editingProject.project_type,
        status: editingProject.status,
      });

      setImages([
        editingProject.image_1 ? bufferToBase64(editingProject.image_1) : null,
        editingProject.image_2 ? bufferToBase64(editingProject.image_2) : null,
        editingProject.image_3 ? bufferToBase64(editingProject.image_3) : null,
      ]);
    } else {
      setFormData({
        title: '',
        location: '',
        description: '',
        start_date: '',
        completion_date: '',
        completion_percentage: 0,
        project_type: '',
        status: 'ongoing',
      });
      setImages([null, null, null]);
    }
  }, [editingProject, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Starting project save operation...");
      console.log("Form data:", formData);

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value != null ? String(value) : "");
      });

      const companyCode = sessionStorage.getItem("Company_code") || "CC";
      const user = sessionStorage.getItem("user_name") || "Admin";

      formDataToSend.append("company_code", companyCode);
      formDataToSend.append(
        editingProject ? "modified_by" : "created_by",
        user
      );

      images.forEach((img, index) => {
        if (img) {
          let blob: Blob;

          if (typeof img === "string" && img.startsWith("data:image")) {
            const byteCharacters = atob(img.split(",")[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            blob = new Blob([byteArray], { type: "image/png" });
          }

          else if (typeof img === "object" && (img as any).data) {
            const byteArray = new Uint8Array((img as any).data);
            blob = new Blob([byteArray], {
              type: (img as any).type || "image/png",
            });
          } else {
            console.warn(`Invalid image_${index + 1} format`);
            return;
          }

          formDataToSend.append(`image_${index + 1}`, blob, `image_${index + 1}.png`);
        }
      });

      let response;

      if (editingProject) {
        console.log("Updating existing project...");
        formDataToSend.append("id", editingProject.id);

        response = await fetch(`${BASE_URL}/updateProject`, {
          method: "POST",
          body: formDataToSend,
        });
      } else {
        console.log("Creating new project...");
        response = await fetch(`${BASE_URL}/insertProject`, {
          method: "POST",
          body: formDataToSend,
        });
      }

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Request failed");

      toast({
        title: "Success",
        description: editingProject
          ? "Project updated successfully"
          : "Project created successfully",
      });

      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter project location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter project description"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type *</Label>
              <Select
                value={formData.project_type}
                onValueChange={(value) => setFormData({ ...formData, project_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.status === 'ongoing' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    placeholder="e.g., March 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completion_percentage">Completion Percentage</Label>
                  <Input
                    id="completion_percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.completion_percentage}
                    onChange={(e) => setFormData({ ...formData, completion_percentage: parseInt(e.target.value) || 0 })}
                    placeholder="0-100"
                  />
                </div>
              </>
            )}

            {formData.status === 'completed' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  placeholder="e.g., January 2024"
                />
              </div>
            )}
          </div>

          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={3}
          />

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : (editingProject ? "Update Project" : "Create Project")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;