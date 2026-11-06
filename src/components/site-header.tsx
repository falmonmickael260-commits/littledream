'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCart } from './cart-provider';
const links = [['Collections','/collections'],['Bodies personnalisés','/collections/bodies-personnalises'],['Idées cadeaux','/idees-cadeaux'],['Notre histoire','/notre-histoire']];
export function SiteHeader() {
  const [mobile, setMobile] = useState(false);
  const { count, open } = useCart();
  return <header className="site-header"><div className="announcement">Des petits vêtements pour de grands souvenirs</div><div className="header-inner container"><nav className="nav" aria-label="Navigation principale">{links.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav><button className="icon-button mobile-menu" aria-label={mobile ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button><Link href="/" className="brand" aria-label="Little Dream, accueil"><strong>LITTLE DREAM</strong><small>PERSONNALISÉ AVEC AMOUR</small></Link><div className="header-actions"><Link className="icon-button hide-mobile" href="/collections?recherche=" aria-label="Rechercher"><Search size={20}/></Link><Link className="icon-button hide-mobile" href="/favoris" aria-label="Favoris"><Heart size={20}/></Link><Link className="icon-button hide-mobile" href="/compte" aria-label="Compte"><UserRound size={20}/></Link><button className="icon-button" onClick={open} aria-label={`Ouvrir le panier, ${count} articles`}><ShoppingBag size={20}/>{count > 0 && <sup>{count}</sup>}</button></div></div><AnimatePresence>{mobile && <motion.nav aria-label="Navigation mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', borderTop: '1px solid var(--line)' }}><div className="container" style={{ display: 'grid', gap: 0, paddingBlock: 16 }}>{[...links,['Recherche','/collections?recherche='],['Favoris','/favoris'],['Mon compte','/compte']].map(([label,href]) => <Link key={href} href={href} onClick={() => setMobile(false)} style={{ padding: '14px 0', borderBottom: '1px solid var(--line)' }}>{label}</Link>)}</div></motion.nav>}</AnimatePresence></header>;
}
