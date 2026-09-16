import { Link } from "react-router-dom";

export default function Button({ children, onClick, href, to, variant = "primary", size = "md", className = "", target }) {

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
    responsive: "px-4 py-1.5 text-xs md:px-6 md:py-2 md:text-sm",
  };

  const variants = {
    outline: "border border-white text-white hover:bg-white hover:text-black",
    primary: "bg-[#C8A45D] text-black hover:bg-[#E0C27A]",
    white: "bg-white text-[var(--text-primary)] hover:bg-[#C8A45D] hover:text-black border border-white hover:border-[#C8A45D]",
    ghost: "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-[#C8A45D] hover:text-black hover:border-[#C8A45D]",
  };

  const base = `inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}