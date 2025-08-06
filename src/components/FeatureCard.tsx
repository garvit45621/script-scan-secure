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
    <Card className="p-6 h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="space-y-4">
          <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};