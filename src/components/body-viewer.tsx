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
    const a=i/segments*Math.PI*2;pos.push(w*Math.sin(a),y,d*Math.cos(a));uv.push(i/segments,(y+1.23)/2.35);
    if(j&&i){const k=j*(segments+1)+i;indices.push(k-segments-2,k-1,k,k-segments-2,k,k-segments-1);}
   }});
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
   // Fine vertical ribs give the cotton a directional relief under the studio light.
   const weave=document.createElement('canvas');weave.width=64;weave.height=64;
   const fibers=weave.getContext('2d')!;
   fibers.fillStyle='#808080';fibers.fillRect(0,0,64,64);
   for(let i=0;i<64;i+=4){fibers.fillStyle='#a7a7a7';fibers.fillRect(i,0,1,64);}
   const cotton=new T.CanvasTexture(weave);
   cotton.wrapS=cotton.wrapT=T.RepeatWrapping;cotton.repeat.set(12,7);
   const material=new T.MeshStandardMaterial({side:T.DoubleSide,roughness:.97,bumpMap:cotton,bumpScale:.004});
   const mesh=new T.Mesh(geo,material);
   const trimMaterial=new T.MeshStandardMaterial({color:0xdbd1c0,roughness:.9});
   const collarPoints=Array.from({length:64},(_,i)=>{
     const a=i*Math.PI/32;return new T.Vector3(.33*Math.sin(a),1.04-.105*Math.cos(a),.117*Math.cos(a));
   });
   const collar=new T.TubeGeometry(new T.CatmullRomCurve3(collarPoints,true),64,.014,6,true);
   mesh.add(new T.Mesh(collar,trimMaterial));
   const snapShape=new T.TorusGeometry(.023,.007,8,18);
   const snapMaterial=new T.MeshStandardMaterial({color:0xb5a48c,metalness:.55,roughness:.4});
   for(const x of [-.105,0,.105]){
     const snap=new T.Mesh(snapShape,snapMaterial);snap.position.set(x,-1.15,.09);mesh.add(snap);
   }
   scene.add(mesh,new T.HemisphereLight(0xffffff,0xad8c77,2));
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
    for(const center of [0,1024])ctx.drawImage(ink,center-112,340,224,280);
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
    material.map?.dispose();material.map=texture;material.needsUpdate=true;draw();
   };
   paint.current=()=>{void redraw().catch(()=>setFailed(true));};
   dispose=()=>{resize.disconnect();material.map?.dispose();geo.dispose();material.dispose();cotton.dispose();collar.dispose();trimMaterial.dispose();snapShape.dispose();snapMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
   paint.current();
  }
  void setup().catch(()=>{if(!stopped)setFailed(true);});
  return ()=>{stopped=true;dispose();paint.current=()=>{};};
 },[]);
 if(failed)return <p role="status">La vue 2D est disponible sur cet appareil.</p>;
 return <div className="viewer"><div ref={host} tabIndex={0} role="group" aria-label="Body en 3D. Utilisez les flèches pour tourner." onKeyDown={e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();rotate.current(e.key==='ArrowLeft'?-.22:.22);}}} onPointerDown={e=>e.currentTarget.setPointerCapture(e.pointerId)} onPointerMove={e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))rotate.current(e.movementX*.017);}}/><button type="button" className="size" onClick={()=>rotate.current(Math.PI/4)}>Faire pivoter le body</button></div>;
}
