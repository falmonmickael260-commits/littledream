'use client';
import {useEffect,useRef,useState} from 'react';
import type {Design} from '@/lib/types';
import {renderPrint} from '@/lib/export';

export function BodyViewer({color,design}:{color:string;design:Design}){
 const host=useRef<HTMLDivElement>(null);
 const rotate=useRef<(n:number)=>void>(()=>{});
 const paint=useRef<()=>void>(()=>{});
 const props=useRef({color,design});
 const [failed,setFailed]=useState(false);
 useEffect(()=>{props.current={color,design};paint.current();},[color,design]);
 useEffect(()=>{
  let stopped=false;
  let dispose=()=>{};
  async function setup(){
   const T=await import('three');
   const el=host.current;
   if(!el||stopped)return;
   const renderer=new T.WebGLRenderer({antialias:true,alpha:true});
   renderer.setPixelRatio(Math.min(devicePixelRatio,2));el.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(33,1,.1,20);
   camera.position.set(0,.02,5);
   const rings=[[-1.23,.19,.055],[-1.12,.25,.09],[-.96,.38,.12],[-.82,.55,.16],[-.72,.62,.18],[.44,.61,.21],[.37,.83,.12],[.51,1.03,.11],[.98,.78,.13],[1.12,.47,.13],[1.05,.38,.1],[.96,.28,.09],[.93,.19,.065]];
   const pos:number[]=[],uv:number[]=[],indices:number[]=[];
   const segments=80;
   rings.forEach(([y,w,d],j)=>{for(let i=0;i<=segments;i++){
    const a=i/segments*Math.PI*2;pos.push(w*Math.sin(a),y,d*Math.cos(a));uv.push(i/segments,j/(rings.length-1));
    if(j&&i){const k=j*(segments+1)+i;indices.push(k-segments-2,k-1,k,k-segments-2,k,k-segments-1);}
   }});
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
   const material=new T.MeshStandardMaterial({side:T.DoubleSide,roughness:.97});
   const mesh=new T.Mesh(geo,material);scene.add(mesh,new T.HemisphereLight(0xffffff,0xad8c77,2));
   const light=new T.DirectionalLight(0xfff4e9,2);light.position.set(-2,3,4);scene.add(light);
   const draw=()=>renderer.render(scene,camera);
   const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();});resize.observe(el);
   rotate.current=n=>{mesh.rotation.y+=n;draw();};
   let version=0;
   const redraw=async()=>{
    const seq=++version,{design:current,color:tint}=props.current;
    const ink=await renderPrint(current);
    if(stopped||seq!==version)return;
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1024;
    const ctx=canvas.getContext('2d')!;ctx.fillStyle=tint;ctx.fillRect(0,0,1024,1024);
    // The front crosses the UV seam. Draw one continuous panel on both ends.
    for(const center of [0,1024])ctx.drawImage(ink,center-91,612,182,118);
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
    material.map?.dispose();material.map=texture;material.needsUpdate=true;draw();
   };
   paint.current=()=>{void redraw().catch(()=>setFailed(true));};
   dispose=()=>{resize.disconnect();material.map?.dispose();geo.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();};
   paint.current();
  }
  void setup().catch(()=>{if(!stopped)setFailed(true);});
  return ()=>{stopped=true;dispose();paint.current=()=>{};};
 },[]);
 if(failed)return <p role="status">La vue 2D est disponible sur cet appareil.</p>;
 return <div className="viewer"><div ref={host} tabIndex={0} role="group" aria-label="Body en 3D. Utilisez les flèches pour tourner." onKeyDown={e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();rotate.current(e.key==='ArrowLeft'?-.22:.22);}}} onPointerDown={e=>e.currentTarget.setPointerCapture(e.pointerId)} onPointerMove={e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))rotate.current(e.movementX*.017);}}/><button type="button" className="size" onClick={()=>rotate.current(Math.PI/4)}>Faire pivoter le body</button></div>;
}
