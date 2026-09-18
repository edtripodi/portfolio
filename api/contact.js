export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const { name, email, message, botcheck } = req.body || {};

  // Honeypot: si el campo oculto viene con valor, es un bot — respondemos OK sin enviar nada.
  if (botcheck) {
    res.status(200).json({ success: true });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: 'Faltan campos requeridos.' });
    return;
  }

  const accessKey = (process.env.WEB3FORMS_ACCESS_KEY || '').trim();
  if (!accessKey) {
    res.status(500).json({ success: false, message: 'El servidor no tiene configurada la access key.' });
    return;
  }

  try {
    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Nuevo mensaje desde el portfolio',
        name,
        email,
        message,
      }),
    });

    const data = await web3Res.json();
    res.status(web3Res.ok ? 200 : 502).json(data);
  } catch (err) {
    // TODO: sacar `debug` una vez resuelto el 500 — no expone la key, solo el mensaje de error.
    res.status(500).json({
      success: false,
      message: 'Error al contactar el servicio de envío.',
      debug: String((err && err.message) || err),
    });
  }
}
