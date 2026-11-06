import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { getProduct } from '@/lib/catalog';
const Studio=dynamic(()=>import('@/components/studio'),{loading:()=> <div className="container page-intro">Chargement du studio…</div>});
export const metadata: Metadata={title:'Studio de personnalisation',robots:{index:false,follow:false}};
export default async function StudioPage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{variante?:string}>}){const p=await getProduct((await params).slug);if(!p||!p.customizable||p.variants.length===0)notFound();return <Studio product={p} initialVariant={(await searchParams).variante}/>;}
