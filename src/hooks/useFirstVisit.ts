"use client";

import { useState } from "react";

export function useFirstVisit() {
  const [showLoader, setShowLoader] = useState(true);

  const complete = () => setShowLoader(false);

  return { showLoader, complete };
}
