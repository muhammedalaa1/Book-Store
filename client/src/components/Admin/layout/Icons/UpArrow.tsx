import type { SVGProps } from "react";

export function UpArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"
      ></path>
    </svg>
  );
}
