import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Loader2, CheckCircle, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MembershipForm {
  name: string;
  email: string;
  course: string;
  registration_number: string;
  phone_number: string;
  year_of_study: string;
  reason_for_joining: string;
}

const MembershipRegistration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [formData, setFormData] = useState<MembershipForm>({
    name: "",
    email: "",
    course: "",
    registration_number: "",
    phone_number: "",
    year_of_study: "",
    reason_for_joining: "",
  });
  const { toast } = useToast();

  // Check for existing member cookie on component mount
  useEffect(() => {
    const memberData = localStorage.getItem('ekusa_member');
    if (memberData) {
      try {
        const parsed = JSON.parse(memberData);
        setIsMember(true);
        setMemberName(parsed.name);
      } catch (error) {
        console.error('Error parsing member data:', error);
        localStorage.removeItem('ekusa_member');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("membership_registrations")
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      // Store member data in localStorage
      const memberData = {
        id: data.id,
        name: data.name,
        email: data.email,
        registration_number: data.registration_number,
        registered_at: new Date().toISOString()
      };
      localStorage.setItem('ekusa_member', JSON.stringify(memberData));

      toast({
        title: "Welcome to EKUSA!",
        description: "Your membership application has been submitted successfully. You can now easily register for events!",
      });

      // Update state to show member status
      setIsMember(true);
      setMemberName(data.name);

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        course: "",
        registration_number: "",
        phone_number: "",
        year_of_study: "",
        reason_for_joining: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting membership application:", error);
      toast({
        title: "Application Failed",
        description: "There was an error submitting your membership application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof MembershipForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {isMember ? (
        // Show member status button for existing members
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="hidden sm:inline">Welcome, {memberName.split(' ')[0]}!</span>
          <span className="sm:hidden">Member</span>
        </Button>
      ) : (
        // Show registration dialog for non-members
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="sm:size-default">
              <UserPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Join EKUSA</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Become an EKUSA Member</DialogTitle>
            </DialogHeader>
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
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
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course/Program *</Label>
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
                      <Label htmlFor="registration_number">Registration Number *</Label>
                      <Input
                        id="registration_number"
                        type="text"
                        placeholder="Your student registration number"
                        value={formData.registration_number}
                        onChange={(e) => handleInputChange("registration_number", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone Number *</Label>
                      <Input
                        id="phone_number"
                        type="tel"
                        placeholder="Your contact number"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange("phone_number", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year_of_study">Year of Study</Label>
                      <Select value={formData.year_of_study} onValueChange={(value) => handleInputChange("year_of_study", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                          <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason_for_joining">Why do you want to join EKUSA?</Label>
                    <Textarea
                      id="reason_for_joining"
                      placeholder="Tell us why you're interested in joining our community..."
                      value={formData.reason_for_joining}
                      onChange={(e) => handleInputChange("reason_for_joining", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Membership Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MembershipRegistration;