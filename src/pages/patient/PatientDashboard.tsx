import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Bell, Calendar, Clock, Pill, FileText, User, CheckCircle, AlertCircle } from "lucide-react";

interface PatientPrescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctorName: string;
  prescribedDate: string;
  status: "active" | "completed" | "missed";
  nextDose?: string;
  instructions: string;
}

interface Reminder {
  id: string;
  medication: string;
  time: string;
  taken: boolean;
}

export default function PatientDashboard() {
  const [prescriptions] = useState<PatientPrescription[]>([
    {
      id: "1",
      medication: "Amoxicillin 500mg",
      dosage: "500mg",
      frequency: "twice-daily",
      duration: "7 days",
      doctorName: "Dr. Smith",
      prescribedDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      status: "active",
      nextDose: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      instructions: "Take with food. Complete the full course even if you feel better."
    },
    {
      id: "2",
      medication: "Ibuprofen 400mg",
      dosage: "400mg",
      frequency: "as-needed",
      duration: "As needed",
      doctorName: "Dr. Johnson",
      prescribedDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "active",
      instructions: "Take for pain relief. Do not exceed 3 doses per day."
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      medication: "Amoxicillin 500mg",
      time: "9:00 AM",
      taken: false
    },
    {
      id: "2",
      medication: "Amoxicillin 500mg",
      time: "9:00 PM",
      taken: true
    }
  ]);

  const markReminderTaken = (reminderId: string) => {
    setReminders(prev => 
      prev.map(r => 
        r.id === reminderId 
          ? { ...r, taken: true }
          : r
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-medical-green text-white";
      case "completed": return "bg-primary text-white";
      case "missed": return "bg-destructive text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const activePrescriptions = prescriptions.filter(p => p.status === "active");
  const upcomingReminders = reminders.filter(r => !r.taken);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Patient Dashboard</h1>
          <p className="text-muted-foreground">Track your medications and health</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-foreground">{activePrescriptions.length}</p>
                </div>
                <Pill className="h-8 w-8 text-medical-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reminders</p>
                  <p className="text-2xl font-bold text-foreground">{upcomingReminders.length}</p>
                </div>
                <Bell className="h-8 w-8 text-medical-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-foreground">{reminders.filter(r => r.taken).length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Dose</p>
                  <p className="text-sm font-bold text-foreground">
                    {activePrescriptions.find(p => p.nextDose) 
                      ? formatTime(activePrescriptions.find(p => p.nextDose)!.nextDose!)
                      : "None"
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-medical-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Reminders */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Today's Reminders
                </CardTitle>
                <CardDescription>Medication schedule for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reminders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No reminders for today</p>
                ) : (
                  reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${reminder.taken ? 'bg-medical-green' : 'bg-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-sm">{reminder.medication}</p>
                          <p className="text-xs text-muted-foreground">{reminder.time}</p>
                        </div>
                      </div>
                      {!reminder.taken && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markReminderTaken(reminder.id)}
                        >
                          Mark Taken
                        </Button>
                      )}
                      {reminder.taken && (
                        <CheckCircle className="h-4 w-4 text-medical-green" />
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Active Prescriptions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Active Prescriptions
                </CardTitle>
                <CardDescription>Your current medications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activePrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No active prescriptions</h3>
                    <p className="text-muted-foreground">Your prescriptions will appear here</p>
                  </div>
                ) : (
                  activePrescriptions.map((prescription) => (
                    <Card key={prescription.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Pill className="h-4 w-4 text-medical-blue" />
                                {prescription.medication}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <User className="h-3 w-3" />
                                Prescribed by {prescription.doctorName}
                              </p>
                            </div>
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground"><strong>Dosage:</strong> {prescription.dosage}</p>
                              <p className="text-muted-foreground"><strong>Frequency:</strong> {prescription.frequency.replace("-", " ")}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground"><strong>Duration:</strong> {prescription.duration}</p>
                              <p className="text-muted-foreground">
                                <strong>Prescribed:</strong> {formatDate(prescription.prescribedDate)}
                              </p>
                            </div>
                          </div>

                          {prescription.nextDose && (
                            <div className="bg-muted p-3 rounded-lg">
                              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-medical-blue" />
                                Next dose: {formatTime(prescription.nextDose)}
                              </p>
                            </div>
                          )}

                          {prescription.instructions && (
                            <div className="border-t pt-3">
                              <p className="text-sm text-muted-foreground">
                                <strong>Instructions:</strong> {prescription.instructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}