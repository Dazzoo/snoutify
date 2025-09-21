import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout and sizing
          "flex rounded-md bg-background px-3",
          // Typography
          "font-[var(--font-inter)] font-normal text-[14px] leading-[100%] tracking-[0%]",
          // File input styling
          "file:text-sm file:font-medium",
          // Placeholder styling
          "placeholder:text-[hsla(var(--input-placeholder))]",
          // Focus and disabled states
          "focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          // Border styling
          "border border-[hsla(var(--input-border))]",
          "focus:border-[hsla(var(--input-focus))]",
          "focus:ring-4 focus:ring-[hsla(var(--input-focus-ring-opacity))]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
