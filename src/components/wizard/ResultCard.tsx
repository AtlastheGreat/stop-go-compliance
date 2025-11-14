import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface ResultCardProps {
  status: "legal" | "warning" | "violation";
  title: string;
  message: string;
}

const ResultCard = ({ status, title, message }: ResultCardProps) => {
  const statusConfig = {
    legal: {
      icon: CheckCircle,
      bgColor: "bg-go-green",
      textColor: "text-go-green-foreground",
      borderColor: "border-go-green/20",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-warning",
      textColor: "text-warning-foreground",
      borderColor: "border-warning/20",
    },
    violation: {
      icon: XCircle,
      bgColor: "bg-stop-red",
      textColor: "text-stop-red-foreground",
      borderColor: "border-stop-red/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`scale-up p-8 rounded-2xl ${config.bgColor} ${config.textColor} float-shadow border-2 ${config.borderColor}`}>
      <div className="flex items-start space-x-4">
        <Icon className="w-12 h-12 flex-shrink-0" />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg leading-relaxed opacity-95">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
