"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}>({
  expanded: true,
  setExpanded: () => undefined,
})

export function Sidebar({
  className,
  defaultExpanded = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "w-64" : "w-16",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      className={cn("flex h-14 items-center px-4", expanded ? "justify-start" : "justify-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-auto p-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto p-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarToggle({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded, setExpanded } = React.useContext(SidebarContext)

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10",
        className,
      )}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
        expanded ? "justify-start" : "justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarMenuButton({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
        expanded ? "justify-start" : "justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-4 my-2 h-px bg-border", className)} {...props} />
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("absolute right-0 top-0 h-full w-px bg-border", className)} {...props} />
}

export function SidebarInset({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      className={cn(
        "absolute inset-y-0 right-0 left-0 flex flex-col transition-all duration-300 ease-in-out",
        expanded ? "left-64" : "left-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded, setExpanded } = React.useContext(SidebarContext)

  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </button>
  )
}
