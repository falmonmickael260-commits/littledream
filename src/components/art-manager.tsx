'use client';
import {useState} from 'react';
import {useLibrary,originals,type Artwork} from '@/lib/motif-library';
import {BodyArt} from './body-art';

export function ArtManager(){
  const {items,save}=useLibrary();
  const blank=():Artwork=>({...originals[0],id:'',name:'',src:'',published:false});
  const [item,setItem]=useState<Artwork>(blank);
  const [message,status]=useState('');
  const patch=(changes:Partial<Artwork>)=>setItem(old=>({...old,...changes}));
  return <main className="container section"><h1>Atelier des motifs</h1><p>Catalogue de démonstration enregistré dans ce navigateur.</p>
  <label className="field">Motif à modifier<select value={item.id} onChange={e=>{setItem(items.find(m=>m.id===e.target.value)??blank());status('');}}><option value="">Nouveau motif</option>{items.map(m=><option key={m.id} value={m.id}>{m.name} · {m.published?'publié':'brouillon'}</option>)}</select></label>
  <form className="split" onSubmit={e=>{e.preventDefault();if(!item.src||!item.offers.length){status('Choisissez un PNG et au moins une formule.');return;}try{const next={...item,id:item.id||crypto.randomUUID()};save(next);setItem(next);status('Motif enregistré.');}catch{status('Stockage local plein. Réduisez la taille du PNG.');}}}>
  <div><label className="field">Illustration PNG<input type="file" accept="image/png" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;const signature=new Uint8Array(await file.slice(0,8).arrayBuffer());if(signature.join(',')!=='137,80,78,71,13,10,26,10'){status('Choisissez un fichier PNG valide.');return;}const reader=new FileReader();reader.onload=()=>patch({src:String(reader.result)});reader.readAsDataURL(file);}}/></label>
  <label className="field">Nom<input required value={item.name} onChange={e=>patch({name:e.target.value})}/></label>
  <label className="field">Collection<input required value={item.collection} onChange={e=>patch({collection:e.target.value})}/></label>
  {(['motif','motif-prenom'] as const).map(o=><label key={o}><input type="checkbox" checked={item.offers.includes(o)} onChange={e=>patch({offers:e.target.checked?[...item.offers,o]:item.offers.filter(v=>v!==o)})}/>{o==='motif'?'Motif':'Motif + Prénom'} </label>)}
  {(['scale','x','y'] as const).map((k,i)=><label key={k} className="field">{['Taille du motif','Position horizontale','Position verticale'][i]}<input type="range" min={k==='scale'?.1:0} max={k==='scale'?.85:1-item.scale} step=".01" value={item[k]} onChange={e=>{const n=Number(e.target.value);patch(k==='scale'?{scale:n,x:Math.min(item.x,1-n),y:Math.min(item.y,1-n)}:{[k]:n});}}/></label>)}
  <label className="field">Visibilité<select value={String(item.published)} onChange={e=>patch({published:e.target.value==='true'})}><option value="false">Brouillon ou retiré</option><option value="true">Publié</option></select></label><button className="btn">Enregistrer</button><p role="status">{message}</p></div>
  <div style={{maxWidth:340,position:'relative',alignSelf:'start'}}><BodyArt/>{item.src&&<img src={item.src} alt="Aperçu du placement" style={{position:'absolute',left:(27+46*item.x)+'%',top:(32+27*item.y)+'%',width:(46*item.scale)+'%',height:(27*item.scale)+'%'}}/>}</div></form></main>;
}
