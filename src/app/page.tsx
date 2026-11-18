import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {HeroMotion} from '@/components/hero-motion';
import {HeroBody} from '@/components/hero-body';
import {PackSelection} from '@/components/pack-selection';
import {ILLUSTRATIONS} from '@/lib/illustrations';

export default function Home(){
 return <HeroMotion><HeroBody/>
   <section className="store-width character-edit" data-reveal><header className="shelf-title"><div><p className="collection-label">La collection illustrée</p><h2>Les petits <em>compagnons.</em></h2></div><Link href="/collections">Toute la boutique <ArrowUpRight className="inline-arrow" size={14} aria-hidden="true"/></Link></header>
   <div className="character-row">{[12,1,9,7].map(index=>{const m=ILLUSTRATIONS[index];return <Link key={m.id} className="character" href={'/personnaliser/body-bebe-doux?motif='+m.id}>
   <div className="character-frame"><img src={m.src} alt="" loading="lazy"/><span aria-hidden="true"><ArrowUpRight size={18}/></span></div><h3>{m.name}</h3><p>Body Motif · 17,99 €</p></Link>;})}</div></section>
   <PackSelection/>
   <section className="fabric-banner store-width" data-reveal><div><p className="collection-label">Notre fabrication</p><h2>À fleur<br/><em>de coton.</em></h2><p>Du premier dessin au fichier d’impression, découvrez comment se compose votre body.</p><Link className="btn" href="/fabrication">Visiter l’atelier <ArrowUpRight size={17}/></Link></div><figure><img src="/images/little-dream-campagne.webp" alt="Détail de l’illustration sur le coton ivoire" loading="lazy"/></figure></section>
 </HeroMotion>;
}
