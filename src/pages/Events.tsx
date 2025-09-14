import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Heart, Mountain, BookOpen, Camera } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Meeting",
      description: "Join us for our monthly meeting to discuss upcoming initiatives, share updates, and plan future activities.",
      date: "2024-02-15",
      time: "2:00 PM",
      location: "Main Auditorium",
      type: "Meeting",
      attendees: 120,
      icon: Users
    },
    {
      id: 2,
      title: "Mount Kenya Hiking Adventure",
      description: "An exciting outdoor adventure to explore Mount Kenya's beautiful trails and bond with fellow students.",
      date: "2024-02-22",
      time: "6:00 AM",
      location: "Mount Kenya National Park",
      type: "Adventure",
      attendees: 45,
      icon: Mountain
    },
    {
      id: 3,
      title: "Academic Excellence Workshop",
      description: "Interactive workshop on study techniques, time management, and academic success strategies.",
      date: "2024-03-01",
      time: "10:00 AM",
      location: "Library Conference Room",
      type: "Workshop",
      attendees: 80,
      icon: BookOpen
    },
    {
      id: 4,
      title: "Community Charity Visit",
      description: "Visit to local children's home to donate supplies and spend time with the children.",
      date: "2024-03-08",
      time: "9:00 AM",
      location: "Sunshine Children's Home",
      type: "Charity",
      attendees: 35,
      icon: Heart
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Welcome Back Party 2024",
      description: "Amazing celebration to welcome students back for the new semester with music, food, and networking.",
      date: "2024-01-20",
      location: "Student Center",
      type: "Social",
      attendees: 200,
      images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop"],
      highlight: "Record attendance with students from all faculties joining the celebration!"
    },
    {
      id: 2,
      title: "Blood Donation Drive",
      description: "Successful blood donation campaign in partnership with Kenya Red Cross.",
      date: "2024-01-10",
      location: "Medical Center",
      type: "Charity",
      attendees: 150,
      images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"],
      highlight: "Collected 120 units of blood, helping save lives in our community!"
    },
    {
      id: 3,
      title: "Leadership Summit",
      description: "Intensive leadership development workshop for student leaders.",
      date: "2023-12-15",
      location: "Conference Hall",
      type: "Workshop",
      attendees: 60,
      images: ["https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop"],
      highlight: "Developed leadership skills and created actionable plans for student initiatives."
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'meeting': return 'bg-primary';
      case 'adventure': return 'bg-secondary';
      case 'workshop': return 'bg-accent text-accent-foreground';
      case 'charity': return 'bg-destructive';
      case 'social': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="bg-gradient-hero">
        <div className="container py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Activities</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Join us for exciting events, meaningful activities, and unforgettable experiences that 
            bring our student community together.
          </p>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="container">
        <Tabs defaultValue="upcoming" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Past Events</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Don't Miss <span className="bg-gradient-hero bg-clip-text text-transparent">These Events</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Mark your calendars and join us for these exciting upcoming activities!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="shadow-card hover:shadow-hover transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-primary">
                          <event.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {event.title}
                          </CardTitle>
                          <Badge className={`mt-1 ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{event.description}</CardDescription>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} expected attendees</span>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      Register Interest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="bg-gradient-hero bg-clip-text text-transparent">Recent Activities</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Take a look at some of the amazing events we've organized recently!
              </p>
            </div>

            <div className="space-y-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1">
                      <div className="aspect-video lg:aspect-square overflow-hidden">
                        <img 
                          src={event.images[0]} 
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          <Badge className={`${getEventTypeColor(event.type)} mb-4`}>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardDescription className="text-base mb-4">
                        {event.description}
                      </CardDescription>
                      
                      <div className="bg-accent-light p-4 rounded-lg">
                        <p className="text-sm font-medium text-accent-foreground">
                          <strong>Highlight:</strong> {event.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-hero">
        <div className="container py-16 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Have an Event Idea?
            </h2>
            <p className="text-xl text-white/90">
              We're always looking for creative and engaging event ideas from our community members. 
              Share your suggestions with us!
            </p>
            <Button size="lg" variant="secondary" className="shadow-hover">
              Suggest an Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;