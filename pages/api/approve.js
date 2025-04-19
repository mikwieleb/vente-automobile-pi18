export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;
  console.log('Paiement à approuver :', paymentId);

  return res.status(200).json({ success: true });
}
