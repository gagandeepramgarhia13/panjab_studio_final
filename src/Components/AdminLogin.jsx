import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { supabase } from "../supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans">
      {/* Gold accent line at top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#C8A96A] flex items-center justify-center mb-4">
            <Camera size={26} className="text-black" />
          </div>
          <h1 className="text-white font-bold text-xl">Panjab Studio</h1>
          <p className="text-[#C8A96A] text-sm mt-1">Admin Login</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@panjabstudio.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8A96A] text-black font-semibold text-sm rounded-xl py-3 hover:bg-[#b89558] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-white/20 text-xs text-center mt-6">
          Authorized studio access only
        </p>
      </div>
    </div>
  );
}
