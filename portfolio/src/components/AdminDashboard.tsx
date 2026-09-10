import { useState, useEffect } from "react";
import { Settings, Grid3X3, Lock, LogOut } from "lucide-react";
import GalleryManager from "./admin/GalleryManager";
import ProjectsManager from "./admin/ProjectsManager";
import PermissionsManager from "./admin/PermissionsManager";

type AdminTab = "gallery" | "projects" | "permissions";

// Admin credentials
const ADMIN_EMAIL = "joanasardinha15@gmail.com";
const ADMIN_PASSWORD = "Jrss1992!";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    // Check if already logged in from sessionStorage
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      setSessionToken(token);
    }
  }, []);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("adminToken", token);
      setSessionToken(token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid email or password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setSessionToken("");
    setEmail("");
    setPassword("");
    setError("");
  };

  if (!isLoggedIn) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-charcoal to-charcoal/80 py-20 flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="bg-offwhite p-8 rounded-lg border border-crimson/20 shadow-2xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl text-charcoal mb-2">Admin Portal</h1>
              <p className="text-charcoal/60 text-sm">Secure access to manage your portfolio</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-crimson/10 border border-crimson text-crimson text-sm rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Email"
                className="w-full px-4 py-3 border border-charcoal/20 rounded focus:outline-none focus:border-crimson bg-white"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Password"
                className="w-full px-4 py-3 border border-charcoal/20 rounded focus:outline-none focus:border-crimson bg-white"
              />

              <button
                onClick={handleLogin}
                className="w-full px-4 py-3 bg-crimson text-offwhite rounded font-semibold hover:bg-crimson/90 transition-all"
              >
                Sign In
              </button>
            </div>

            <p className="text-xs text-charcoal/40 mt-6 text-center">
              🔒 Your session is secure and stored locally
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-offwhite">
      {/* Header */}
      <div className="bg-white border-b border-charcoal/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-charcoal">Admin Dashboard</h1>
            <p className="text-xs text-charcoal/60 mt-1">joanasardinha15@gmail.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-crimson text-crimson hover:bg-crimson/10 transition-all rounded flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-8">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-4 px-2 border-b-2 font-semibold text-sm flex items-center gap-2 transition-all ${
              activeTab === "gallery"
                ? "border-crimson text-crimson"
                : "border-transparent text-charcoal/60 hover:text-charcoal"
            }`}
          >
            <Grid3X3 size={18} />
            Gallery Manager
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`py-4 px-2 border-b-2 font-semibold text-sm flex items-center gap-2 transition-all ${
              activeTab === "projects"
                ? "border-crimson text-crimson"
                : "border-transparent text-charcoal/60 hover:text-charcoal"
            }`}
          >
            <Settings size={18} />
            Projects Manager
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`py-4 px-2 border-b-2 font-semibold text-sm flex items-center gap-2 transition-all ${
              activeTab === "permissions"
                ? "border-crimson text-crimson"
                : "border-transparent text-charcoal/60 hover:text-charcoal"
            }`}
          >
            <Lock size={18} />
            Permissions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeTab === "gallery" && <GalleryManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "permissions" && <PermissionsManager />}
      </div>
    </section>
  );
}
