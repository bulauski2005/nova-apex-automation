import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-[var(--accent)] data-[state=checked]:shadow-[0_0_12px_rgba(95,225,238,0.6)] data-[state=unchecked]:bg-[var(--accent)] data-[state=unchecked]:opacity-60 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-[var(--accent)] inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-[background-color,box-shadow,opacity] duration-300 ease-out outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
          className={cn(
            "bg-background data-[state=checked]:bg-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full shadow-md ring-0 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-0.5"
          )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
