export function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`text-base font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

export default Card;

