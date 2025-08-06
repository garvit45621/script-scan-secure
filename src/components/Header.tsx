import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full px-6 py-6 bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-primary to-medical-blue rounded-xl shadow-elegant group-hover:scale-110 transition-smooth">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">Medify</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="font-semibold">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="font-semibold">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};