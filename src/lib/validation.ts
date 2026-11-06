import { z } from 'zod';

export const designElement = z.object({
  id: z.string().uuid(), kind: z.enum(['text', 'motif']), value: z.string().min(1).max(100),
  x: z.number().min(0).max(1), y: z.number().min(0).max(1),
  width: z.number().positive().max(1), height: z.number().positive().max(1),
  rotation: z.number().min(-30).max(30), color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  font: z.string().max(50).optional(), fontSize: z.number().min(12).max(72).optional(),
});
export const designSchema = z.object({ version: z.literal(1), widthMm: z.number().positive().max(500), heightMm: z.number().positive().max(500), elements: z.array(designElement).max(30) });
export const cartLineSchema = z.object({ key: z.string().uuid(), productId: z.string().uuid(), variantId: z.string().uuid(), quantity: z.number().int().min(1).max(20), design: designSchema.optional() });
export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80),
  email: z.email(), address: z.string().trim().min(5).max(200), postalCode: z.string().trim().min(2).max(20),
  city: z.string().trim().min(1).max(100), country: z.string().length(2),
  acceptedTerms: z.literal(true), lines: z.array(cartLineSchema).min(1).max(30),
  idempotencyKey: z.string().uuid(),
});
