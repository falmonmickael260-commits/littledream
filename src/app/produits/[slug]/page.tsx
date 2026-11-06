import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/catalog';
import { ProductDetail } from '@/components/product-detail';
import { ProductCard } from '@/components/product-card';
export async function generateMetadata({ params }: { params: Promise<{ slug:string }> }): Promise<Metadata> { const p=await getProduct((await params).slug); return { title:p?.name || 'Produit introuvable', description:p?.description || undefined }; }
export default async function ProductPage({ params }: { params: Promise<{ slug:string }> }) { const product=await getProduct((await params).slug); if(!product) notFound(); const related=(await getProducts()).filter(p=>p.id!==product.id&&p.category===product.category).slice(0,3); return <div className="container"><div style={{ padding:'25px 0',fontSize:'.8rem' }}><Link href="/collections">Collections</Link> / {product.name}</div><ProductDetail product={product}/>{related.length>0&&<section className="section"><h2>À découvrir aussi</h2><div className="product-grid">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}</div>; }
