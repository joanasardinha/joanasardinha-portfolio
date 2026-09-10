import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  company: string;
  year: string;
  image: string;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    tags: [],
    company: "",
    year: new Date().getFullYear().toString(),
    image: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleCreate = () => {
    const newProject: Project = {
      ...formData,
      id: `project-${Date.now()}`,
    };
    saveProjects([...projects, newProject]);
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
      company: "",
      year: new Date().getFullYear().toString(),
      image: "",
    });
    setIsCreating(false);
  };

  const handleUpdate = () => {
    if (!editingId) return;
    const updated = projects.map((p) => (p.id === editingId ? formData : p));
    saveProjects(updated);
    setEditingId(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
      company: "",
      year: new Date().getFullYear().toString(),
      image: "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      saveProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsCreating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Create Button */}
      <button
        onClick={() => {
          setIsCreating(true);
          setEditingId(null);
          setFormData({
            id: "",
            title: "",
            description: "",
            tags: [],
            company: "",
            year: new Date().getFullYear().toString(),
            image: "",
          });
        }}
        className="mb-8 px-6 py-2 bg-crimson text-offwhite rounded font-semibold hover:bg-crimson/90 transition-all flex items-center gap-2"
      >
        <Plus size={18} />
        Create New Project
      </button>

      {/* Form */}
      {(isCreating || editingId) && (
        <div className="bg-white p-8 rounded border border-charcoal/10 mb-8">
          <h3 className="font-serif text-lg font-bold text-charcoal mb-6">
            {editingId ? "Edit Project" : "Create New Project"}
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />

            <textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal min-h-24"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company/Client"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
              />
              <input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
              />
            </div>

            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 border border-charcoal/20 text-charcoal rounded hover:border-charcoal transition-all"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="px-6 py-2 bg-charcoal text-offwhite rounded font-semibold hover:bg-charcoal/90 transition-all"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-charcoal/60 text-center py-8">No projects yet. Create one to get started!</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded border border-charcoal/10 flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-serif font-bold text-charcoal mb-2">{project.title}</h4>
                <p className="text-sm text-charcoal/60 mb-2">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-charcoal/50">
                  <span>{project.company}</span>
                  <span>{project.year}</span>
                  <div className="flex gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-charcoal/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-charcoal/60 hover:text-crimson transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
