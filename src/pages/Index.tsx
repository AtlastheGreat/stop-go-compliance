import { useState } from "react";
import { Play, CheckCircle, Moon, Clock, Coffee } from "lucide-react";
import Layout from "@/components/Layout";
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
    message: string;
  } | null>(null);

  const handleInitialChoice = (flow: FlowType) => {
    setWizardState({ ...wizardState, flow });
    
    if (flow === "starting-day") {
      // Simple message for starting day
      setResult({
        status: "legal",
        title: "STATUS: LEGAL (Në Rregull)",
        message: "You can start your shift. Make sure you have had adequate rest (minimum 11 hours or a reduced rest of 9 hours). Remember: You can drive up to 9 hours today (or 10 hours if this is one of your 2 extension days this week).",
      });
      setStep("result");
    } else if (flow === "finished-driving") {
      setStep("finished-driving");
    } else if (flow === "ending-day") {
      setStep("ending-day");
    }
  };

  const checkDrivingBreakRules = (driveTime: string, breakType: string) => {
    // Scenario 1: Drove 4.5 hours or "Other (>4.5h)"
    if (driveTime === "4.5h" || driveTime === "other") {
      if (
        breakType === "full-rest" ||
        breakType === "45min" ||
        breakType === "15-then-30"
      ) {
        return {
          status: "legal" as const,
          title: "STATUS: LEGAL (Në Rregull)",
          message:
            "Your previous break was valid and resets your driving clock. You have 4.5 hours of driving time available.",
        };
      } else {
        return {
          status: "violation" as const,
          title: "STATUS: VIOLATION! (Shkelje!)",
          message:
            "You drove for 4.5 hours, but your previous break was not sufficient to reset the clock. SUGGESTION: You must take a full 45-minute break immediately.",
        };
      }
    }

    // Scenario 2: Drove less than 4.5 hours
    const remainingTime = driveTime === "2h" ? "2.5" : driveTime === "2-4h" ? "0.5-2.5" : "4";

    if (
      breakType === "full-rest" ||
      breakType === "45min" ||
      breakType === "15-then-30"
    ) {
      return {
        status: "legal" as const,
        title: "STATUS: LEGAL (Në Rregull)",
        message: `You are fully compliant. You have approximately ${remainingTime} hours of driving time remaining before you must take a 45-minute break.`,
      };
    } else if (breakType === "15min") {
      return {
        status: "warning" as const,
        title: "STATUS: WARNING (Split Break Started)",
        message:
          "You have correctly started a split break (15 min). SUGGESTION: To complete this break, your next break must be at least 30 minutes (taken within your 4.5h driving limit).",
      };
    } else if (breakType === "30min") {
      return {
        status: "warning" as const,
        title: "STATUS: AT RISK (Rrezik!)",
        message:
          "Your 30-minute break does not count as the first part of a split break (it must be 15-min first). SUGGESTION: Your next break must be a full 45-minute break.",
      };
    }

    return {
      status: "warning" as const,
      title: "STATUS: AT RISK (Rrezik!)",
      message: "Your break type is unclear. Please ensure you take a full 45-minute break before continuing.",
    };
  };

  const checkDailyDrivingRules = (totalDrive: string, extensions: string) => {
    if (totalDrive === "9h-or-less") {
      return {
        status: "legal" as const,
        title: "STATUS: LEGAL (Në Rregull)",
        message:
          "You are compliant with the 9-hour daily driving limit. You can now begin your daily rest period.",
      };
    } else if (totalDrive === "10h") {
      if (extensions === "1st" || extensions === "2nd") {
        return {
          status: "legal" as const,
          title: "STATUS: LEGAL (Extension Used)",
          message:
            "You have legally used one of your two 10-hour extensions for the week. SUGGESTION: You must now begin your daily rest.",
        };
      } else {
        return {
          status: "violation" as const,
          title: "STATUS: VIOLATION! (Shkelje!)",
          message:
            "You cannot drive for 10 hours three times in one week. You are in violation. SUGGESTION: Park the vehicle and report this to your manager.",
        };
      }
    } else {
      return {
        status: "violation" as const,
        title: "STATUS: VIOLATION! (Shkelje!)",
        message:
          "You cannot drive for more than 10 hours in a single day. You are in violation. SUGGESTION: Park the vehicle immediately and report this to your manager.",
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
      <div className="max-w-3xl mx-auto">
        {/* Initial Step */}
        {step === "initial" && (
          <div className="space-y-8 fade-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">What are you doing now?</h2>
              <p className="text-lg text-muted-foreground">Choose your current activity to check compliance</p>
            </div>

            <div className="space-y-4">
              <WizardButton
                icon={Play}
                label="STARTING my day/shift"
                onClick={() => handleInitialChoice("starting-day")}
              />
              <WizardButton
                icon={CheckCircle}
                label="FINISHED a driving block"
                onClick={() => handleInitialChoice("finished-driving")}
              />
              <WizardButton
                icon={Moon}
                label="ENDING my day/shift"
                onClick={() => handleInitialChoice("ending-day")}
              />
            </div>
          </div>
        )}

        {/* Finished Driving Flow - Drive Time Question */}
        {step === "finished-driving" && !wizardState.driveTime && (
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How long did you drive?</h2>
              <p className="text-lg text-muted-foreground">Select the duration of your driving block</p>
            </div>

            <div className="space-y-4">
              <WizardButton
                icon={Clock}
                label="2 hours"
                onClick={() => handleDriveTimeChoice("2h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label="Between 2 and 4 hours"
                onClick={() => handleDriveTimeChoice("2-4h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label="4.5 hours (Maximum)"
                onClick={() => handleDriveTimeChoice("4.5h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label="Other (More than 4.5h)"
                onClick={() => handleDriveTimeChoice("other")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Finished Driving Flow - Break Type Question */}
        {step === "finished-driving" && wizardState.driveTime && (
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">What break did you have BEFORE this drive?</h2>
              <p className="text-lg text-muted-foreground">This determines if your driving was legal</p>
            </div>

            <div className="space-y-4">
              <WizardButton
                icon={Coffee}
                label="A full rest (9+ hours)"
                onClick={() => handleBreakTypeChoice("full-rest")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label="A 45-minute break"
                onClick={() => handleBreakTypeChoice("45min")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label="A 15-min break, then 30-min break (Legal Split)"
                onClick={() => handleBreakTypeChoice("15-then-30")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label="A 30-min break"
                onClick={() => handleBreakTypeChoice("30min")}
                variant="secondary"
              />
              <WizardButton
                icon={Coffee}
                label="A 15-min break only"
                onClick={() => handleBreakTypeChoice("15min")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Ending Day Flow - Total Drive Question */}
        {step === "ending-day" && !wizardState.totalDrive && (
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How much did you drive TODAY (total)?</h2>
              <p className="text-lg text-muted-foreground">Select your total driving time for the day</p>
            </div>

            <div className="space-y-4">
              <WizardButton
                icon={Clock}
                label="9 hours or less"
                onClick={() => handleTotalDriveChoice("9h-or-less")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label="10 hours (Extension)"
                onClick={() => handleTotalDriveChoice("10h")}
                variant="secondary"
              />
              <WizardButton
                icon={Clock}
                label="More than 10 hours"
                onClick={() => handleTotalDriveChoice("more-than-10h")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Ending Day Flow - Extensions Question */}
        {step === "ending-day" && wizardState.totalDrive === "10h" && (
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">How many 10-hour days have you used this week?</h2>
              <p className="text-lg text-muted-foreground">You can only use 2 extensions per week</p>
            </div>

            <div className="space-y-4">
              <WizardButton
                icon={CheckCircle}
                label="This is my 1st"
                onClick={() => handleExtensionsChoice("1st")}
                variant="secondary"
              />
              <WizardButton
                icon={CheckCircle}
                label="This is my 2nd"
                onClick={() => handleExtensionsChoice("2nd")}
                variant="secondary"
              />
              <WizardButton
                icon={CheckCircle}
                label="This is my 3rd (or more)"
                onClick={() => handleExtensionsChoice("3rd-or-more")}
                variant="secondary"
              />
            </div>
          </div>
        )}

        {/* Result */}
        {step === "result" && result && (
          <div className="space-y-8">
            <ResultCard status={result.status} title={result.title} message={result.message} />

            <div className="flex justify-center">
              <button
                onClick={resetWizard}
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl button-hover-scale float-shadow transition-all"
              >
                Check Another Activity
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
