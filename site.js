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
   $('#prest').value=$$('.checks input:checked').map(c=>c.value).join(', ')||'non précisé';
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
{
 const A=(window.AVIS||[]).filter(a=>a&&a.texte).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
 const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const stars=n=>{n=Math.max(0,Math.min(5,Math.round(+n||0)));return `<span class="st" aria-label="${n} sur 5">${'★'.repeat(n)}<i>${'★'.repeat(5-n)}</i></span>`};
 const fdate=d=>{const x=new Date(d);return isNaN(x)?'':x.toLocaleDateString('fr-FR',{month:'long',year:'numeric'})};
 const card=a=>`<figure class="rv"><div class="rvtop">${stars(a.note)}${a.prestation?`<span class="rvtag">${esc(a.prestation)}</span>`:''}</div><blockquote>« ${esc(a.texte)} »</blockquote><figcaption><b>${esc(a.prenom||'Client')}</b>${a.commune?` · ${esc(a.commune)}`:''}${a.date?` · ${fdate(a.date)}`:''}</figcaption></figure>`;
 // bandeau défilant (accueil)
 const M=document.getElementById('marq');
 if(M&&A.length){const items=A.slice(0,12).map(a=>`<div class="mi">${stars(a.note)}<span>« ${esc(a.texte.length>140?a.texte.slice(0,137)+'…':a.texte)} »</span><b>— ${esc(a.prenom||'Client')}${a.commune?', '+esc(a.commune):''}</b></div>`).join('');
  M.innerHTML=`<div class="mrow" style="--dur:${Math.max(30,A.slice(0,12).length*9)}s">${items}${items}</div>`;M.classList.add('on')}
 // page avis
 const G=document.getElementById('rgrid'),S=document.getElementById('rsum');
 if(G){if(A.length){G.innerHTML=A.map(card).join('');const moy=A.reduce((s,a)=>s+(+a.note||0),0)/A.length;S.innerHTML=`<b>${moy.toFixed(1).replace('.',',')}</b>${stars(moy)}<span>${A.length} avis client${A.length>1?'s':''}</span>`}
  else{S.remove();G.innerHTML=`<div class="rempty"><h3>Aucun avis pour le moment</h3><p>Soyez le premier à partager votre expérience avec L'Agent du Propre.</p><a class="btn" href="#laisser">Laisser un avis</a></div>`}}
 // étoiles cliquables
 const ST=document.getElementById('stars');
 if(ST){const btns=[...ST.querySelectorAll('.star')],nt=document.getElementById('note'),lb=document.getElementById('slabel');let val=0;const words=['Cliquez sur les étoiles','Décevant','Moyen','Bien','Très bien','Excellent'];
  const paint=(n,cls)=>btns.forEach(b=>b.classList.toggle(cls,+b.dataset.v<=n));
  const set=n=>{val=n;paint(n,'on');btns.forEach(b=>b.setAttribute('aria-checked',+b.dataset.v===n));nt.value=n?n+' / 5':'';lb.textContent=n?n+' / 5 — '+words[n]:words[0]};
  btns.forEach(b=>{const v=+b.dataset.v;b.addEventListener('click',()=>set(v===val?v-1:v));b.addEventListener('mouseenter',()=>paint(v,'hov'));b.addEventListener('mouseleave',()=>paint(0,'hov'))});
  ST.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();set(Math.min(5,val+1));btns[Math.max(0,val-1)].focus()}if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();set(Math.max(0,val-1));btns[Math.max(0,val-1)].focus()}})}
 // formulaire d'avis
 const F=document.getElementById('fa');
 if(F){const live=!/claude|localhost/.test(location.hostname)&&location.protocol.startsWith('http');const m=document.getElementById('amsg');
  F.addEventListener('submit',e=>{m.className='';
   if(!document.getElementById('note').value||!F.aprenom.value.trim()||!F.atexte.value.trim()||!F.accord_publication.checked){e.preventDefault();m.className='err';m.textContent='Merci de donner une note, votre prénom, votre avis et d’accepter la publication.';return}
   if(live){m.textContent='Envoi en cours…';return}
   e.preventDefault();m.textContent='Aperçu : une fois sur le site en ligne, votre avis sera envoyé par email pour validation.'})}
}
