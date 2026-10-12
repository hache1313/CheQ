(() => {
  'use strict';

  // Build deployment-aware URLs. This works on root domains and GitHub Pages project paths.
  const pageUrl = new URL('./', window.location.href);
  const canonical = document.getElementById('canonical-url');
  const ogUrl = document.getElementById('og-url');
  const ogImage = document.getElementById('og-image');
  if (canonical) canonical.href = pageUrl.href;
  if (ogUrl) ogUrl.content = pageUrl.href;
  if (ogImage) ogImage.content = new URL('assets/images/hero-salon.jpg', pageUrl).href;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CHEQ',
    url: pageUrl.href,
    image: new URL('assets/images/hero-salon.jpg', pageUrl).href,
    description: 'Servicio independiente de documentación del estado de viviendas en alquiler.',
    areaServed: { '@type': 'City', name: 'Valencia' },
    serviceType: 'Inspección visual y documentación del estado de vivienda'
  };
  const schemaNode = document.createElement('script');
  schemaNode.type = 'application/ld+json';
  schemaNode.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaNode);

  const form = document.getElementById('request-form');
  const output = document.getElementById('request-output');
  const copyButton = document.getElementById('copy-request');
  const downloadButton = document.getElementById('download-request');

  const buildRequest = () => {
    const data = new FormData(form);
    const lines = [
      'SOLICITUD DE INSPECCIÓN CHEQ',
      '',
      `Nombre: ${data.get('nombre') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Teléfono: ${data.get('telefono') || ''}`,
      `Ciudad: ${data.get('ciudad') || ''}`,
      `Servicio: ${data.get('servicio') || ''}`,
      `Fecha preferida: ${data.get('fecha') || ''}`,
      '',
      `Observaciones: ${data.get('observaciones') || 'Sin observaciones'}`
    ];
    return lines.join('\n');
  };

  if (form && output) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      output.textContent = buildRequest();
      output.classList.add('visible');
      output.focus();
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      if (!form.reportValidity()) return;
      const text = buildRequest();
      output.textContent = text;
      output.classList.add('visible');
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = 'Solicitud copiada';
        setTimeout(() => { copyButton.textContent = 'Copiar solicitud'; }, 1800);
      } catch (_) {
        output.focus();
      }
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const blob = new Blob([buildRequest()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'solicitud-cheq.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
})();


// Selector de estancia del hero
(() => {
  const select = document.getElementById('room-select');
  const video = document.getElementById('room-video');
  if (!select || !video) return;
  const videos = {
    salon: 'assets/videos/salon.mp4',
    cocina: 'assets/videos/cocina.mp4',
    bano: 'assets/videos/bano.mp4',
    hdormitorio: 'assets/videos/dormitorio.mp4'
  };
  select.addEventListener('change', () => {
    const source = video.querySelector('source');
    const nextVideo = videos[select.value];
    if (!source || !nextVideo) return;
    source.src = nextVideo;
    video.load();
    video.play().catch(() => {});
  });
})();
