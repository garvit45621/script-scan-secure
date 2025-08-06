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
      <section className="relative py-24 px-6 hero-gradient overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-medical-blue/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-medical-green/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              Modern Healthcare{" "}
              <span className="bg-gradient-to-r from-primary to-medical-blue bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Streamline your medical practice with our secure digital prescription platform. Connect
              with patients, manage prescriptions, and improve healthcare delivery with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-12 py-6 font-semibold">
                <Link to="/register" className="flex items-center gap-3">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 font-semibold border-2">
                <Link to="/login" className="flex items-center gap-2">
                  Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-12 text-sm text-muted-foreground">
              <p>✨ No credit card required • 🔒 HIPAA compliant • 🚀 Setup in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Built for Every Healthcare{" "}
              <span className="bg-gradient-to-r from-medical-green to-medical-blue bg-clip-text text-transparent">
                Professional
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions designed to enhance your workflow and improve patient care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="stagger-animation" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-medical-purple to-medical-red bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process makes e-prescriptions simple, secure, and efficient for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { num: 1, title: "Doctor Login", desc: "Doctor logs in and creates an e-prescription", color: "bg-medical-blue" },
              { num: 2, title: "Secure Storage", desc: "Prescription details are encrypted and stored in database", color: "bg-medical-green" },
              { num: 3, title: "QR & OTP Generation", desc: "A QR code & OTP are generated for verification", color: "bg-medical-purple" },
              { num: 4, title: "Pharmacist Verification", desc: "Pharmacist scans QR code or enters OTP to retrieve prescription", color: "bg-medical-red" },
              { num: 5, title: "Patient Confirmation", desc: "Patient receives confirmation and reminders for medication", color: "bg-primary" }
            ].map((step, index) => (
              <div key={step.num} className="text-center stagger-animation group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-elegant group-hover:scale-110 transition-smooth`}>
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {index < 4 && (
                  <div className="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-transparent transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary via-medical-blue to-medical-purple text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10 fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Modernize Your{" "}
            <span className="text-white drop-shadow-lg">
              Healthcare Practice?
            </span>
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Join thousands of healthcare professionals already transforming their practice with Medify. 
            Start your digital transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-12 py-6 font-semibold">
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-12 py-6 font-semibold">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
