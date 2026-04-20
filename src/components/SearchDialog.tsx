import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchPage {
  title: string;
  description: string;
  path: string;
}

const searchIndex: SearchPage[] = [
  { title: "Home", description: "AI scam protection and cybersecurity for Ohio families", path: "/" },
  { title: "AI Services", description: "AI receptionist, automation, and business services", path: "/ai" },
  { title: "Workshops", description: "AI scam prevention workshops for seniors and families", path: "/training" },
  { title: "Library", description: "Cybersecurity guides and digital safety tools", path: "/library" },
  { title: "Digital Library", description: "E-books and guides for digital safety", path: "/library" },
  { title: "About", description: "Veteran-founded cybersecurity team in Kettering Ohio", path: "/about" },
  { title: "Contact", description: "Get in touch with InVision Network", path: "/contact" },
  { title: "FAQ", description: "Frequently asked questions about AI scam protection", path: "/faq" },
  { title: "Events", description: "Upcoming workshops and cybersecurity events in Ohio", path: "/events" },
  { title: "Partners", description: "Technology partners and certifications", path: "/partners" },
  { title: "Careers", description: "Jobs at InVision Network in Dayton Ohio", path: "/careers" },
  { title: "Articles", description: "Cybersecurity news and guides", path: "/articles" },
  { title: "Help Center", description: "Knowledge base and support", path: "/help" },
  { title: "Privacy Policy", description: "How we protect your data", path: "/privacy-policy" },
  { title: "Security", description: "TLS encryption, MFA, SOC 2 infrastructure, and privacy practices", path: "/security" },
  { title: "System Status", description: "Real-time status of InVision Network services", path: "/status" },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.trim()
    ? searchIndex.filter((page) => {
        const q = query.toLowerCase();
        return (
          page.title.toLowerCase().includes(q) ||
          page.description.toLowerCase().includes(q)
        );
      })
    : searchIndex;

  const handleSelect = (path: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-white/[0.06] border-white/15 text-white placeholder:text-white/40"
            autoFocus
          />
        </div>
        <ul className="mt-1 space-y-1 max-h-72 overflow-y-auto">
          {results.length === 0 && (
            <li className="py-4 text-center text-sm text-white/50">No results found.</li>
          )}
          {results.map((page) => (
            <li key={page.path}>
              <button
                type="button"
                onClick={() => handleSelect(page.path)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.07] transition-colors"
              >
                <div className="text-[14px] font-semibold text-white">{page.title}</div>
                <div className="text-[12px] text-white/55">{page.description}</div>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
