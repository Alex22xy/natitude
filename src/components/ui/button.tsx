"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black hover:bg-neutral-200 shadow-lg",
      outline: "border border-white/20 text-white hover:bg-white hover:text-black"
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center uppercase transition-all duration-300 active:scale-95",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };