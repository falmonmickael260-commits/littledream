'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useLibrary} from '@/lib/motif-library';
import {BodyArt} from './body-art';
import type {Offer} from '@/lib/offer-pricing';
import {money} from '@/lib/constants';
import {packPrice} from '@/lib/offer-pricing';

export function MotifGallery({search=''}:{search?:string}){
 const {items}=useLibrary();
 const [collection,setCollection]=useState('');
 const [offer,setOffer]=useState<Offer>('motif');
 const [query,setQuery]=useState(search);
 const published=items.filter(m=>m.published&&m.offers.includes(offer));
 const visible=published.filter(m=>(!collection||collection===m.collection)&&m.name.toLocaleLowerCase('fr').includes(query.trim().toLocaleLowerCase('fr')));
 return <section className="catalog-main">
  <div className="offer-options" aria-label="Formule du body">{(['motif','motif-prenom'] as const).map(o=><button key={o} aria-pressed={o===offer} onClick={()=>setOffer(o)}><strong>{o==='motif'?'Motif':'Motif + Prénom'}</strong><span>{money(packPrice(o,1))}</span></button>)}</div>
  <div className="catalog-tools"><div className="collection-tabs">{['',...new Set(published.map(m=>m.collection))].map(c=><button key={c} aria-pressed={collection===c} onClick={()=>setCollection(c)}>{c||'Tous les motifs'}</button>)}</div><input type="search" aria-label="Rechercher un motif" placeholder="Rechercher un motif…" value={query} onChange={e=>setQuery(e.target.value)}/></div>
  <div className="store-products">{visible.map(m=><Link key={m.id} className="store-product" href={'/personnaliser/'+(offer==='motif'?'body-bebe-doux':'body-bebe-personnalise')+'?motif='+encodeURIComponent(m.id)}>
    <div className="product-board"><BodyArt color="#f6f0e5"/><img src={m.src} alt="" loading="lazy"/></div>
    <div><h3>{m.name}</h3><b>{money(packPrice(offer,1))}</b></div><small>Personnaliser ↗</small></Link>)}</div>
  {!visible.length&&<p role="status">Aucun motif trouvé pour cette recherche.</p>}
 </section>;
}
