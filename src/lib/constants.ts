export const COLORS = [
  { name: 'Beige', hex: '#E8D9C7' },
  { name: 'Rose pastel', hex: '#EBCFD2' },
  { name: 'Bleu ciel', hex: '#D3E1E8' },
  { name: 'Vert clair', hex: '#CCD7C9' },
] as const;
export const SIZES = ['0–3 mois', '3–6 mois', '6–9 mois', '9–12 mois', '12–18 mois', '18–24 mois'] as const;
export const money = (cents: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
