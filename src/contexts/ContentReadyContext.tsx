"use client";

import { createContext, useContext, type ReactNode } from "react";

const ContentReadyContext = createContext(false);

export function useContentReady() {
  return useContext(ContentReadyContext);
}

export function ContentReadyProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return (
    <ContentReadyContext.Provider value={ready}>
      {children}
    </ContentReadyContext.Provider>
  );
}
