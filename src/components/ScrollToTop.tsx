"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after render
    const scrollFrame = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => cancelAnimationFrame(scrollFrame);
  }, [pathname, searchParams]);

  return null;
}
