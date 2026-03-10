import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full border-b-2 border-neutral-800 bg-transparent px-3 py-2 text-white ring-offset-black transition-colors focus-visible:border-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "placeholder:text-neutral-600 placeholder:uppercase placeholder:text-xs",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
