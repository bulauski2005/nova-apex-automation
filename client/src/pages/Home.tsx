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
  Download,
  Building2,
  Crown,
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
import { Link } from "wouter";
import Marquee from "@/components/Marquee";
import HeroVisualization from "@/components/HeroVisualization";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);

    if (!formData.name || !formData.email || !formData.message) {
      setFormMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xvzjnrvy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. We will be in touch soon.' });
        setTimeout(() => setFormMessage(null), 5000);
      } else {
        setFormMessage({ type: 'error', text: data.error || 'Error sending message. Please try again.' });
        console.error("Form error:", data);
      }
    } catch (error) {
      setFormMessage({ type: 'error', text: 'Error sending message. Please try again.' });
      console.error("Form error:", error);
    } finally {
      setFormLoading(false);
    }
  };

    const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      console.warn('Element not found for id:', sectionId);
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const ids = ["home", "services", "about", "pricing", "testimonials", "faq", "contact"];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const content = `NOVAPEX - IMPLEMENTATION QUESTIONNAIRE
${'='.repeat(50)}

Submission Date: ${timestamp}

PRACTICE INFORMATION:
${'─'.repeat(50)}

Practice Name: ${implementationData.practiceName}
Email: ${implementationData.email}
Phone: ${implementationData.phone}
Location: ${implementationData.location}

${'='.repeat(50)}

This information was collected through the NOVAPEX SI Assistant.
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

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Features" },
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-2xl border-b border-[#D8E0EA] bg-white/85 shadow-[0_4px_24px_rgba(9,20,35,0.06)]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-1">
              <img src="/logo.png" alt="NOVAPEX" className="w-[38px] h-[38px]" />
              <span className="font-semibold text-[#17263D] tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>
                NOVAPEX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-x-6 lg:gap-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 font-medium text-sm cursor-pointer p-0 bg-transparent border-0 nav-link ${
                    activeSection === item.id
                      ? "text-[#17263D] font-semibold"
                      : "text-[#55627A] hover:text-[#17263D]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button / Mobile Menu */}
            <div className="flex justify-end items-center space-x-2 flex-1">
              <div className="hidden md:block">
                <a
                  href="#contact"
                  className="nav-get-started inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  Get Started
                </a>
              </div>
              <button
                className="md:hidden text-[#17263D]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-[#D8E0EA]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-[#17263D] font-semibold bg-[#F7F9FC]"
                      : "text-[#55627A] hover:text-[#17263D] hover:bg-[#F7F9FC]"
                  } bg-transparent border-0`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 py-2">
                <a
                  href="#contact"
                  className="nav-get-started block w-full px-4 py-2 rounded-full text-sm font-semibold text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative -mt-16 overflow-hidden scroll-mt-20 pb-24 bg-white"
      >
        {/* Frost gradient backdrop */}
        <div className="absolute inset-0 gradient-frost" />
        {/* Ambient sapphire illumination - soft and restrained */}
        <div className="absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#0D2645]/10 blur-3xl hero-ambient" />
        <div className="absolute top-1/3 -left-32 h-[26rem] w-[26rem] rounded-full bg-[#7C9CC4]/15 blur-3xl hero-ambient-2" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#0D2645]/8 blur-3xl hero-ambient-3" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0D2645 1px, transparent 1px), linear-gradient(to bottom, #0D2645 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="container mx-auto px-8 sm:px-12 lg:px-20 relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* Left content */}
            <div className="text-left max-w-2xl">
              {/* Eyebrow badge */}
              <div className="fade-up fade-up-delay-1 inline-flex items-center gap-2 rounded-full gradient-slate border border-[#D8E0EA]/80 px-4 py-2 mb-6 shadow-[0_4px_18px_rgba(9,20,35,0.35)]">
                <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 ping-sync" style={{ background: '#FFFFFF' }} />
                  <span className="relative inline-flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full" style={{ background: '#FFFFFF' }} />
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wide text-white">The Future of Dental Practice Automation</span>
              </div>

              <h1 className="fade-up fade-up-delay-1 text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold text-[#17263D] leading-[1.08] tracking-tight mb-6">
                The SI Operating<br /> System For<br /> Dental Practices
              </h1>

              {/* Subheading */}
              <p className="fade-up fade-up-delay-2 text-[#55627A] font-normal leading-relaxed max-w-xl mb-4 text-base md:text-lg">
                Automate patient communication, lead engagement, scheduling, Voice AI, SMS, and administrative workflows with one intelligent platform.
              </p>
              <p className="fade-up fade-up-delay-2 text-sm md:text-base text-[#55627A] font-normal max-w-xl mb-8">
                Our Super Intelligence (SI) models are designed and pre-trained exclusively for dental practices.
              </p>

              <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="btn-midnight btn-premium accent-button-hover rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Automate My Practice Today <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => scrollToSection("services")}
                  variant="outline"
                  className="learn-more-clear-glow btn-premium rounded-full border border-[#8593A6] bg-white text-[#1D2939] px-8 py-3 text-sm font-semibold tracking-wide"
                >
                  Learn More
                </Button>
              </div>

              <p className="fade-up fade-up-delay-4 text-xs md:text-sm font-normal text-[#55627A] mt-8 md:mt-16">
                Try our SI automation assistant.
              </p>
            </div>

            {/* Right: AI SaaS product visualization */}
            <div className="relative fade-up fade-up-delay-2 mt-14 min-w-0 max-w-full lg:mt-0">
              <HeroVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Dental Clinic Pain Points Section */}
      <section className="py-16 md:py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Challenges Facing Modern Dental Practices
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-5xl mx-auto">
              NOVAPEX solves the most pressing issues dental practices face today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pain Point 1 */}
            <div className="bg-white p-6 rounded-lg border border-[#D8E0EA] shadow-[0_2px_10px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_30px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg font-bold text-[#17263D] mb-2">Missed Calls</h3>
              <p className="text-[#55627A] text-sm">
                Lost revenue primarily from unanswered patient calls after-hours
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white p-6 rounded-lg border border-[#D8E0EA] shadow-[0_2px_10px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_30px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg font-bold text-[#17263D] mb-2">Slow Lead Response</h3>
              <p className="text-[#55627A] text-sm">
                Delayed follow-up on website inquiries results in lost appointments
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white p-6 rounded-lg border border-[#D8E0EA] shadow-[0_2px_10px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_30px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg font-bold text-[#17263D] mb-2">No-Show Rates</h3>
              <p className="text-[#55627A] text-sm">
                High no-show rates waste valuable time and appointment slots
              </p>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-white p-6 rounded-lg border border-[#D8E0EA] shadow-[0_2px_10px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_30px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg font-bold text-[#17263D] mb-2">Manual Scheduling</h3>
              <p className="text-[#55627A] text-sm">
                Time-consuming manual appointment scheduling ties up front desk staff
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Core Dental Automation Features
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-5xl mx-auto">
             Comprehensive automation solutions designed to optimize every aspect of your practice operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Process Automation */}
            <Card id="feature-admin" className="p-8 scroll-mt-24 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#17263D] mb-4">
                Administrative Processes
              </h3>
              <p className="text-[#55627A] text-sm md:text-base leading-relaxed">
                Automate administrative workflows, digital intake forms are sent
                via SMS, completed information is processed, and synced directly
                with Practice Management Software (PMS).
              </p>
            </Card>

            {/* Workflow Optimization */}
            <Card id="feature-comm" className="p-8 scroll-mt-24 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-6">
                <Cog className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#17263D] mb-4">
                Patient Communication
              </h3>
              <p className="text-[#55627A] text-sm md:text-base leading-relaxed">
                Automated appointment confirmations via SMS, smart
                follow-up campaigns for unscheduled treatment plans,
                and waitlist management to fill last-minute cancellations.
              </p>
            </Card>

            {/* System Integration */}
            <Card id="feature-voice" className="p-8 scroll-mt-24 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.14)] hover:border-[#0D2645]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="icon-tile icon-tile-outline w-12 h-12 rounded-md flex items-center justify-center mb-6">
                <Link2 className="w-6 h-6 text-[#3A5C8C]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#17263D] mb-4">
                Call Handling & Voice AI
              </h3>
              <p className="text-[#55627A] text-sm md:text-base leading-relaxed">
                Voice AI receptionists field after-hours calls 24/7, engage website
                visitors instantly, answer FAQ inquiries, sync with live calendar,
                and book appointments automatically.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Seamless Integration Section */}
      <section className="py-20 md:py-32 bg-[#F7F9FC] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Seamless Practice Management Integration
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-5xl mx-auto">
              NOVAPEX seamlessly integrates with the existing software your practice already uses.
            </p>
          </div>
          <div className="mt-12">
            <Marquee />
          </div>
        </div>
      </section>

      {/* AI-Powered Dental Practice Onboarding Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              SI-Powered Dental Practice Onboarding
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-2xl mx-auto">
              Our SI assistant can even onboard your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Helps you choose the right automation plan</h3>
                <p className="text-[#55627A] text-sm">Our SI assistant guides you through each tier to help you select the right plan for your practice.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Explains each pricing tier in plain language</h3>
                <p className="text-[#55627A] text-sm">Clear explanations of what each plan includes and how it improves patient flow and efficiency.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Collects all implementation details in one conversation</h3>
                <p className="text-[#55627A] text-sm">Streamlined data gathering that eliminates back-and-forth emails.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Guides you through setup with minimal technical interaction</h3>
                <p className="text-[#55627A] text-sm">Simple, step-by-step guidance that anyone on your team can follow.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Prepares your practice for a fast and seamless launch</h3>
                <p className="text-[#55627A] text-sm">Designed and built for dental practices, enabling a smooth rollout with minimal downtime.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#3A5C8C' }} />
              <div>
                <h3 className="font-bold text-[#17263D] mb-2">Trains HR and new hires on company policies and procedures</h3>
                <p className="text-[#55627A] text-sm">Continuous learning and onboarding support for your entire team integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action Section - midnight accent band */}
      <section className="py-20 md:py-24 gradient-midnight relative overflow-hidden">
        {/* Restrained sapphire illumination on the midnight band */}
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-[#0D2645]/20 blur-3xl hero-ambient" />
        <div className="absolute bottom-0 left-1/5 h-64 w-64 rounded-full bg-[#234570]/20 blur-3xl hero-ambient-2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-xl md:text-4xl font-bold text-white mb-4">
              See it in action
            </h2>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("contact")}
                className="glow-sapphire accent-button-hover bg-white text-[#17263D] hover:bg-white px-8 py-3 text-sm font-semibold rounded-full"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 md:py-32 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Why Choose NOVAPEX?
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-6xl mx-auto">
              Dentists choose us for our transparent approach, dependable execution, and track record of delivering amazing results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="icon-tile icon-tile-outline flex items-center justify-center h-12 w-12 rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17263D] mb-2">
                  Rapid Deployment
                </h3>
                <p className="text-[#55627A] text-sm">
                  Fast-track implementation and go live fast with our hassle-free rapid deployment process.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="icon-tile icon-tile-outline flex items-center justify-center h-12 w-12 rounded-md">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17263D] mb-2">
                  Measurable Results
                </h3>
                <p className="text-[#55627A] text-sm">
                  We focus on delivering measurable ROI with transparent tracking and performance metrics.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="icon-tile icon-tile-outline flex items-center justify-center h-12 w-12 rounded-md">
                  <Cog className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17263D] mb-2">
                  Dedicated Support
                </h3>
                <p className="text-[#55627A] text-sm">
                 Our team is always available to provide ongoing support, ensuring your system is optimized and running smoothly.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="icon-tile icon-tile-outline flex items-center justify-center h-12 w-12 rounded-md">
                  <Link2 className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17263D] mb-2">
                  Scalable Solutions
                </h3>
                <p className="text-[#55627A] text-sm">
                 Our SI models are designed and trained to scale, continually improving as your practice grows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-6">
                About NOVAPEX
              </h2>
              <p className="text-base text-[#55627A] mb-6 leading-relaxed">
                We are a team of skilled automation experts dedicated to helping dental
                practices unlock their full potential through intelligent technology.
                With over 10 years of industry experience, we understand the
                unique challenges your practice faces.
              </p>
              <p className="text-base text-[#55627A] mb-8 leading-relaxed">
                Our mission is to empower your practice to achieve excellence
                with smart automation solutions that deliver unmatched
                efficiency and exceptional patient experiences.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                  <div>
                    <h4 className="text-sm font-bold text-[#17263D]">
                      Client-Centric Approach
                    </h4>
                    <p className="text-sm text-[#55627A]">
                      Automation solutions designed around your practice's unique challenges and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                  <div>
                    <h4 className="text-sm font-bold text-[#17263D]">
                      Proven Expertise
                    </h4>
                    <p className="text-sm text-[#55627A]">
                      Deep expertise in software engineering and intelligent application development
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                  <div>
                    <h4 className="text-sm font-bold text-[#17263D]">
                      Continuous Innovation
                    </h4>
                    <p className="text-sm text-[#55627A]">
                      We stay ahead of the curve to deliver the latest cutting-edge automation solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured midnight gradient card */}
            <div className="gradient-slate rounded-lg p-8 border border-[#081B31] shadow-[0_18px_44px_rgba(9,20,35,0.22)] relative overflow-hidden">
              {/* Subtle glass highlight layer */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 45% at 85% -10%, rgba(255,255,255,0.12), transparent 70%)' }} />
              <h3 className="relative text-lg md:text-xl font-bold mb-6 text-white">Our Values</h3>
              <ul className="relative space-y-4 text-sm">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#7C9CC4' }} />
                  <span className="text-[#D1D5DB]">
                    <strong className="text-white">Excellence:</strong> Achieved through precision, dedication, and expertise.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#7C9CC4' }} />
                  <span className="text-[#D1D5DB]">
                    <strong className="text-white">Integrity:</strong> We build trust through
                    transparency and honest communication.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#7C9CC4' }} />
                  <span className="text-[#D1D5DB]">
                    <strong className="text-white">Innovation:</strong> We embrace new technologies
                    and methodologies.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#7C9CC4' }} />
                  <span className="text-[#D1D5DB]">
                    <strong className="text-white">Partnership:</strong> We view our clients as
                    partners in success.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-[#F7F9FC] relative overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#0D2645]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/6 h-80 w-80 rounded-full bg-[#7C9CC4]/10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-6xl mx-auto">
              Choose the automation plan that best fits your practice. All
              plans include dedicated support and regular updates.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center justify-center gap-3 mb-12 md:-mt-1">
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-[#17263D]' : 'text-[#55627A]'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="h-6 w-11"
              />
              <span className={`text-sm font-medium transition-colors duration-300 ${isAnnual ? 'text-[#17263D]' : 'text-[#55627A]'}`}>
                Annual
              </span>
            </div>
            <div className="relative h-6 flex items-center justify-center">
              <span
                className={`inline-block gradient-slate text-white border border-[#D8E0EA]/80 px-3 py-1 rounded-full text-sm font-bold transition-all duration-500 ease-out ${isAnnual ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'}`}
              >
                Save 20%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <Card className="relative p-8 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.1)] transition-shadow flex flex-col">
              <h3 className="text-lg md:text-lg font-bold text-[#17263D] mb-2">
                Essential
              </h3>
              <p className="text-[#55627A] mb-6 text-sm">Perfect for solo practices looking to capture every lead and automate patient communication.</p>
              <div className="mb-6">
                <div className="text-base font-bold text-[#17263D] mb-1">$1,997 Setup</div>
                <div className="text-2xl md:text-3xl text-sm font-bold text-[#17263D]">{essentialPricing.display}</div>
                <div className="text-[#55627A]">{essentialPricing.period}</div>
              </div>
              <Button className="btn-midnight w-full mb-8 font-bold accent-button-hover rounded-full" onClick={() => window.location.href = 'https://buy.stripe.com/6oU6oHeIG9Iz3RG7Wb04800'}>
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-[#17263D] mb-3">What's Included:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">SI Website Chat Assistant</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Instant Lead Capture</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Missed Call Recovery</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">New Patient Qualification</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Automated Scheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Mobile Lead Notifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Automated FAQ Responses</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Monthly Performance Reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Custom SI Training & Installation</span>
                </div>
              </div>
            </Card>

            {/* Growth Plan - Best Seller */}
            <Card className="relative p-8 bg-white flex flex-col transform md:scale-105 glow-sapphire transition-shadow" style={{ borderWidth: '2px', borderColor: '#17263D' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full gradient-slate border border-[#D8E0EA] px-4 py-1.5 text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_4px_18px_rgba(9,20,35,0.35)]">
                  <Crown className="w-3.5 h-3.5" />
                  Best Seller
                </span>
              </div>
              <h3 className="text-lg md:text-lg font-bold text-[#17263D] mb-2 mt-4">
                Growth
              </h3>
              <p className="text-[#55627A] mb-6 text-sm">Our most popular solution for practices ready to automate the front desk and increase booked appointments.</p>
              <div className="mb-6">
                <div className="text-base font-bold text-[#17263D] mb-1">$2,997 Setup</div>
                <div className="text-2xl md:text-3xl text-sm font-bold text-[#17263D]">{growthPricing.display}</div>
                <div className="text-[#55627A]">{growthPricing.period}</div>
              </div>
              <Button className="btn-midnight w-full font-bold accent-button-hover mb-8 rounded-full" onClick={() => window.location.href = 'https://buy.stripe.com/bJe00j1VUaMD1Jy6S704801'}>
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-[#17263D] mb-3">Everything in Essential, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Voice AI Receptionist</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Automated SMS Follow-Up</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Lead Nurture Campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Recall & Recare Reminders</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Google Review Requests</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">CRM System Integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Insurance & Financing FAQ</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Practice Knowledge Base</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Call Transcripts & Analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Staff Onboarding & Training</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">30 Days of SI Optimization</span>
                </div>
              </div>
            </Card>

            {/* Elite Plan */}
            <Card className="relative p-8 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.1)] transition-shadow flex flex-col">
              <h3 className="text-lg md:text-lg font-bold text-[#17263D] mb-2">
                Elite
              </h3>
              <p className="text-[#55627A] mb-6 text-sm">Complete SI-powered patient acquisition and communication system for high-volume and multi-location practices.</p>
              <div className="mb-6">
                <div className="text-base font-bold text-[#17263D] mb-1">$5,997 Setup</div>
                <div className="text-2xl md:text-3xl text-sm font-bold text-[#17263D]">{elitePricing.display}</div>
                <div className="text-[#55627A]">{elitePricing.period}</div>
              </div>
              <Button className="btn-midnight w-full mb-8 font-bold accent-button-hover rounded-full" onClick={() => window.location.href = 'https://buy.stripe.com/9B6cN56ca5sj5ZOfoD04802'}>
                Get Started
              </Button>
              <div className="space-y-3 flex-grow text-sm">
                <div className="font-bold text-[#17263D] mb-3">Everything in Growth, Plus:</div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Multi-Location Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">SI Call & SMS Routing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Appointment Scheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Patient Reactivation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Custom SI Workflows</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Implant & Cosmetic Funnels</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Insurance Verification</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Performance Metrics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">24/7 Priority Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Quarterly SI Optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">Knowledge Base Updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D2645' }} />
                  <span className="text-[#1D2939]">White-Glove Setup & Launch</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-[#55627A] mb-4">
              All plans include dedicated support, regular updates, and a
              30-day money-back guarantee.
            </p>
            <div className="mt-12">
              <Button
                onClick={() => scrollToSection("contact")}
                className="btn-midnight px-8 py-3 text-sm font-semibold accent-button-hover rounded-full"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              What Dental Practices Are Saying
            </h2>
            <p className="text-base md:text-lg text-[#55627A] max-w-2xl mx-auto">
              Real results from real dental practices using NOVAPEX
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.12)] transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: '#234570' }}>★</span>
                ))}
              </div>
              <p className="text-sm text-[#1D2939] mb-6 flex-grow">
                "NOVAPEX captured 47 new patients in just 90 days. The missed call text-back system alone recovered over $28K in lost revenue. This is a game-changer for our practice."
              </p>
              <div>
                <p className="font-semibold text-[#17263D]">Dr. Sarah Mitchell</p>
                <p className="text-sm text-[#55627A]">Mitchell Family Dentistry, Miami</p>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.12)] transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: '#234570' }}>★</span>
                ))}
              </div>
              <p className="text-sm text-[#1D2939] mb-6 flex-grow">
                "Our no-show rate dropped 35% since implementing the appointment confirmation system. The SI web assistant handles 80% of our patient inquiries automatically now."
              </p>
              <div>
                <p className="font-semibold text-[#17263D]">Dr. James Chen</p>
                <p className="text-sm text-[#55627A]">Bright Smile Dental, Tampa</p>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.12)] transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: '#234570' }}>★</span>
                ))}
              </div>
              <p className="text-sm text-[#1D2939] mb-6 flex-grow">
                "The voice AI receptionist is incredible. We've reduced front desk workload by 40%, and patients love the instant responses. Our Google reviews have improved significantly."
              </p>
              <div>
                <p className="font-semibold text-[#17263D]">Dr. Lisa Rodriguez</p>
                <p className="text-sm text-[#55627A]">Coastal Dental Group, Jacksonville</p>
              </div>
            </Card>

            {/* Testimonial 4 */}
            <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_14px_36px_rgba(9,20,35,0.12)] transition-shadow flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: '#234570' }}>★</span>
                ))}
              </div>
              <p className="text-sm text-[#1D2939] mb-6 flex-grow">
                "ROI was immediate. We recovered 45 missed calls in the first month alone, translating to $38K in additional revenue. Best investment we've made for our practice."
              </p>
              <div>
                <p className="font-semibold text-[#17263D]">Dr. Michael Thompson</p>
                <p className="text-sm text-[#55627A]">Premier Dental Solutions, Orlando</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-lg text-[#55627A] max-w-6xl mx-auto">
              Find answers to common questions about NOVAPEX and how
              we transform your dental practice.
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
              <CollapsibleTrigger className="w-full faq-trigger">
                <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_28px_rgba(9,20,35,0.12)] transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base text-[#17263D] text-left">
                      What's the typical ROI for dental practices using NOVAPEX?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0D2645] transition-transform ${
                        openFAQ === "roi" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-white border border-[#D8E0EA] border-t-0 rounded-t-none">
                  <p className="text-[13px] md:text-[15px] text-[#55627A] leading-relaxed">
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
              <CollapsibleTrigger className="w-full faq-trigger">
                <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_28px_rgba(9,20,35,0.12)] transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base text-[#17263D] text-left">
                      Does NOVAPEX integrate with our practice management software?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0D2645] transition-transform ${
                        openFAQ === "integration" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-white border border-[#D8E0EA] border-t-0 rounded-t-none">
                  <p className="text-[13px] md:text-[15px] text-[#55627A] leading-relaxed">
                    NOVAPEX integrates with all major practice management software
                    systems, including Dentrix, Eaglesoft, Open Dental, and many more.
                    Our Growth and Elite plans also include CRM integration, allowing
                    seamless data flow between NOVAPEX, CRM, and existing PMS.
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
              <CollapsibleTrigger className="w-full faq-trigger">
                <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_28px_rgba(9,20,35,0.12)] transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base text-[#17263D] text-left">
                      How long does NOVAPEX implementation take?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0D2645] transition-transform ${
                        openFAQ === "implementation" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-white border border-[#D8E0EA] border-t-0 rounded-t-none">
                  <p className="text-[13px] md:text-[15px] text-[#55627A] leading-relaxed">
                    Essential plan setup takes 3-5 business days. Growth plan
                    typically takes 5-7 business days, while Elite
                    plans with white-glove setup can be fully operational within
                    7-10 business days. All timelines include custom SI training
                    exclusive to your practice, staff onboarding, and seamless
                    integration with your practice management software.
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
              <CollapsibleTrigger className="w-full faq-trigger">
                <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_28px_rgba(9,20,35,0.12)] transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base text-[#17263D] text-left">
                      How quickly will we see new patients from NOVAPEX?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0D2645] transition-transform ${
                        openFAQ === "patients" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-white border border-[#D8E0EA] border-t-0 rounded-t-none">
                  <p className="text-[13px] md:text-[15px] text-[#55627A] leading-relaxed">
                    Most practices see new patient appointments within the first
                    week of going live. The SI web assistant captures leads 24/7, and
                    automated SMS follow-up sequences ensure no one falls through
                    the cracks. Growth and Elite plans include missed call
                    recovery, which immediately converts missed calls into
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
              <CollapsibleTrigger className="w-full faq-trigger">
                <Card className="p-6 bg-white border border-[#D8E0EA] shadow-[0_2px_12px_rgba(9,20,35,0.04)] hover:shadow-[0_10px_28px_rgba(9,20,35,0.12)] transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base text-[#17263D] text-left">
                      What kind of support does NOVAPEX provide?
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0D2645] transition-transform ${
                        openFAQ === "support" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="p-6 mt-2 bg-white border border-[#D8E0EA] border-t-0 rounded-t-none">
                  <p className="text-[13px] md:text-[15px] text-[#55627A] leading-relaxed">
                    All plans include email and chat support. The Essential plan
                    customers receive standard support, while the Growth plan
                    customers get priority support. Elite plan customers receive
                    24/7 priority support plus a dedicated account manager,
                    quarterly strategy reviews, and unlimited knowledge base
                    updates.
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
      <section id="contact" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-[#17263D] mb-4">
              Get In Touch
            </h2>
            <p className="text-sm md:text-base text-[#55627A] max-w-6xl mx-auto">
              Ready to transform your practice? Contact us today to discuss how
              we can help you achieve your automation goals.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form action="https://formspree.io/f/xvzjnrvy" method="POST" onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1D2939] mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2 border border-[#8593A6] rounded-lg focus:ring-2 focus:ring-[#0D2645] focus:border-transparent text-sm md:text-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2939] mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-[#8593A6] rounded-lg focus:ring-2 focus:ring-[#0D2645] focus:border-transparent text-sm md:text-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2939] mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 border border-[#8593A6] rounded-lg focus:ring-2 focus:ring-[#0D2645] focus:border-transparent text-sm md:text-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D2939] mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your automation needs..."
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-[#8593A6] rounded-lg focus:ring-2 focus:ring-[#0D2645] focus:border-transparent text-sm md:text-xs"
                  />
                </div>

                {formMessage && (
                  <div
                    className={`p-4 rounded-lg text-sm font-medium ${
                      formMessage.type === 'success'
                        ? 'bg-[#EAF6F1] text-[#0F7B5F] border border-[#0F7B5F]/30'
                        : 'bg-[#FDEEEC] text-[#B42318] border border-[#B42318]/30'
                    }`}
                  >
                    {formMessage.type === 'success' ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {formMessage.text}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {formMessage.text}
                      </div>
                    )}
                  </div>
                )}

              <Button
                type="submit"
                disabled={formLoading}
                className="btn-midnight w-full py-3 text-sm font-bold accent-button-hover rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#17263D] mb-6">
                  Contact Information
                </h3>
                  <div className="flex gap-4 mb-6">
                    <Building2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                    <div>
                      <h4 className="text-sm font-bold text-[#17263D]">NOVAPEX</h4>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                    <div>
                      <h4 className="text-sm font-bold text-[#17263D]">Phone</h4>
                      <p className="text-sm text-[#55627A]">+1 (561) 565-0673</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                    <div>
                      <h4 className="text-sm font-bold text-[#17263D]">Email</h4>
                      <p className="text-sm text-[#55627A]">info@novapexautomation.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0D2645' }} />
                    <div>
                      <h4 className="text-sm font-bold text-[#17263D]">Address</h4>
                      <p className="text-sm text-[#55627A]">
                        South Florida Based - Serving Dental Practices Nationwide
                      </p>
                    </div>
                  </div>
              </div>

              <div className="bg-[#F7F9FC] p-6 rounded-lg border border-[#D8E0EA]">
                <h4 className="text-sm font-bold text-[#17263D] mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm text-[#55627A]">
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
      <footer
        className="text-white py-12 gradient-slate relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 15% 0%, rgba(124, 156, 196, 0.16), transparent 70%), radial-gradient(ellipse 60% 35% at 100% 10%, rgba(124, 156, 196, 0.12), transparent 70%), linear-gradient(135deg, #030B16 0%, #071322 55%, #0B1E38 100%)",
        }}
      >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Footer Top - 4 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand Column */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="/logo.png" alt="NOVAPEX" className="w-[48px] h-[48px]" />
                  <span className="text-lg font-bold text-white">NOVAPEX LLC</span>
                </div>
                <p className="text-sm text-[#D1D5DB] mb-4">
                  Transforming Dental Practices Through Intelligent Automation.
                </p>
                <div className="space-y-2 text-sm text-[#D1D5DB]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: '#7C9CC4' }} />
                    <a href="tel:+15615650673" className="hover:text-white transition-colors">
                      +1 (561) 565-0673
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: '#7C9CC4' }} />
                    <a href="mailto:info@novapexautomation.com" className="hover:text-white transition-colors">
                      info@novapexautomation.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <h4 className="font-bold mb-4 text-white">Navigation</h4>
                <ul className="space-y-2 text-sm text-[#D1D5DB]">
                  <li>
                    <button onClick={() => scrollToSection("home")} className="hover:text-white transition-colors">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">
                      About
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors">
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("testimonials")} className="hover:text-white transition-colors">
                      Testimonials
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors">
                      FAQ
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Features Column */}
              <div>
                <h4 className="font-bold mb-4 text-white">Features</h4>
                <ul className="space-y-2 text-sm text-[#D1D5DB]">
                  <li>
                    <a href="#feature-admin" className="hover:text-white transition-colors">
                      Administrative Processes
                    </a>
                  </li>
                  <li>
                    <a href="#feature-comm" className="hover:text-white transition-colors">
                      Patient Communication
                    </a>
                  </li>
                  <li>
                    <a href="#feature-voice" className="hover:text-white transition-colors">
                      Call Handling & Voice AI
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61593033964711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D1D5DB] hover:text-white transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/novapex-automation/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D1D5DB] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center text-sm text-[#D1D5DB] gap-4">
                <p>&copy; 2026 NOVAPEX. All rights reserved.</p>
                <div className="flex gap-6 justify-center">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}
