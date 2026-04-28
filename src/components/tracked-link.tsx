"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { trackMetricEvent, type MetricEventName } from "@/lib/metrics-client";

type TrackedLinkProps = {
  href: string;
  page: string;
  event: MetricEventName;
  meta?: Record<string, string>;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function TrackedLink({ href, page, event, meta, children, ...rest }: TrackedLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (e.defaultPrevented) return;
    trackMetricEvent({ event, page, meta });
  };

  return (
    <a href={href} {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
