import { Link, useLocation } from "react-router-dom";
import { createContext, useContext, useState, ReactNode } from "react";
import { Language, getTranslation } from "@/lib/translations";

interface LayoutProps {
  children: ReactNode;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within Layout");
  return context;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string) => getTranslation(language, key as any);

  const navItems = [
    { path: "/", label: t("driverWizard") },
    { path: "/manager", label: t("managerPortal") },
    { path: "/faq", label: t("expertFAQ") },
  ];

  const languages: Language[] = ["AL", "EN", "IT", "GR"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen gradient-bg-animated">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 float-shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">
                <span className="text-stop-red">Stop</span>
                <span className="text-go-green">&Go</span>
              </h1>
              <div className="hidden md:block text-sm text-muted-foreground font-normal">
                {t("tagline")}
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 relative">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-go-green rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center space-x-1 bg-white/50 rounded-full p-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    language === lang
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {language === lang && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10 transition-all duration-300" />
                  )}
                  <span className="relative z-10">{lang}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-20 glass-effect">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Stop&Go. {t("copyright")}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("aboutUs")}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("privacyPolicy")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </LanguageContext.Provider>
  );
};

export default Layout;
