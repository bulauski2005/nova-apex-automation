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
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
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

  // Load chat messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('novapex_chat_messages');
    if (savedMessages) {
      try {
        setChatMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Failed to load chat messages:', error);
      }
    }
  }, []);

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('novapex_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

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
    setChatMessages([]);
    localStorage.removeItem('novapex_chat_messages');
    setShowClearDialog(false);
  };

  const startImplementationFlow = () => {
    setImplementationMode(true);
    setImplementationStep(0);
    setImplementationData({ practiceName: "", email: "", phone: "", location: "" });
    setChatMessages(prev => [...prev, {
      role: 'assistant',
      content: `## Let's Get Started! 🚀\n\nI'll help you begin the implementation process. ${implementationQuestions[0]}`
    }]);
  };

  const handleImplementationResponse = () => {
    if (!chatInput.trim() || !implementationMode) return;

    const fieldKey = implementationFields[implementationStep];
    const newData = { ...implementationData, [fieldKey]: chatInput };
    setImplementationData(newData);

    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput("");

    if (implementationStep < implementationQuestions.length - 1) {
      setShowImplementationTyping(true);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'typing' }]);
      setTimeout(() => {
        setChatMessages(prev => prev.slice(0, -1));
        setShowImplementationTyping(false);
        setImplementationStep(implementationStep + 1);
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: implementationQuestions[implementationStep + 1]
        }]);
      }, 1200);
    } else {
      setShowImplementationTyping(true);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'typing' }]);
      setTimeout(() => {
        setChatMessages(prev => prev.slice(0, -1));
        setShowImplementationTyping(false);
        const summary = `## Implementation Request Complete! ✅\n\nThank you for providing your information:\n\n- **Practice Name:** ${newData.practiceName}\n- **Email:** ${newData.email}\n- **Phone:** ${newData.phone}\n- **Location:** ${newData.location}\n\nOur implementation team will reach out within 24 hours to confirm details and schedule your onboarding call. We're excited to help automate your practice! 🎉`;
        setChatMessages(prev => [...prev, { role: 'assistant', content: summary }]);
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
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/manus-storage/1204_50.png2_95bb5d35.png" alt="Novapex" className="w-10 h-10" />
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
              'url("/manus-storage/teal_8b155a2b.png")',
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
              Streamline your operations, reduce costs, and accelerate growth
              with our cutting-edge automation solutions tailored to your unique
              business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("contact")}
                style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}
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

      {/* Dental Clinic Pain Points Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Challenges Facing Modern Dental Practices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how Novapex solves the most pressing issues dental practices face today
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
                Lost revenue from calls that go unanswered during busy hours or after hours
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Slow Lead Response</h3>
              <p className="text-gray-600 text-sm">
                Delayed follow-up on website inquiries results in lost appointments and patients
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
              aspect of your business operations.
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
                Automate repetitive tasks and workflows to eliminate manual
                errors, reduce processing time, and free up your team to focus
                on strategic initiatives.
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
                Streamline your business processes with intelligent workflow
                design that improves efficiency, reduces bottlenecks, and
                enhances collaboration across your organization.
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
                      Eliteven Expertise
                    </h4>
                    <p className="text-gray-600">
                      Decades of combined experience in automation and
                      technology
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
                      We stay ahead of technology trends to deliver cutting-edge
                      solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-8 text-gray-900 bg-white border border-gray-200">
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
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
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
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
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full mb-8 font-bold accent-button-hover">
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
            <Card className="relative p-8 hover:shadow-lg transition-shadow flex flex-col transform md:scale-105" style={{ borderWidth: '2px', borderColor: 'var(--accent)' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }}>
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
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full font-bold accent-button-hover mb-8">
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
              <Button style={{ backgroundColor: 'var(--accent)', color: '#001a4d' }} className="w-full mb-8 font-bold accent-button-hover">
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
                  <span key={i} style={{ color: '#00ffff' }}>★</span>
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
                  <span key={i} style={{ color: '#00ffff' }}>★</span>
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
                  <span key={i} style={{ color: '#00ffff' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "The voice AI receptionist is incredible. We've reduced front desk workload by 40% and patients love the instant responses. Our Google reviews have improved significantly."
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
                  <span key={i} style={{ color: '#00ffff' }}>★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 flex-grow">
                "ROI was immediate. We recovered 63 missed calls in the first month alone, translating close to $45K in revenue. Best investment we've made for our practice."
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Novapex Automation and how
              it can transform your dental practice.
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
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      What's the typical ROI for dental practices using Novapex?
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
                  <p className="text-gray-700 leading-relaxed">
                    Most dental practices see ROI within the first 30-60 days.
                    On average, practices recover 30-50 missed calls monthly,
                    translating to $8K-$15K in recovered revenue annually. The
                    Essential plan pays for itself in just 2-3 months for most
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
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      Does Novapex integrate with our practice management
                      software?
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
                  <p className="text-gray-700 leading-relaxed">
                    Yes! Novapex integrates with all major practice management
                    systems including Dentrix, Eaglesoft, Open Dental, and more.
                    Our Growth and Elite plans include CRM integration, allowing
                    seamless data flow between Novapex and your existing systems.
                    We handle all integration setup during onboarding, and our
                    team provides complete training to your staff.
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
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      How long does implementation take?
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
                  <p className="text-gray-700 leading-relaxed">
                    Essential plan setup takes 3-5 business days. Growth plan
                    implementation typically takes 5-7 business days, while Elite
                    plans with white-glove setup can be fully operational within
                    7-10 business days. All timelines include custom AI training
                    specific to your practice, staff onboarding, and integration
                    with your existing systems.
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
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      How quickly will we see new patients from Novapex?
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
                  <p className="text-gray-700 leading-relaxed">
                    Most practices see new patient appointments within the first
                    week of going live. Our AI chat captures leads 24/7, and
                    automated follow-up sequences ensure no lead falls through
                    the cracks. Growth and Elite plans include missed call
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
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      What kind of support do you provide?
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
                  <p className="text-gray-700 leading-relaxed">
                    All plans include email and chat support. Essential plan
                    customers receive standard support, while Growth plan
                    customers get priority support. Elite plan customers receive
                    24/7 priority support plus a dedicated account manager,
                    quarterly strategy reviews, and unlimited knowledge base
                    updates. We also provide ongoing AI optimization to ensure
                    your system continuously improves.
                  </p>
                </Card>
              </CollapsibleContent>
            </Collapsible>
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
      <footer className="text-white py-12" style={{ backgroundColor: '#0a1f3d' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/manus-storage/1204_50.png2_95bb5d35.png" alt="Novapex" className="w-8 h-8" />
                <span className="text-xl font-bold">Novapex LLC</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming Dental Practices Through Intelligent Automation.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#00ffff' }} />
                  <a href="tel:+15615650673" className="hover:text-white transition-colors">
                    +1 (561) 565-0673
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#00ffff' }} />
                  <a href="mailto:info@novapex.com" className="hover:text-white transition-colors">
                    info@novapex.com
                  </a>
                </div>
              </div>
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
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
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
                    Process Automation
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

      {/* Floating AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <Card className={`w-96 flex flex-col shadow-2xl border-0 bg-white rounded-lg overflow-hidden transition-all duration-300 ${chatOpen ? 'h-[600px]' : 'h-auto'} p-0`}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold">Novapex AI Assistant</h3>
                <p className="text-xs opacity-90">Dental Automation Expert</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowClearDialog(true)}
                  className="text-white hover:bg-cyan-700 p-1 rounded transition-colors"
                  title="Clear chat history"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:bg-cyan-700 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {chatOpen && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-8">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                  <p>Hi! Ask me about dental automation, pricing, or implementation.</p>
                </div>
              )}
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group relative`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm relative ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleCopyToClipboard(msg.content, idx)}
                        className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-300 rounded"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    )}
                    {msg.role === 'assistant' ? (
                      msg.content === 'typing' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Processing</span>
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing"></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing" style={{ animationDelay: '0.15s' }}></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing" style={{ animationDelay: '0.3s' }}></div>
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}: any) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}: any) => <ul className="list-disc list-inside mb-2" {...props} />,
                            ol: ({node, ...props}: any) => <ol className="list-decimal list-inside mb-2" {...props} />,
                            li: ({node, ...props}: any) => <li className="mb-1" {...props} />,
                            code: ({node, inline, ...props}: any) => inline ? (
                              <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                            ) : (
                              <code className="block bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto mb-2" {...props} />
                            ),
                            pre: ({node, ...props}: any) => <pre className="bg-gray-200 p-2 rounded mb-2 overflow-x-auto" {...props} />,
                            strong: ({node, ...props}: any) => <strong className="font-bold" {...props} />,
                            em: ({node, ...props}: any) => <em className="italic" {...props} />,
                            blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-cyan-400 pl-3 italic mb-2" {...props} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                        </div>
                      )
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <span className="text-xs text-gray-500">Typing</span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-typing" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Chat Input */}
            {chatOpen && (
            <div className="border-t p-3 flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    handleChatSubmit();
                  }
                }}
                placeholder="Ask a question..."
                className="flex-1 text-sm"
                disabled={chatLoading}
              />
              <button
                onClick={handleChatSubmit}
                disabled={chatLoading || !chatInput.trim()}
                className="text-white p-2 rounded transition-colors disabled:bg-gray-300 hover:opacity-80"
                style={{ backgroundColor: 'var(--accent-dark)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            )}

            {/* Start Implementation CTA */}
            {chatOpen && !implementationMode && (
            <div className="border-t bg-gradient-to-r from-cyan-50 to-blue-50 p-3">
              <button
                onClick={startImplementationFlow}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 interactive-scale"
              >
                <Zap className="w-4 h-4" />
                Start Implementation
              </button>
            </div>
            )}

            {/* Implementation Mode Indicator */}
            {implementationMode && (
            <div className="border-t bg-cyan-50 p-3 text-center">
              <p className="text-sm text-cyan-700 font-semibold">Question {implementationStep + 1} of {implementationQuestions.length}</p>
            </div>
            )}

            {/* Export Implementation Data Button */}
            {!implementationMode && implementationData.practiceName && (
            <div className="border-t bg-gradient-to-r from-green-50 to-emerald-50 p-3">
              <button
                onClick={exportImplementationData}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Answers
              </button>
            </div>
            )}
          </Card>
        )}

        {/* Clear Chat Confirmation Dialog */}
        <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Chat History?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all messages in your conversation. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearChat} className="bg-red-500 hover:bg-red-600">
                Clear Chat
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>



        {/* Floating Button */}
        {!chatOpen && (
          <button
            onClick={() => {
              setChatOpen(true);
              if (chatMessages.length === 0) {
                setChatMessages([{
                  role: 'assistant',
                  content: 'Hi! I\'m your Novapex AI Assistant. I can help you learn about our dental automation solutions, answer pricing questions, or discuss implementation. What would you like to know?'
                }]);
              }
            }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 chat-widget-glow"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );

  function handleChatSubmit() {
    if (!chatInput.trim()) return;

    if (implementationMode) {
      handleImplementationResponse();
      return;
    }

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      let response = '';
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        response = '## Our Pricing Plans\n\n- **Essential**: $1,997 setup + **$497/month**\n- **Growth** (most popular): $2,997 setup + **$697/month**\n- **Elite**: $5,997 setup + **$997/month**\n\nWould you like to know what\'s included in each tier?';
      } else if (lowerInput.includes('implement') || lowerInput.includes('setup') || lowerInput.includes('timeline')) {
        response = '## Implementation Timeline\n\nImplementation typically takes **3-10 business days**. Here\'s what we handle:\n\n- System setup and configuration\n- AI training on your practice\n- Integration with your practice management software\n\nMost practices are capturing leads **within a week**!';
      } else if (lowerInput.includes('integration') || lowerInput.includes('software') || lowerInput.includes('dentrix') || lowerInput.includes('eaglesoft')) {
        response = '## Practice Management Integration\n\nWe integrate with major systems:\n\n- **Dentrix**\n- **Eaglesoft**\n- **Open Dental**\n- And many others\n\nOur AI works seamlessly with your existing workflows.';
      } else if (lowerInput.includes('roi') || lowerInput.includes('results') || lowerInput.includes('revenue')) {
        response = '## ROI & Results\n\n**Annual Impact:**\n- Recover **$8K-$15K** in missed call revenue\n- Capture **40+ new patient leads** per month\n\n**Real Example:** One practice captured **47 new patients in 90 days**!';
      } else if (lowerInput.includes('feature') || lowerInput.includes('what can') || lowerInput.includes('service')) {
        response = '## Novapex Automation Services\n\nWe specialize in **AI automation exclusively for dental clinics**. Our comprehensive services include:\n\n**Lead Generation & Capture:**\n- AI website chat agents\n- Lead capture and follow-up\n- Missed call recovery\n\n**Patient Communication:**\n- AI phone receptionists\n- Patient FAQ automation\n- Review request automation\n\n**Operations:**\n- Appointment scheduling automation\n- CRM integrations\n- Analytics and reporting\n\nAll designed to work with **minimal staff involvement**.';
      } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
        response = '## Support & Services\n\n**All Plans Include:**\n- Email support\n- Custom AI training\n- Onboarding assistance\n\n**Elite Plan Adds:**\n- Priority support\n- Quarterly optimization reviews';
      } else if (lowerInput.includes('qualify') || lowerInput.includes('qualify my practice')) {
        response = '## Practice Qualification\n\nWe work with dental clinics of all sizes. To ensure the best fit, we assess:\n\n- Practice type and specialties\n- Current patient volume\n- Technology infrastructure\n- Specific automation needs\n- Budget and growth goals\n\nOur implementation agent will guide you through a quick qualification process to recommend the perfect solution for your practice.';
      } else if (lowerInput.includes('pain point') || lowerInput.includes('challenge')) {
        response = '## Common Dental Practice Challenges\n\nWe help solve:\n\n- **Missed Calls** - Recover lost leads automatically\n- **After Hours Support** - 24/7 AI availability\n- **Appointment Scheduling** - Reduce no-shows\n- **Lead Follow-up** - Never lose a prospect\n- **Website Lead Capture** - Convert visitors to patients\n- **Review Requests** - Automate reputation management\n- **Patient Questions** - Instant FAQ responses\n- **Administrative Workload** - Free up your team\n\nWhat\'s your biggest challenge?';
      } else if (lowerInput.includes('onboard') || lowerInput.includes('implementation') || lowerInput.includes('get started')) {
        response = '## Novapex Implementation Process\n\nWe make onboarding effortless—no lengthy discovery calls needed! Our implementation agent will:\n\n**Gather Your Information:**\n- Practice details and locations\n- Website analysis\n- Services offered\n- Current software systems\n\n**Identify Your Needs:**\n- Pain points and challenges\n- Desired AI features\n- Branding preferences\n\n**Build Your Profile:**\n- Knowledge base topics\n- Conversation flows\n- Lead capture workflows\n- Automation recommendations\n\nThe entire process takes about **5 minutes**. Ready to get started?';
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = 'Hello! I\'m here to help you learn about **Novapex Automation**, your AI automation partner for dental clinics. Feel free to ask about:\n\n- Our services and capabilities\n- Pricing and plans\n- Implementation process\n- How we help dental practices grow';
      } else {
        response = '## About Novapex Automation\n\nWe specialize in **AI automation solutions exclusively for dental clinics**. Ask me about:\n\n- **Services** - Website chat, phone receptionists, appointment automation, lead capture, missed call recovery, patient FAQs, review requests, CRM integrations, and analytics\n- **Pricing** - Our plans and setup fees\n- **Implementation** - Timeline and minimal staff involvement\n- **Integrations** - Compatible practice management systems\n- **ROI** - Results and revenue impact';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setChatLoading(false);
    }, 800);
  }
}
