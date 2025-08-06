import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Scan, Search, CheckCircle, XCircle, Package, Users, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VerifiedPrescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  doctorName: string;
  verifiedAt: string;
  status: "verified" | "dispensed";
}

export default function PharmacistDashboard() {
  const [otpInput, setOtpInput] = useState("");
  const [verifiedPrescriptions, setVerifiedPrescriptions] = useState<VerifiedPrescription[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleOtpVerification = () => {
    if (!otpInput) {
      toast({
        title: "Error",
        description: "Please enter an OTP",
        variant: "destructive"
      });
      return;
    }

    // Mock prescription data for demo
    const mockPrescription: VerifiedPrescription = {
      id: Date.now().toString(),
      patientName: "John Doe",
      medication: "Amoxicillin 500mg",
      dosage: "Take one capsule twice daily",
      doctorName: "Dr. Smith",
      verifiedAt: new Date().toISOString(),
      status: "verified"
    };

    setVerifiedPrescriptions([mockPrescription, ...verifiedPrescriptions]);
    setOtpInput("");

    toast({
      title: "Prescription Verified",
      description: `Successfully verified prescription for ${mockPrescription.patientName}`
    });
  };

  const handleDispense = (prescriptionId: string) => {
    setVerifiedPrescriptions(prev => 
      prev.map(p => 
        p.id === prescriptionId 
          ? { ...p, status: "dispensed" as const }
          : p
      )
    );

    toast({
      title: "Medication Dispensed",
      description: "Prescription has been marked as dispensed"
    });
  };

  const startQRScanning = () => {
    setIsScanning(true);
    // Mock QR scanning - in real app, would use camera
    setTimeout(() => {
      setIsScanning(false);
      const mockPrescription: VerifiedPrescription = {
        id: Date.now().toString(),
        patientName: "Jane Smith",
        medication: "Ibuprofen 400mg",
        dosage: "Take one tablet as needed for pain",
        doctorName: "Dr. Johnson",
        verifiedAt: new Date().toISOString(),
        status: "verified"
      };
      
      setVerifiedPrescriptions([mockPrescription, ...verifiedPrescriptions]);
      
      toast({
        title: "QR Code Scanned",
        description: `Successfully verified prescription for ${mockPrescription.patientName}`
      });
    }, 2000);
  };

  const stats = [
    { 
      title: "Verified Today", 
      value: verifiedPrescriptions.filter(p => 
        new Date(p.verifiedAt).toDateString() === new Date().toDateString()
      ).length, 
      icon: CheckCircle, 
      color: "text-medical-green" 
    },
    { 
      title: "Dispensed Today", 
      value: verifiedPrescriptions.filter(p => 
        p.status === "dispensed" && 
        new Date(p.verifiedAt).toDateString() === new Date().toDateString()
      ).length, 
      icon: Package, 
      color: "text-primary" 
    },
    { 
      title: "Unique Patients", 
      value: new Set(verifiedPrescriptions.map(p => p.patientName)).size, 
      icon: Users, 
      color: "text-medical-purple" 
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pharmacist Dashboard</h1>
          <p className="text-muted-foreground">Verify and dispense prescriptions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* QR Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>Scan prescription QR codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4"></div>
                    </div>
                    <p className="text-muted-foreground">Scanning QR code...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Scan className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Click to start scanning</p>
                    <Button onClick={startQRScanning} className="w-full">
                      Start QR Scanner
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* OTP Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                OTP Verification
              </CardTitle>
              <CardDescription>Enter OTP to verify prescription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Prescription OTP</Label>
                <Input
                  id="otp"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="font-mono text-center text-lg"
                />
              </div>
              <Button onClick={handleOtpVerification} className="w-full">
                Verify Prescription
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Verified Prescriptions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Verified Prescriptions</h2>
          {verifiedPrescriptions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No prescriptions verified yet</h3>
                <p className="text-muted-foreground">Scan QR codes or enter OTPs to verify prescriptions</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {verifiedPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{prescription.patientName}</h3>
                          <Badge 
                            className={prescription.status === "dispensed" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-medical-green text-white"
                            }
                          >
                            {prescription.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          <strong>Medication:</strong> {prescription.medication}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Dosage:</strong> {prescription.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Doctor:</strong> {prescription.doctorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Verified:</strong> {formatDate(prescription.verifiedAt)}
                        </p>
                      </div>
                      <div className="ml-4">
                        {prescription.status === "verified" ? (
                          <Button 
                            onClick={() => handleDispense(prescription.id)}
                            className="gap-2"
                          >
                            <Package className="h-4 w-4" />
                            Dispense
                          </Button>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Dispensed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}