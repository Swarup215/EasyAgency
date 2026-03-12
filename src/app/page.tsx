'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  Menu, X, Globe, UtensilsCrossed, Cog, Code2, 
  Smartphone, Zap, Palette, Brain, ArrowRight, 
  ExternalLink, Phone, Mail, MessageCircle, ChevronDown,
  Check, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'portfolio', 'pricing', 'about', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Easy Agency</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="btn-primary text-white border-0">
                Get Your Website
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-b border-border/50"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 text-base font-medium transition-colors rounded-lg cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-2"
              >
                <Button className="w-full btn-primary text-white border-0">
                  Get Your Website
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer setState to avoid cascading renders
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Fixed positions for particles to avoid hydration mismatch
  const particlePositions = [
    { x: 10, y: 20 }, { x: 80, y: 15 }, { x: 25, y: 60 },
    { x: 90, y: 40 }, { x: 50, y: 80 }, { x: 15, y: 90 },
    { x: 75, y: 70 }, { x: 35, y: 30 }, { x: 60, y: 10 },
    { x: 45, y: 50 }, { x: 20, y: 45 }, { x: 85, y: 85 },
    { x: 5, y: 35 }, { x: 95, y: 55 }, { x: 40, y: 95 },
    { x: 70, y: 25 }, { x: 30, y: 75 }, { x: 55, y: 65 },
    { x: 65, y: 5 }, { x: 12, y: 55 }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Floating Elements */}
      {mounted && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/10 rounded-full"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6 md:space-y-8"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Websites &{' '}
            <span className="gradient-text">Automation Systems</span>
            {' '}That Help Businesses Grow
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto space-y-4"
          >
            <p>
              Easy Agency builds modern websites and smart automation systems that help restaurants, cafés, clinics, and local businesses attract more customers, improve their online presence, and streamline their operations.
            </p>
            <p className="font-medium text-foreground">
              Our goal is simple: <span className="gradient-text font-semibold">help your business grow using powerful digital tools.</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('portfolio')
                if (element) {
                  const offset = element.getBoundingClientRect().top + window.pageYOffset - 80
                  window.scrollTo({ top: offset, behavior: 'smooth' })
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="btn-primary text-white border-0 px-8">
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('contact')
                if (element) {
                  const offset = element.getBoundingClientRect().top + window.pageYOffset - 80
                  window.scrollTo({ top: offset, behavior: 'smooth' })
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="outline" className="px-8">
                Start Your Project
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Service Card Component
function ServiceCard({ icon: Icon, title, description, features, perfectFor, delay }: {
  icon: React.ElementType
  title: string
  description: string
  features?: string[]
  perfectFor?: string[]
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay }}
      className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-5 leading-relaxed">{description}</p>
        
        {features && (
          <div className="mb-5">
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {perfectFor && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Perfect for:</span> {perfectFor.join(', ')}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Services Section
function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Globe,
      title: 'Business Websites',
      description: 'We design professional business websites that establish credibility and turn visitors into customers.',
      features: [
        'Fast and mobile-friendly',
        'Designed with modern UI/UX',
        'Optimized for Google search',
        'Built to showcase your services clearly',
      ],
      perfectFor: ['Clinics', 'Salons', 'Agencies', 'Local businesses', 'Startups'],
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant & Café Websites',
      description: 'Restaurants and cafés need a strong online presence to attract new customers.',
      features: [
        'Interactive digital menu',
        'Google Maps integration',
        'Reservation or booking system',
        'WhatsApp ordering',
        'Mobile optimized design',
        'Photo gallery for dishes and ambience',
      ],
    },
    {
      icon: Cog,
      title: 'Automation Systems',
      description: 'Many businesses waste hours doing repetitive tasks. We build automation systems that save time and improve efficiency.',
      features: [
        'Automated notifications',
        'Customer reminders',
        'Research update systems',
        'Social media workflows',
        'Email automation',
        'Data dashboards',
      ],
    },
    {
      icon: Code2,
      title: 'Custom Web Applications',
      description: 'For businesses that need advanced systems, we build custom web applications tailored to their workflow.',
      features: [
        'Appointment booking systems',
        'Admin dashboards',
        'Customer management systems',
        'Data analytics platforms',
        'Internal business tools',
      ],
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Digital solutions designed to help businesses grow faster online.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Card Component
function PortfolioCard({ title, description, features, url, image, delay }: {
  title: string
  description: string
  features: string[]
  url: string
  image: string
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ delay, duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Project Preview Image */}
      <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-white text-primary hover:bg-white/90 shadow-lg px-6">
              Visit Website
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <span 
              key={idx}
              className="text-xs px-3 py-1.5 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Portfolio Section
function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'Backyard Cafe Website',
      description: 'A modern restaurant website built with elegant design and responsive layout to provide customers with a seamless browsing experience.',
      features: ['Clean restaurant UI', 'Mobile-first design', 'Menu presentation', 'Fast loading'],
      url: 'https://backyard-cafe-1.onrender.com/',
      image: '/images/cafe-project.png',
    },
    {
      title: 'Dental Hospital Appointment Website',
      description: 'A complete website for a dental clinic that allows patients to easily learn about services and book appointments online.',
      features: ['Appointment booking', 'Service pages', 'Mobile-friendly', 'Healthcare design'],
      url: 'https://drlaxmidentalcare.onrender.com',
      image: '/images/dental-project.png',
    },
    {
      title: 'ASD Research Automation Platform',
      description: 'An automation platform designed to deliver daily research updates to doctors. This system collects and organizes research papers and sends updates automatically.',
      features: ['Automated updates', 'Data organization', 'Simple dashboard'],
      url: 'https://asd-research-brief.onrender.com/',
      image: '/images/research-project.png',
    },
  ]

  return (
    <section id="portfolio" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Selected Work
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Some of the digital solutions we&apos;ve built for real businesses.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.title}
              {...project}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Feature Block Component
function FeatureBlock({ icon: Icon, title, description, delay }: {
  icon: React.ElementType
  title: string
  description: React.ReactNode
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay }}
      className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </motion.div>
  )
}

// Why Choose Us Section
function WhyChooseMeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Palette,
      title: 'Modern & Professional Design',
      description: (
        <>
          <p className="mb-2">Your website is often the first impression customers have of your business.</p>
          <p>We design clean, modern interfaces that make your business look professional and trustworthy.</p>
        </>
      ),
    },
    {
      icon: Globe,
      title: 'Built for Real Business Needs',
      description: (
        <>
          <p className="mb-2">We don&apos;t just build &quot;pretty websites&quot;.</p>
          <p>Every website is designed to help businesses: <span className="font-medium text-foreground">attract customers, present their services clearly, convert visitors into inquiries or bookings.</span></p>
        </>
      ),
    },
    {
      icon: Brain,
      title: 'Automation That Saves Time',
      description: (
        <>
          <p className="mb-2">Beyond websites, we build automation systems that help businesses reduce repetitive work and improve efficiency.</p>
          <p>This allows business owners to focus on running their business while systems handle routine tasks.</p>
        </>
      ),
    },
    {
      icon: Code2,
      title: 'Custom Solutions',
      description: (
        <>
          <p className="mb-2">Every business is different.</p>
          <p>Instead of using generic templates, we build solutions tailored to your business goals and requirements.</p>
        </>
      ),
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-primary mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Our Approach
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            Why Choose Easy Agency
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We focus on building digital solutions that are practical, fast, and designed to help businesses grow.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureBlock
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Card Component
function PricingCard({ title, price, description, features, isPopular, delay }: {
  title: string
  price: string
  description?: string
  features: string[]
  isPopular?: boolean
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ delay, duration: 0.5 }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 ${
        isPopular 
          ? 'bg-gradient-to-b from-primary/5 to-card border-primary/30 shadow-xl shadow-primary/5 scale-[1.02]' 
          : 'bg-card border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-current" />
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-4xl font-bold mb-2">{price}</div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isPopular ? 'bg-primary/20' : 'bg-primary/10'}`}>
              <Check className={`w-3 h-3 ${isPopular ? 'text-primary' : 'text-primary'}`} />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className={`w-full ${isPopular ? 'btn-primary text-white border-0' : ''}`}
          variant={isPopular ? 'default' : 'outline'}
        >
          Start a Project
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.a>
    </motion.div>
  )
}

// Pricing Section
function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const plans = [
    {
      title: 'Starter Website',
      price: '₹8,000 – ₹12,000',
      description: 'Best for small businesses starting their online presence.',
      features: [
        'Professional design',
        'Mobile responsive',
        '1–3 pages',
        'Contact form',
        'Google Maps integration',
        'Basic SEO setup',
      ],
    },
    {
      title: 'Business Website',
      price: '₹15,000 – ₹22,000',
      description: 'Best for growing businesses that need a strong online presence.',
      features: [
        'Everything in Starter',
        '4–6 pages',
        'WhatsApp integration',
        'SEO optimization',
        'Image gallery',
        'Custom design',
      ],
      isPopular: true,
    },
    {
      title: 'Advanced Systems',
      price: 'Custom Quote',
      description: 'Best for businesses that need advanced digital tools.',
      features: [
        'Automation systems',
        'Booking platforms',
        'Dashboards',
        'Custom web applications',
        'Business workflow automation',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple & Transparent Pricing
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing based on your business needs.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              {...plan}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 md:py-32 relative bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
            About Easy Agency
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Easy Agency is a digital solutions studio focused on helping businesses grow through modern websites, intelligent automation systems, and AI-powered tools.
            </p>
            
            <p>
              The agency was founded by <span className="font-semibold text-foreground">Swarup</span> and <span className="font-semibold text-foreground">Ram Tej</span>, two engineers passionate about building practical digital solutions that help businesses improve their online presence and operate more efficiently.
            </p>
            
            <p>
              With expertise in web development, artificial intelligence, and automation, we design and develop systems that are not only visually modern but also built to solve real business problems.
            </p>
            
            <p>
              We have worked with multiple clients across different industries and have built several websites and digital platforms that help businesses present their services professionally, reach more customers online, and streamline their workflows.
            </p>
            
            <p>
              At Easy Agency, we believe that technology should be simple, powerful, and accessible for every business, whether it is a small local café, a healthcare clinic, or a growing startup.
            </p>

            <div className="bg-card border border-border/50 rounded-2xl p-6 my-8">
              <p className="font-medium text-foreground mb-4">Every project we build focuses on four key principles:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Clean and modern design that builds trust with customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Fast and optimized performance across all devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Practical functionality tailored to business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Long-term digital value that helps businesses grow</span>
                </li>
              </ul>
            </div>

            <p className="font-medium text-foreground">
              Our goal is not just to build websites, but to create digital solutions that support real business growth.
            </p>
            
            <p className="text-lg font-semibold text-foreground pt-4">
              At Easy Agency, we believe that every business deserves a strong and professional digital presence.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const phoneNumber = '916300551950' // India format: 91 + 6300551950
  const message = encodeURIComponent("Hi! I'm interested in building a website for my business. Can we discuss?")

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Build Something Great
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planning to build a website or improve your business online? We&apos;d love to hear about your project.
          </motion.p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-border/50 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium mb-1">Phone</p>
                <p className="text-muted-foreground">+91 6300551950</p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium mb-1">Email</p>
                <p className="text-muted-foreground text-sm">lvssk.prakki@gmail.com</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block p-8 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-shadow"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-semibold">Chat on WhatsApp</p>
                  <p className="text-white/80">Get a quick response about your project</p>
                </div>
              </div>
            </motion.a>

            <p className="text-sm text-muted-foreground">
              Click the button above to start a conversation with us directly on WhatsApp.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  const portfolioLinks = [
    { name: 'Backyard Cafe', href: 'https://backyard-cafe-1.onrender.com/' },
    { name: 'Dental Hospital', href: 'https://drlaxmidentalcare.onrender.com' },
    { name: 'ASD Research Automation', href: 'https://asd-research-brief.onrender.com/' },
  ]

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-semibold text-lg">Easy Agency</span>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Building modern websites and smart automation systems for growing businesses.
            </p>
            <p className="text-background/50 text-xs">
              Built by <span className="text-background/70">Swarup</span> & <span className="text-background/70">Ram Tej</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio Links */}
          <div>
            <h4 className="font-semibold mb-4">Portfolio</h4>
            <ul className="space-y-2">
              {portfolioLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-background/70 hover:text-background transition-colors text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 6300551950</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="break-all">lvssk.prakki@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <p className="text-center text-background/50 text-sm">
            © 2026 Easy Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseMeSection />
        <PricingSection />
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
