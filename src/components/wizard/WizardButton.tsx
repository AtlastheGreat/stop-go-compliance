import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary";
}

const WizardButton = ({ icon: Icon, label, onClick, variant = "default" }: WizardButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`w-full max-w-full overflow-hidden min-w-0 py-3 sm:py-6 px-3 sm:px-8 text-left flex items-center gap-2 sm:gap-6 sm:button-hover-scale sm:float-shadow rounded-2xl ${
        variant === "default"
          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
          : "bg-white hover:bg-white/90 text-foreground"
      }`}
      size="lg"
    >
      <div className={`shrink-0 w-8 h-8 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
        variant === "default" ? "bg-primary-foreground/20" : "bg-primary/10"
      }`}>
        <Icon className="w-4 h-4 sm:w-7 sm:h-7" strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-sm sm:text-lg flex-1 min-w-0 break-words leading-tight sm:leading-snug">{label}</span>
    </Button>
  );
};

export default WizardButton;
