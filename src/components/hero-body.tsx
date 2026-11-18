'use client';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import {ArrowRight, Box, ChevronLeft, ChevronRight, X} from 'lucide-react';
import {ILLUSTRATIONS} from '@/lib/illustrations';
import type {Design} from '@/lib/types';

const Viewer=dynamic(()=>import('./body-viewer').then(m=>m.BodyViewer),{ssr:false,loading:()=> <p role="status">Préparation de la vue 3D…</p>});
const scenes=[
  {name:'Clair de lune',title:'Sous la',accent:'lune.',image:'nocturne',alt:'Body ivoire suspendu dans un décor nocturne de lune et de nuages',index:1},
  {name:'Petite forêt',title:'Dans les',accent:'bois.',image:'little-dream-campagne',alt:'Body au renard endormi, sur une étoffe bleue',index:12},
];
export function HeroBody(){
  const [index,setIndex]=useState(0);
  const [model,setModel]=useState(false);
  const scene=scenes[index], motif=ILLUSTRATIONS[scene.index];
  const design:Design={version:1,widthMm:100,heightMm:75,elements:[{kind:'motif',id:motif.id,value:motif.src,x:.1,y:.05,width:.8,height:.8,color:'#352a29',rotation:0}]};
  const change=()=>{setIndex(i=>1-i);setModel(false);};
  return <section className={'dream-stage scene-'+index} aria-label="Collections Little Dream">
    <div className="dream-landscape"><img key={scene.image} src={'/images/'+scene.image+'.webp'} alt={scene.alt} fetchPriority="high"/></div>
    <div className="dream-shade"/>
    <div className="dream-copy" key={scene.name} aria-live="polite"><p className="dream-overline">Collection naissance · {scene.name}</p>
      <h1>{scene.title}<br/><em>{scene.accent}</em></h1><p>Des bodies 100 % coton, illustrés et personnalisés au prénom de bébé.</p>
      <div className="dream-links"><Link className="btn" href={'/personnaliser/body-bebe-personnalise?motif='+motif.id}>Personnaliser mon body <ArrowRight size={17}/></Link><Link href="/packs">Créer mon pack <ArrowUpRight className="inline-arrow" size={14} aria-hidden="true"/></Link></div>
    </div>
    <div className="scene-controls"><button onClick={change} aria-label="Collection précédente"><ChevronLeft/></button><span>{index+1} / {scenes.length}</span><button onClick={change} aria-label="Collection suivante"><ChevronRight/></button></div>
    <button className="scene-3d" aria-expanded={model} onClick={()=>setModel(!model)}><Box size={16}/> Explorer en 3D</button>
    {model&&<div className="model-panel"><button className="close-model" aria-label="Fermer la vue 3D" onClick={()=>setModel(false)}><X/></button><Viewer design={design} color="#faf0dc"/><small>Aperçu · {motif.name}</small></div>}
  </section>;
}
