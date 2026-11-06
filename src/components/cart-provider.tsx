'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import Link from 'next/link';
import { X } from 'lucide-react';
import type { CartLine, Design } from '@/lib/types';

type CartContext = { lines: CartLine[]; add: (productId: string, variantId: string, quantity?: number, design?: Design) => void; update: (key: string, quantity: number) => void; remove: (key: string) => void; clear: () => void; open: () => void; count: number };
const Context = createContext<CartContext | null>(null);
const STORAGE = 'little-dream-cart-v1';
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem(STORAGE) || '[]'); if (Array.isArray(saved)) setLines(saved); } catch { localStorage.removeItem(STORAGE); } }, []);
  useEffect(() => { localStorage.setItem(STORAGE, JSON.stringify(lines)); }, [lines]);
  const value = useMemo<CartContext>(() => ({
    lines, count: lines.reduce((n, l) => n + l.quantity, 0), open: () => setDrawer(true),
    add: (productId, variantId, quantity = 1, design) => { setLines((old) => {
      if (!design) { const existing = old.find((l) => l.productId === productId && l.variantId === variantId && !l.design); if (existing) return old.map((l) => l.key === existing.key ? { ...l, quantity: Math.min(20, l.quantity + quantity) } : l); }
      return [...old, { key: crypto.randomUUID(), productId, variantId, quantity, design }];
    }); setDrawer(true); },
    update: (key, quantity) => setLines((old) => old.map((l) => l.key === key ? { ...l, quantity: Math.max(1, Math.min(20, quantity)) } : l)),
    remove: (key) => setLines((old) => old.filter((l) => l.key !== key)), clear: () => setLines([]),
  }), [lines]);
  return <Context.Provider value={value}><MotionConfig reducedMotion="user">{children}<AnimatePresence>{drawer && <><motion.button className="drawer-backdrop" aria-label="Fermer le panier" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="drawer" aria-label="Mini-panier" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }}><div className="drawer-head"><h2 style={{ fontSize: '2.6rem' }}>Votre panier</h2><button className="icon-button" aria-label="Fermer" onClick={() => setDrawer(false)}><X size={22}/></button></div><p>{value.count} article{value.count > 1 ? 's' : ''}</p>{lines.length ? <><div style={{ margin: '40px 0' }}>{lines.map((l) => <div key={l.key} style={{ borderTop: '1px solid var(--line)', padding: '15px 0' }}><p>Article personnalisé {l.design ? '· création enregistrée' : ''}</p><small>Variante : {l.variantId.slice(0, 8)} · Qté {l.quantity}</small></div>)}</div><Link className="btn" href="/panier" onClick={() => setDrawer(false)}>Voir mon panier</Link></> : <p className="prose">Votre panier est vide. Explorez la collection pour commencer.</p>}</motion.aside></>}</AnimatePresence></MotionConfig></Context.Provider>;
}
export function useCart() { const c = useContext(Context); if (!c) throw new Error('CartProvider absent'); return c; }
