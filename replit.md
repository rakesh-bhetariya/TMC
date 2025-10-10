# InfraOne TMT Calculator

A Progressive Web App (PWA) for calculating TMT (Thermo-Mechanically Treated) steel bar weight and cost estimates for construction sites.

## Overview

This mobile-optimized calculator helps construction professionals:
- Convert Bhari (bundles) or individual bars to tonnes (MT)
- Calculate cost estimates based on base pricing
- Save and manage estimate history
- Share estimates as JPG images with customers

## Features

### Core Functionality
- **Dual Calculation Modes**: Switch between Bhari (bundles) and number of bars
- **Customer Information**: Add customer name and delivery address to estimates
- **Weight Calculation**: Accurate weight calculations for all TMT diameters (8mm to 32mm)
- **Cost Estimation**: Base price input with automatic price adjustments per diameter
- **Multi-bar Aggregation**: Add multiple bar sizes and get combined totals

### Advanced Features
- **History Management**: Save estimates to localStorage and view/reload past calculations
- **Share as Image**: Export estimates as JPG images for sharing via WhatsApp/email
- **Specification Reference**: Built-in TMT specification table
- **PWA Support**: Installable on mobile devices with offline functionality

## Project Structure

### Frontend Components
- `Header.tsx` - App branding and title
- `CustomerInfo.tsx` - Customer name and delivery address inputs
- `ModeToggle.tsx` - Switch between Bhari/Bars calculation modes
- `CalculatorInput.tsx` - Diameter selection and quantity input
- `CalculationTable.tsx` - Display items with weights
- `WeightSummary.tsx` - Total weight and base price input
- `CostEstimate.tsx` - Complete estimate with customer info and totals
- `HistoryModal.tsx` - View, load, and delete saved estimates
- `SpecTable.tsx` - TMT specification reference table

### Data & Logic
- `tmtData.ts` - TMT specifications and calculation functions
- Weight calculations based on actual specifications
- Price adjustments per diameter (+2800 for 8mm, +1400 for 10mm, etc.)

## User Flow

1. Enter customer name and delivery address (optional)
2. Select calculation mode (Bhari or Bars)
3. Add TMT items by selecting diameter and entering quantity
4. View total weight in the calculation table
5. Enter base price (20mm reference price per MT)
6. View complete cost estimate with customer details
7. Save to history or share as JPG image

## TMT Pricing Model

Base Price: 20mm diameter price per MT

Price Adjustments:
- 8mm: Base + ₹2,800
- 10mm: Base + ₹1,400
- 12mm: Base + ₹400
- 16mm: Base + ₹400
- 20mm: Base Price
- 25mm: Base + ₹400
- 32mm: Base + ₹1,400

## Design

- **Color Scheme**: Navy Blue (#1e3a8a) and Orange (#f97316)
- **Mobile-First**: Optimized for construction site use
- **Responsive**: Works on all screen sizes
- **Professional**: Clean, utility-focused interface

## Technologies

- React + TypeScript
- Tailwind CSS + shadcn/ui components
- html2canvas for image export
- localStorage for history persistence
- Service Worker for PWA functionality

## Android APK Conversion

The app is prepared for conversion to Android APK:
- **Build Guides**: `APK_BUILD_GUIDE.md` provides step-by-step instructions for PWABuilder and Bubblewrap methods
- **Icon Setup**: `public/icon-guide.md` contains instructions for creating required PNG icons
- **Asset Links**: `public/.well-known/assetlinks.json` template for TWA verification
- **Checklist**: `BEFORE_APK_BUILD_CHECKLIST.md` ensures all requirements are met before building

**Important**: PNG icons (192x192 and 512x512) must be created before building APK. See `public/icon-guide.md` for instructions.

## Recent Changes

**Latest Update (October 2024)**:
- Fixed mobile image cropping bug: Share as JPG now captures full table width on mobile devices
- Added Android APK conversion preparation files and guides
- Updated manifest.json to reference PNG icons for Android compatibility
- Refined cost estimate layout: date inline with customer info, TOTAL aligned under Quantity column
- Removed installation instructions section
- Moved base price input to after weight calculation
- Added customer name and delivery address fields
- Implemented cost estimate with customer information
- Added share as JPG functionality using html2canvas
- Implemented history feature with save/load/delete capabilities
- Updated flow: calculate weight first, then enter price, then view cost

## Testing

All features have been tested end-to-end including:
- Customer info input and display
- Item addition and weight calculation
- Price input and cost estimation
- Save to history and reload functionality
- Share as JPG image export
- Clear all and navigation flows
