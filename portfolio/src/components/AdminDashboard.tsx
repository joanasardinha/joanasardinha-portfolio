import { useState } from "react";
import { Settings, Grid3X3, Lock } from "lucide-react";
import GalleryManager from "./admin/GalleryManager";
import ProjectsManager from "./admin/ProjectsManager";
import PermissionsManager from "./admin/PermissionsManager";

type AdminTab = "gallery" | "projects" | "permissions";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // Initialize admin password from localStorage
  const handleLogin = () => {
    const savedPassword = localStorage.getItem("adminPassword");
    if (!savedPassword) {
      // First time - set password
      localStorage.setItem("adminPassword", inputPassword);
      setPassword(inputPassword);
      setIsLoggedIn(true);
      setInputPassword("");
    } else if (inputPassword === savedPassword) {
      // Correct password
      setIsLoggedIn(true);
      setInputPassword("");
    } else {
      alert("Incorrect password");
      setInputPassword("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInputPassword("");
  };

  if (!isLoggedIn) {
    return (
      <section className="min-h-screen bg-offwhite py-20 flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="bg-white p-8 rounded-lg border border-charcoal/10">
            <h1 className="font-serif text-2xl text-charcoal mb-2">Admin Access</h1>
            <p className="text-charcoal/60 text-sm mb-6">Enter admin password</p>

            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin password"
              className="w-full px-4 py-2 border border-charcoal/20 rounded mb-4 focus:outline-none focus:border-charcoal"
            />

            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-crimson text-offwhite rounded font-semibold hover:bg-crimson/90 transition-all"
            >
              Login
            </button>
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
          <h1 className="font-serif text-2xl text-charcoal">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-charcoal/20 text-charcoal hover:border-charcoal transition-all rounded"
          >
            Logout
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
