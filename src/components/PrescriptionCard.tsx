import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QRCode from "qrcode";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User, Pill, Clock, FileText, QrCode, Key } from "lucide-react";

export interface Prescription {
  id: string;
  patientName: string;
  patientEmail: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  doctorName: string;
  createdAt: string;
  status: "active" | "dispensed" | "expired";
  qrCode: string;
  otp: string;
}

interface PrescriptionCardProps {
  prescription: Prescription;
}

export const PrescriptionCard = ({ prescription }: PrescriptionCardProps) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(prescription.qrCode);
      setQrDataUrl(url);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-medical-green text-white";
      case "dispensed": return "bg-primary text-white";
      case "expired": return "bg-destructive text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              {prescription.patientName}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              {formatDate(prescription.createdAt)}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(prescription.status)}>
            {prescription.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-medical-blue" />
            <span className="font-medium">{prescription.medication}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong>Dosage:</strong> {prescription.dosage}
          </p>
          {prescription.frequency && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {prescription.frequency.replace("-", " ")}
            </p>
          )}
          {prescription.duration && (
            <p className="text-sm text-muted-foreground">
              <strong>Duration:</strong> {prescription.duration}
            </p>
          )}
        </div>

        {prescription.instructions && (
          <div className="border-t pt-3">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
              {prescription.instructions}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <QrCode className="h-4 w-4 mr-1" />
                QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Prescription QR Code</DialogTitle>
                <DialogDescription>
                  Pharmacist can scan this QR code to access the prescription
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="QR Code" className="w-48 h-48" />
                  ) : (
                    <div className="w-48 h-48 bg-muted flex items-center justify-center">
                      <Button onClick={generateQRCode} variant="outline" size="sm">
                        Generate QR Code
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Alternative OTP:</p>
                  <Badge variant="secondary" className="text-lg font-mono">
                    <Key className="h-4 w-4 mr-1" />
                    {prescription.otp}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};