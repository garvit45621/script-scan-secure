import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, iconColor = "text-primary" }: FeatureCardProps) => {
  return (
    <Card className="p-8 h-full card-gradient shadow-elegant hover:shadow-glow transition-smooth group hover:scale-105 border-0">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-smooth shadow-sm`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth">{title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};