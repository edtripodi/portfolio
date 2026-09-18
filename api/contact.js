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

  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    res.status(500).json({ success: false, message: 'El servidor no tiene configurada la API key.' });
    return;
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['e.damiantripodi@gmail.com'],
        reply_to: email,
        subject: 'Nuevo mensaje desde el portfolio',
        text: `De: ${name} <${email}>\n\n${message}`,
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      res.status(502).json({ success: false, message: data.message || 'Error al enviar el mensaje.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    // TODO: sacar `debug` una vez confirmado que funciona — no expone la key, solo el mensaje de error.
    res.status(500).json({
      success: false,
      message: 'Error al contactar el servicio de envío.',
      debug: String((err && err.message) || err),
    });
  }
}
