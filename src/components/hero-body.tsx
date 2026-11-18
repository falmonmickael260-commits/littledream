'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import {Box, ImageIcon} from 'lucide-react';
import {ILLUSTRATIONS} from '@/lib/illustrations';
import type {Design} from '@/lib/types';

const Viewer=dynamic(()=>import('./body-viewer').then(m=>m.BodyViewer),{ssr:false});
const design:Design={version:1,widthMm:100,heightMm:75,elements:[{kind:'motif',id:'fox',value:ILLUSTRATIONS[12].src,x:.1,y:.05,width:.8,height:.85,color:'#493a33',rotation:0}]};
export function HeroBody(){
  const [view,setView]=useState(false);
  return <figure className="campaign-photo">
    <img src="/images/little-dream-campagne.webp" alt="Aperçu d’un body ivoire au renard endormi, sur un drap bleu" fetchPriority="high"/>
    {view&&<div className="campaign-model"><Viewer design={design} color="#f5ebd9"/></div>}
    <figcaption>Aperçu de collection</figcaption>
    <button className="model-switch" onClick={()=>setView(!view)}>{view?<ImageIcon size={16}/>:<Box size={17}/>} {view?'Revoir le visuel':'Explorer en 3D'}</button>
  </figure>;
}
