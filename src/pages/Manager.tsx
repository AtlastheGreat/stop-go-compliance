import { useState } from "react";
import { Upload, Loader2, PlayCircle } from "lucide-react";
import { useLanguage } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ViewState = "login" | "dashboard" | "loading" | "report";

const Manager = () => {
  const { t } = useLanguage();
  const [viewState, setViewState] = useState<ViewState>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setViewState("dashboard");
      toast({
        title: t("loginSuccess"),
        description: t("welcomeMessage"),
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".ddd")) {
      toast({
        title: t("invalidFileType"),
        description: t("uploadDDDOnly"),
        variant: "destructive",
      });
      return;
    }

    setViewState("loading");
    
    // Simulate file processing
    setTimeout(() => {
      setViewState("report");
      toast({
        title: t("analysisComplete"),
        description: t("reportGenerated"),
      });
    }, 3000);
  };

  const handleDemo = () => {
    setViewState("loading");
    
    // Simulate demo data loading
    setTimeout(() => {
      setViewState("report");
      toast({
        title: t("analysisComplete"),
        description: t("reportGenerated"),
      });
    }, 2000);
  };

  const mockReportData = [
    {
      driver: "Z. Koci",
      dateRange: "01/11 - 07/11",
      status: "violation",
      violations: 3,
      details: "2x Daily Driving Limit (10h rule), 1x Insufficient Break (4.5h rule)",
    },
    {
      driver: "A. Hoxha",
      dateRange: "01/11 - 07/11",
      status: "compliant",
      violations: 0,
      details: null,
    },
    {
      driver: "M. Gjoni",
      dateRange: "01/11 - 07/11",
      status: "warning",
      violations: 1,
      details: "1x Split Break Violation (30+15 order)",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Login View */}
      {viewState === "login" && (
        <div className="max-w-md mx-auto fade-slide-up">
          <div className="bg-white rounded-3xl p-10 float-shadow space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">{t("managerTitle")}</h2>
              <p className="text-muted-foreground text-lg">{t("managerSubtitle")}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">{t("username")}</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("username")}
                  className="w-full h-12"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">{t("password")}</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password")}
                  className="w-full h-12"
                  required
                />
              </div>

              <Button type="submit" className="w-full button-hover-scale h-12 text-lg" size="lg">
                {t("loginButton")}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Dashboard View */}
      {viewState === "dashboard" && (
        <div className="space-y-10 fade-slide-up">
          <div className="text-center space-y-5">
            <h2 className="text-5xl font-bold text-foreground">{t("dashboardTitle")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("dashboardSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 float-shadow">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept=".ddd"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-6 py-12 border-2 border-dashed border-muted rounded-2xl hover:border-primary transition-colors button-hover-scale">
                  <Upload className="w-16 h-16 text-primary" />
                  <div className="text-center space-y-2">
                    <p className="text-xl font-semibold text-foreground">{t("uploadButton")}</p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      {t("uploadInstruction")}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="bg-white rounded-3xl p-8 float-shadow">
              <button
                onClick={handleDemo}
                className="w-full h-full flex flex-col items-center justify-center space-y-6 py-12 border-2 border-dashed border-primary/30 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all button-hover-scale"
              >
                <PlayCircle className="w-16 h-16 text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-xl font-semibold text-foreground">{t("demoButton")}</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {t("demoDescription")}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading View */}
      {viewState === "loading" && (
        <div className="flex flex-col items-center justify-center space-y-8 py-20 fade-slide-up">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-foreground">{t("analyzingTitle")}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl">{t("analyzingSubtitle")}</p>
          </div>
        </div>
      )}

      {/* Report View */}
      {viewState === "report" && (
        <div className="space-y-10 fade-slide-up">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-foreground">{t("reportTitle")}</h2>
              <p className="text-muted-foreground text-lg">{t("reportSubtitle")}</p>
            </div>
            <Button
              onClick={() => setViewState("dashboard")}
              variant="outline"
              className="button-hover-scale h-12 px-6"
            >
              {t("uploadNewFile")}
            </Button>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden float-shadow">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-foreground">{t("driverName")}</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-foreground">{t("dateRange")}</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-foreground">{t("status")}</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-foreground">{t("violationsFound")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockReportData.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-5 text-foreground font-semibold">{row.driver}</td>
                    <td className="px-6 py-5 text-muted-foreground">{row.dateRange}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                          row.status === "compliant"
                            ? "bg-go-green/10 text-go-green"
                            : row.status === "warning"
                            ? "bg-warning/10 text-warning"
                            : "bg-stop-red/10 text-stop-red"
                        }`}
                      >
                        {row.status === "compliant" ? t("compliant") : row.status === "warning" ? t("warning") : t("violation")}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {row.violations > 0 ? (
                        <button
                          onClick={() => {
                            toast({
                              title: t("violationDetails"),
                              description: row.details || t("noDetails"),
                            });
                          }}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-stop-red text-stop-red-foreground hover:bg-stop-red/90 transition-colors"
                        >
                          {row.violations}
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-muted text-muted-foreground">
                          0
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
