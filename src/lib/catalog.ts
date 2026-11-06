import 'server-only';
import { supabaseServer } from './supabase/server';
import type { CatalogProduct } from './types';

const PREVIEW_PRODUCTS: CatalogProduct[] = [
  {
    id: '10000000-0000-4000-8000-000000000001', slug: 'body-bebe-doux', name: 'Body bébé doux',
    description: 'Un essentiel délicat pour les premiers jours. Visuel de présentation à remplacer par vos photos produit.',
    composition: 'Composition à confirmer avant publication.', care: 'Conseils d’entretien à confirmer.', category: 'body', customizable: false,
    active: true, image_url: null, print_width_mm: 100, print_height_mm: 75, preview: true,
    variants: ['Beige','Rose pastel','Bleu ciel','Vert clair'].flatMap((color, ci) => ['0–3 mois','3–6 mois','6–9 mois','9–12 mois','12–18 mois','18–24 mois'].map((size, si) => ({
      id: `20000000-0000-4000-8000-${String(ci*6+si+1).padStart(12,'0')}`, product_id: '10000000-0000-4000-8000-000000000001', color,
      color_hex: ['#E8D9C7','#EBCFD2','#D3E1E8','#CCD7C9'][ci], size, price_cents: 1690, stock: 1, active: true,
    }))),
  },
  {
    id: '10000000-0000-4000-8000-000000000002', slug: 'body-bebe-personnalise', name: 'Body bébé personnalisé',
    description: 'Composez un prénom, une date et un motif dans le studio Little Dream.',
    composition: 'Composition à confirmer avant publication.', care: 'Conseils d’entretien à confirmer.', category: 'body', customizable: true,
    active: true, image_url: null, print_width_mm: 100, print_height_mm: 75, preview: true,
    variants: ['Beige','Rose pastel','Bleu ciel','Vert clair'].flatMap((color, ci) => ['0–3 mois','3–6 mois','6–9 mois','9–12 mois','12–18 mois','18–24 mois'].map((size, si) => ({
      id: `30000000-0000-4000-8000-${String(ci*6+si+1).padStart(12,'0')}`, product_id: '10000000-0000-4000-8000-000000000002', color,
      color_hex: ['#E8D9C7','#EBCFD2','#D3E1E8','#CCD7C9'][ci], size, price_cents: 3000, stock: 1, active: true,
    }))),
  },
];

export async function getProducts(): Promise<CatalogProduct[]> {
  const db = await supabaseServer();
  if (!db) return PREVIEW_PRODUCTS;
  const { data, error } = await db.from('products').select('*, variants(*)').eq('active', true).order('created_at', { ascending: false });
  if (error) throw new Error('Catalogue indisponible.');
  return (data as CatalogProduct[]).map((p) => ({ ...p, variants: p.variants.filter((v) => v.active && v.stock > 0 && v.price_cents !== null) }));
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug) ?? null;
}
