import React from "react";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppLayout from "./components/layout/AppLayout";
import { useLiveData } from "./hooks/useLiveData";

const AppContent: React.FC = () => {
  const { watchlist, portfolio, trending, ipos, marketSentiment } = useLiveData();

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="skip-link sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <AppLayout 
        watchlist={watchlist}
        portfolio={portfolio}
        trending={trending}
        ipos={ipos}
        marketSentiment={marketSentiment}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;