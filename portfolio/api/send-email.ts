import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, type, name, email, level, goal, company, budget, overview } = req.body;

  if (!to || !type || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let subject = '';
    let html = '';

    if (type === 'Mentoring') {
      subject = `New Mentoring Request from ${name}`;
      html = `
        <h2>New Mentoring Session Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Level:</strong> ${level}</p>
        <p><strong>Goal:</strong> ${goal}</p>
      `;
    } else if (type === 'Consulting') {
      subject = `New Consulting Inquiry from ${name}`;
      html = `
        <h2>New Consulting Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Overview:</strong> ${overview}</p>
      `;
    }

    await resend.emails.send({
      from: 'forms@joanasardinha.com',
      to,
      subject,
      html,
      reply_to: email,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
