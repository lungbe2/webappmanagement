export const translations = {
  nl: {
    // Header
    appName: "Functie Verzoeken",
    logout: "Uitloggen",
    
    // Roles
    roles: {
      USER: "Gebruiker",
      SUPPORT: "Product Support",
      ADMIN: "Product Admin",
      VIEWER: "Viewer",
    },
    
    // Sidebar
    sidebar: {
      dashboard: "Dashboard",
      newRequest: "Nieuw Verzoek",
      myRequests: "Mijn Verzoeken",
      reviewQueue: "Beoordelingswachtrij",
      finalReview: "Definitieve Beoordeling",
      allRequests: "Alle Verzoeken",
      analytics: "Analyse",
      categories: "Categorieën",
      users: "Gebruikers",
    },
    
    // Status labels
    status: {
      SUBMITTED: "Ingediend",
      UNDER_REVIEW: "In Beoordeling",
      FINAL_REVIEW: "Definitieve Beoordeling",
      ACCEPTED: "Geaccepteerd",
      DECLINED: "Afgewezen",
      RETURNED: "Teruggestuurd",
    },
    
    // Priority labels
    priority: {
      LOW: "Laag",
      MEDIUM: "Gemiddeld",
      HIGH: "Hoog",
      CRITICAL: "Kritiek",
    },
    
    // Common
    common: {
      back: "Terug",
      cancel: "Annuleren",
      save: "Opslaan",
      submit: "Indienen",
      delete: "Verwijderen",
      edit: "Bewerken",
      view: "Bekijken",
      search: "Zoeken",
      filter: "Filter",
      loading: "Laden...",
      noResults: "Geen resultaten gevonden",
      submittedOn: "Ingediend op",
      requestedBy: "Aangevraagd door",
      submittedBy: "Ingediend door",
      attachments: "Bijlagen",
      allStatuses: "Alle Statussen",
      allPriorities: "Alle Prioriteiten",
    },
    
    // Forms
    form: {
      title: "Titel",
      description: "Beschrijving",
      businessJustification: "Zakelijke Onderbouwing",
      reason: "Waarom is dit nodig?",
      category: "Categorie",
      selectCategory: "Selecteer een categorie...",
      requestedByField: "Aangevraagd door",
      requestedByPlaceholder: "Naam van de persoon die dit verzoek heeft aangevraagd",
      requestedByHelp: "Vul de naam in van de persoon namens wie u dit verzoek indient.",
      titlePlaceholder: "Korte, beschrijvende titel voor uw verzoek",
      descriptionPlaceholder: "Beschrijf de functie in detail. Wat moet het doen? Hoe moet het werken?",
      businessJustificationPlaceholder: "Welke zakelijke waarde brengt dit? Hoe beïnvloedt het omzet, efficiëntie of klanttevredenheid?",
      reasonPlaceholder: "Leg de pijnpunten of problemen uit die deze functie zou oplossen.",
      required: "verplicht",
    },
    
    // AI Assist
    ai: {
      suggestion: "AI Suggestie",
      improve: "AI Verbeteren",
      applySuggestion: "Suggestie Toepassen",
      close: "Sluiten",
      generating: "Suggestie wordt gegenereerd...",
      applied: "AI-suggestie toegepast!",
      suggestionFor: "AI Suggestie voor",
    },
    
    // Upload
    upload: {
      attachments: "Bijlagen",
      clickToUpload: "Klik om screenshots of documenten te uploaden",
      uploadSuccess: "Bestanden succesvol geüpload",
      uploadError: "Fout bij uploaden bestanden",
    },
    
    // Messages
    messages: {
      submitSuccess: "Functieverzoek succesvol ingediend!",
      submitError: "Fout bij indienen verzoek",
      titleDescriptionRequired: "Titel en beschrijving zijn verplicht",
      noteAdded: "Notitie toegevoegd",
      noteError: "Fout bij toevoegen notitie",
    },
    
    // Dashboard
    dashboard: {
      welcome: "Welkom",
      recentRequests: "Recente Verzoeken",
      pendingReview: "Wacht op Beoordeling",
      totalRequests: "Totaal Verzoeken",
      acceptedRequests: "Geaccepteerd",
      declinedRequests: "Afgewezen",
      noRequestsYet: "Nog geen verzoeken",
      noRequestsToReview: "Geen verzoeken te beoordelen",
      submitFirstRequest: "Dien Uw Eerste Verzoek In",
    },
    
    // Review
    review: {
      openRequests: "Openstaande Verzoeken",
      selectPriority: "Selecteer een prioriteitsniveau",
      submitToAdmin: "Indienen voor Admin",
      supportNotes: "Support Notities",
      adminNotes: "Admin Notities",
      declineReason: "Reden afwijzing",
      accept: "Accepteren",
      decline: "Afwijzen",
      returnToSupport: "Terugsturen naar Support",
      moreInfoNeeded: "Meer Info Nodig",
      new: "Nieuw",
      waitingForDecision: "Wacht op Beslissing",
      noRequestsPending: "Geen verzoeken in afwachting van beoordeling",
      allProcessed: "Alle verzoeken zijn verwerkt. Kijk later terug.",
      accepted: "Verzoek geaccepteerd!",
      declined: "Verzoek afgewezen",
      returnedToSupport: "Verzoek teruggestuurd naar support",
    },
    
    // Analytics
    analytics: {
      title: "Analyse Dashboard",
      requestsByStatus: "Verzoeken per Status",
      requestsByCategory: "Verzoeken per Categorie",
      requestsByPriority: "Verzoeken per Prioriteit",
      requestsOverTime: "Verzoeken over Tijd",
      avgProcessingTime: "Gem. Verwerkingstijd",
      days: "dagen",
    },
    
    // Categories
    categories: {
      title: "Categorieën Beheren",
      addNew: "Nieuwe Categorie",
      name: "Naam",
      description: "Beschrijving",
      color: "Kleur",
      requestCount: "Verzoeken",
      noCategories: "Nog geen categorieën",
      created: "Categorie aangemaakt!",
      updated: "Categorie bijgewerkt!",
      deleted: "Categorie verwijderd!",
    },
    
    // Login/Signup
    auth: {
      login: "Inloggen",
      signup: "Registreren",
      email: "E-mailadres",
      password: "Wachtwoord",
      confirmPassword: "Wachtwoord bevestigen",
      name: "Volledige naam",
      rememberMe: "Onthoud mij",
      forgotPassword: "Wachtwoord vergeten?",
      noAccount: "Nog geen account?",
      haveAccount: "Heeft u al een account?",
      loginError: "Ongeldige inloggegevens",
      signupError: "Registratie mislukt",
    },
    
    // Landing page
    landing: {
      title: "Functie Verzoeken Platform",
      subtitle: "Dien uw functieverzoeken in en volg de voortgang",
      getStarted: "Aan de slag",
      learnMore: "Meer informatie",
    },
  },
  
  en: {
    // Header
    appName: "Feature Requests",
    logout: "Log out",
    
    // Roles
    roles: {
      USER: "User",
      SUPPORT: "Product Support",
      ADMIN: "Product Admin",
      VIEWER: "Viewer",
    },
    
    // Sidebar
    sidebar: {
      dashboard: "Dashboard",
      newRequest: "New Request",
      myRequests: "My Requests",
      reviewQueue: "Review Queue",
      finalReview: "Final Review",
      allRequests: "All Requests",
      analytics: "Analytics",
      categories: "Categories",
      users: "Users",
    },
    
    // Status labels
    status: {
      SUBMITTED: "Submitted",
      UNDER_REVIEW: "Under Review",
      FINAL_REVIEW: "Final Review",
      ACCEPTED: "Accepted",
      DECLINED: "Declined",
      RETURNED: "Returned",
    },
    
    // Priority labels
    priority: {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
      CRITICAL: "Critical",
    },
    
    // Common
    common: {
      back: "Back",
      cancel: "Cancel",
      save: "Save",
      submit: "Submit",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
      noResults: "No results found",
      submittedOn: "Submitted on",
      requestedBy: "Requested by",
      submittedBy: "Submitted by",
      attachments: "Attachments",
      allStatuses: "All Statuses",
      allPriorities: "All Priorities",
    },
    
    // Forms
    form: {
      title: "Title",
      description: "Description",
      businessJustification: "Business Justification",
      reason: "Why is this needed?",
      category: "Category",
      selectCategory: "Select a category...",
      requestedByField: "Requested by",
      requestedByPlaceholder: "Name of the person who requested this",
      requestedByHelp: "Enter the name of the person on whose behalf you are submitting this request.",
      titlePlaceholder: "Short, descriptive title for your request",
      descriptionPlaceholder: "Describe the feature in detail. What should it do? How should it work?",
      businessJustificationPlaceholder: "What business value does this bring? How does it affect revenue, efficiency or customer satisfaction?",
      reasonPlaceholder: "Explain the pain points or problems this feature would solve.",
      required: "required",
    },
    
    // AI Assist
    ai: {
      suggestion: "AI Suggestion",
      improve: "AI Improve",
      applySuggestion: "Apply Suggestion",
      close: "Close",
      generating: "Generating suggestion...",
      applied: "AI suggestion applied!",
      suggestionFor: "AI Suggestion for",
    },
    
    // Upload
    upload: {
      attachments: "Attachments",
      clickToUpload: "Click to upload screenshots or documents",
      uploadSuccess: "Files uploaded successfully",
      uploadError: "Error uploading files",
    },
    
    // Messages
    messages: {
      submitSuccess: "Feature request submitted successfully!",
      submitError: "Error submitting request",
      titleDescriptionRequired: "Title and description are required",
      noteAdded: "Note added",
      noteError: "Error adding note",
    },
    
    // Dashboard
    dashboard: {
      welcome: "Welcome",
      recentRequests: "Recent Requests",
      pendingReview: "Pending Review",
      totalRequests: "Total Requests",
      acceptedRequests: "Accepted",
      declinedRequests: "Declined",
      noRequestsYet: "No requests yet",
      noRequestsToReview: "No requests to review",
      submitFirstRequest: "Submit Your First Request",
    },
    
    // Review
    review: {
      openRequests: "Open Requests",
      selectPriority: "Select a priority level",
      submitToAdmin: "Submit to Admin",
      supportNotes: "Support Notes",
      adminNotes: "Admin Notes",
      declineReason: "Decline reason",
      accept: "Accept",
      decline: "Decline",
      returnToSupport: "Return to Support",
      moreInfoNeeded: "More Info Needed",
      new: "New",
      waitingForDecision: "Waiting for Decision",
      noRequestsPending: "No requests pending review",
      allProcessed: "All requests have been processed. Check back later.",
      accepted: "Request accepted!",
      declined: "Request declined",
      returnedToSupport: "Request returned to support",
    },
    
    // Analytics
    analytics: {
      title: "Analytics Dashboard",
      requestsByStatus: "Requests by Status",
      requestsByCategory: "Requests by Category",
      requestsByPriority: "Requests by Priority",
      requestsOverTime: "Requests over Time",
      avgProcessingTime: "Avg. Processing Time",
      days: "days",
    },
    
    // Categories
    categories: {
      title: "Manage Categories",
      addNew: "New Category",
      name: "Name",
      description: "Description",
      color: "Colour",
      requestCount: "Requests",
      noCategories: "No categories yet",
      created: "Category created!",
      updated: "Category updated!",
      deleted: "Category deleted!",
    },
    
    // Login/Signup
    auth: {
      login: "Log in",
      signup: "Sign up",
      email: "Email address",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Full name",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      loginError: "Invalid credentials",
      signupError: "Sign up failed",
    },
    
    // Landing page
    landing: {
      title: "Feature Requests Platform",
      subtitle: "Submit your feature requests and track their progress",
      getStarted: "Get Started",
      learnMore: "Learn More",
    },
  },
};

export type Language = keyof typeof translations;
export type Translations = typeof translations.nl;
