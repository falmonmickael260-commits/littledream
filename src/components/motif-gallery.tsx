'use client';
import Link from 'next/link';
import {useLibrary} from '@/lib/motif-library';
import {BodyArt} from './body-art';
export function MotifGallery(){
 const {items}=useLibrary();
 const published=items.filter(m=>m.published&&m.offers.length);
 return <section className="section"><h2>Choisir une illustration</h2>{[...new Set(published.map(m=>m.collection))].map(c=><section key={c}><h3>{c}</h3><div className="art-grid">{published.filter(m=>m.collection===c).map(m=><Link className="art-card" key={m.id} href={'/personnaliser/'+(m.offers.includes('motif')?'body-bebe-doux':'body-bebe-personnalise')+'?motif='+encodeURIComponent(m.id)}><div><BodyArt/><img loading="lazy" src={m.src} alt=""/></div><strong>{m.name}</strong><small>Personnaliser · dès {m.offers.includes('motif')?'17,99':'19,99'} €</small></Link>)}</div></section>)}
 <h2>Les packs à composer</h2><div className="hero-actions"><Link className="btn" href="/packs?selection=animaux">Duo petits animaux</Link><Link className="btn btn-outline" href="/packs?selection=ciel">Trio ciel et étoiles</Link></div></section>;
}
