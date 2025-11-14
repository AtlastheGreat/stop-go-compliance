import { useState } from "react";
import { Play, CheckCircle, Moon, Clock, Coffee } from "lucide-react";
import { useLanguage } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { user } = useAuth();
  const { toast } = useToast();
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
  funFact?: string;
  } | null>(null);

  const saveActivity = async (activityData: any) => {
    if (!user) {
      // Guest mode - don't save
      return;
    }

    try {
      const { error } = await supabase.from('driver_activities').insert({
        user_id: user.id,
        flow_type: activityData.flow_type,
        drive_time: activityData.drive_time,
        break_type: activityData.break_type,
        total_drive: activityData.total_drive,
        extensions: activityData.extensions,
        result_status: activityData.result_status,
        result_title: activityData.result_title,
        result_message: activityData.result_message,
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving activity:', error);
      toast({
        title: t('error'),
        description: 'Failed to save activity',
        variant: 'destructive',
      });
    }
  };

  const handleInitialChoice = (flow: FlowType) => {
    setWizardState({ ...wizardState, flow });
    
    if (flow === "starting-day") {
      setResult({
        status: "legal",
        title: t("statusLegal"),
        subtitle: t("legalTag"),
        message: t("startDayMessage"),
        funFact: "A well-rested driver is 50% less likely to be involved in an accident. The daily rest requirements (11 hours or minimum 9 hours reduced) are based on sleep science ensuring drivers get adequate recovery time.",
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
          funFact: "The 4.5-hour rule is based on circadian rhythm research. Studies show that concentration naturally dips after about 4 hours of continuous activity, making breaks essential for safety.",
        };
      } else {
        return {
          status: "violation" as const,
          title: t("statusViolation"),
          subtitle: t("violationTag"),
          message: "You drove for 4.5 hours, but your previous break was not sufficient to reset the clock. SUGGESTION: You must take a full 45-minute break immediately.",
          funFact: "A proper 45-minute break allows both physical and mental recovery. Research shows it reduces micro-sleep episodes (brief moments of unintended sleep) by up to 80%.",
        };
      }
    }

    const remainingTime = driveTime === "2h" ? "2.5" : driveTime === "2-4h" ? "0.5-2.5" : "4";

    if (driveTime === "2-4h" || driveTime === "4h") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: `You are approaching your 4.5-hour limit. You have approximately ${remainingTime} hours remaining. Plan your next break soon.`,
        funFact: "Pro tip: Experienced drivers often take their break at the 4-hour mark rather than waiting for 4.5 hours, ensuring they never cut it too close.",
      };
    }

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
        funFact: "The split break option (15+30 minutes) was introduced to give drivers flexibility while ensuring adequate rest. Many drivers use the 15-minute portion for vehicle checks.",
      };
    } else if (breakType === "15min") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: "You have correctly started a split break (15 min). SUGGESTION: To complete this break, your next break must be at least 30 minutes (taken within your 4.5h driving limit).",
        funFact: "The 15+30 split must be in that exact order because the longer 30-minute portion is when most recovery occurs. The sequence is scientifically designed for optimal fatigue reduction.",
      };
    } else if (breakType === "30min") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: "Your 30-minute break does not count as the first part of a split break (it must be 15-min first). SUGGESTION: Your next break must be a full 45-minute break.",
        funFact: "This rule prevents drivers from gaming the system. The 15-30 sequence was specifically designed based on fatigue research to ensure proper recovery timing.",
      };
    }

    return {
      status: "warning" as const,
      title: t("statusWarning"),
      subtitle: t("warningTag"),
      message: "Your break type is unclear. Please ensure you take a full 45-minute break before continuing.",
      funFact: "When in doubt, take a full 45-minute break. It's not just about compliance—proper rest can save lives, including your own.",
    };
  };

  const checkDailyDrivingRules = (totalDrive: string, extensions: string | null = null) => {
    if (totalDrive === "9h-or-less") {
      return {
        status: "legal" as const,
        title: t("statusLegal"),
        subtitle: t("legalTag"),
        message: "You are compliant with the 9-hour daily driving limit. You can now begin your daily rest period.",
        funFact: "Did you know? The 9-hour daily limit was established after extensive fatigue studies showed that driver alertness significantly decreases after 8-9 hours of continuous driving, increasing accident risk by up to 300%.",
      };
    } else if (totalDrive === "8h") {
      return {
        status: "warning" as const,
        title: t("statusWarning"),
        subtitle: t("warningTag"),
        message: "You have 1 hour remaining of your 9-hour daily limit. Plan to finish your drive soon or prepare to use a 10-hour extension if needed (and you have extensions available).",
        funFact: "Smart planning tip: Professional drivers often plan their routes to account for this time limit, ensuring rest stops are strategically placed to maintain compliance.",
      };
    } else if (totalDrive === "10h") {
      if (extensions === "1st" || extensions === "2nd") {
        return {
          status: "legal" as const,
          title: t("statusLegal"),
          subtitle: t("legalTag"),
          message: "You have legally used one of your two 10-hour extensions for the week. SUGGESTION: You must now begin your daily rest.",
          funFact: "The two 10-hour extensions per week provide flexibility for unexpected delays while maintaining overall safety standards across the industry.",
        };
      } else {
        return {
          status: "violation" as const,
          title: t("statusViolation"),
          subtitle: t("violationTag"),
          message: "You cannot drive for 10 hours three times in one week. You are in violation. SUGGESTION: Park the vehicle and report this to your manager.",
          funFact: "This rule prevents chronic fatigue accumulation. Studies show that even with adequate daily rest, repeated long driving days without sufficient weekly recovery significantly increase accident risk.",
        };
      }
    } else {
      return {
        status: "violation" as const,
        title: t("statusViolation"),
        subtitle: t("violationTag"),
        message: "You cannot drive for more than 10 hours in a single day. You are in violation. SUGGESTION: Park the vehicle immediately and report this to your manager.",
        funFact: "Beyond 10 hours of driving, reaction times can be comparable to driving under the influence of alcohol. This limit is non-negotiable for driver and public safety.",
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
    
    // Save activity
    saveActivity({
      flow_type: 'finishedDriving',
      drive_time: wizardState.driveTime,
      break_type: breakType,
      total_drive: null,
      extensions: null,
      result_status: result.status,
      result_title: result.title,
      result_message: result.message,
    });
  };

  const handleTotalDriveChoice = (totalDrive: string) => {
    setWizardState({ ...wizardState, totalDrive });
    
    // If 9h-or-less or more-than-10h, show result immediately (no extensions question needed)
    if (totalDrive === "9h-or-less" || totalDrive === "more-than-10h" || totalDrive === "8h") {
      const result = checkDailyDrivingRules(totalDrive, null);
      setResult(result);
      setStep("result");
      
      // Save activity
      saveActivity({
        flow_type: 'endingDay',
        drive_time: null,
        break_type: null,
        total_drive: totalDrive,
        extensions: null,
        result_status: result.status,
        result_title: result.title,
        result_message: result.message,
      });
    }
    // For 10h, we need to ask about extensions
  };

  const handleExtensionsChoice = (extensions: string) => {
    const result = checkDailyDrivingRules(wizardState.totalDrive!, extensions);
    setResult(result);
    setStep("result");
    
    // Save activity
    saveActivity({
      flow_type: 'endingDay',
      drive_time: null,
      break_type: null,
      total_drive: wizardState.totalDrive,
      extensions: extensions,
      result_status: result.status,
      result_title: result.title,
      result_message: result.message,
    });
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
    <div className="max-w-4xl mx-auto py-4">
      {/* Initial Step */}
      {step === "initial" && (
        <div className="space-y-8 fade-slide-up">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{t("initialTitle")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("initialSubtitle")}</p>
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
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{t("driveTimeTitle")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("driveTimeSubtitle")}</p>
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
                label={t("drive4h")}
                onClick={() => handleDriveTimeChoice("4h")}
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
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">{t("breakTypeTitle")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("breakTypeSubtitle")}</p>
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
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">{t("totalDriveTitle")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("totalDriveSubtitle")}</p>
            </div>

            <div className="space-y-5 px-4">
              <WizardButton
                icon={Clock}
                label={t("drive8h")}
                onClick={() => handleTotalDriveChoice("8h")}
                variant="secondary"
              />
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
          <div className="space-y-8 fade-slide-down">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">{t("extensionsTitle")}</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("extensionsSubtitle")}</p>
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
              funFact={result.funFact}
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
  );
};

export default Index;
