import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Upload, Download, RotateCcw } from "lucide-react";
import { getPortfolioData, savePortfolioData, exportPortfolioData, importPortfolioData, defaultPortfolioData, type Project, type PortfolioData } from "../../data/portfolio";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    slug: "",
    tags: [],
    company: "",
    year: new Date().getFullYear().toString(),
    image: "",
    isPublished: true,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = getPortfolioData();
    setProjects(data.projects);
    setUnsavedChanges(false);
  };

  const saveProjects = (updatedProjects: Project[]) => {
    const data = getPortfolioData();
    data.projects = updatedProjects;
    savePortfolioData(data);
    setProjects(updatedProjects);
    setUnsavedChanges(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, image: base64 });
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!formData.title || !formData.description || !formData.slug) {
      alert("Please fill in title, description, and slug");
      return;
    }

    const newProject: Project = {
      ...formData,
      id: `project-${Date.now()}`,
    };
    saveProjects([...projects, newProject]);
    resetForm();
    setIsCreating(false);
  };

  const handleUpdate = () => {
    if (!editingId) return;
    const updated = projects.map((p) => (p.id === editingId ? formData : p));
    saveProjects(updated);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      saveProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setImagePreview(project.image);
    setEditingId(project.id);
    setIsCreating(false);
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset all projects to defaults? This will overwrite your changes.")) {
      saveProjects(defaultPortfolioData.projects);
    }
  };

  const handleExportData = () => {
    const json = exportPortfolioData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (importPortfolioData(content)) {
          loadProjects();
          alert("Portfolio data imported successfully!");
        } else {
          alert("Failed to import portfolio data. Invalid format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      slug: "",
      tags: [],
      company: "",
      year: new Date().getFullYear().toString(),
      image: "",
      isPublished: true,
    });
    setImagePreview("");
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Controls */}
      {!isCreating && !editingId && (
        <div className="mb-8 flex gap-3 flex-wrap">
          <button
            onClick={() => {
              setIsCreating(true);
              resetForm();
            }}
            className="px-6 py-2 bg-crimson text-offwhite rounded font-semibold hover:bg-crimson/90 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Create New Project
          </button>

          <button
            onClick={handleExportData}
            className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all rounded flex items-center gap-2"
          >
            <Download size={18} />
            Export Backup
          </button>

          <label className="px-6 py-2 border border-charcoal/20 text-charcoal hover:border-charcoal transition-all rounded flex items-center gap-2 cursor-pointer">
            <Upload size={18} />
            Import Backup
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetToDefaults}
            className="px-6 py-2 border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-all rounded flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset Defaults
          </button>
        </div>
      )}

      {/* Form */}
      {(isCreating || editingId) && (
        <div className="bg-white p-8 rounded border border-charcoal/10 mb-8">
          <h3 className="font-serif text-lg font-bold text-charcoal mb-6">
            {editingId ? "Edit Project" : "Create New Project"}
          </h3>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-3">
                Project Image
              </label>
              <div className="border-2 border-dashed border-charcoal/20 rounded-lg p-6 text-center hover:border-charcoal/40 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded"
                    />
                    <p className="text-xs text-charcoal/60">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload size={24} className="mx-auto text-charcoal/40" />
                    <p className="text-sm text-charcoal/60">Click to upload image</p>
                    <p className="text-xs text-charcoal/40">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Text Fields */}
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />

            <input
              type="text"
              placeholder="URL Slug (e.g. spring-savings)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal text-sm"
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
                  tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:border-charcoal"
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-semibold text-charcoal">Published (visible on website)</span>
            </label>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-charcoal/10">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-charcoal/20 text-charcoal rounded hover:border-charcoal transition-all"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="px-6 py-2 bg-charcoal text-offwhite rounded font-semibold hover:bg-charcoal/90 transition-all"
              >
                {editingId ? "Update Project" : "Create Project"}
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
            <div key={project.id} className="bg-white p-6 rounded border border-charcoal/10 flex gap-6">
              {/* Image */}
              {project.image && (
                <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-charcoal/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-serif font-bold text-charcoal mb-2">{project.title}</h4>
                <p className="text-sm text-charcoal/60 mb-3">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-charcoal/50 flex-wrap">
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

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-charcoal/60 hover:text-charcoal transition-colors hover:bg-charcoal/5 rounded"
                  title="Edit project"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-charcoal/60 hover:text-crimson transition-colors hover:bg-crimson/5 rounded"
                  title="Delete project"
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
