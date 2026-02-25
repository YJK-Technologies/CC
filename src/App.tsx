
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Additional protection against developer tools
    const devtools = {
      open: true,
      orientation: null
    };

    // Detect if developer tools are open
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%cDeveloper tools detected!', 'color: red; font-size: 30px;');
        }
      } else {
        devtools.open = true;
      }
    }, 500);

    // Disable drag and drop
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
    
    // Disable image saving
    document.addEventListener('dragstart', (e) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
