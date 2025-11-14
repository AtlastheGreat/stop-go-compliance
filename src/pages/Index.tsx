import { useState } from "react";
import { Play, CheckCircle, Moon, Clock, Coffee } from "lucide-react";
import Layout, { useLanguage } from "@/components/Layout";
import WizardButton from "@/components/wizard/WizardButton";
import ResultCard from "@/components/wizard/ResultCard";

type WizardStep = "initial" | "finished-driving" | "ending-day" | "result";
type FlowType = "finished-driving" | "ending-day" | "starting-day";

interface WizardState {
  flow: FlowType | null;
  driveTime: string | null;
  breakType: string | null;
  totalDrive: string | null;
  extensions: string | null;
}

const Index = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<WizardStep>("initial");
  const [wizardState, setWizardState] = useState<WizardState>({
    flow: null,
    driveTime: null,
    breakType: null,
    totalDrive: null,
    extensions: null,
  });

  const [result, setResult] = useState<{
    status: "legal" | "warning" | "violation";
    title: string;
    subtitle: string;
    message: string;
  } | null>(null);

  const handleInitialChoice = (flow: FlowType) => {
    setWizardState({ ...wizardState, flow });
    
    if (flow === "starting-day") {
      setResult({
        status: "legal",
        title: t("statusLegal"),
        subtitle: t("legalTag"),
        message: t("startDayMessage"),
      });
      setStep("result");
    } else if (flow === "finished-driving") {
      setStep("finished-driving");
    } else if (flow === "ending-day") {
      setStep("ending-day");
    }
  };

  const checkDrivingBreakRules = (driveTime: string, breakType: string) => {
    if (driveTime === "4.5h" || driveTime === "other") {
      if (
        breakType === "full-rest" ||
        breakType === "45min" ||
        breakType === "15-then-30"
      ) {
        return {
          status: "legal" as const,
          title: t("statusLegal"),
          subtitle: t("legalTag"),
          message: "Your previous break was valid and resets your driving clock. You have 4.5 hours of driving time available.",
        };
      } else {
        return {
          status: "violation" as const,
          title: t("statusViolation"),
          subtitle: t("violationTag"),
          message: "You drove for 4.5 hours, but your previous break was not sufficient to reset the clock. SUGGESTION: You must take a full 45-minute break immediately.",
        };
      }
    }

    const remainingTime = driveTime === "2h" ? "2.5" : driveTime === "2-4h" ? "0.5-2.5" : "4";

    if (
      breakType === "full-rest" ||
      breakType === "45min" ||
      breakType === "15-then-30"
    ) {
      return {
        status: "legal" as const,
        title: t("statusLegal"),
        subtitle: t("legalTag"),
        message: `You are fully compliant. You have approximately ${remainingTime} hours of driving time remaining before you must take a 45-minute break.`,
      };
    } else if (breakType === "15min") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: "You have correctly started a split break (15 min). SUGGESTION: To complete this break, your next break must be at least 30 minutes (taken within your 4.5h driving limit).",
      };
    } else if (breakType === "30min") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: "Your 30-minute break does not count as the first part of a split break (it must be 15-min first). SUGGESTION: Your next break must be a full 45-minute break.",
      };
    }

    return {
      status: "warning" as const,
      title: t("statusWarning"),
      subtitle: t("warningTag"),
      message: "Your break type is unclear. Please ensure you take a full 45-minute break before continuing.",
    };
  };

  const checkDailyDrivingRules = (totalDrive: string, extensions: string) => {
    if (totalDrive === "9h-or-less") {
      return {
        status: "legal" as const,
        title: t("statusLegal"),
        subtitle: t("legalTag"),
        message: "You are compliant with the 9-hour daily driving limit. You can now begin your daily rest period.",
      };
    } else if (totalDrive === "10h") {
      if (extensions === "1st" || extensions === "2nd") {
        return {
          status: "legal" as const,
          title: t("statusLegal"),
          subtitle: t("legalTag"),
          message: "You have legally used one of your two 10-hour extensions for the week. SUGGESTION: You must now begin your daily rest.",
        };
      } else {
        return {
          status: "violation" as const,
          title: t("statusViolation"),
          subtitle: t("violationTag"),
          message: "You cannot drive for 10 hours three times in one week. You are in violation. SUGGESTION: Park the vehicle and report this to your manager.",
        };
      }
    } else {
      return {
        status: "violation" as const,
        title: t("statusViolation"),
        subtitle: t("violationTag"),
        message: "You cannot drive for more than 10 hours in a single day. You are in violation. SUGGESTION: Park the vehicle immediately and report this to your manager.",
      };
    }
  };

  const handleDriveTimeChoice = (driveTime: string) => {
    setWizardState({ ...wizardState, driveTime });
  };

  const handleBreakTypeChoice = (breakType: string) => {
    const result = checkDrivingBreakRules(wizardState.driveTime!, breakType);
    setResult(result);
    setStep("result");
  };

  const handleTotalDriveChoice = (totalDrive: string) => {
    setWizardState({ ...wizardState, totalDrive });
  };

  const handleExtensionsChoice = (extensions: string) => {
    const result = checkDailyDrivingRules(wizardState.totalDrive!, extensions);
    setResult(result);
    setStep("result");
  };

  const resetWizard = () => {
    setStep("initial");
    setWizardState({
      flow: null,
      driveTime: null,
      breakType: null,
      totalDrive: null,
      extensions: null,
    });
    setResult(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-4">
        {/* Initial Step */}
        {step === "initial" && (
          <div className="space-y-10 fade-slide-up">
            <div className="text-center space-y-5 px-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">{t("initialTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("initialSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={Play}
                label={t("startingDay")}
                onClick={() => handleInitialChoice("starting-day")}
              />
              <WizardButton
                icon={CheckCircle}
                label={t("finishedDriving")}
                onClick={() => handleInitialChoice("finished-driving")}
              />
              <WizardButton
                icon={Moon}
                label={t("endingDay")}
                onClick={() => handleInitialChoice("ending-day")}
              />
            </div>
          </div>
        )}

        {/* Finished Driving Flow - Drive Time Question */}
        {step === "finished-driving" && !wizardState.driveTime && (
          <div className="space-y-10 fade-slide-down">
            <div className="text-center space-y-5 px-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">{t("driveTimeTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("driveTimeSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={Clock}
                label={t("drive2h")}
                onClick={() => handleDriveTimeChoice("2h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label={t("drive2to4h")}
                onClick={() => handleDriveTimeChoice("2-4h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label={t("drive45h")}
                onClick={() => handleDriveTimeChoice("4.5h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label={t("driveOther")}
                onClick={() => handleDriveTimeChoice("other")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Finished Driving Flow - Break Type Question */}
        {step === "finished-driving" && wizardState.driveTime && (
          <div className="space-y-10 fade-slide-down">
            <div className="text-center space-y-5 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{t("breakTypeTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("breakTypeSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={Coffee}
                label={t("breakFullRest")}
                onClick={() => handleBreakTypeChoice("full-rest")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label={t("break45min")}
                onClick={() => handleBreakTypeChoice("45min")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label={t("break15then30")}
                onClick={() => handleBreakTypeChoice("15-then-30")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label={t("break30min")}
                onClick={() => handleBreakTypeChoice("30min")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label={t("break15min")}
                onClick={() => handleBreakTypeChoice("15min")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Ending Day Flow - Total Drive Question */}
        {step === "ending-day" && !wizardState.totalDrive && (
          <div className="space-y-10 fade-slide-down">
            <div className="text-center space-y-5 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{t("totalDriveTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("totalDriveSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={Clock}
                label={t("drive9hOrLess")}
                onClick={() => handleTotalDriveChoice("9h-or-less")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label={t("drive10h")}
                onClick={() => handleTotalDriveChoice("10h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label={t("driveMoreThan10h")}
                onClick={() => handleTotalDriveChoice("more-than-10h")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Ending Day Flow - Extensions Question */}
        {step === "ending-day" && wizardState.totalDrive === "10h" && (
          <div className="space-y-10 fade-slide-down">
            <div className="text-center space-y-5 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{t("extensionsTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("extensionsSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={CheckCircle}
                label={t("extension1st")}
                onClick={() => handleExtensionsChoice("1st")}
                variant="secondary"
              />
              <WizardButton
                icon={CheckCircle}
                label={t("extension2nd")}
                onClick={() => handleExtensionsChoice("2nd")}
                variant="secondary"
              />
              <WizardButton
                icon={CheckCircle}
                label={t("extension3rdPlus")}
                onClick={() => handleExtensionsChoice("3rd-or-more")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Result */}
        {step === "result" && result && (
          <div className="space-y-10 px-4">
            <ResultCard 
              status={result.status} 
              title={result.title} 
              subtitle={result.subtitle}
              message={result.message} 
            />

            <div className="flex justify-center">
              <button
                onClick={resetWizard}
                className="px-10 py-4 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg rounded-2xl button-hover-scale float-shadow transition-all"
              >
                {t("checkAnother")}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
