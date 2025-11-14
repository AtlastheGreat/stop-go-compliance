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
      className={`w-full py-6 px-6 text-left flex items-center space-x-4 button-hover-scale float-shadow ${
        variant === "default"
          ? "bg-primary hover:bg-primary-hover text-primary-foreground"
          : "bg-white hover:bg-white/90 text-foreground"
      }`}
      size="lg"
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className="font-medium text-base">{label}</span>
    </Button>
  );
};

export default WizardButton;
