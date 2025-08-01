import * as React from "react";

export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.98"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeOpacity="0.98"
      strokeWidth="2"
      d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364 7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636 7.05 7.05"
    ></path>
  </svg>
);
