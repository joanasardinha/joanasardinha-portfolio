import { useState, useEffect } from "react";
import { Trash2, Plus, Copy, Check } from "lucide-react";

interface Permission {
  projectId: string;
  projectTitle: string;
  password: string;
}

export default function PermissionsManager() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [newPermission, setNewPermission] = useState({
    projectId: "",
    password: "",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("projectPermissions");
    if (saved) {
      setPermissions(JSON.parse(saved));
    }

    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const savePermissions = (updated: Permission[]) => {
    setPermissions(updated);
    localStorage.setItem("projectPermissions", JSON.stringify(updated));
  };

  const handleAddPermission = () => {
    if (!newPermission.projectId || !newPermission.password) {
      alert("Please select a project and enter a password");
      return;
    }

    const project = projects.find((p) => p.id === newPermission.projectId);
    if (!project) {
      alert("Project not found");
      return;
    }

    // Check if permission already exists for this project
    if (permissions.some((p) => p.projectId === newPermission.projectId)) {
      alert("This project already has a password set");
      return;
    }

    const updated: Permission = {
      projectId: newPermission.projectId,
      projectTitle: project.title,
      password: newPermission.password,
    };

    savePermissions([...permissions, updated]);
    setNewPermission({ projectId: "", password: "" });
  };

  const handleDeletePermission = (projectId: string) => {
    if (confirm("Remove password protection from this project?")) {
      savePermissions(permissions.filter((p) => p.projectId !== projectId));
    }
  };

  const handleUpdatePassword = (projectId: string, newPassword: string) => {
    const updated = permissions.map((p) =>
      p.projectId === projectId ? { ...p, password: newPassword } : p
    );
    savePermissions(updated);
  };

  const copyPassword = (projectId: string) => {
    const permission = permissions.find((p) => p.projectId === projectId);
    if (permission) {
      navigator.clipboard.writeText(permission.password);
      setCopiedId(projectId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const availableProjects = projects.filter(
    (p) => !permissions.some((perm) => perm.projectId === p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Add Permission */}
      <div className="bg-white p-8 rounded border border-charcoal/10 mb-8">
        <h3 className="font-serif text-lg font-bold text-charcoal mb-6">Add Password Protection</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={newPermission.projectId}
              onChange={(e) => setNewPermission({ ...newPermission, projectId: e.target.value })}
              className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            >
              <option value="">Select a project...</option>
              {availableProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Set password"
              value={newPermission.password}
              onChange={(e) => setNewPermission({ ...newPermission, password: e.target.value })}
              className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />
          </div>

          <button
            onClick={handleAddPermission}
            disabled={availableProjects.length === 0}
            className="px-6 py-2 bg-crimson text-offwhite rounded font-semibold hover:bg-crimson/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={18} />
            Add Protection
          </button>
        </div>
      </div>

      {/* Protected Projects */}
      <div>
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Protected Projects</h3>

        {permissions.length === 0 ? (
          <p className="text-charcoal/60 text-center py-8">No projects protected yet</p>
        ) : (
          <div className="space-y-3">
            {permissions.map((perm) => (
              <div
                key={perm.projectId}
                className="bg-white p-6 rounded border border-charcoal/10 flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-serif font-bold text-charcoal">{perm.projectTitle}</p>
                  <p className="text-sm text-charcoal/60 mt-1">Password protected</p>
                </div>

                <div className="flex items-center gap-4 ml-4">
                  <input
                    type="text"
                    value={perm.password}
                    onChange={(e) => handleUpdatePassword(perm.projectId, e.target.value)}
                    className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal w-40"
                  />

                  <button
                    onClick={() => copyPassword(perm.projectId)}
                    className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    {copiedId === perm.projectId ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>

                  <button
                    onClick={() => handleDeletePermission(perm.projectId)}
                    className="p-2 text-charcoal/60 hover:text-crimson transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 bg-offwhite-dark p-6 rounded border border-charcoal/10">
        <p className="text-sm text-charcoal/70">
          💡 <strong>How it works:</strong> Set a password for any project to require authentication before viewers can access it. Passwords are stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
