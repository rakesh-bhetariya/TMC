# InfraOne TMT Calculator - Design Guidelines

## Design Approach: Material Design System (Utility-Focused)
**Rationale**: Construction site utility app requiring efficiency, accuracy, and mobile-first design with large touch targets. Material Design provides clear visual hierarchy and robust mobile patterns ideal for field use.

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Navy Blue)**
- Primary: 220 85% 25% (Navy Blue - main brand color)
- Primary Light: 220 75% 35%
- Primary Dark: 220 90% 18%

**Accent Colors (Orange)**
- Accent: 25 95% 55% (Orange - CTAs and highlights)
- Accent Light: 25 90% 65%
- Accent Dark: 25 100% 45%

**Neutral Colors**
- Background: 220 15% 97% (off-white)
- Surface: 0 0% 100% (white cards)
- Text Primary: 220 20% 15%
- Text Secondary: 220 15% 45%
- Border: 220 20% 85%

**Semantic Colors**
- Success: 142 76% 36% (calculation complete)
- Warning: 38 92% 50%
- Error: 0 84% 60%

### B. Typography

**Font Family**
- Primary: 'Inter', system-ui, -apple-system, sans-serif (via Google Fonts)
- Monospace: 'JetBrains Mono', monospace (for numerical displays)

**Type Scale**
- Hero/Display: text-3xl font-bold (30px) - App title
- Section Heading: text-xl font-semibold (20px) - Mode headers
- Body: text-base font-medium (16px) - Labels, inputs
- Small: text-sm (14px) - Helper text
- Numerical Display: text-2xl font-mono font-bold (24px) - Calculation results

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (within cards)
- Standard spacing: p-4, gap-4 (card padding, form gaps)
- Section spacing: py-6, py-8 (between major sections)
- Large spacing: p-12, p-16 (top-level container padding)

**Container Strategy**
- Max width: max-w-md (448px) centered - optimal for mobile calculator
- Card spacing: space-y-4 between cards
- Form elements: space-y-3 within forms

**Grid System**
- Single column mobile-first layout
- Calculation summary: 2-column grid for label-value pairs
- Multi-bar table: Full-width responsive table with horizontal scroll if needed

---

## D. Component Library

### Navigation & Header
- **Sticky Header**: Navy blue background (primary color)
- Logo/Title: "InfraOne TMT Calculator" in white, text-xl, left-aligned
- Mode Toggle: Segmented control (Bhari/Bars modes) - white background with orange active state
- Height: h-14 with appropriate padding

### Calculator Input Section
**Mode-Specific Forms**
- Card-based design: white background, rounded-lg, shadow-sm
- Diameter Selector: Large dropdown/select with clear labels (8mm, 10mm, etc.)
- Quantity Input: Number input with large touch targets (min-h-12)
- Add Button: Orange accent background, full-width on mobile, rounded-md
- Input labels: Navy blue text, font-medium

**Base Price Input** (for cost estimate)
- Prominent card at top when cost estimate is enabled
- Label: "Base Price (₹/MT for 20mm)"
- Number input with currency symbol
- Helper text explaining price adjustments

### Multi-Bar Aggregation Table
**Table Design**
- Responsive table with alternating row backgrounds
- Headers: Navy blue background with white text
- Columns: Diameter | Quantity | Weight (MT) | Price/MT | Total Cost | Action
- Remove button: Small red icon button per row
- Sticky header on scroll
- Footer row: Bold totals with orange accent background

**Mobile Table Adaptation**
- Card-based view for mobile: Each bar as a card showing all details
- Swipe-to-delete gesture option
- Clear visual separation between items

### Results Display
**Calculation Summary Cards**
- Individual calculation: Light blue background card
- Total weight: Large numerical display in monospace font
- Cost breakdown: Structured list with price adjustments visible
- Grand total: Prominent orange-accented card with large numbers

### PWA Installation Instructions
**Accordion/Collapsible Section**
- Located in footer or separate help tab
- Two sections: iOS Instructions | Android Instructions
- Icon-guided step-by-step visual instructions
- Light gray background to differentiate from main content

### Buttons & CTAs
**Primary Actions** (Add Bar, Calculate)
- Background: Orange accent
- Text: White, font-semibold
- Size: min-h-11 for easy tapping
- Rounded: rounded-md
- Full-width on mobile

**Secondary Actions** (Clear All, Reset)
- Outline style with navy border
- Background: Transparent
- Hover: Light navy background

**Icon Buttons** (Remove, Info)
- Small circular buttons
- Navy or red for destructive actions
- 40x40px minimum touch target

---

## E. Animations & Interactions

**Minimal Animation Strategy** (Construction site focus - fast and functional)
- Button press: Subtle scale(0.98) on active
- Card additions: Fade-in 200ms
- Number updates: Smooth transition on calculated values
- Toggle switches: 150ms ease transition
- No loading spinners needed (calculations are instant)

---

## Mobile-First Considerations

**Touch Targets**
- Minimum 44x44px for all interactive elements
- Generous padding on form inputs (p-3 minimum)
- Adequate spacing between tappable elements (gap-3 minimum)

**Viewport Management**
- App fills viewport with natural scrolling
- Sticky header remains visible during scroll
- No forced full-height sections

**Offline Support Visual Indicators**
- Subtle indicator when offline (small banner or icon)
- All calculations work offline (no API calls needed)

---

## Data Visualization

**Specification Table Reference**
- Collapsed by default, expandable via "View Spec Table" button
- Clean table design matching specification image format
- Columns: Diameter | Per Piece Wt | Pieces in Bhari | Bhari Wt (KG)

**Cost Breakdown Display**
- Clear formula visualization: "Base Price + Adjustment = Final Price"
- Color-coded adjustments: Orange for additions, Navy for base

---

## Accessibility & Dark Mode
- High contrast maintained (navy on white)
- Form labels properly associated
- Number inputs with appropriate input modes (numeric keyboard)
- Error states with red borders and clear messages
- **Light mode only** for construction site visibility in bright sunlight

---

## Images
**No hero images required** - This is a utility calculator app focused purely on functionality. All visual interest comes from the navy blue and orange brand colors, clear typography hierarchy, and well-structured data presentation.