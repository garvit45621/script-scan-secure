import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Medify</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};