# **Master Instruction Brief: Vanguard Emboss UI Kit Creation**

## **System & Goal Context**

You are an expert Frontend Engineer and Visual UI Specialist. Your goal is to build the **Vanguard Emboss UI Kit**—a premium, highly tactile **Neumorphic (Soft UI / Embossed)** design system built with **React (TypeScript)**, **Tailwind CSS**, and **Radix UI Primitives** (conforming to the shadcn/ui structural paradigm).  
Unlike flat design systems, Vanguard Emboss treats the screen as a single, continuous, vacuum-formed tactile sheet (either "Soft Clay" light gray or "Charcoal Slate" dark gray). Components must look like they are seamlessly molded out of, extruded from, or routed into this surface.

## **1\. Absolute Design System Laws (Strictly Enforce)**

If you violate these laws, the three-dimensional optical illusion will fail:

1. **The Background Rule (Crucial):** Every component's resting background color must *exactly* match its parent container's background color.  
   * **Light Theme Canvas:** \#eceef1 (HLS/HSL: 210, 20%, 94%)  
   * **Dark Theme Canvas:** \#282e38 (HLS/HSL: 215, 15%, 18%)  
2. **The 45-Degree Light Source Rule:** All depth is created by a single virtual light shining from the **top-left**.  
   * **Raised/Extruded Elements:** Top-left outer shadow is light/white. Bottom-right outer shadow is dark.  
   * **Sunken/Recessed Elements:** Top-left *inner* shadow is dark. Bottom-right *inner* shadow is light/white.  
3. **No High-Contrast Borders:** Do not use default dark borders. Use soft gradients or matched outer shadows. If a border is required, it must match the background tint (e.g., border-stone-200/20).

## **2\. Global CSS & Tailwind Setup**

Inject this configuration first before rendering any components.

### **Step 2A: Tailwind CSS Custom Box Shadows (tailwind.config.js)**

Extend the theme configurations to support the soft-embossed physics:  
module.exports \= {  
  theme: {  
    extend: {  
      boxShadow: {  
        // \--- Light Theme (Clay) \---  
        'emboss-out-light': '9px 9px 16px rgb(203, 210, 219), \-9px \-9px 16px rgb(255, 255, 255)',  
        'emboss-out-light-sm': '4px 4px 8px rgb(203, 210, 219), \-4px \-4px 8px rgb(255, 255, 255)',  
        'emboss-in-light': 'inset 6px 6px 10px rgb(203, 210, 219), inset \-6px \-6px 10px rgb(255, 255, 255)',  
        'emboss-in-light-sm': 'inset 3px 3px 6px rgb(203, 210, 219), inset \-3px \-3px 6px rgb(255, 255, 255)',

        // \--- Dark Theme (Slate) \---  
        'emboss-out-dark': '9px 9px 16px rgb(19, 23, 28), \-9px \-9px 16px rgb(53, 61, 74)',  
        'emboss-out-dark-sm': '4px 4px 8px rgb(19, 23, 28), \-4px \-4px 8px rgb(53, 61, 74)',  
        'emboss-in-dark': 'inset 6px 6px 10px rgb(19, 23, 28), inset \-6px \-6px 10px rgb(53, 61, 74)',  
        'emboss-in-dark-sm': 'inset 3px 3px 6px rgb(19, 23, 28), inset \-3px \-3px 6px rgb(53, 61, 74)',  
      }  
    }  
  }  
}

## **3\. Core Component Specifications & Behaviors**

Implement the following set of master components. Ensure full support for cn utility classes and accessibility.

### **Component A: Main Action Rotary Dial (Knob Control)**

* **Visual Reference:** Large circular dial with outer bevel tracking.  
* **Functional Spec:** Must track mouse movements on click-and-drag, calculating the angle relative to the dial's center to update state values between 0 and 360 degrees.  
* **Styling details:**  
  * Base outer container: rounded-full bg-\[\#eceef1\] shadow-emboss-out-light (dark mode fallback).  
  * Inner concentric track: shadow-emboss-in-light-sm.  
  * Central rotating hub: shadow-emboss-out-light-sm containing a directional notch indicating current rotation.

### **Component B: Recessed Parameter Slider Track (with Custom Thumbs)**

* **Visual Reference:** Deep, smoothly routed parameter channels with glowing progress tracks.  
* **Functional Spec:** Wrapper over Radix UI Slider.  
* **Styling details:**  
  * Track background: h-6 rounded-full bg-\[\#eceef1\] shadow-emboss-in-light.  
  * Range active indicator: Rich gradient (bg-gradient-to-r from-sky-400 to-blue-500) indicating the current value level.  
  * Slider Thumb: Raised capsule circular thumb, size h-8 w-8, utilizing shadow-emboss-out-light-sm to look lifted.

### **Component C: The 3D Push Button (Interactive State Transitions)**

* **Visual Reference:** Extruded rounded buttons that physically push inward on press.  
* **Functional Spec:** Real interactive animation state swapping.  
* **Styling details:**  
  * Default Unpressed State: shadow-emboss-out-light-sm translate-y-0.  
  * Active/Pressed State: Change shadows to shadow-emboss-in-light-sm and apply translation shift translate-y-\[1px\] to mimic actual physics.

### **Component D: Sub-Action Toggle / Tactile Switch**

* **Visual Reference:** Smooth rounded toggles with deep slots.  
* **Functional Spec:** Over Radix UI Switch.  
* **Styling details:**  
  * Base track: Recessed pill shape (shadow-emboss-in-light-sm).  
  * Switch Thumb: Round ball matching the channel depth, utilizing shadow-emboss-out-light-sm that glides smoothly across state transitions.

### **Component E: Validation Toggle (Correct / Incorrect Glow Panel)**

* **Visual Reference:** Orange-red active neon validation pill and neutral gray fallback.  
* **Functional Spec:** Binary validation switcher with a gorgeous outer radial light leak.  
* **Styling details:**  
  * When Active/Correct: Apply a warm orange/red background gradient (from-orange-500 to-red-600) surrounded by a saturated colored shadow to mimic a glowing button (shadow-\[0\_0\_15px\_rgba(249,115,22,0.5)\]).

## **4\. Acceptance Criteria for Agent Validation**

Before delivering the components, verify:

1. Do components seamlessly blend into the \#eceef1 (light) or \#282e38 (dark) canvas wrapper?  
2. Are all transition durations smooth (transition-all duration-150 or duration-300) to maintain a cozy, organic tactile responsiveness?  
3. Is accessibility maintained, including keyboard focus states (using soft ring-2 ring-sky-400) and standard ARIA attributes?