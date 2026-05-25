# **Vanguard Emboss UI Kit: Master Design System & Architectural Guide**

Welcome to the **Vanguard Emboss Edition**\! This guide outlines the core design language, mathematical lighting principles, CSS variable tokens, and ready-to-use **shadcn/ui \+ Tailwind CSS** components for your premium Neumorphic (Soft UI) collection.  
Unlike standard flat component libraries, **Vanguard Emboss** treats the screen as a physical, vacuum-formed plastic, soft clay, or slate canvas. Components are either seamlessly *extruded* (raised out of the background) or *recessed* (carved/sunken into the canvas) by calculating realistic light sources.

## **1\. The Physics of Neumorphic Lighting**

Neumorphism achieves its three-dimensional illusion by simulating a single directional light source. In the Vanguard Emboss system, the default virtual light source shines from the **top-left (at a 45° angle)**.  
       \[Virtual Sun / Light Source\]  
                 \\  
                  \\  (Highlight)  
    \================\*-----------------------------  \<- Extruded Top-Left Edge (White/Glow)  
   /                                             \\  
  /                RAISED SURFACE                 \\  
 /                                                 \\  
\---------------------------------------------\*====== \<- Shadowed Bottom-Right Edge (Dark)  
                                            / (Shadow)

### **The Two Golden Rules of Embossed Design:**

1. **The Core Matching Rule:** The background color of your interactive component *must* match the background color of its parent container. If they do not match, the three-dimensional "extrusion" illusion collapses.  
2. **The Dual Shadow Rule:** \* **Raised/Extruded elements** use an outer light shadow on the top-left and an outer dark shadow on the bottom-right.  
   * **Sunken/Recessed elements** use an *inner* dark shadow on the top-left and an *inner* light shadow on the bottom-right.

## **2\. Design Tokens & Global CSS Variables**

Add these to your globals.css file to support clean Light Clay and Dark Slate aesthetics. These colors have been carefully mapped to match the tone, depth, and contrast of your reference images.  
/\* globals.css \*/  
@layer base {  
  :root {  
    /\* Vanguard Light Emboss (Soft Clay Wood & Ash) \*/  
    \--emboss-bg-light: 210 20% 94%;          /\* \#eceef1 \- Seamless light clay \*/  
    \--emboss-highlight-light: 0 0% 100%;     /\* Pure white light source reflection \*/  
    \--emboss-shadow-light: 210 16% 80%;      /\* \#cbd2db \- Soft volumetric shadow \*/

    /\* Active Accents & Indicator Glows \*/  
    \--emboss-accent-blue: 217 91% 60%;       /\* Active blue track/dial glow \*/  
    \--emboss-accent-orange: 14 90% 55%;      /\* "Correct" active orange glow \*/  
    \--emboss-accent-green: 150 70% 50%;      /\* Success green \*/

    /\* Shadcn Semantic Mapping (Light Theme Default) \*/  
    \--background: var(--emboss-bg-light);  
    \--foreground: 215 15% 15%;  
    \--card: var(--emboss-bg-light);  
    \--card-foreground: 215 15% 15%;  
    \--popover: var(--emboss-bg-light);  
    \--popover-foreground: 215 15% 15%;  
    \--primary: var(--emboss-accent-blue);  
    \--primary-foreground: 0 0% 100%;  
    \--border: var(--emboss-shadow-light);  
    \--ring: var(--emboss-accent-blue);  
    \--radius: 1.5rem;                        /\* Soft, organic high-radius curves \*/  
  }

  .dark {  
    /\* Vanguard Dark Emboss (Polished Slate / Charcoal Ironwood) \*/  
    \--emboss-bg-dark: 215 15% 18%;           /\* \#282e38 \- Deep rich slate \*/  
    \--emboss-highlight-dark: 215 15% 24%;    /\* \#353d4a \- Subtle upper-left edge glow \*/  
    \--emboss-shadow-dark: 215 25% 10%;       /\* \#13171c \- Heavy structural shadow \*/

    /\* Shadcn Semantic Mapping (Dark Theme) \*/  
    \--background: var(--emboss-bg-dark);  
    \--foreground: 210 20% 95%;  
    \--card: var(--emboss-bg-dark);  
    \--card-foreground: 210 20% 95%;  
    \--popover: var(--emboss-bg-dark);  
    \--popover-foreground: 210 20% 95%;  
    \--primary: var(--emboss-accent-blue);  
    \--primary-foreground: 0 0% 100%;  
    \--border: var(--emboss-shadow-dark);  
    \--ring: var(--emboss-accent-blue);  
  }  
}

## **3\. Tailwind Configuration Extensions**

