"use client";

import { useEffect, useState } from "react";
import { useFirstVisit } from "@/hooks/useFirstVisit";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { ContentReadyProvider } from "@/contexts/ContentReadyContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { showLoader, complete } = useFirstVisit();
  const [cursorReady, setCursorReady] = useState(false);

  useEffect(() => {
    setCursorReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <>
      {showLoader && <LoadingScreen onDone={complete} />}
      {cursorReady && <CustomCursor />}
      <ContentReadyProvider ready={!showLoader}>
        <div id="app-content" suppressHydrationWarning>
          {!showLoader && (
            <>
              <ScrollToTop />
              {children}
            </>
          )}
        </div>
      </ContentReadyProvider>
    </>
  );
}
