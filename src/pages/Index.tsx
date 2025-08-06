import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { Stethoscope, Users, Pill, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "For Doctors",
      description: "Streamline your practice with digital prescriptions and patient management.",
      iconColor: "text-medical-blue"
    },
    {
      icon: Users,
      title: "For Patients",
      description: "Access your prescriptions and medical history anytime, anywhere.",
      iconColor: "text-medical-green"
    },
    {
      icon: Pill,
      title: "For Pharmacists",
      description: "Efficiently process prescriptions and manage inventory.",
      iconColor: "text-medical-purple"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Your data is protected with enterprise-grade security.",
      iconColor: "text-medical-red"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Modern Healthcare{" "}
            <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your medical practice with our secure digital prescription platform. Connect
            with patients, manage prescriptions, and improve healthcare delivery.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/register" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes e-prescriptions simple and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Doctor Login</h3>
              <p className="text-muted-foreground text-sm">Doctor logs in and creates an e-prescription</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure Storage</h3>
              <p className="text-muted-foreground text-sm">Prescription details are encrypted and stored in database</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">QR & OTP Generation</h3>
              <p className="text-muted-foreground text-sm">A QR code & OTP are generated for verification</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-foreground mb-2">Pharmacist Verification</h3>
              <p className="text-muted-foreground text-sm">Pharmacist scans QR code or enters OTP to retrieve prescription</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                5
              </div>
              <h3 className="font-semibold text-foreground mb-2">Patient Confirmation</h3>
              <p className="text-muted-foreground text-sm">Patient receives confirmation and reminders for medication</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Modernize Your Healthcare Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare professionals already using Medify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
