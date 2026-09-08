import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import MedisCaseStudy from "./MedisCaseStudy";
import DevSummitCaseStudy from "./DevSummitCaseStudy";
import SpringSavingsCaseStudy from "./SpringSavingsCaseStudy";
import HospitalCaseStudy from "./HospitalCaseStudy";
import MobilityCaseStudy from "./MobilityCaseStudy";
import AgenticDSCaseStudy from "./AgenticDSCaseStudy";
import PluxeeCaseStudy from "./PluxeeCaseStudy";

const projectMap: Record<string, React.ReactNode> = {
  "medis": <MedisCaseStudy />,
  "medconnect": <MedisCaseStudy />,
  "devsummit": <DevSummitCaseStudy />,
  "helio": <DevSummitCaseStudy />,
  "spring": <SpringSavingsCaseStudy />,
  "volta": <SpringSavingsCaseStudy />,
  "hospital": <HospitalCaseStudy />,
  "techforge": <HospitalCaseStudy />,
  "mobility": <MobilityCaseStudy />,
  "fintrack": <MobilityCaseStudy />,
  "agenticds": <AgenticDSCaseStudy />,
  "nomad": <AgenticDSCaseStudy />,
  "pluxee": <PluxeeCaseStudy />,
};

export default function ProjectPage({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unlocked = sessionStorage.getItem(`project_${projectId}`) === "unlocked";
    setIsUnlocked(unlocked);
    setIsLoading(false);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-burgundy flex items-center justify-center">
        <p className="text-offwhite">Loading project...</p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-burgundy flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-offwhite/60 mb-6">This project is password protected.</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-offwhite hover:border-offwhite transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const caseStudy = projectMap[projectId];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-burgundy flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-offwhite/60 mb-6">Project not found.</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-offwhite hover:border-offwhite transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-burgundy">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 pt-6 pb-8 text-offwhite/60 hover:text-offwhite transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </button>
      </div>
      {caseStudy}
    </div>
  );
}
