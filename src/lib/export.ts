import type { Design } from './types';
import { MOTIFS } from './motifs';

function loadImage(src:string){return new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Illustration introuvable: ${src}`));image.src=src;});}

export async function downloadDtfPng(design:Design,name='little-dream-dtf.png'){
 const width=Math.round(design.widthMm/25.4*300),height=Math.round(design.heightMm/25.4*300);
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas indisponible');
 await document.fonts.ready;
 for(const e of design.elements){
  const x=e.x*width,y=e.y*height,w=e.width*width,h=e.height*height;
  ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(e.rotation*Math.PI/180);
  if(e.kind==='motif'&&!MOTIFS[e.value]){const image=await loadImage(e.value);ctx.drawImage(image,-w/2,-h/2,w,h);}
  else if(e.kind==='motif'){ctx.fillStyle=e.color;ctx.scale(w/24,h/24);ctx.fill(new Path2D(MOTIFS[e.value]));}
  else {const size=(e.fontSize||30)*width/220;ctx.fillStyle=e.color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${size}px ${e.font==='Cormorant Garamond'?'Cormorant Garamond, Georgia, serif':'DM Sans, Arial, sans-serif'}`;const lines=e.value.split('\n').slice(0,4);const lineHeight=size*1.15;lines.forEach((line,index)=>ctx.fillText(line,0,(index-(lines.length-1)/2)*lineHeight,w));}
  ctx.restore();
 }
 const png=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Export PNG impossible')),'image/png'));
 const url=URL.createObjectURL(png);const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
