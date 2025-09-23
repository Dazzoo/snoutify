import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-normal-blue text-white rounded-lg hover:bg-dimmed-blue font-medium text-[14px] leading-[100%] tracking-[0%] text-center shadow-[inset_0px_-5px_7px_0px_hsla(214,85%,43%,1),_0px_4px_4px_-1px_hsla(0,0%,0%,0.08),_0px_1px_1px_0px_hsla(0,0%,0%,0.12),_inset_0px_4px_4px_0px_hsla(214,100%,54%,1)]",
        secondary: "bg-white text-dark-blue border border-border-medium rounded-lg hover:border-gray-300 font-medium text-[14px] leading-[100%] tracking-[0%] text-center shadow-[0px_4px_4px_-1px_hsla(0,0%,0%,0.02),_0px_1px_1px_0px_hsla(0,0%,0%,0.06)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
