import React, { useState, useEffect } from "react";
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
  ChevronDown,
  Clock,
  Users,
  AlertCircle,
  MessageCircle,
  Send,
  Copy,
  Check,
  Trash2,
  Download,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showImplementationTyping, setShowImplementationTyping] = useState(false);
  const [implementationMode, setImplementationMode] = useState(false);
  const [implementationStep, setImplementationStep] = useState(0);
  const [implementationData, setImplementationData] = useState({
    practiceName: "",
    email: "",
    phone: "",
    location: "",
  });

  const implementationQuestions = [
    "What is the name of your dental practice?",
    "What is your email address?",
    "What is your phone number?",
    "What is your practice location or city?"
  ];
  const implementationFields = ['practiceName', 'email', 'phone', 'location'] as const;



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

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleClearChat = () => {
    setShowClearDialog(false);
  };

  const startImplementationFlow = () => {
    setImplementationMode(true);
    setImplementationStep(0);
    setImplementationData({ practiceName: "", email: "", phone: "", location: "" });
  };

  const handleImplementationResponse = () => {
    if (!chatInput.trim() || !implementationMode) return;

    const fieldKey = implementationFields[implementationStep];
    const newData = { ...implementationData, [fieldKey]: chatInput };
    setImplementationData(newData);

    setChatInput("");

    if (implementationStep < implementationQuestions.length - 1) {
      setShowImplementationTyping(true);
      setTimeout(() => {
        setShowImplementationTyping(false);
        setImplementationStep(implementationStep + 1);
      }, 1200);
    } else {
      setShowImplementationTyping(true);
      setTimeout(() => {
        setShowImplementationTyping(false);
        setImplementationMode(false);
      }, 1200);
    }
  };

  const exportImplementationData = () => {
    const timestamp = new Date().toLocaleString();
    const content = `NOVAPEX AUTOMATION - IMPLEMENTATION QUESTIONNAIRE
${'='.repeat(50)}

Submission Date: ${timestamp}

PRACTICE INFORMATION:
${'─'.repeat(50)}

Practice Name: ${implementationData.practiceName}
Email: ${implementationData.email}
Phone: ${implementationData.phone}
Location: ${implementationData.location}

${'='.repeat(50)}

This information was collected through the Novapex AI Assistant.
Please review and confirm all details are accurate.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `novapex-implementation-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 border-b border-gray-100 shadow-sm bg-white/60 backdrop-blur"
        style={{
          backgroundImage: 'url("/manus-storage/hero_88b99788.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Novapex" className="w-10 h-10" />
              <span className="font-semibold" style={{ color: '#001a4d', fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>
                Novapex Automation
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="transition-colors font-medium"
                style={{ color: '#001a4d' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#001a4d')}
              >
                Contact
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
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
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                FAQ
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
                style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
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
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'url("/manus-storage/hero_88b99788.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-white/80 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              24/7 Website Lead Capture & Missed Call Recovery for Dental Practices
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your operations, boost efficiency, and accelerate growth with our cutting-edge automation solutions tailored to your unique practice needs.
            </p>
            <p className="text-base text-gray-500 mb-8">
              Our AI Assistant is pre-configured and ready to automate your dental practice from day one. Try it out below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
                className="px-8 py-3 text-lg flex items-center justify-center gap-2 font-bold hover:opacity-80 transition-opacity"
              >
                Automate Your Practice Today <ArrowRight className="w-5 h-5" />
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

      {/* Dental Clinic Pain Points Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Challenges Facing Modern Dental Practices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how Novapex solves the most pressing issues dental practices face today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pain Point 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Missed Calls</h3>
              <p className="text-gray-600 text-sm">
                Lost revenue from calls that go unanswered during and after busy hours
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Slow Lead Response</h3>
              <p className="text-gray-600 text-sm">
                Delayed follow-up on website inquiries results in lost appointments
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No-Show Rates</h3>
              <p className="text-gray-600 text-sm">
                High no-show rates waste appointment slots and reduce practice revenue
              </p>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manual Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Time-consuming manual appointment scheduling ties up front desk staff
              </p>
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
              aspect of your practice operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Process Automation */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Process Automation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transform manual processes into automated workflows 
                that improve accuracy, save time, and enhance 
                operational efficiency.
              </p>
            </Card>

            {/* Workflow Optimization */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Cog className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Workflow Optimization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enhance practice performance with intelligent automation 
                Solutions that improve efficiency, enhance collaboration, 
                and reduce administrative bottlenecks.
              </p>
            </Card>

            {/* System Integration */}
            <Card className="p-8 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                System Integration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly connect your existing systems and applications to
                create a unified technology ecosystem that works together
                seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Our AI Assistant Is Trained to Do Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our AI Assistant Is Trained to Do.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI Dental Assistant is specifically trained to communicate like a knowledgeable front desk coordinator while providing instant, accurate, and professional responses 24/7.
            </p>
            <p className="text-base text-gray-500 mt-4">
              Pre-trained for dental clinics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#000000' }}>Engagement & Scheduling</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Answer questions about treatments</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Provide office hours and location</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Explain insurance and financing options</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Share new patient forms and instructions</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Handle FAQs with consistent responses</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Personalized greetings/calls to action</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#000000' }}>Lead Capture & Recovery</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Engage every website visitor in real time</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Turn leaving visitors into leads</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Send automated follow-ups</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Recover missed after-hours inquiries</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Encourage visitors to schedule now</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span className="text-gray-700">Re-engage inactive or older leads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Dental Practice Onboarding Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Dental Practice Onboarding
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI assistant can even onboard your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Helps you choose the right plan</h3>
                <p className="text-gray-600">Our AI guides you through each option to find the perfect fit for your practice.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Explains each pricing tier in plain language</h3>
                <p className="text-gray-600">Clear explanations of what each plan includes and why.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Collects all implementation details in one conversation</h3>
                <p className="text-gray-600">Streamlined data gathering that eliminates back-and-forth emails.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Guides you through setup with minimal technical interaction</h3>
                <p className="text-gray-600">Simple, step-by-step guidance that anyone on your team can follow.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Prepares your practice for a fast and seamless launch</h3>
                <p className="text-gray-600">Designed and built for dental practices, enabling a smooth rollout with minimal downtime.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Trains HR and new hires on company policies and protocol</h3>
                <p className="text-gray-600">Continuous learning support for your entire team integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              See it in action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Try our AI Dental Assistant below.
            </p>
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
              Dentists choose us for our transparent approach, dependable execution, and track record of delivering amazing results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Rapid Deployment
                </h3>
                <p className="text-gray-600">
                  Accelerate implementation and go live fast with our 
                  streamlined rapid deployment process.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Measurable Results
                </h3>
                <p className="text-gray-600">
                  We focus on delivering tangible ROI with clear tracking and
                  performance metrics.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                  <Cog className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Dedicated Support
                </h3>
                <p className="text-gray-600">
                  Our team is always available to ensure your system 
                  is in sync and running smoothly.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                  <Link2 className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Scalable Solutions
                </h3>
                <p className="text-gray-600">
                  Built and trained to scale, our AI systems are continually learning 
                  and adapting as your practice evolves.
                </p>
              </div>
            </div>
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
                We are a team of highly skilled automation experts dedicated to helping
                dental practices to unlock their full potential through intelligent
                technology. With years of industry experience, we
                understand the unique challenges your practice faces.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to empower your practice to achieve
                excellence by implementing automation solutions 
                that deliver unmatched efficiency.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
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
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Proven Expertise
                    </h4>
                    <p className="text-gray-600">
                      We are a team of highly skilled software engineers and
                      developers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Continuous Innovation
                    </h4>
                    <p className="text-gray-600">
                      We stay ahead of the technology curve to deliver cutting-edge
                      AI automation solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-8 text-gray-900 bg-white">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Our Values</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span>
                    <strong>Excellence:</strong> Achieved through precision, dedication, and expertise.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span>
                    <strong>Integrity:</strong> We build trust through
                    transparency and honest communication.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span>
                    <strong>Innovation:</strong> We embrace new technologies
                    and methodologies.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span>
                    <strong>Partnership:</strong> We view our clients as
                    partners in success.
                  </span>
                </li>
              </ul>
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
              Choose the automation package that fits your practice needs. All
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
              <p className="text-gray-600 mb-6 font-medium" style={{ fontSize: '14px' }}>Perfect for solo practices looking to capture every lead and automate patient communication.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$1,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">{essentialPricing.display}</div>
                <div className="text-gray-600">{essentialPricing.period}</div>
              </div>
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full mb-8 font-bold accent-button-hover">
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-gray-900 mb-3">What's Included:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">AI Website Chat Assistant (24/7)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Instant Lead Capture</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Missed Call Text Back</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">New Patient Qualification</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Appointment Request Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Frequently Asked Questions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Mobile Lead Notifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Monthly Performance Reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Custom AI Training & Installation</span>
                </div>
              </div>
            </Card>

            {/* Growth Plan - Best Seller */}
            <Card className="relative p-8 hover:shadow-lg transition-shadow flex flex-col transform md:scale-105" style={{ borderWidth: '2px', borderColor: 'var(--accent)' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                  BEST SELLER
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
                Growth
              </h3>
              <p className="text-gray-600 mb-6 font-medium" style={{ fontSize: '14px' }}>Our most popular solution for practices ready to automate the front desk and increase booked appointments.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$2,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">{growthPricing.display}</div>
                <div className="text-gray-600">{growthPricing.period}</div>
              </div>
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full font-bold accent-button-hover mb-8">
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-gray-900 mb-3">Everything in Essential, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">AI Voice Receptionist</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Automated SMS & Email Follow-Up</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Lead Nurture Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Recall & Recare Reminders</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Google Review Request Automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">CRM Integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Insurance & Financing FAQ Training</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Custom Practice Knowledge Base</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Call Transcripts & Analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Staff Onboarding & Training</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">30 Days of AI Optimization</span>
                </div>
              </div>
            </Card>

            {/* Elite Plan */}
            <Card className="relative p-8 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Elite
              </h3>
              <p className="text-gray-600 mb-6 font-medium" style={{ fontSize: '14px' }}>Complete AI-powered patient acquisition and communication system for high-volume and multi-location practices.</p>
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-900 mb-1">$5,997 Setup</div>
                <div className="text-3xl font-bold text-gray-900">{elitePricing.display}</div>
                <div className="text-gray-600">{elitePricing.period}</div>
              </div>
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full mb-8 font-bold accent-button-hover">
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-gray-900 mb-3">Everything in Growth, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Multi-Location Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">AI Call & SMS Routing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Appointment Rescheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Patient Reactivation Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Custom AI Workflows</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Implant & Cosmetic Funnels</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Insurance Verification FAQ</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Advanced Performance Metrics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">24/7 Priority Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Quarterly AI Optimization Review</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">Unlimited Knowledge Base Updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#03e1ea' }} />
                  <span className="text-gray-700">White-Glove Setup & Launch</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include customer support, regular updates, and a
              30-day money-back guarantee.
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
              className="px-8 py-3 font-bold hover:opacity-80 transition-opacity"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              What Dental Practices Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from real dental practices using Novapex Automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#03e1ea' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "Novapex captured 47 new patients in just 90 days. The missed call text-back system alone recovered over $12K in lost revenue. This is a game-changer for our practice."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Sarah Mitchell</p>
                <p className="text-sm text-gray-600">Mitchell Family Dentistry, Miami</p>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#03e1ea' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "Our no-show rate dropped by 35% since implementing the appointment confirmation system. The AI chat handles 80% of our patient inquiries automatically now."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. James Chen</p>
                <p className="text-sm text-gray-600">Bright Smile Dental, Tampa</p>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#03e1ea' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "The voice AI receptionist is incredible. We've reduced front desk workload by 40%, and patients love the instant responses. Our Google reviews have improved significantly."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Lisa Rodriguez</p>
                <p className="text-sm text-gray-600">Coastal Dental Group, Jacksonville</p>
              </div>
            </Card>

            {/* Testimonial 4 */}
            <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#03e1ea' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "ROI was immediate. We recovered 63 missed calls in the first month alone, translating to $45K in revenue. Best investment we've made for our practice."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Michael Thompson</p>
                <p className="text-sm text-gray-600">Premier Dental Solutions, Orlando</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Find answers to common questions about Novapex Automation and how
              they can transform your dental practice.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ Item 1 - ROI */}
            <Collapsible
              open={openFAQ === "roi"}
              onOpenChange={() =>
                setOpenFAQ(openFAQ === "roi" ? null : "roi")
              }
            >
              <CollapsibleTrigger className="w-full">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700 text-left">
                      What's the typical ROI for dental practices using Novapex Automation?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform ${
                        openFAQ === "roi" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-gray-50 border-t-0 rounded-t-none">
                  <p className="text-gray-900 leading-relaxed">
                    Most dental practices see ROI within the first 30-60 days.
                    On average, practices recover 30-50 missed calls monthly,
                    translating into thousands of dollars in recovered revenue. The
                    Essential plan pays for itself in just 1-2 months for most
                    practices. Growth and Elite plans typically break even within
                    the first month.
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* FAQ Item 2 - Integration */}
            <Collapsible
              open={openFAQ === "integration"}
              onOpenChange={() =>
                setOpenFAQ(openFAQ === "integration" ? null : "integration")
              }
            >
              <CollapsibleTrigger className="w-full">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700 text-left">
                      Does Novapex Automation integrate with our practice software
                      systems?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform ${
                        openFAQ === "integration" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-gray-50 border-t-0 rounded-t-none">
                  <p className="text-gray-900 leading-relaxed">
                    Yes! Novapex Automation integrates with all major dental practice
                    software management systems, including Dentrix, Eaglesoft, Open Dental, and more.
                    Our Growth and Elite plans include CRM integration, allowing
                    seamless data flow between Novapex and your existing systems.
                    We handle all integration setup during onboarding, along with
                    comprehensive staff training.
                    
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* FAQ Item 3 - Implementation */}
            <Collapsible
              open={openFAQ === "implementation"}
              onOpenChange={() =>
                setOpenFAQ(openFAQ === "implementation" ? null : "implementation")
              }
            >
              <CollapsibleTrigger className="w-full">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700 text-left">
                      How long does Novapex Automation implementation take?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform ${
                        openFAQ === "implementation" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-gray-50 border-t-0 rounded-t-none">
                  <p className="text-gray-900 leading-relaxed">
                    Essential plan setup takes 3-5 business days. Growth plan
                    typically takes 5-7 business days, while Elite
                    plans with white-glove setup can be fully operational within
                    7-10 business days. All timelines include custom AI training
                    exclusive to your practice, staff onboarding, and integration
                    with your practice software management system.
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* FAQ Item 4 - New Patients */}
            <Collapsible
              open={openFAQ === "patients"}
              onOpenChange={() =>
                setOpenFAQ(openFAQ === "patients" ? null : "patients")
              }
            >
              <CollapsibleTrigger className="w-full">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700 text-left">
                      How quickly will we see new patients from Novapex Automation?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform ${
                        openFAQ === "patients" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-gray-50 border-t-0 rounded-t-none">
                  <p className="text-gray-900 leading-relaxed">
                    Most practices see new patient appointments within the first
                    week of going live. The AI dental assistant captures leads 24/7, and
                    automated SMS follow-up sequences ensure no one falls through
                    the cracks. Growth and Elite plans include missed call SMS
                    recovery, which immediately converts lost calls into
                    appointments. On average, practices book 15-30 additional
                    appointments per month.
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* FAQ Item 5 - Support */}
            <Collapsible
              open={openFAQ === "support"}
              onOpenChange={() =>
                setOpenFAQ(openFAQ === "support" ? null : "support")
              }
            >
              <CollapsibleTrigger className="w-full">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700 text-left">
                      What kind of support does Novapex Automation provide?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform ${
                        openFAQ === "support" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-gray-50 border-t-0 rounded-t-none">
                  <p className="text-gray-900 leading-relaxed">
                    All plans include email and chat support. Essential plan
                    customers receive standard support, while Growth plan
                    customers get priority support. Elite plan customers receive
                    24/7 priority support plus a dedicated account manager,
                    quarterly strategy reviews, and unlimited knowledge base
                    updates. We also provide ongoing AI optimization to ensure
                    your system is continually learning and improving.
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="text-center mt-12">
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
              Ready to transform your practice? Contact us today to discuss how
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
                  style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
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
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
                    <div>
                      <h4 className="font-bold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+1 (561) 565-0673</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
                    <div>
                      <h4 className="font-bold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@novapexautomation.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#03e1ea' }} />
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
      <footer className="text-gray-900 py-12" style={{ backgroundColor: '#efefef' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="Novapex" className="w-8 h-8" />
                <span className="text-xl font-bold">Novapex LLC</span>
              </div>
              <p className="text-gray-600 mb-4">
                Transforming Dental Practices Through Intelligent Automation.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <a href="tel:+15615650673" className="hover:text-gray-900 transition-colors">
                    +1 (561) 565-0673
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <a href="mailto:info@novapexautomation.com" className="hover:text-gray-900 transition-colors">
                    info@novapexautomation.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Navigation</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Process Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Workflow Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    System Integration
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
              <p>&copy; 2024 Novapex Automation. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbase Embed */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="rSY5RlUVDLMimwAxCK-eV";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})()`
        }}
      />
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chatbase widget renders here automatically */}
      </div>
    </div>
  );
}


