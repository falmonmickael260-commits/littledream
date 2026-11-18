'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import {ILLUSTRATIONS} from '@/lib/illustrations';
import {PhotoBody} from './photo-body';
import type {Design} from '@/lib/types';
const Viewer=dynamic(()=>import('./body-viewer').then(m=>m.BodyViewer),{ssr:false});
const design:Design={version:1,widthMm:100,heightMm:75,elements:[{kind:'motif',id:'lion',value:ILLUSTRATIONS[0].src,x:.07,y:.04,width:.86,height:.89,color:'#493a33',rotation:0}]};
export function HeroBody(){
 const [view,setView]=useState(false);
 return <div className="hero-visual"><PhotoBody className="crop"/>{view&&<div className="hero-model"><Viewer design={design} color="#ece0cd"/></div>}<button className="hero-switch size" onClick={()=>setView(!view)}>{view?'Voir la photo de démonstration':'Découvrir le body en 3D'}</button></div>;
}
