import { useState } from "react";
import { Upload, Loader2, FileCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ViewState = "login" | "dashboard" | "loading" | "report";

const Manager = () => {
  const [viewState, setViewState] = useState<ViewState>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setViewState("dashboard");
      toast({
        title: "Login Successful",
        description: "Welcome to Fleet Manager Portal",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".ddd")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a .DDD file",
        variant: "destructive",
      });
      return;
    }

    setViewState("loading");
    
    // Simulate file processing
    setTimeout(() => {
      setViewState("report");
      toast({
        title: "Analysis Complete",
        description: "Driver compliance report generated",
      });
    }, 3000);
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
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Login View */}
        {viewState === "login" && (
          <div className="max-w-md mx-auto fade-slide-up">
            <div className="bg-white rounded-2xl p-8 float-shadow space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Fleet Manager Portal</h2>
                <p className="text-muted-foreground">Login to access driver compliance data</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full"
                    required
                  />
                </div>

                <Button type="submit" className="w-full button-hover-scale" size="lg">
                  Login to Dashboard
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {viewState === "dashboard" && (
          <div className="space-y-8 fade-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Company Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Upload digital tachograph files (.DDD) for compliance analysis
              </p>
            </div>

            <div className="bg-white rounded-2xl p-12 float-shadow">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept=".ddd"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-4 py-12 border-2 border-dashed border-muted rounded-xl hover:border-primary transition-colors button-hover-scale">
                  <Upload className="w-16 h-16 text-primary" />
                  <div className="text-center space-y-2">
                    <p className="text-xl font-semibold text-foreground">Upload .DDD File</p>
                    <p className="text-sm text-muted-foreground">
                      Click to browse or drag and drop your file here
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Loading View */}
        {viewState === "loading" && (
          <div className="flex flex-col items-center justify-center space-y-6 py-20 fade-slide-up">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Analyzing Driver Data...</h3>
              <p className="text-muted-foreground">Processing tachograph file and checking compliance rules</p>
            </div>
          </div>
        )}

        {/* Report View */}
        {viewState === "report" && (
          <div className="space-y-8 fade-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Compliance Report</h2>
                <p className="text-muted-foreground mt-1">Weekly driver activity analysis</p>
              </div>
              <Button
                onClick={() => setViewState("dashboard")}
                variant="outline"
                className="button-hover-scale"
              >
                Upload New File
              </Button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden float-shadow">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Driver Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date Range</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Violations Found</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockReportData.map((row, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{row.driver}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.dateRange}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            row.status === "compliant"
                              ? "bg-go-green/10 text-go-green"
                              : row.status === "warning"
                              ? "bg-warning/10 text-warning"
                              : "bg-stop-red/10 text-stop-red"
                          }`}
                        >
                          {row.status === "compliant" ? "Compliant" : row.status === "warning" ? "Warning" : "VIOLATION"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {row.violations > 0 ? (
                          <button
                            onClick={() => {
                              toast({
                                title: "Violation Details",
                                description: row.details || "No details available",
                              });
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-stop-red text-stop-red-foreground hover:bg-stop-red/90 transition-colors"
                          >
                            {row.violations}
                          </button>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
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
    </Layout>
  );
};

export default Manager;
