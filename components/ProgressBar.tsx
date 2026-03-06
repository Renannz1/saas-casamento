interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  variant?: "default" | "danger";
  className?: string;
}

export default function ProgressBar({ 
  value, 
  max, 
  showLabel = false, 
  variant, 
  className = "" 
}: ProgressBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isOver = value > max;
  const barVariant = variant || (isOver ? "danger" : "default");

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            barVariant === "danger" ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${isOver ? 100 : pct}%` }}
        />
      </div>
      {showLabel && (
        <p className={`text-xs mt-1 font-medium ${isOver ? "text-destructive" : "text-muted-foreground"}`}>
          {pct.toFixed(0)}%{isOver && " — Excedido!"}
        </p>
      )}
    </div>
  );
}
