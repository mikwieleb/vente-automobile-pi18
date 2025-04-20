export default function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId, txid } = req.body;

    // Ici tu peux vérifier ou enregistrer les informations de la transaction
    console.log('Paiement complété :', paymentId, txid);

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
