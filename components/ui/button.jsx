"use client";

export function Button({ className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-9 px-4 py-2";
  const variants = {
    default: "bg-foreground text-background hover:opacity-90",
    outline:
      "border border-black/10 dark:border-white/20 text-foreground hover:bg-black/5 dark:hover:bg-white/10",
    ghost: "hover:bg-black/5 dark:hover:bg-white/10",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-100 text-foreground hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
    link: "underline underline-offset-4 px-0 h-auto",
  };
  const cls = `${base} ${variants[variant] ?? variants.default} ${className}`;
  return <button className={cls} {...props} />;
}

export default Button;

