import { useState, useEffect } from "react";
import { Calendar, MapPin, CheckCircle, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BASE_URL } from "./global";

const Projects = () => {
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [showAllOngoing, setShowAllOngoing] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const companyCode = sessionStorage.getItem("Company_code") || "CC";

  const fetchOngoingProjects = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getOngoingProjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_code: companyCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ongoing projects");
      }

      const data = await response.json();
      setOngoingProjects(data);
    } catch (err) {
      console.error("Ongoing Projects Error:", err);
      setOngoingProjects([]);
    }
  };

  const fetchCompletedProjects = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getCompletedProjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_code: companyCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch completed projects");
      }

      const data = await response.json();
      setCompletedProjects(data);
    } catch (err) {
      console.error("Completed Projects Error:", err);
      setCompletedProjects([]);
    }
  };

  useEffect(() => {
    fetchOngoingProjects();
    fetchCompletedProjects();
  }, [companyCode]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Commercial": return "bg-blue-100 text-blue-800";
      case "Hospitality": return "bg-purple-100 text-purple-800";
      case "Retail": return "bg-green-100 text-green-800";
      case "Healthcare": return "bg-red-100 text-red-800";
      case "Education": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const displayedOngoingProjects = showAllOngoing ? ongoingProjects : ongoingProjects.slice(-6);
  const displayedCompletedProjects = showAllCompleted ? completedProjects : completedProjects.slice(-6);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful HVACR installations and maintenance projects 
            across various sectors in Bahrain.
          </p>
        </div>

        {/* Ongoing Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              Ongoing Projects
            </h3>
            {ongoingProjects.length > 6 && (
              <Button
                variant="outline"
                onClick={() => setShowAllOngoing(!showAllOngoing)}
              >
                {showAllOngoing ? "Show Less" : "Show All"}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedOngoingProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(project.type)}>
                      {project.type}
                    </Badge>
                    <span className="text-sm font-bold text-green-600">
                      {project.completion} Complete
                    </span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Started: {project.startDate}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: project.completion }}
                      ></div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          <Eye className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl">{project.title}</DialogTitle>
                        </DialogHeader>
                        
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
                            <span className="font-medium">Project Type:</span>
                            <Badge className={getTypeColor(project.type)}>
                              {project.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">Start Date:</span>
                            <span>{project.startDate}</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Progress:</span>
                              <span className="font-semibold">{project.completion} Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: project.completion }}
                              />
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Projects */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              Completed Projects
            </h3>
            {completedProjects.length > 6 && (
              <Button
                variant="outline"
                onClick={() => setShowAllCompleted(!showAllCompleted)}
              >
                {showAllCompleted ? "Show Less" : "Show All"}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCompletedProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(project.type)}>
                      {project.type}
                    </Badge>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Completed: {project.completedDate}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          <Eye className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl">{project.title}</DialogTitle>
                        </DialogHeader>
                        
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
                            <span className="font-medium">Project Type:</span>
                            <Badge className={getTypeColor(project.type)}>
                              {project.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-green-600">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">Completion Date:</span>
                            <span>{project.completedDate}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-xl text-blue-100 mb-6">
            Let's discuss your HVACR needs and create a custom solution for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:mailus@citycoolhvacr.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Get Free Consultation
            </a>
            <a 
              href="https://wa.me/97339412344" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
