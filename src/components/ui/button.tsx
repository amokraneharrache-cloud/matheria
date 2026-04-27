import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          {
            "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 shadow-md": variant === "default",
            "bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] hover:bg-slate-50": variant === "outline",
            "hover:bg-slate-100 text-slate-700": variant === "ghost",
            "bg-[#10b981] text-white hover:bg-[#10b981]/90 shadow-md": variant === "secondary",
            "h-12 px-6 py-2 text-base": size === "default",
            "h-9 rounded-full px-3": size === "sm",
            "h-14 rounded-full px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
