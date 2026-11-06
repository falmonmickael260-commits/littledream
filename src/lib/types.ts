export type Product = {
  id: string; slug: string; name: string; description: string | null;
  composition: string | null; care: string | null; category: string;
  customizable: boolean; active: boolean; image_url: string | null;
  print_width_mm: number; print_height_mm: number;
  preview?: boolean;
};
export type Variant = {
  id: string; product_id: string; color: string; color_hex: string;
  size: string; price_cents: number | null; stock: number; active: boolean;
};
export type CatalogProduct = Product & { variants: Variant[] };
export type DesignElement = {
  id: string; kind: 'text' | 'motif'; value: string; x: number; y: number;
  width: number; height: number; rotation: number; color: string;
  font?: string; fontSize?: number;
};
export type Design = { version: 1; widthMm: number; heightMm: number; elements: DesignElement[] };
export type CartLine = {
  key: string; productId: string; variantId: string; quantity: number;
  design?: Design;
};
