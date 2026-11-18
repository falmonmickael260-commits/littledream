'use client';
import {useEffect,useState} from 'react';
export function BrandLoader(){
 const [loading,setLoading]=useState(true);
 useEffect(()=>{
   const finish=()=>setLoading(false);
   if(document.readyState==='complete')finish();
   else window.addEventListener('load',finish,{once:true});
   return ()=>window.removeEventListener('load',finish);
 },[]);
 if(!loading)return null;
 return <div className="brand-loader" role="status" aria-label="Chargement de Little Dream"><svg viewBox="0 0 120 120" width="80" aria-hidden="true"><path d="M42 16 Q60 34 78 16 L96 23 111 46 94 56 85 45 85 79 Q74 86 67 101 Q60 109 53 101 Q46 86 35 79 L35 45 26 56 9 46 24 23Z" fill="none" stroke="currentColor" strokeWidth="2" pathLength="1"/><text x="60" y="66" textAnchor="middle">✦</text></svg></div>;
}
