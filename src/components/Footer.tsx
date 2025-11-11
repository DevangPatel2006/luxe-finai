import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-primary/20">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground text-center md:whitespace-nowrap leading-snug">
            Ready to <span className="text-gradient-indigo">master </span>your money with {" "}
            <span className="text-gradient-indigo">AI ?</span>
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of users transforming their financial future
          </p>

          <Link to="/dashboard">
            <Button variant="luxury" size="xl" className="mb-12 glow-cyan">
              Join the Beta
            </Button>
          </Link>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
              Help Center
            </Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="#"
              className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>© {new Date().getFullYear()} FinAIssist — Educational use only</p>
            <p className="text-xs">Built with React, TypeScript, and Three.js</p>
          </div>
        </motion.div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl rounded-full" />
      </div>
    </footer>
  );
}
