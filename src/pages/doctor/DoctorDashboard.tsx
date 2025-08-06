import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Prescription, PrescriptionCard } from "@/components/PrescriptionCard";
import { Plus, FileText, Users, Activity } from "lucide-react";

export default function DoctorDashboard() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    patientEmail: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: ""
  });

  const handleCreatePrescription = () => {
    if (!newPrescription.patientName || !newPrescription.medication || !newPrescription.dosage) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const prescription: Prescription = {
      id: Date.now().toString(),
      patientName: newPrescription.patientName,
      patientEmail: newPrescription.patientEmail,
      medication: newPrescription.medication,
      dosage: newPrescription.dosage,
      frequency: newPrescription.frequency,
      duration: newPrescription.duration,
      instructions: newPrescription.instructions,
      doctorName: localStorage.getItem("userName") || "Dr. Smith",
      createdAt: new Date().toISOString(),
      status: "active",
      qrCode: `prescription_${Date.now()}`,
      otp: Math.random().toString(36).substring(2, 8).toUpperCase()
    };

    setPrescriptions([prescription, ...prescriptions]);
    setNewPrescription({
      patientName: "",
      patientEmail: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    });
    setShowCreateForm(false);

    toast({
      title: "Prescription Created",
      description: "E-prescription has been successfully created with QR code"
    });
  };

  const stats = [
    { title: "Total Prescriptions", value: prescriptions.length, icon: FileText, color: "text-primary" },
    { title: "Active Patients", value: new Set(prescriptions.map(p => p.patientEmail)).size, icon: Users, color: "text-medical-green" },
    { title: "Today's Prescriptions", value: prescriptions.filter(p => 
      new Date(p.createdAt).toDateString() === new Date().toDateString()
    ).length, icon: Activity, color: "text-medical-purple" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your prescriptions and patients</p>
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

        {/* Create Prescription Button */}
        <div className="mb-6">
          <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Prescription
          </Button>
        </div>

        {/* Create Prescription Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Prescription</CardTitle>
              <CardDescription>Fill in the prescription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={newPrescription.patientName}
                    onChange={(e) => setNewPrescription({...newPrescription, patientName: e.target.value})}
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientEmail">Patient Email</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={newPrescription.patientEmail}
                    onChange={(e) => setNewPrescription({...newPrescription, patientEmail: e.target.value})}
                    placeholder="Enter patient email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medication">Medication *</Label>
                  <Input
                    id="medication"
                    value={newPrescription.medication}
                    onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                    placeholder="Enter medication name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input
                    id="dosage"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newPrescription.frequency} onValueChange={(value) => setNewPrescription({...newPrescription, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once-daily">Once daily</SelectItem>
                      <SelectItem value="twice-daily">Twice daily</SelectItem>
                      <SelectItem value="three-times-daily">Three times daily</SelectItem>
                      <SelectItem value="four-times-daily">Four times daily</SelectItem>
                      <SelectItem value="as-needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                    placeholder="e.g., 7 days"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                  placeholder="Any special instructions for the patient or pharmacist"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreatePrescription}>Create Prescription</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prescriptions List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Prescriptions</h2>
          {prescriptions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No prescriptions yet</h3>
                <p className="text-muted-foreground">Create your first prescription to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prescriptions.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}