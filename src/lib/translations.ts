export type Language = "EN" | "AL" | "IT" | "GR";

export const translations = {
  EN: {
    // Header
    tagline: "Safe Stop, Legal Start",
    driverWizard: "Driver Wizard",
    managerPortal: "Manager Portal",
    expertFAQ: "Expert FAQ",
    
    // Footer
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    copyright: "EU-Albania Compliance Platform.",
    
    // Driver Wizard - Initial
    initialTitle: "What are you doing now?",
    initialSubtitle: "Choose your current activity to check compliance",
    startingDay: "STARTING my day/shift",
    finishedDriving: "FINISHED a driving block",
    endingDay: "ENDING my day/shift",
    
    // Driving Block Questions
    driveTimeTitle: "How long did you drive?",
    driveTimeSubtitle: "Select the duration of your driving block",
    drive2h: "2 hours",
    drive2to4h: "Between 2 and 4 hours",
    drive45h: "4.5 hours (Maximum)",
    driveOther: "Other (More than 4.5h)",
    
    breakTypeTitle: "What break did you have BEFORE this drive?",
    breakTypeSubtitle: "This determines if your driving was legal",
    breakFullRest: "A full rest (9+ hours)",
    break45min: "A 45-minute break",
    break15then30: "A 15-min break, then 30-min break (Legal Split)",
    break30min: "A 30-min break",
    break15min: "A 15-min break only",
    
    // Ending Day Questions
    totalDriveTitle: "How much did you drive TODAY (total)?",
    totalDriveSubtitle: "Select your total driving time for the day",
    drive9hOrLess: "9 hours or less",
    drive10h: "10 hours (Extension)",
    driveMoreThan10h: "More than 10 hours",
    
    extensionsTitle: "How many 10-hour days have you used this week?",
    extensionsSubtitle: "You can only use 2 extensions per week",
    extension1st: "This is my 1st",
    extension2nd: "This is my 2nd",
    extension3rdPlus: "This is my 3rd (or more)",
    
    // Results
    statusLegal: "STATUS: LEGAL",
    statusWarning: "STATUS: WARNING",
    statusViolation: "STATUS: VIOLATION!",
    legalTag: "(Compliant)",
    warningTag: "(At Risk)",
    violationTag: "(Violation)",
    
    checkAnother: "Check Another Activity",
    
    // Result Messages
    startDayMessage: "You can start your shift. Make sure you have had adequate rest (minimum 11 hours or a reduced rest of 9 hours). Remember: You can drive up to 9 hours today (or 10 hours if this is one of your 2 extension days this week).",
    
    // Manager Portal
    managerTitle: "Fleet Manager Portal",
    managerSubtitle: "Login to access driver compliance data",
    username: "Username",
    password: "Password",
    loginButton: "Login to Dashboard",
    loginSuccess: "Login Successful",
    welcomeMessage: "Welcome to Fleet Manager Portal",
    
    dashboardTitle: "Company Dashboard",
    dashboardSubtitle: "Upload digital tachograph files (.DDD) for compliance analysis",
    uploadButton: "Upload .DDD File",
    uploadInstruction: "Click to browse or drag and drop your file here",
    invalidFileType: "Invalid File Type",
    uploadDDDOnly: "Please upload a .DDD file",
    analyzingTitle: "Analyzing Driver Data...",
    analyzingSubtitle: "Processing tachograph file and checking compliance rules",
    analysisComplete: "Analysis Complete",
    reportGenerated: "Driver compliance report generated",
    
    reportTitle: "Compliance Report",
    reportSubtitle: "Weekly driver activity analysis",
    uploadNewFile: "Upload New File",
    driverName: "Driver Name",
    dateRange: "Date Range",
    status: "Status",
    violationsFound: "Violations Found",
    compliant: "Compliant",
    warning: "Warning",
    violation: "VIOLATION",
    violationDetails: "Violation Details",
    noDetails: "No details available",
    demoButton: "View Demo Report",
    demoDescription: "See a sample compliance report with demo data",
    
    // FAQ
    faqTitle: "Expert Hub: Complex Rules",
    faqSubtitle: "Detailed explanations of EC 561/2006 regulations and special cases",
    needMoreHelp: "Need More Help?",
    helpMessage: "These rules are complex and can vary by situation. When in doubt, always err on the side of safety and compliance. Contact your fleet manager or a compliance expert for clarification on your specific case.",
  },
  
  AL: {
    // Header
    tagline: "Ndalim i Sigurt, Nisje e Ligjshme",
    driverWizard: "Udhëzuesi i Shoferit",
    managerPortal: "Portali i Menaxherit",
    expertFAQ: "Pyetje të Ekspertëve",
    
    // Footer
    aboutUs: "Rreth Nesh",
    privacyPolicy: "Politika e Privatësisë",
    copyright: "Platforma e Pajtueshmërisë BE-Shqipëri.",
    
    // Driver Wizard - Initial
    initialTitle: "Çfarë po bëni tani?",
    initialSubtitle: "Zgjidhni aktivitetin tuaj aktual për të kontrolluar pajtueshmërinë",
    startingDay: "PO FILLOJ ditën/turnin tim",
    finishedDriving: "MBAROVA një bllok drejtimi",
    endingDay: "PO MBYLL ditën/turnin tim",
    
    // Driving Block Questions
    driveTimeTitle: "Sa kohë drejtuat?",
    driveTimeSubtitle: "Zgjidhni kohëzgjatjen e bllokut tuaj të drejtimit",
    drive2h: "2 orë",
    drive2to4h: "Midis 2 dhe 4 orëve",
    drive45h: "4.5 orë (Maksimumi)",
    driveOther: "Tjetër (Më shumë se 4.5 orë)",
    
    breakTypeTitle: "Çfarë pushimi patët PARA këtij drejtimi?",
    breakTypeSubtitle: "Kjo përcakton nëse drejtimi juaj ishte ligjor",
    breakFullRest: "Pushim i plotë (9+ orë)",
    break45min: "Pushim 45-minutësh",
    break15then30: "Pushim 15-min, pastaj 30-min (Ndarje Ligjore)",
    break30min: "Pushim 30-minutësh",
    break15min: "Vetëm pushim 15-minutësh",
    
    // Ending Day Questions
    totalDriveTitle: "Sa drejtuat SOT (totali)?",
    totalDriveSubtitle: "Zgjidhni kohën tuaj totale të drejtimit për ditën",
    drive9hOrLess: "9 orë ose më pak",
    drive10h: "10 orë (Zgjatje)",
    driveMoreThan10h: "Më shumë se 10 orë",
    
    extensionsTitle: "Sa ditë 10-orëshe keni përdorur këtë javë?",
    extensionsSubtitle: "Mund të përdorni vetëm 2 zgjatje në javë",
    extension1st: "Kjo është e para ime",
    extension2nd: "Kjo është e dyta ime",
    extension3rdPlus: "Kjo është e treta ime (ose më shumë)",
    
    // Results
    statusLegal: "STATUSI: LIGJOR",
    statusWarning: "STATUSI: PARALAJMËRIM",
    statusViolation: "STATUSI: SHKELJE!",
    legalTag: "(Në Rregull)",
    warningTag: "(Në Rrezik)",
    violationTag: "(Shkelje)",
    
    checkAnother: "Kontrolloni Një Aktivitet Tjetër",
    
    // Result Messages
    startDayMessage: "Mund të filloni turnin tuaj. Sigurohuni që keni pasur pushim të mjaftueshëm (minimum 11 orë ose pushim i reduktuar 9 orë). Mos harroni: Mund të drejtoni deri në 9 orë sot (ose 10 orë nëse kjo është një nga 2 ditët tuaja të zgjatjes këtë javë).",
    
    // Manager Portal
    managerTitle: "Portali i Menaxherit të Flotës",
    managerSubtitle: "Identifikohuni për të hyrë në të dhënat e pajtueshmërisë së shoferëve",
    username: "Emri i Përdoruesit",
    password: "Fjalëkalimi",
    loginButton: "Identifikohu në Panel",
    loginSuccess: "Identifikimi u Krye me Sukses",
    welcomeMessage: "Mirë se vini në Portalin e Menaxherit të Flotës",
    
    dashboardTitle: "Paneli i Kompanisë",
    dashboardSubtitle: "Ngarkoni skedarë dixhitalë të takografëve (.DDD) për analizë pajtueshmërie",
    uploadButton: "Ngarko Skedarin .DDD",
    uploadInstruction: "Klikoni për të shfletuar ose zvarritni dhe lëshoni skedarin tuaj këtu",
    invalidFileType: "Lloj Skedari i Pavlefshëm",
    uploadDDDOnly: "Ju lutemi ngarkoni një skedar .DDD",
    analyzingTitle: "Duke Analizuar të Dhënat e Shoferit...",
    analyzingSubtitle: "Duke përpunuar skedarin e takografëve dhe duke kontrolluar rregullat e pajtueshmërisë",
    analysisComplete: "Analiza u Përfundua",
    reportGenerated: "Raporti i pajtueshmërisë së shoferit u gjenerua",
    
    reportTitle: "Raporti i Pajtueshmërisë",
    reportSubtitle: "Analiza e aktivitetit javor të shoferit",
    uploadNewFile: "Ngarko Skedar të Ri",
    driverName: "Emri i Shoferit",
    dateRange: "Periudha",
    status: "Statusi",
    violationsFound: "Shkelje të Gjetura",
    compliant: "Në Rregull",
    warning: "Paralajmërim",
    violation: "SHKELJE",
    violationDetails: "Detaje të Shkeljeve",
    noDetails: "Nuk ka detaje të disponueshme",
    demoButton: "Shiko Raportin Demo",
    demoDescription: "Shikoni një raport pajtueshmërie shembull me të dhëna demo",
    
    // FAQ
    faqTitle: "Qendra e Ekspertëve: Rregulla Komplekse",
    faqSubtitle: "Shpjegime të detajuara të rregulloreve EC 561/2006 dhe rasteve të veçanta",
    needMoreHelp: "Keni Nevojë për Më Shumë Ndihmë?",
    helpMessage: "Këto rregulla janë komplekse dhe mund të ndryshojnë sipas situatës. Në rast dyshimi, gjithmonë anoni nga ana e sigurisë dhe pajtueshmërisë. Kontaktoni menaxherin tuaj të flotës ose një ekspert pajtueshmërie për sqarime mbi rastin tuaj specifik.",
  },
  
  IT: {
    // Header
    tagline: "Fermata Sicura, Partenza Legale",
    driverWizard: "Assistente Conducente",
    managerPortal: "Portale Manager",
    expertFAQ: "FAQ Esperti",
    
    // Footer
    aboutUs: "Chi Siamo",
    privacyPolicy: "Politica sulla Privacy",
    copyright: "Piattaforma di Conformità UE-Albania.",
    
    // Driver Wizard - Initial
    initialTitle: "Cosa stai facendo ora?",
    initialSubtitle: "Scegli la tua attività attuale per verificare la conformità",
    startingDay: "INIZIO il mio giorno/turno",
    finishedDriving: "FINITO un blocco di guida",
    endingDay: "FINE del mio giorno/turno",
    
    // Driving Block Questions
    driveTimeTitle: "Per quanto tempo hai guidato?",
    driveTimeSubtitle: "Seleziona la durata del tuo blocco di guida",
    drive2h: "2 ore",
    drive2to4h: "Tra 2 e 4 ore",
    drive45h: "4,5 ore (Massimo)",
    driveOther: "Altro (Più di 4,5 ore)",
    
    breakTypeTitle: "Che pausa hai fatto PRIMA di questa guida?",
    breakTypeSubtitle: "Questo determina se la tua guida era legale",
    breakFullRest: "Un riposo completo (9+ ore)",
    break45min: "Una pausa di 45 minuti",
    break15then30: "Una pausa di 15 min, poi 30 min (Divisione Legale)",
    break30min: "Una pausa di 30 minuti",
    break15min: "Solo una pausa di 15 minuti",
    
    // Ending Day Questions
    totalDriveTitle: "Quanto hai guidato OGGI (totale)?",
    totalDriveSubtitle: "Seleziona il tuo tempo di guida totale per il giorno",
    drive9hOrLess: "9 ore o meno",
    drive10h: "10 ore (Estensione)",
    driveMoreThan10h: "Più di 10 ore",
    
    extensionsTitle: "Quanti giorni da 10 ore hai usato questa settimana?",
    extensionsSubtitle: "Puoi usare solo 2 estensioni a settimana",
    extension1st: "Questo è il mio 1°",
    extension2nd: "Questo è il mio 2°",
    extension3rdPlus: "Questo è il mio 3° (o più)",
    
    // Results
    statusLegal: "STATO: LEGALE",
    statusWarning: "STATO: AVVISO",
    statusViolation: "STATO: VIOLAZIONE!",
    legalTag: "(Conforme)",
    warningTag: "(A Rischio)",
    violationTag: "(Violazione)",
    
    checkAnother: "Controlla Un'Altra Attività",
    
    // Result Messages
    startDayMessage: "Puoi iniziare il tuo turno. Assicurati di aver avuto un riposo adeguato (minimo 11 ore o un riposo ridotto di 9 ore). Ricorda: Puoi guidare fino a 9 ore oggi (o 10 ore se questo è uno dei tuoi 2 giorni di estensione questa settimana).",
    
    // Manager Portal
    managerTitle: "Portale Manager Flotta",
    managerSubtitle: "Accedi per accedere ai dati di conformità dei conducenti",
    username: "Nome Utente",
    password: "Password",
    loginButton: "Accedi al Pannello",
    loginSuccess: "Accesso Riuscito",
    welcomeMessage: "Benvenuto nel Portale Manager Flotta",
    
    dashboardTitle: "Pannello Aziendale",
    dashboardSubtitle: "Carica file tachigrafi digitali (.DDD) per l'analisi di conformità",
    uploadButton: "Carica File .DDD",
    uploadInstruction: "Clicca per sfogliare o trascina e rilascia il tuo file qui",
    invalidFileType: "Tipo di File Non Valido",
    uploadDDDOnly: "Si prega di caricare un file .DDD",
    analyzingTitle: "Analisi Dati Conducente...",
    analyzingSubtitle: "Elaborazione file tachigrafo e controllo regole di conformità",
    analysisComplete: "Analisi Completata",
    reportGenerated: "Rapporto di conformità conducente generato",
    
    reportTitle: "Rapporto di Conformità",
    reportSubtitle: "Analisi dell'attività settimanale del conducente",
    uploadNewFile: "Carica Nuovo File",
    driverName: "Nome Conducente",
    dateRange: "Periodo",
    status: "Stato",
    violationsFound: "Violazioni Trovate",
    compliant: "Conforme",
    warning: "Avviso",
    violation: "VIOLAZIONE",
    violationDetails: "Dettagli Violazioni",
    noDetails: "Nessun dettaglio disponibile",
    demoButton: "Visualizza Rapporto Demo",
    demoDescription: "Vedi un rapporto di conformità di esempio con dati dimostrativi",
    
    // FAQ
    faqTitle: "Centro Esperti: Regole Complesse",
    faqSubtitle: "Spiegazioni dettagliate dei regolamenti EC 561/2006 e casi speciali",
    needMoreHelp: "Hai Bisogno di Più Aiuto?",
    helpMessage: "Queste regole sono complesse e possono variare a seconda della situazione. In caso di dubbio, opta sempre per la sicurezza e la conformità. Contatta il tuo responsabile della flotta o un esperto di conformità per chiarimenti sul tuo caso specifico.",
  },
  
  GR: {
    // Header
    tagline: "Ασφαλής Στάση, Νόμιμη Εκκίνηση",
    driverWizard: "Οδηγός Οδηγού",
    managerPortal: "Πύλη Διαχειριστή",
    expertFAQ: "Συχνές Ερωτήσεις",
    
    // Footer
    aboutUs: "Σχετικά με Εμάς",
    privacyPolicy: "Πολιτική Απορρήτου",
    copyright: "Πλατφόρμα Συμμόρφωσης ΕΕ-Αλβανίας.",
    
    // Driver Wizard - Initial
    initialTitle: "Τι κάνετε τώρα;",
    initialSubtitle: "Επιλέξτε την τρέχουσα δραστηριότητά σας για έλεγχο συμμόρφωσης",
    startingDay: "ΞΕΚΙΝΑΩ την ημέρα/βάρδια μου",
    finishedDriving: "ΤΕΛΕΙΩΣΑ ένα μπλοκ οδήγησης",
    endingDay: "ΤΕΛΕΙΩΝΩ την ημέρα/βάρδια μου",
    
    // Driving Block Questions
    driveTimeTitle: "Πόσο καιρό οδηγήσατε;",
    driveTimeSubtitle: "Επιλέξτε τη διάρκεια του μπλοκ οδήγησής σας",
    drive2h: "2 ώρες",
    drive2to4h: "Μεταξύ 2 και 4 ωρών",
    drive45h: "4,5 ώρες (Μέγιστο)",
    driveOther: "Άλλο (Περισσότερο από 4,5 ώρες)",
    
    breakTypeTitle: "Τι διάλειμμα κάνατε ΠΡΙΝ από αυτή την οδήγηση;",
    breakTypeSubtitle: "Αυτό καθορίζει αν η οδήγησή σας ήταν νόμιμη",
    breakFullRest: "Πλήρης ανάπαυση (9+ ώρες)",
    break45min: "Διάλειμμα 45 λεπτών",
    break15then30: "Διάλειμμα 15 λεπτών, μετά 30 λεπτών (Νόμιμη Διαίρεση)",
    break30min: "Διάλειμμα 30 λεπτών",
    break15min: "Μόνο διάλειμμα 15 λεπτών",
    
    // Ending Day Questions
    totalDriveTitle: "Πόσο οδηγήσατε ΣΗΜΕΡΑ (σύνολο);",
    totalDriveSubtitle: "Επιλέξτε τον συνολικό χρόνο οδήγησής σας για τη μέρα",
    drive9hOrLess: "9 ώρες ή λιγότερο",
    drive10h: "10 ώρες (Επέκταση)",
    driveMoreThan10h: "Περισσότερο από 10 ώρες",
    
    extensionsTitle: "Πόσες μέρες 10 ωρών χρησιμοποιήσατε αυτή την εβδομάδα;",
    extensionsSubtitle: "Μπορείτε να χρησιμοποιήσετε μόνο 2 επεκτάσεις ανά εβδομάδα",
    extension1st: "Αυτή είναι η 1η μου",
    extension2nd: "Αυτή είναι η 2η μου",
    extension3rdPlus: "Αυτή είναι η 3η μου (ή περισσότερες)",
    
    // Results
    statusLegal: "ΚΑΤΑΣΤΑΣΗ: ΝΟΜΙΜΗ",
    statusWarning: "ΚΑΤΑΣΤΑΣΗ: ΠΡΟΕΙΔΟΠΟΙΗΣΗ",
    statusViolation: "ΚΑΤΑΣΤΑΣΗ: ΠΑΡΑΒΑΣΗ!",
    legalTag: "(Συμμορφούμενο)",
    warningTag: "(Σε Κίνδυνο)",
    violationTag: "(Παράβαση)",
    
    checkAnother: "Ελέγξτε Άλλη Δραστηριότητα",
    
    // Result Messages
    startDayMessage: "Μπορείτε να ξεκινήσετε τη βάρδια σας. Βεβαιωθείτε ότι είχατε επαρκή ανάπαυση (ελάχιστο 11 ώρες ή μειωμένη ανάπαυση 9 ωρών). Θυμηθείτε: Μπορείτε να οδηγήσετε έως 9 ώρες σήμερα (ή 10 ώρες αν αυτή είναι μία από τις 2 μέρες επέκτασής σας αυτή την εβδομάδα).",
    
    // Manager Portal
    managerTitle: "Πύλη Διαχειριστή Στόλου",
    managerSubtitle: "Συνδεθείτε για πρόσβαση στα δεδομένα συμμόρφωσης οδηγών",
    username: "Όνομα Χρήστη",
    password: "Κωδικός Πρόσβασης",
    loginButton: "Σύνδεση στον Πίνακα",
    loginSuccess: "Επιτυχής Σύνδεση",
    welcomeMessage: "Καλώς ήρθατε στην Πύλη Διαχειριστή Στόλου",
    
    dashboardTitle: "Πίνακας Εταιρείας",
    dashboardSubtitle: "Ανεβάστε αρχεία ψηφιακού ταχογράφου (.DDD) για ανάλυση συμμόρφωσης",
    uploadButton: "Ανέβασμα Αρχείου .DDD",
    uploadInstruction: "Κάντε κλικ για αναζήτηση ή σύρετε και αποθέστε το αρχείο σας εδώ",
    invalidFileType: "Μη Έγκυρος Τύπος Αρχείου",
    uploadDDDOnly: "Παρακαλώ ανεβάστε ένα αρχείο .DDD",
    analyzingTitle: "Ανάλυση Δεδομένων Οδηγού...",
    analyzingSubtitle: "Επεξεργασία αρχείου ταχογράφου και έλεγχος κανόνων συμμόρφωσης",
    analysisComplete: "Η Ανάλυση Ολοκληρώθηκε",
    reportGenerated: "Η αναφορά συμμόρφωσης οδηγού δημιουργήθηκε",
    
    reportTitle: "Αναφορά Συμμόρφωσης",
    reportSubtitle: "Ανάλυση εβδομαδιαίας δραστηριότητας οδηγού",
    uploadNewFile: "Ανέβασμα Νέου Αρχείου",
    driverName: "Όνομα Οδηγού",
    dateRange: "Περίοδος",
    status: "Κατάσταση",
    violationsFound: "Παραβάσεις που Βρέθηκαν",
    compliant: "Συμμορφούμενο",
    warning: "Προειδοποίηση",
    violation: "ΠΑΡΑΒΑΣΗ",
    violationDetails: "Λεπτομέρειες Παραβάσεων",
    noDetails: "Δεν υπάρχουν διαθέσιμες λεπτομέρειες",
    demoButton: "Προβολή Demo Αναφοράς",
    demoDescription: "Δείτε μια δείγμα αναφορά συμμόρφωσης με δεδομένα επίδειξης",
    
    // FAQ
    faqTitle: "Κέντρο Εμπειρογνωμόνων: Σύνθετοι Κανόνες",
    faqSubtitle: "Λεπτομερείς εξηγήσεις των κανονισμών EC 561/2006 και ειδικών περιπτώσεων",
    needMoreHelp: "Χρειάζεστε Περισσότερη Βοήθεια;",
    helpMessage: "Αυτοί οι κανόνες είναι σύνθετοι και μπορεί να διαφέρουν ανάλογα με την κατάσταση. Σε περίπτωση αμφιβολίας, επιλέξτε πάντα την ασφάλεια και τη συμμόρφωση. Επικοινωνήστε με τον διαχειριστή του στόλου σας ή έναν ειδικό συμμόρφωσης για διευκρινίσεις σχετικά με τη συγκεκριμένη περίπτωσή σας.",
  },
};

export const getTranslation = (lang: Language, key: keyof typeof translations.EN): string => {
  return translations[lang][key] || translations.EN[key];
};
