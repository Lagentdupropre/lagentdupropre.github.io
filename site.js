{
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // bulles de savon
 if(!reduce)$$('[data-bubbles]').forEach(B=>{const n=+B.dataset.bubbles||12;B.innerHTML=Array.from({length:n},()=>{const z=12+Math.random()*34;return `<span class="bub" style="left:${3+Math.random()*92}%;width:${z}px;height:${z}px;animation-duration:${7+Math.random()*8}s;animation-delay:${-Math.random()*14}s"></span>`}).join('')});
 // menu mobile
 const menu=$('#menu'),nav=$('#nav');
 if(menu){menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)})}
 const y=$('#y');if(y)y.textContent=new Date().getFullYear();
 // formulaire de devis
 const f=$('#f');
 if(f){
  const v=id=>$('#'+id).value.trim(),msg=$('#msg');
  const fill=()=>{const h=decodeURIComponent(location.hash.slice(1));if(!h)return;
   if(h.startsWith('ville-')){const want=h.slice(6);const opt=$$('#villes option').map(o=>o.value).find(t=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ /g,'-')===want);if(opt)$('#ville').value=opt}
   else{const c=$('#c-'+h);if(c)c.checked=true}};
  fill();addEventListener('hashchange',fill);
  const live=!/claude|localhost/.test(location.hostname)&&location.protocol.startsWith('http');
  f.addEventListener('submit',e=>{
   msg.className='';
   if(!v('nom')||!v('tel')){e.preventDefault();msg.className='err';msg.textContent='Merci d’indiquer au moins votre nom et votre téléphone.';return}
   if(live){msg.textContent='Envoi en cours…';return} // le formulaire part directement par email
   e.preventDefault();
   msg.textContent='Aperçu : ici le formulaire ne peut pas partir. Une fois le site en ligne, la demande arrivera directement par email à adp.74@hotmail.com.';
  });
 }
}
{
 const box=document.getElementById('callbox');
 if(box){
  const prev=/claude/.test(location.hostname)||!location.protocol.startsWith('http');
  const mobile=matchMedia('(pointer: coarse)').matches;
  const txt=document.getElementById('cbtxt'),cp=document.getElementById('cbcopy');let last=null;
  const open=()=>{txt.textContent=mobile&&!prev?'Touchez le numéro pour appeler.':(mobile?'Aperçu : l’appel direct marchera une fois le site en ligne. En attendant, composez ce numéro.':'Composez ce numéro depuis votre téléphone.');box.hidden=false;last=document.activeElement;document.getElementById('cbx').focus()};
  const close=()=>{box.hidden=true;cp.textContent='Copier le numéro';if(last)last.focus()};
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="tel:"]');if(!a||a.classList.contains('cbnum')&&!prev)return;
   if(mobile&&!prev)return; // sur téléphone, le lien lance l'appel directement
   e.preventDefault();open()});
  box.addEventListener('click',e=>{if(e.target===box)close()});
  document.getElementById('cbx').addEventListener('click',close);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!box.hidden)close()});
  cp.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('06 89 37 47 41');cp.textContent='Numéro copié ✓'}catch(err){cp.textContent='06 89 37 47 41'}});
 }
}
