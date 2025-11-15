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
      className={`w-full py-5 sm:py-8 px-5 sm:px-8 text-left inline-flex items-start sm:items-center space-x-3 sm:space-x-6 sm:button-hover-scale sm:float-shadow rounded-2xl whitespace-normal ${
        variant === "default"
          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
          : "bg-white hover:bg-white/90 text-foreground"
      }`}
      size="lg"
    >
      <div className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
        variant === "default" ? "bg-primary-foreground/20" : "bg-primary/10"
      }`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-base sm:text-lg flex-1 break-words leading-snug">{label}</span>
    </Button>
  );
};

export default WizardButton;
