import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Users, Award, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const leadership = [
    {
      name: "Sarah Mwangi",
      role: "President",
      description: "Leading EKUSA with passion and dedication to student excellence.",
      email: "sarah.president@ekusa.com",
      phone: "+254 712 345 678",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e8?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "James Kiprotich",
      role: "Vice President",
      description: "Supporting leadership and coordinating academic initiatives.",
      email: "james.vp@ekusa.com",
      phone: "+254 723 456 789",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Grace Njeri",
      role: "Secretary General",
      description: "Managing communications and keeping our community connected.",
      email: "grace.secretary@ekusa.com",
      phone: "+254 734 567 890",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Ochieng",
      role: "Treasurer",
      description: "Ensuring financial transparency and resource management.",
      email: "michael.treasurer@ekusa.com",
      phone: "+254 745 678 901",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Faith Wanjiku",
      role: "Events Coordinator",
      description: "Organizing exciting activities and memorable experiences.",
      email: "faith.events@ekusa.com",
      phone: "+254 756 789 012",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "David Mutua",
      role: "Public Relations",
      description: "Building bridges with the community and managing partnerships.",
      email: "david.pr@ekusa.com",
      phone: "+254 767 890 123",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Unity",
      description: "We believe in the power of working together as one community, supporting each other through challenges and celebrating successes together."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for academic and personal excellence, encouraging each member to reach their full potential and achieve their goals."
    },
    {
      icon: Heart,
      title: "Service",
      description: "We are committed to serving our university community and the broader society through meaningful volunteer work and social impact."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace creativity and new ideas, constantly looking for better ways to serve our members and create positive change."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="bg-gradient-hero">
        <div className="container py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About EKUSA</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Meet the passionate team behind Embu University Students Association and learn about our values, 
            mission, and the impact we're making in our community.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our <span className="bg-gradient-hero bg-clip-text text-transparent">Story</span>
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              EKUSA was founded with a simple yet powerful vision: to create a unified platform where 
              Embu University students could connect, grow, and make a meaningful impact together. 
              What started as a small group of passionate students has grown into a vibrant community 
              that spans across all faculties and years.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we continue to uphold our founding principles of unity, excellence, service, 
              and innovation, while adapting to meet the evolving needs of our diverse student body. 
              Through our various programs, events, and initiatives, we strive to enhance the 
              university experience for every student who joins our community.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-hover transition-all duration-300 group">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="bg-gradient-hero bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the dedicated individuals who are leading EKUSA and working 
            tirelessly to serve our student community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((member, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 group overflow-hidden">
              <div className="aspect-square overflow-hidden bg-gradient-primary">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{member.role}</Badge>
                  </div>
                </div>
                <CardDescription className="text-sm mt-3">
                  {member.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-gradient-hero">
        <div className="container py-16 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Want to Make a Difference?
            </h2>
            <p className="text-xl text-white/90">
              Join our leadership team or volunteer with us. We're always looking for 
              passionate students who want to contribute to our community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;