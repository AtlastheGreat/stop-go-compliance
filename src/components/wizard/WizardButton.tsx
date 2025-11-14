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
      className={`w-full py-6 sm:py-8 px-6 sm:px-8 text-left flex items-center space-x-4 sm:space-x-6 button-hover-scale float-shadow rounded-2xl ${
        variant === "default"
          ? "bg-primary hover:bg-primary-hover text-primary-foreground"
          : "bg-white hover:bg-white/90 text-foreground"
      }`}
      size="lg"
    >
      <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
        variant === "default" ? "bg-primary-foreground/20" : "bg-primary/10"
      }`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-base sm:text-lg flex-1">{label}</span>
    </Button>
  );
};

export default WizardButton;
