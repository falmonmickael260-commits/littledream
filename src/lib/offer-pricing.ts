export type Offer = 'motif' | 'motif-prenom';
export type PackSize = 1 | 2 | 3;

type Prices = { 1: number; 2: number | null; 3: number | null };

// Amounts in cents. An unset pack tariff uses the unit price per body.
export const offerPrices: Record<Offer, Prices> = {
  motif: { 1: 1799, 2: null, 3: null },
  'motif-prenom': { 1: 1999, 2: null, 3: null },
};

export function packPrice(offer: Offer, size: PackSize): number {
  const prices = offerPrices[offer];
  return prices[size] ?? prices[1] * size;
}
