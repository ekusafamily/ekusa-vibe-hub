import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EventRegistrationProps {
  eventId: string;
  eventTitle: string;
}

interface RegistrationForm {
  name: string;
  course: string;
  registration_number: string;
  phone_number: string;
}

const EventRegistration = ({ eventId, eventTitle }: EventRegistrationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    course: "",
    registration_number: "",
    phone_number: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("event_registrations")
        .insert([
          {
            event_id: eventId,
            ...formData,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: `You have been registered for ${eventTitle}`,
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        course: "",
        registration_number: "",
        phone_number: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <UserPlus className="h-4 w-4 mr-2" />
          Register for Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register for {eventTitle}</DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course/Program</Label>
                <Input
                  id="course"
                  type="text"
                  placeholder="e.g., Computer Science, MBA, etc."
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration_number">Registration Number</Label>
                <Input
                  id="registration_number"
                  type="text"
                  placeholder="Your student registration number"
                  value={formData.registration_number}
                  onChange={(e) => handleInputChange("registration_number", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="Your contact number"
                  value={formData.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistration;