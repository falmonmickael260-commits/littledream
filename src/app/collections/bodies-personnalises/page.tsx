import Link from 'next/link';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/catalog';
import { ProductCard } from '@/components/product-card';
export const metadata: Metadata = { title: 'Bodies personnalisés' };
export default async function Bodies() { const products = (await getProducts()).filter((p) => p.category === 'body' && p.customizable); return <div className="container"><div className="page-intro"><span className="eyebrow">La collection</span><h1>Bodies personnalisés</h1><p className="lead">Choisissez un body disponible, puis créez votre composition dans notre studio.</p></div>{products.length ? <div className="product-grid">{products.map((p) => <ProductCard key={p.id} product={p}/>)}</div> : <div className="empty"><h2>Les bodies arrivent bientôt</h2><p>Le studio sera accessible dès la publication d’un modèle avec variantes et stock confirmés.</p><Link href="/collections" className="btn">Voir toutes les collections</Link></div>}<div style={{ height:90 }}/></div>; }
