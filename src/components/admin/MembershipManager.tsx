import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Eye, Search, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
interface MembershipRegistration {
  id: string;
  name: string;
  email: string;
  course: string;
  registration_number: string;
  phone_number: string;
  year_of_study: string | null;
  reason_for_joining: string | null;
  created_at: string;
}

interface EventInterest {
  id: string;
  member_id: string;
  event_id: string;
  created_at: string;
  events: {
    title: string;
    event_date: string;
  };
  membership_registrations: {
    name: string;
    email: string;
  };
}
const MembershipManager = () => {
  const [registrations, setRegistrations] = useState<MembershipRegistration[]>([]);
  const [eventInterests, setEventInterests] = useState<EventInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState<MembershipRegistration | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'members' | 'interests'>('members');
  const { toast } = useToast();
  useEffect(() => {
    fetchRegistrations();
    fetchEventInterests();
  }, []);
  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("membership_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching membership registrations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch membership registrations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEventInterests = async () => {
    try {
      const { data, error } = await supabase
        .from("event_interests")
        .select(`
          *,
          events (title, event_date),
          membership_registrations (name, email)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setEventInterests(data || []);
    } catch (error) {
      console.error("Error fetching event interests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch event interests",
        variant: "destructive"
      });
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this membership registration?")) {
      return;
    }
    try {
      const {
        error
      } = await supabase.from("membership_registrations").delete().eq("id", id);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Membership registration deleted successfully"
      });
      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting membership registration:", error);
      toast({
        title: "Error",
        description: "Failed to delete membership registration",
        variant: "destructive"
      });
    }
  };
  const handleView = (registration: MembershipRegistration) => {
    setSelectedRegistration(registration);
    setViewDialogOpen(true);
  };
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Course", "Registration Number", "Phone Number", "Year of Study", "Reason for Joining", "Date Applied"];
    const csvData = registrations.map(reg => [reg.name, reg.email, reg.course, reg.registration_number, reg.phone_number, reg.year_of_study || "", reg.reason_for_joining || "", new Date(reg.created_at).toLocaleDateString()]);
    const csvContent = [headers, ...csvData].map(row => row.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "membership_registrations.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const filteredRegistrations = registrations.filter(registration => 
    registration.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    registration.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    registration.course.toLowerCase().includes(searchTerm.toLowerCase()) || 
    registration.registration_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEventInterests = eventInterests.filter(interest =>
    interest.membership_registrations.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interest.membership_registrations.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interest.events.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>;
  }
  return <div className="space-y-6">
      {/* Header with tabs and controls */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 border-b">
          <Button 
            variant={activeTab === 'members' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('members')}
            className="rounded-b-none"
          >
            Members ({registrations.length})
          </Button>
          <Button 
            variant={activeTab === 'interests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('interests')}
            className="rounded-b-none"
          >
            Event Interests ({eventInterests.length})
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${activeTab === 'members' ? 'members' : 'interests'}...`} 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full sm:w-80" 
            />
          </div>
          {activeTab === 'members' && (
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Members Table */}
      {activeTab === 'members' && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Reg. Number</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No membership registrations found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRegistrations.map(registration => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.course}</TableCell>
                    <TableCell>{registration.registration_number}</TableCell>
                    <TableCell>
                      {registration.year_of_study ? (
                        <Badge variant="secondary">{registration.year_of_study}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(registration.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(registration)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Event Interests Table */}
      {activeTab === 'interests' && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Member Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Interest Shown</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEventInterests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No event interests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEventInterests.map(interest => (
                  <TableRow key={interest.id}>
                    <TableCell className="font-medium">
                      {interest.membership_registrations.name}
                    </TableCell>
                    <TableCell>{interest.membership_registrations.email}</TableCell>
                    <TableCell>{interest.events.title}</TableCell>
                    <TableCell>
                      {new Date(interest.events.event_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(interest.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Registration Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Membership Registration Details</DialogTitle>
          </DialogHeader>
          {selectedRegistration && <Card className="border-0 shadow-none">
              <CardContent className="space-y-4 p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Name:</strong>
                    <p>{selectedRegistration.name}</p>
                  </div>
                  <div>
                    <strong>Email:</strong>
                    <p>{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <strong>Course:</strong>
                    <p>{selectedRegistration.course}</p>
                  </div>
                  <div>
                    <strong>Registration Number:</strong>
                    <p>{selectedRegistration.registration_number}</p>
                  </div>
                  <div>
                    <strong>Phone Number:</strong>
                    <p>{selectedRegistration.phone_number}</p>
                  </div>
                  <div>
                    <strong>Year of Study:</strong>
                    <p>{selectedRegistration.year_of_study || "Not specified"}</p>
                  </div>
                  <div>
                    <strong>Date Applied:</strong>
                    <p>{new Date(selectedRegistration.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                {selectedRegistration.reason_for_joining && <div>
                    <strong>Reason for Joining:</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedRegistration.reason_for_joining}
                    </p>
                  </div>}
              </CardContent>
            </Card>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default MembershipManager;