'use client';
import {useEffect,useRef} from 'react';
export function HeroMotion({children}:{children:React.ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
   let disposed=false;
   let cleanup=()=>{};
   void Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
     if(disposed||!ref.current)return;
     gsap.registerPlugin(ScrollTrigger);
     const media=gsap.matchMedia();
     media.add('(prefers-reduced-motion: no-preference)',()=>{
       gsap.from('[data-hero]',{y:20,opacity:0,duration:.65,stagger:.08});
       gsap.to('.hero-model',{yPercent:4,ease:'none',scrollTrigger:{trigger:ref.current,start:'top top',end:'bottom top',scrub:true}});
     },ref.current);
     cleanup=()=>media.revert();
   });
   return ()=>{disposed=true;cleanup();};
 },[]);
 return <div ref={ref}>{children}</div>;
}
