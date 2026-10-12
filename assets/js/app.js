(() => {
  'use strict';
  const pageUrl = new URL('./', window.location.href);
  const canonical = document.getElementById('canonical-url');
  const ogUrl = document.getElementById('og-url');
  const ogImage = document.getElementById('og-image');
  if (canonical) canonical.href = pageUrl.href;
  if (ogUrl) ogUrl.content = pageUrl.href;
  if (ogImage) ogImage.content = new URL('assets/images/hero-salon.jpg', pageUrl).href;
  const schema = { '@context':'https://schema.org', '@type':'ProfessionalService', name:'CHEQ', url:pageUrl.href, image:new URL('assets/images/hero-salon.jpg', pageUrl).href, description:'Servicio independiente de documentación del estado de viviendas en alquiler.', areaServed:{'@type':'City',name:'Valencia'}, serviceType:'Inspección visual y documentación del estado de vivienda' };
  const schemaNode = document.createElement('script'); schemaNode.type='application/ld+json'; schemaNode.textContent=JSON.stringify(schema); document.head.appendChild(schemaNode);
  const form=document.getElementById('request-form'); const output=document.getElementById('request-output'); const copyButton=document.getElementById('copy-request');
  const buildRequest=()=>{ const data=new FormData(form); return ['SOLICITUD DE INSPECCIÓN CHEQ','',`Nombre: ${data.get('nombre')||''}`,`Email: ${data.get('email')||''}`,`Teléfono: ${data.get('telefono')||''}`,`Ciudad: ${data.get('ciudad')||''}`,`Servicio: ${data.get('servicio')||''}`,`Fecha preferida: ${data.get('fecha')||''}`,'',`Observaciones: ${data.get('observaciones')||'Sin observaciones'}`].join('\n'); };
  if(form && output){ form.addEventListener('submit', async event=>{ event.preventDefault(); if(!form.reportValidity()) return; const button=form.querySelector('button[type="submit"]'); if(button){button.disabled=true;button.textContent='Enviando…';} try{ const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}); if(!response.ok) throw new Error('send failed'); output.textContent='Solicitud enviada correctamente. Te contactaremos lo antes posible.'; form.reset(); }catch(error){ output.textContent='No se ha podido enviar la solicitud. Puedes escribirnos a Cheqinmo@gmail.com.'; } finally{ output.classList.add('visible'); output.focus(); if(button){button.disabled=false;button.textContent='Preparar solicitud';} } }); }
  if(copyButton){ copyButton.addEventListener('click',async()=>{ if(!form.reportValidity()) return; output.textContent=buildRequest(); output.classList.add('visible'); try{ await navigator.clipboard.writeText(output.textContent); copyButton.textContent='Solicitud copiada'; setTimeout(()=>{copyButton.textContent='Copiar solicitud';},1800); }catch(_){ output.focus(); } }); }
})();

(() => {
  const select=document.getElementById('room-select'); const video=document.getElementById('room-video'); if(!select||!video) return;
  const videos={salon:'assets/videos/salon.mp4',cocina:'assets/videos/cocina.mp4',bano:'assets/videos/bano.mp4',hdormitorio:'assets/videos/dormitorio.mp4',reporte:'assets/videos/Reporte.mp4'};
  select.addEventListener('change',()=>{ const source=video.querySelector('source'); const nextVideo=videos[select.value]; if(!source||!nextVideo) return; source.src=nextVideo; video.load(); video.play().catch(()=>{}); });
})();
