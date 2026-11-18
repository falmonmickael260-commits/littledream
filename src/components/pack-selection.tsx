import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {money} from '@/lib/constants';
import {packPrice} from '@/lib/offer-pricing';

const selections=[
  {title:'Solo',subtitle:'Une illustration à choisir',href:'/packs',size:1},
  {title:'Duo',subtitle:'Deux petits compagnons',href:'/packs?selection=animaux',size:2},
  {title:'Trio',subtitle:'Trois escapades dans le ciel',href:'/packs?selection=ciel',size:3}
] as const;
export function PackSelection(){
 return <section className="gift-story store-width" data-reveal>
   <figure><img src="/images/trousseau.webp" alt="Composition de présentation de trois bodies illustrés dans un écrin terracotta" loading="lazy"/><figcaption>Inspiration cadeau</figcaption></figure>
   <div className="gift-options"><p className="collection-label">Les packs naissance</p><h2>Son premier<br/><em>trousseau.</em></h2>
   <p>Choisissez un format. Chaque body peut avoir son motif, sa taille et son prénom.</p>
   <div>{selections.map(s=><Link href={s.href} key={s.title}><span><strong>{s.title}</strong><small>{s.subtitle}</small></span><b>dès {money(packPrice('motif',s.size))}</b><ArrowUpRight size={18}/></Link>)}</div></div>
 </section>;
}
