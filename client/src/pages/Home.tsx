import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Menu,
  X,
  Zap,
  Cog,
  Link2,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Calculate pricing with 20% annual discount
  const getPricing = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
      return {
        display: `$${Math.round(annualPrice)}`,
        period: "/year",
        savings: Math.round(monthlyPrice * 12 * 0.2),
      };
    }
    return {
      display: `$${monthlyPrice}`,
      period: "/month",
      savings: 0,
    };
  };
  
  const essentialPricing = getPricing(497);
  const growthPricing = getPricing(697);
  const elitePricing = getPricing(997);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for your message! We'll be in touch soon.");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/manus-storage/black1204_457e8477.png" alt="Novapex" className="w-10 h-10" />
              <span className="text-xl font-bold" style={{ color: '#001a4d' }}>
                Novapex
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00ffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00ffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00ffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00ffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00ffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Contact
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: '#00ffff', color: '#001a4d' }}
                className="font-bold hover:opacity-80 transition-opacity"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Contact
              </button>
              <div className="px-4 py-2">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: '#00ffff', color: '#001a4d' }}
                className="w-full font-bold hover:opacity-80 transition-opacity"
              >
                Get Started
              </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white to-gray-50"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'url("https://d2xsxph8kpxj0f.cloudfront.net/310519663517492903/3CtG423Mkv5LEsJdxHgDRN/hero-background-JvyhCZpbevdBwAtX9JtTtz.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              24/7 Website Lead Capture & Missed Call Recovery for Dental Practices
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your operations, reduce costs, and accelerate growth
              with our cutting-edge automation solutions tailored to your unique
              business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: '#00ffff', color: '#001a4d' }}
                className="px-8 py-3 text-lg flex items-center justify-center gap-2 font-bold hover:opacity-80 transition-opacity"
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("services")}
                variant="outline"
                style={{ borderColor: '#001a4d', color: '#001a4d' }}
                className="border-2 px-8 py-3 text-lg font-bold hover:opacity-80 transition-opacity"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive automation solutions designed to optimize every
              aspect of your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Elitecess Automation */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Elitecess Automation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automate repetitive tasks and workflows to eliminate manual
                errors, reduce processing time, and free up your team to focus
                on strategic initiatives.
              </p>
            </Card>

            {/* Workflow Optimization */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                <Cog className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Workflow Optimization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Streamline your business processes with intelligent workflow
                design that improves efficiency, reduces bottlenecks, and
                enhances collaboration across your organization.
              </p>
            </Card>

            {/* System Integration */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                System Integration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly connect your existing systems and applications to
                create a unified technology ecosystem that works together
                harmoniously.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                About Novapex Automation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are a team of automation experts dedicated to helping
                businesses unlock their full potential through intelligent
                technology solutions. With years of industry experience, we
                understand the unique challenges your practice faces.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to empower companies to achieve operational
                excellence by implementing automation strategies that drive
                measurable results and sustainable growth.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Customer-Centric Approach
                    </h4>
                    <p className="text-gray-600">
                      We tailor solutions to your specific needs and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Eliteven Expertise
                    </h4>
                    <p className="text-gray-600">
                      Decades of combined experience in automation and
                      technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Continuous Innovation
                    </h4>
                    <p className="text-gray-600">
                      We stay ahead of technology trends to deliver cutting-edge
                      solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-8 text-white" style={{ background: 'linear-gradient(135deg, #001a4d 0%, #003d99 100%)' }}>
              <h3 className="text-2xl font-bold mb-6">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>Excellence:</strong> We deliver exceptional results
                    through meticulous attention to detail
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>Integrity:</strong> We build trust through
                    transparency and honest communication
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>Innovation:</strong> We embrace new technologies
                    and methodologies
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>Partnership:</strong> We view our clients as
                    partners in success
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Novapex?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand out from the competition with our commitment to
              excellence and proven track record of success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Rapid Implementation
                </h3>
                <p className="text-gray-600">
                  Get your automation solutions up and running quickly with our
                  proven deployment methodology.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Measurable Results
                </h3>
                <p className="text-gray-600">
                  We focus on delivering tangible ROI with clear metrics and
                  performance tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                  <Cog className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our dedicated support team is always available to ensure your
                  systems run smoothly.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                  <Link2 className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Scalable Solutions
                </h3>
                <p className="text-gray-600">
                  Our solutions grow with your business, adapting as your business evolves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the automation package that fits your business needs. All
              plans include dedicated support and regular updates.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="h-6 w-11"
            />
            <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                Save 20%
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <Card className="relative p-8 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Essential
              </h3>
              <p className="text-gray-600 mb-6 text-sm">Perfect for solo practices looking to capture every lead and automate patient communication.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$1,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">${essentialPricing.display}</div>
                <div className="text-gray-600">{essentialPricing.period}</div>
              </div>
              <Button style={{ backgroundColor: '#00ffff', color: '#001a4d' }} className="w-full mb-8 font-bold hover:opacity-80 transition-opacity">
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">AI Website Chat Assistant (24/7)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Instant Lead Capture</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Missed Call Text Back</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">New Patient Qualification</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Appointment Request Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Frequently Asked Questions Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Mobile Lead Notifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Monthly Performance Reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Custom AI Training & Installation</span>
                </div>
              </div>
            </Card>

            {/* Growth Plan - Best Seller */}
            <Card className="relative p-8 hover:shadow-lg transition-shadow flex flex-col transform md:scale-105" style={{ borderWidth: '2px', borderColor: '#00ffff' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: '#00ffff', color: '#001a4d' }}>
                  ⭐ BEST SELLER
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
                Growth
              </h3>
              <p className="text-gray-600 mb-6 text-sm">Our most popular solution for practices ready to automate the front desk and increase booked appointments.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$2,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">${growthPricing.display}</div>
                <div className="text-gray-600">{growthPricing.period}</div>
              </div>
              <Button style={{ backgroundColor: '#00ffff', color: '#001a4d' }} className="w-full font-bold hover:opacity-80 transition-opacity mb-8">
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-gray-900 mb-3">Everything in Essential, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">AI Voice Receptionist</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Automated SMS & Email Follow-Up</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Lead Nurture Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Recall & Recare Reminders</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Google Review Request Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">CRM Integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Insurance & Financing FAQ Training</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Custom Practice Knowledge Base</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Call Transcripts & Analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Staff Onboarding & Training</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">30 Days of AI Optimization</span>
                </div>
              </div>
            </Card>

            {/* Elite Plan */}
            <Card className="relative p-8 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Elite
              </h3>
              <p className="text-gray-600 mb-6">Complete AI-powered patient acquisition and communication system for high-volume and multi-location practices.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$5,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">${elitePricing.display}</div>
                <div className="text-gray-600">{elitePricing.period}</div>
              </div>
              <Button style={{ backgroundColor: '#00ffff', color: '#001a4d' }} className="w-full mb-8 font-bold hover:opacity-80 transition-opacity">
                Contact to Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-gray-900 mb-3">Everything in Growth, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Multi-Location Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">AI Call Routing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Appointment Confirmation & Rescheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Patient Reactivation Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Custom AI Workflows</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Implant & Cosmetic Consultation Funnels</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Insurance Verification FAQ Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Advanced Performance Dashboard</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Priority Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Quarterly AI Optimization & Strategy Review</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">Unlimited Knowledge Base Updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00ffff' }} />
                  <span className="text-gray-700">White-Glove Setup & Launch</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include 24/7 customer support, regular updates, and a
              30-day money-back guarantee.
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              style={{ backgroundColor: '#00ffff', color: '#001a4d' }}
              className="px-8 py-3 font-bold hover:opacity-80 transition-opacity"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business? Contact us today to discuss how
              we can help you achieve your automation goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your automation needs..."
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  style={{ backgroundColor: '#00ffff', color: '#001a4d' }}
                  className="w-full py-3 text-lg font-bold hover:opacity-80 transition-opacity"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                    <div>
                      <h4 className="font-bold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                    <div>
                      <h4 className="font-bold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@novaapex.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#00ffff' }} />
                    <div>
                      <h4 className="font-bold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        South Florida Based - Serving Dental Practices Nationwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#001a4d' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/manus-storage/black1204_457e8477.png" alt="Novapex" className="w-8 h-8" />
                <span className="text-xl font-bold">Novapex</span>
              </div>
              <p className="text-gray-400">
                Transforming Dental Practices Through Intelligent Automation.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Elitecess Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Workflow Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    System Integration
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 Novapex Automation. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
