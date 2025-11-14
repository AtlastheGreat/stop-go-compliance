import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface ResultCardProps {
  status: "legal" | "warning" | "violation";
  title: string;
  subtitle: string;
  message: string;
  funFact?: string;
}

const ResultCard = ({ status, title, subtitle, message, funFact }: ResultCardProps) => {
  const statusConfig = {
    legal: {
      icon: CheckCircle,
      bgColor: "bg-go-green",
      textColor: "text-go-green-foreground",
      borderColor: "border-go-green/30",
      badgeBg: "bg-go-green-foreground/20",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-warning",
      textColor: "text-warning-foreground",
      borderColor: "border-warning/30",
      badgeBg: "bg-warning-foreground/20",
    },
    violation: {
      icon: XCircle,
      bgColor: "bg-stop-red",
      textColor: "text-stop-red-foreground",
      borderColor: "border-stop-red/30",
      badgeBg: "bg-stop-red-foreground/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`scale-up rounded-3xl ${config.bgColor} ${config.textColor} float-shadow border-2 ${config.borderColor} overflow-hidden`}>
      {/* Header Section with Icon and Status */}
      <div className="p-8 pb-6 flex items-start space-x-6">
        <div className={`flex-shrink-0 w-20 h-20 rounded-2xl ${config.badgeBg} flex items-center justify-center`}>
          <Icon className="w-10 h-10" strokeWidth={2.5} />
        </div>
        <div className="flex-1 space-y-3">
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${config.badgeBg}`}>
            {subtitle}
          </div>
          <h3 className="text-3xl font-bold leading-tight">{title}</h3>
        </div>
      </div>

      {/* Message Section */}
      <div className="px-8 pb-8">
        <div className={`p-6 rounded-2xl ${config.badgeBg} backdrop-blur-sm`}>
          <p className="text-lg leading-relaxed font-medium">{message}</p>
        </div>
        
        {/* Fun Fact Section */}
        {funFact && (
          <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20">
            <p className="text-sm leading-relaxed opacity-90 italic">
              💡 {funFact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
