import type {CSSProperties} from 'react';
type Props={color?:string; motif?:string; name?:string; placement?:{x:number;y:number;scale:number}};
export function GarmentPreview({color,motif,name,placement={x:.24,y:.08,scale:.52}}:Props){
 const ink:CSSProperties={left:placement.x*100+'%',top:placement.y*100+'%',width:placement.scale*100+'%',height:placement.scale*100+'%'};
 return <div className="garment-photo">
  <img className="cotton-base" src="/images/garment.webp" alt="Aperçu du body en coton" loading="lazy"/>
  {color&&<i className="cotton-tint" style={{backgroundColor:color}} aria-hidden="true"/>}
  {(motif||name)&&<div className="cotton-print">{motif&&<img style={ink} src={motif} loading="lazy" alt=""/>}{name&&<span>{name}</span>}</div>}
 </div>;
}
