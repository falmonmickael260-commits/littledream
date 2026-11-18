'use client';
import {useEffect,useRef,type ReactNode} from 'react';

export function HeroMotion({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
   let active=true;
   let revert=()=>{};
   Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
     if(!active||!root.current)return;
     gsap.registerPlugin(ScrollTrigger);
     const media=gsap.matchMedia();
     media.add('(prefers-reduced-motion: no-preference)',()=>{
       const stage=root.current?.querySelector('.dream-stage');
       if(stage)gsap.to('.dream-landscape',{yPercent:9,ease:'none',scrollTrigger:{trigger:stage,start:'top top',end:'bottom top',scrub:true}});
       root.current?.querySelectorAll('[data-reveal]').forEach(section=>{
         gsap.from(section,{y:25,duration:.75,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 97%',once:true}});
       });
       root.current?.querySelectorAll('.character-frame').forEach((frame,i)=>{
         gsap.from(frame,{clipPath:'inset(0 0 12% 0 round 45% 45% 4% 4%)',duration:.7,delay:i*.06,scrollTrigger:{trigger:frame,start:'top 94%',once:true}});
       });
     },root.current);
     revert=()=>media.revert();
   });
   return ()=>{active=false;revert();};
 },[]);
 return <div ref={root}>{children}</div>;
}
