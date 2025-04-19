export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId, txid } = req.body;
  console.log('Paiement complété :', paymentId, 'Transaction ID :', txid);

  return res.status(200).json({ success: true });
}
