import { useState } from "react";
import { Lock, AlertCircle, X } from "lucide-react";

interface PasswordModalProps {
  onSubmit: (password: string) => boolean;
  onClose?: () => void;
}

export default function PasswordModal({ onSubmit, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    const success = onSubmit(password);
    if (!success) {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-sm w-full p-8 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close password modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-crimson rounded-full flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
        </div>

        <h2 className="font-serif text-charcoal font-bold text-2xl text-center mb-3">
          Password Protected
        </h2>
        <p className="text-charcoal/60 text-center text-sm mb-6">
          This project requires a password to view.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
              Enter Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password…"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full border border-black/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
            />
          </div>

          {error && (
            <p className="text-crimson text-xs flex items-center gap-1.5">
              <AlertCircle size={12} />
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-burgundy text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-charcoal transition-colors duration-200"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
