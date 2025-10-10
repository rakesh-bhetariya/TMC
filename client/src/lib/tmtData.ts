export interface TMTSpec {
  diameter: number;
  perPieceWeight: number;
  pcsInBhari: number;
  bhariWeight: number;
  priceAdjustment: number;
}

export const TMT_SPECS: TMTSpec[] = [
  { diameter: 8, perPieceWeight: 4.73, pcsInBhari: 15, bhariWeight: 71, priceAdjustment: 2800 },
  { diameter: 10, perPieceWeight: 7.4, pcsInBhari: 10, bhariWeight: 74, priceAdjustment: 1400 },
  { diameter: 12, perPieceWeight: 10.66, pcsInBhari: 7, bhariWeight: 74, priceAdjustment: 400 },
  { diameter: 16, perPieceWeight: 18.84, pcsInBhari: 4, bhariWeight: 75, priceAdjustment: 400 },
  { diameter: 20, perPieceWeight: 30, pcsInBhari: 3, bhariWeight: 90, priceAdjustment: 0 },
  { diameter: 25, perPieceWeight: 46, pcsInBhari: 1, bhariWeight: 46, priceAdjustment: 400 },
  { diameter: 32, perPieceWeight: 75, pcsInBhari: 1, bhariWeight: 75, priceAdjustment: 1400 },
];

export function getSpecByDiameter(diameter: number): TMTSpec | undefined {
  return TMT_SPECS.find(spec => spec.diameter === diameter);
}

export function calculateWeightFromBhari(diameter: number, bhariCount: number): number {
  const spec = getSpecByDiameter(diameter);
  if (!spec) return 0;
  return (spec.bhariWeight * bhariCount) / 1000;
}

export function calculateWeightFromBars(diameter: number, barCount: number): number {
  const spec = getSpecByDiameter(diameter);
  if (!spec) return 0;
  return (spec.perPieceWeight * barCount) / 1000;
}

export function calculatePrice(diameter: number, basePrice: number): number {
  const spec = getSpecByDiameter(diameter);
  if (!spec) return basePrice;
  return basePrice + spec.priceAdjustment;
}

export function roundUpToBhariMultiple(diameter: number, barCount: number): number {
  const spec = getSpecByDiameter(diameter);
  if (!spec) return barCount;
  
  const pcsInBhari = spec.pcsInBhari;
  const remainder = barCount % pcsInBhari;
  
  if (remainder === 0) {
    return barCount;
  }
  
  return barCount + (pcsInBhari - remainder);
}

export function calculateBhariCount(diameter: number, barCount: number): number {
  const spec = getSpecByDiameter(diameter);
  if (!spec) return 0;
  
  const roundedBars = roundUpToBhariMultiple(diameter, barCount);
  return Math.ceil(roundedBars / spec.pcsInBhari);
}
