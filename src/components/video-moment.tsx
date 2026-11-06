'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const VIDEO='https://videos.pexels.com/video-files/7280836/7280836-uhd_2160_3840_24fps.mp4';
const POSTER='https://images.pexels.com/photos/17713240/pexels-photo-17713240.jpeg?auto=compress&cs=tinysrgb&w=1200';
export function VideoMoment(){
 const ref=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false);
 useEffect(()=>{const video=ref.current;if(!video)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)');const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting&&!reduce.matches){video.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));}else{video.pause();setPlaying(false);}});observer.observe(video);const onReduce=()=>{if(reduce.matches){video.pause();setPlaying(false)}};reduce.addEventListener('change',onReduce);return()=>{observer.disconnect();reduce.removeEventListener('change',onReduce)};},[]);
 return <div className="video-moment"><video ref={ref} muted loop playsInline preload="none" poster={POSTER} aria-label="Scène de soin et d’habillage d’un bébé, vidéo de démonstration"><source src={VIDEO} type="video/mp4"/></video><div className="video-shade"/><div className="video-caption"><span className="eyebrow">Les instants qui comptent</span><h2>Tout commence par un petit détail.</h2><p>Vidéo d’ambiance de démonstration · Pexels / Sarah Chai</p></div><button className="video-toggle" onClick={()=>{const v=ref.current;if(!v)return;if(v.paused){v.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}else{v.pause();setPlaying(false)}}} aria-label={playing?'Mettre la vidéo en pause':'Lire la vidéo'}>{playing?<Pause size={18}/>:<Play size={18}/>}</button></div>;
}
