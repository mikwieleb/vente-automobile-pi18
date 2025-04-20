export default function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body;

    // Ici, tu peux ajouter une logique pour vérifier ou stocker l'ID du paiement

    console.log('Paiement à approuver :', paymentId);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
