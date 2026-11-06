import type { Design } from './types';
import { MOTIFS } from './motifs';
const escapeXml = (s:string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]!));
export function designSvg(design: Design, pxWidth: number, pxHeight: number) {
  const elements=design.elements.map(e => {
    const x=e.x*pxWidth,y=e.y*pxHeight,w=e.width*pxWidth,h=e.height*pxHeight;
    if(e.kind==='motif') return `<path d="${MOTIFS[e.value] || MOTIFS.Étoile}" fill="${e.color}" transform="translate(${x} ${y}) rotate(${e.rotation} ${w/2} ${h/2}) scale(${w/24} ${h/24})"/>`;
    const lines=e.value.split('\n').slice(0,4);
    return `<text x="${x+w/2}" y="${y+h/2}" text-anchor="middle" dominant-baseline="middle" fill="${e.color}" font-family="${e.font === 'Cormorant Garamond' ? 'Cormorant Garamond,Georgia,serif' : 'DM Sans,Arial,sans-serif'}" font-size="${e.fontSize || 30}" transform="rotate(${e.rotation} ${x+w/2} ${y+h/2})">${lines.map((l,i)=>`<tspan x="${x+w/2}" dy="${i ? '1.15em' : '0'}">${escapeXml(l)}</tspan>`).join('')}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pxWidth}" height="${pxHeight}" viewBox="0 0 ${pxWidth} ${pxHeight}">${elements}</svg>`;
}
export async function downloadDtfPng(design: Design, name='little-dream-dtf.png') {
  // 300 dpi: millimetres / 25.4 * 300. Transparent canvas contains artwork only.
  const width=Math.round(design.widthMm/25.4*300),height=Math.round(design.heightMm/25.4*300);
  const blob=new Blob([designSvg(design,width,height)],{type:'image/svg+xml'});
  const url=URL.createObjectURL(blob);
  try { await document.fonts.ready; const image=new Image(); image.src=url; await image.decode(); const canvas=document.createElement('canvas'); canvas.width=width;canvas.height=height; const ctx=canvas.getContext('2d'); if(!ctx) throw new Error('Canvas indisponible'); ctx.drawImage(image,0,0); const png=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Export impossible')),'image/png')); const a=document.createElement('a'); const output=URL.createObjectURL(png); a.href=output;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(output),2000); }
  finally { URL.revokeObjectURL(url); }
}
