import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {MotifGallery} from '@/components/motif-gallery';
import {PackSelection} from '@/components/pack-selection';
export const metadata={title:'Boutique de bodies personnalisés'};
export default async function Collections({searchParams}:{searchParams:Promise<{recherche?:string}>}){
 const params=await searchParams;
 return <><header className="catalog-cover"><div className="store-width"><p className="dream-overline">Les bodies · 100 % coton</p><h1>La <em>boutique.</em></h1><p>Une illustration à choisir. Un prénom à imaginer.</p></div></header>
 <section className="store-width"><MotifGallery search={params.recherche}/><div className="offer-links"><Link href="/produits/body-bebe-doux">Fiche du body Motif <ArrowUpRight className="inline-arrow" size={14} aria-hidden="true"/></Link><Link href="/produits/body-bebe-personnalise">Fiche du body Motif + Prénom <ArrowUpRight className="inline-arrow" size={14} aria-hidden="true"/></Link></div></section><PackSelection/></>;
}