To easily apply the dual-shadow physics, extend your tailwind.config.js with these custom shadow configurations:  
// tailwind.config.js  
module.exports \= {  
  theme: {  
    extend: {  
      boxShadow: {  
        // \--- Light Theme (Clay) Shadows \---  
        /\* Standard Raised Element \*/  
        'emboss-out-light': '9px 9px 16px rgb(203, 210, 219), \-9px \-9px 16px rgb(255, 255, 255)',  
        /\* Micro Raised Element (Toggles, Sliders, Knobs) \*/  
        'emboss-out-light-sm': '4px 4px 8px rgb(203, 210, 219), \-4px \-4px 8px rgb(255, 255, 255)',  
        /\* Deep Carved Recess (Input tracks, wells) \*/  
        'emboss-in-light': 'inset 6px 6px 10px rgb(203, 210, 219), inset \-6px \-6px 10px rgb(255, 255, 255)',  
        /\* Micro Recessed Element \*/  
        'emboss-in-light-sm': 'inset 3px 3px 6px rgb(203, 210, 219), inset \-3px \-3px 6px rgb(255, 255, 255)',

        // \--- Dark Theme (Slate) Shadows \---  
        /\* Standard Raised Element \*/  
        'emboss-out-dark': '9px 9px 16px rgb(19, 23, 28), \-9px \-9px 16px rgb(53, 61, 74)',  
        /\* Micro Raised Element \*/  
        'emboss-out-dark-sm': '4px 4px 8px rgb(19, 23, 28), \-4px \-4px 8px rgb(53, 61, 74)',  
        /\* Deep Carved Recess \*/  
        'emboss-in-dark': 'inset 6px 6px 10px rgb(19, 23, 28), inset \-6px \-6px 10px rgb(53, 61, 74)',  
        /\* Micro Recessed Element \*/  
        'emboss-in-dark-sm': 'inset 3px 3px 6px rgb(19, 23, 28), inset \-3px \-3px 6px rgb(53, 61, 74)',  
      }  
    }  
  }  
}

## **4\. Production-Ready React Components**

These components are designed to drop seamlessly into a **shadcn/ui** and Tailwind codebase.

### **A. The Embossed Action Knob / Dial**

This component matches the gorgeous "Main Action" rotary control from Reference 1\. It rotates smoothly on user interaction (built as a controlled or uncontrolled knob element).  
import \* as React from "react"  
import { cn } from "@/lib/utils"

export interface EmbossDialProps extends React.HTMLAttributes\<HTMLDivElement\> {  
  value?: number; // 0 to 360 degrees  
  onChange?: (value: number) \=\> void;  
}

