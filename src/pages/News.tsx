import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Megaphone, Trophy, Users, BookOpen } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "EKUSA Wins Outstanding Student Organization Award",
      excerpt: "We're thrilled to announce that EKUSA has been recognized as the Outstanding Student Organization of the Year by the University Senate.",
      content: "This prestigious award recognizes our commitment to student welfare, community service, and academic excellence. The award was presented during the annual University Awards Ceremony, acknowledging our various initiatives including the blood donation drives, academic support programs, and community outreach activities. We thank all our members for their dedication and support that made this achievement possible.",
      date: "2024-02-10",
      author: "Sarah Mwangi",
      category: "Achievement",
      featured: true,
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "New Scholarship Program Launched for EKUSA Members",
      excerpt: "Exciting news! We're launching a scholarship program to support academically excellent EKUSA members facing financial challenges.",
      content: "The EKUSA Excellence Scholarship will provide financial support to 10 outstanding members each semester. The scholarship covers tuition fees, books, and other academic expenses. Applications are now open for all active EKUSA members with a minimum GPA of 3.5. The selection process will consider academic performance, community involvement, and financial need. Application forms are available at the EKUSA office and online.",
      date: "2024-02-05",
      author: "Michael Ochieng",
      category: "Scholarship",
      featured: false,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Monthly Meeting: February Updates and New Initiatives",
      excerpt: "Join us for our February monthly meeting where we'll discuss exciting new initiatives and upcoming events for the semester.",
      content: "Our February monthly meeting will be held on February 15th at 2:00 PM in the Main Auditorium. We'll be discussing the launch of our mentorship program, upcoming hiking trip to Mount Kenya, and our partnership with local NGOs for community service projects. All members are encouraged to attend and contribute to our planning discussions. Light refreshments will be provided.",
      date: "2024-02-01",
      author: "Grace Njeri",
      category: "Announcement",
      featured: false,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "EKUSA Mentorship Program: Connecting Seniors with Freshmen",
      excerpt: "We're excited to introduce our new mentorship program that pairs experienced students with newcomers for academic and personal guidance.",
      content: "The EKUSA Mentorship Program is designed to help new students transition smoothly into university life while providing leadership opportunities for senior students. Mentors will provide guidance on academic matters, campus navigation, and personal development. The program includes monthly group meetings, one-on-one sessions, and social activities. Both mentors and mentees will receive certificates upon successful completion of the program.",
      date: "2024-01-28",
      author: "James Kiprotich",
      category: "Program",
      featured: false,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Community Service: Successful Blood Donation Drive",
      excerpt: "Our recent blood donation drive was a huge success, collecting 120 units of blood in partnership with Kenya Red Cross.",
      content: "We're proud to report that our blood donation drive exceeded all expectations! With 150 volunteers participating, we collected 120 units of blood that will help save lives in our community. The Kenya Red Cross praised our organization for the excellent coordination and high turnout. Special thanks to all volunteers, the medical team, and our logistics committee. Our next blood drive is scheduled for May 2024.",
      date: "2024-01-20",
      author: "Faith Wanjiku",
      category: "Community Service",
      featured: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Academic Excellence Workshop: Study Smart, Not Hard",
      excerpt: "Don't miss our upcoming workshop on effective study techniques, time management, and academic success strategies.",
      content: "Join us for an interactive workshop designed to help students excel academically. The session will cover proven study techniques, effective time management strategies, exam preparation tips, and stress management. Our facilitators include top-performing students and faculty members who will share their insights and answer questions. The workshop is free for all EKUSA members and includes study materials and refreshments.",
      date: "2024-01-15",
      author: "David Mutua",
      category: "Workshop",
      featured: false,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'achievement': return Trophy;
      case 'scholarship': return BookOpen;
      case 'announcement': return Megaphone;
      case 'program': return Users;
      case 'community service': return Users;
      case 'workshop': return BookOpen;
      default: return Megaphone;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'achievement': return 'bg-accent text-accent-foreground';
      case 'scholarship': return 'bg-secondary';
      case 'announcement': return 'bg-primary';
      case 'program': return 'bg-secondary';
      case 'community service': return 'bg-destructive';
      case 'workshop': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="bg-gradient-hero">
        <div className="container py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and exciting developments 
            from the EKUSA community.
          </p>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="bg-gradient-hero bg-clip-text text-transparent">News</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card key={item.id} className="shadow-hover overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-3">
                      <CategoryIcon className="h-4 w-4" />
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{item.excerpt}</CardDescription>
                    <Button variant="outline" className="group/btn">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {regularNews.map((item) => {
            const CategoryIcon = getCategoryIcon(item.category);
            return (
              <Card key={item.id} className="shadow-card hover:shadow-hover transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-3">
                    <CategoryIcon className="h-4 w-4" />
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{item.author}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm line-clamp-3">{item.excerpt}</CardDescription>
                  <Button variant="outline" size="sm" className="w-full group/btn">
                    Read More
                    <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-hero">
        <div className="container py-16 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <Megaphone className="h-16 w-16 mx-auto text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Stay in the Loop
            </h2>
            <p className="text-xl text-white/90">
              Never miss important updates, announcements, or exciting news from EKUSA. 
              Connect with us on social media or join our WhatsApp group for instant updates.
            </p>
            <Button size="lg" variant="secondary" className="shadow-hover">
              Join Our WhatsApp Group
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;