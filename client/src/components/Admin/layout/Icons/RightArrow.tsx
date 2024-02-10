import type { SVGProps } from "react";

export function RightArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g transform="translate(24 0) scale(-1 1)">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <circle
            cx={12}
            cy={12}
            r={9}
            strokeDasharray={60}
            strokeDashoffset={60}
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.5s"
              values="60;0"
            ></animate>
          </circle>
          <path strokeDasharray={12} strokeDashoffset={12} d="M17 12H7.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.6s"
              dur="0.2s"
              values="12;0"
            ></animate>
          </path>
          <path
            strokeDasharray={8}
            strokeDashoffset={8}
            d="M7 12L11 16M7 12L11 8"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.8s"
              dur="0.2s"
              values="8;0"
            ></animate>
          </path>
        </g>
      </g>
    </svg>
  );
}
