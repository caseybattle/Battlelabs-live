"use client";

import { useEffect, useRef } from "react";
import { trackMetricEvent } from "@/lib/metrics-client";

type MetricsPageViewProps = {
  page: string;
};

export default function MetricsPageView({ page }: MetricsPageViewProps) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;
    trackMetricEvent({ event: "page_view", page });
  }, [page]);

  return null;
}

