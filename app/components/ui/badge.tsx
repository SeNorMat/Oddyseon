import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/utils-file"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom aurora-themed variants
        aurora: "border-transparent bg-aurora-green/20 text-aurora-green hover:bg-aurora-green/30",
        "aurora-green": "border-transparent bg-aurora-green/20 text-aurora-green hover:bg-aurora-green/30",
        "aurora-blue": "border-transparent bg-aurora-blue/20 text-aurora-blue hover:bg-aurora-blue/30",
        "aurora-purple": "border-transparent bg-aurora-purple/20 text-aurora-purple hover:bg-aurora-purple/30",
        success: "border-transparent bg-success/20 text-success hover:bg-success/30",
        warning: "border-transparent bg-warning/20 text-warning hover:bg-warning/30",
        info: "border-transparent bg-info/20 text-info hover:bg-info/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }