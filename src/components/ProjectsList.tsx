import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, MapPin, Calendar, Building, ImageIcon, Eye } from "lucide-react";
import { useState } from "react";

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

interface ProjectsListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  type: "ongoing" | "completed";
}

const ProjectsList = ({ projects, onEdit, onDelete, type }: ProjectsListProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Commercial': 'bg-blue-100 text-blue-800',
      'Hospitality': 'bg-purple-100 text-purple-800',
      'Retail': 'bg-green-100 text-green-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'Residential': 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const bufferToBase64 = (buffer: any) => {
    if (!buffer || !buffer.data) return null;
    const base64String = btoa(
      new Uint8Array(buffer.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:image/png;base64,${base64String}`;
  };

  const getProjectImages = (project: Project) => {
    const images = [
      project.image_1,
      project.image_2,
      project.image_3,
      project.image_4,
      project.image_5,
    ];

    return images
      .map((img) => (img ? bufferToBase64(img) : null))
      .filter(Boolean) as string[];
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {type} projects found.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const projectImages = getProjectImages(project);

          return (
            <Card key={project.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(project.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {projectImages.length > 0 && (
                  <div className="relative">
                    <img
                      src={projectImages[0]}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {projectImages.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {projectImages.length}
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-700 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getProjectTypeColor(project.project_type)}>
                    <Building className="h-3 w-3 mr-1" />
                    {project.project_type}
                  </Badge>
                </div>

                {type === "ongoing" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Started: {project.start_date || 'Not specified'}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.completion_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.completion_percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {type === "completed" && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Calendar className="h-4 w-4" />
                    Completed: {project.completion_date || 'Not specified'}
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{project.title}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Project Images */}
                      {projectImages.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">Project Images</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projectImages.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`${project.title} - Image ${index + 1}`}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">Location:</span>
                          <span>{project.location}</span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">Description</h3>
                          <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">Project Type:</span>
                          <Badge className={getProjectTypeColor(project.project_type)}>
                            {project.project_type}
                          </Badge>
                        </div>

                        {type === "ongoing" && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-gray-500" />
                              <span className="font-medium">Start Date:</span>
                              <span>{project.start_date || 'Not specified'}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Progress:</span>
                                <span className="font-semibold">{project.completion_percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${project.completion_percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {type === "completed" && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-gray-500" />
                              <span className="font-medium">Start Date:</span>
                              <span>{project.start_date || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                              <Calendar className="h-5 w-5" />
                              <span className="font-medium">Completion Date:</span>
                              <span>{project.completion_date || 'Not specified'}</span>
                            </div>
                          </div>
                        )}

                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
                          <p>Last Updated: {new Date(project.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ProjectsList;
