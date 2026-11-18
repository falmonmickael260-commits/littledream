'use client';
import {useEffect,useState} from 'react';
import {GarmentPreview} from './garment-preview';
import {renderPrint} from '@/lib/export';
import type {Design} from '@/lib/types';

// Use the production composition so every saved element and placement is visible.
export function CartGarment({design,color}:{design:Design;color?:string}){
 const [preview,setPreview]=useState('');
 useEffect(()=>{
   let current=true;
   renderPrint(design).then(canvas=>{
     if(!current)return;
     const thumb=document.createElement('canvas');thumb.width=300;thumb.height=Math.max(1,Math.round(300*canvas.height/canvas.width));
     thumb.getContext('2d')?.drawImage(canvas,0,0,thumb.width,thumb.height);
     setPreview(thumb.toDataURL());
   }).catch(()=>{if(current)setPreview('');});
   return ()=>{current=false;};
 },[design]);
 return <GarmentPreview color={color} motif={preview} placement={{x:0,y:0,scale:1}}/>;
}
