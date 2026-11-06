import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { ProductCard } from '@/components/product-card';
export default async function Gifts(){const items=(await getProducts()).filter(p=>p.customizable);return <div className="container"><div className="page-intro"><span className="eyebrow">À offrir</span><h1>Idées cadeaux</h1><p className="lead">Un petit vêtement personnalisé pour marquer une grande arrivée.</p></div>{items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><h2>Les idées cadeaux arrivent</h2><Link href="/collections" className="btn">Découvrir les bodies</Link></div>}<div style={{height:90}}/></div>;}
