// Shared data between admin and main website
// This is the single source of truth for portfolio content

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  company: string;
  year: string;
  tags: string[];
  image: string;
  password?: string;
  isPublished: boolean;
}

export interface PortfolioData {
  projects: Project[];
  hiddenPhotos: number[];
  lastUpdated: string;
}

// Default portfolio data
export const defaultPortfolioData: PortfolioData = {
  projects: [
    {
      id: "spring-savings",
      title: "Spring Savings — Mobile App",
      description: "Mobile-first savings companion disrupting the UK savings market for Paragon Bank",
      slug: "spring-savings",
      company: "Paragon Bank",
      year: "2024",
      tags: ["Banking", "Branding", "Mobile Design"],
      image: "/assets/spring-savings-hero.jpg",
      isPublished: true,
    },
    {
      id: "phygital-hospital",
      title: "Phygital Hospital Check-In",
      description: "AI-driven multichannel admission experience for scheduled surgeries — kiosk + mobile synced in real time",
      slug: "phygital-hospital-check-in",
      company: "Healthcare UX",
      year: "2026",
      tags: ["Healthcare UX", "AI Agents", "Service Design"],
      image: "/assets/phygital-hero.jpg",
      isPublished: true,
    },
    {
      id: "agentic-ux-design-system",
      title: "Agentic UX Design System",
      description: "Enterprise design system bridging human-AI collaboration patterns across 40+ teams",
      slug: "agentic-ux-design-system",
      company: "OutSystems",
      year: "2025",
      tags: ["AGENTIC UX", "Design Systems", "Enterprise"],
      image: "/assets/agentic-system-hero.jpg",
      isPublished: true,
    },
    {
      id: "mobility-app",
      title: "Mobility: App — a Dev Portal ROC",
      description: "Developer portal reimagined as a Retrieval-Optimized Canvas for API discoverability and onboarding",
      slug: "mobility-app",
      company: "Tech Company",
      year: "2018",
      tags: ["UX/UI", "Developer Tools", "Portal Design"],
      image: "/assets/mobility-hero.jpg",
      isPublished: true,
    },
  ],
  hiddenPhotos: [],
  lastUpdated: new Date().toISOString(),
};

// Load data from localStorage or use defaults
export function getPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem("portfolioData");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
  return defaultPortfolioData;
}

// Save data to localStorage
export function savePortfolioData(data: PortfolioData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem("portfolioData", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving portfolio data:", error);
  }
}

// Export/Import data as JSON (for backup)
export function exportPortfolioData(): string {
  const data = getPortfolioData();
  return JSON.stringify(data, null, 2);
}

export function importPortfolioData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as PortfolioData;
    savePortfolioData(data);
    return true;
  } catch (error) {
    console.error("Error importing portfolio data:", error);
    return false;
  }
}
