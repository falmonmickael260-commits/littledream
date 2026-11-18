import Link from 'next/link';
import {MotifGallery} from '@/components/motif-gallery';
import {PackSelection} from '@/components/pack-selection';
export const metadata={title:'Boutique de bodies personnalisés'};
export default async function Collections({searchParams}:{searchParams:Promise<{recherche?:string}>}){
 const params=await searchParams;
 return <><section className="store-width"><header className="shop-heading"><p className="collection-label">Little Dream · 100 % coton</p><h1>La boutique.</h1><p>Choisissez votre illustration, puis composez le body de bébé.</p></header>
 <MotifGallery search={params.recherche}/>
 <div className="offer-links"><Link href="/produits/body-bebe-doux">Fiche du body Motif ↗</Link><Link href="/produits/body-bebe-personnalise">Fiche du body Motif + Prénom ↗</Link></div></section><PackSelection/></>;
}
