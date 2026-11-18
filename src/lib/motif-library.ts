'use client';
import {useEffect,useState} from 'react';
import {ILLUSTRATIONS} from './illustrations';
import type {Offer} from './offer-pricing';

export type Artwork = {id:string;name:string;src:string;collection:string;offers:Offer[];published:boolean;x:number;y:number;scale:number};
export const originals:Artwork[] = ILLUSTRATIONS.map(m=>({...m,collection:/lune|fusee|astronaute|nuage|montgolfiere/.test(m.id)?'Ciel et étoiles':'Petits compagnons',offers:['motif','motif-prenom'],published:true,x:.24,y:.08,scale:.52}));
const key='little-dream-artwork-v1';
export function readLibrary():Artwork[]{
  try { return JSON.parse(localStorage.getItem(key)||'null') ?? originals; } catch {return originals;}
}
export function useLibrary(){
  const [items,setItems]=useState(originals);
  useEffect(()=>{const refresh=()=>setItems(readLibrary());refresh();window.addEventListener('storage',refresh);window.addEventListener(key,refresh);return ()=>{window.removeEventListener('storage',refresh);window.removeEventListener(key,refresh);};},[]);
  function save(item:Artwork){
    const existing=readLibrary();
    localStorage.setItem(key,JSON.stringify([...existing.filter(m=>m.id!==item.id),item]));
    window.dispatchEvent(new Event(key));
  }
  return {items,save};
}