export const EmbossDial \= React.forwardRef\<HTMLDivElement, EmbossDialProps\>(  
  ({ className, value \= 45, onChange, ...props }, ref) \=\> {  
    const dialRef \= React.useRef\<HTMLDivElement\>(null)

    const handleMouseMove \= (e: MouseEvent) \=\> {  
      if (\!dialRef.current || \!onChange) return  
      const rect \= dialRef.current.getBoundingClientRect()  
      const centerX \= rect.left \+ rect.width / 2  
      const centerY \= rect.top \+ rect.height / 2  
      const angle \= Math.atan2(e.clientY \- centerY, e.clientX \- centerX)  
      let degrees \= (angle \* 180\) / Math.PI \+ 90 // Adjust offset so 0 is up  
      if (degrees \< 0\) degrees \+= 360  
      onChange(Math.round(degrees))  
    }

    const handleMouseDown \= () \=\> {  
      window.addEventListener("mousemove", handleMouseMove)  
      window.addEventListener("mouseup", () \=\> {  
        window.removeEventListener("mousemove", handleMouseMove)  
      })  
    }

    return (  
      \<div  
        ref={dialRef}  
        onMouseDown={handleMouseDown}  
        className={cn(  
          "relative w-36 h-36 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-shadow duration-300",  
          "bg-\[\#eceef1\] shadow-emboss-out-light hover:shadow-emboss-out-light-sm",  
          "dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark dark:hover:shadow-emboss-out-dark-sm",  
          className  
        )}  
        {...props}  
      \>  
        {/\* Inner concentric recessed track \*/}  
        \<div className="absolute inset-4 rounded-full bg-\[\#eceef1\] shadow-emboss-in-light-sm dark:bg-\[\#282e38\] dark:shadow-emboss-in-dark-sm" /\>  
          
        {/\* Raised center hub cap \*/}  
        \<div className="absolute inset-8 rounded-full bg-\[\#eceef1\] shadow-emboss-out-light-sm dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark-sm flex items-center justify-center"\>  
          {/\* Rotating directional indicator needle \*/}  
          \<div  
            className="absolute inset-2 transition-transform duration-75 ease-out"  
            style={{ transform: \`rotate(${value}deg)\` }}  
          \>  
            \<div className="w-1 h-4 rounded-full bg-slate-400 dark:bg-slate-500 mx-auto shadow-\[inset\_0\_1px\_1px\_rgba(0,0,0,0.3)\]" /\>  
          \</div\>  
        \</div\>  
      \</div\>  
    )  
  }  
)  
EmbossDial.displayName \= "EmbossDial"

### **B. Tactile Slider System**

Perfectly replicating the volume and parameter tracks in your references. The track is beautifully routed into the plate, and the thumb is a raised capsule that is easily draggable.  
import \* as React from "react"  
import \* as SliderPrimitive from "@radix-ui/react-slider"  
import { cn } from "@/lib/utils"

export const EmbossSlider \= React.forwardRef\<  
  React.ElementRef\<typeof SliderPrimitive.Root\>,  
  React.ComponentPropsWithoutRef\<typeof SliderPrimitive.Root\>  
\>(({ className, ...props }, ref) \=\> (  
  \<SliderPrimitive.Root  
    ref={ref}  
    className={cn("relative flex w-full touch-none select-none items-center", className)}  
    {...props}  
  \>  
    {/\* Inner Sunken Slot / Track \*/}  
    \<SliderPrimitive.Track className="relative h-6 w-full grow overflow-hidden rounded-full bg-\[\#eceef1\] shadow-emboss-in-light dark:bg-\[\#282e38\] dark:shadow-emboss-in-dark"\>  
      {/\* Embossed Active Fill \*/}  
      \<SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full" /\>  
    \</SliderPrimitive.Track\>  
      
    {/\* Extruded Rounded Thumb Control \*/}  
    \<SliderPrimitive.Thumb className="block h-8 w-8 rounded-full border border-stone-200/20 bg-\[\#eceef1\] shadow-emboss-out-light-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark-sm active:scale-95 cursor-grab active:cursor-grabbing" /\>  
  \</SliderPrimitive.Root\>  
))  
EmbossSlider.displayName \= "EmbossSlider"

### **C. The 3D Push Button**

A satisfying tactile button. Instead of just hovering, this button physically "sinks" into the interface when active, transitioning its shadow from out to in.  
import \* as React from "react"  
import { Slot } from "@radix-ui/react-slot"  
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes\<HTMLButtonElement\> {  
  asChild?: boolean  
}

export const EmbossButton \= React.forwardRef\<HTMLButtonElement, ButtonProps\>(  
  ({ className, asChild \= false, ...props }, ref) \=\> {  
    const Comp \= asChild ? Slot : "button"  
    return (  
      \<Comp  
        className={cn(  
          "px-6 py-3 rounded-2xl font-semibold select-none transition-all duration-150 active:scale-\[0.98\]",  
          // Light Shadows  
          "bg-\[\#eceef1\] text-stone-700 shadow-emboss-out-light-sm hover:text-stone-900 active:shadow-emboss-in-light-sm",  
          // Dark Shadows  
          "dark:bg-\[\#282e38\] dark:text-stone-300 dark:shadow-emboss-out-dark-sm dark:hover:text-stone-100 dark:active:shadow-emboss-in-dark-sm",  
          className  
        )}  
        ref={ref}  
        {...props}  
      /\>  
    )  
  }  
)  
EmbossButton.displayName \= "EmbossButton"

### **D. Layer Stack Elevation Card**

As seen in the "Elevation" stack mockup in Reference 1, this component leverages multi-tiered cards stacked offset on top of each other with progressive shadows to create real vertical distance.  
import \* as React from "react"  
import { cn } from "@/lib/utils"

export const EmbossElevationStack \= ({ className, ...props }: React.HTMLAttributes\<HTMLDivElement\>) \=\> {  
  return (  
    \<div className={cn("relative w-full max-w-sm h-48 mx-auto flex items-center justify-center", className)} {...props}\>  
      {/\* Deepest/Bottom Card \*/}  
      \<div className="absolute w-\[80%\] h-32 rounded-3xl translate-y-6 opacity-40 bg-\[\#eceef1\] shadow-emboss-out-light dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark" /\>  
        
      {/\* Middle Card \*/}  
      \<div className="absolute w-\[90%\] h-32 rounded-3xl translate-y-3 opacity-80 bg-\[\#eceef1\] shadow-emboss-out-light dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark" /\>  
        
      {/\* Top Raised Focus Card \*/}  
      \<div className="absolute w-full h-32 rounded-3xl bg-\[\#eceef1\] shadow-emboss-out-light dark:bg-\[\#282e38\] dark:shadow-emboss-out-dark flex items-center justify-between px-6"\>  
        \<span className="font-bold text-slate-700 dark:text-slate-300"\>Stack Deck\</span\>  
        \<span className="text-sm px-3 py-1 rounded-full bg-\[\#eceef1\] shadow-emboss-in-light-sm dark:bg-\[\#282e38\] dark:shadow-emboss-in-dark-sm text-slate-500"\>  
          Tier 3  
        \</span\>  
      \</div\>  
    \</div\>  
  )  
}

## **5\. Setting up the Custom Shadcn Registry**

To configure this system for rapid installations using shadcn@latest add, organize your repository structure as follows:

### **File Tree:**

├── public/  
├── registry/  
│   ├── index.json             \# Root registry list  
│   └── ui/  
│       ├── button.json        \# EmbossButton schema config  
│       ├── slider.json        \# EmbossSlider schema config  
│       ├── dial.json          \# EmbossDial schema config  
│       └── elevation.json     \# EmbossElevationStack schema config

### **Adding via the Shadcn CLI:**

Developers can import your components instantly without cloning your repo manually:  
npx shadcn@latest add \[https://raw.githubusercontent.com/Dream-Pixels-Forge/vanguard-wooden-uikit/main/registry/ui/dial.json\](https://raw.githubusercontent.com/Dream-Pixels-Forge/vanguard-wooden-uikit/main/registry/ui/dial.json)  
