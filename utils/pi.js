// utils/pi.js
export async function createPiPayment({ amount, memo, metadata }) {
  if (typeof window === "undefined" || !window.Pi) {
    console.error("Pi SDK non disponible dans cet environnement");
    return;
  }

  try {
    // Initialisation du Pi SDK, s'il n'est pas déjà initialisé
    if (!window.Pi.isInitialized) {
      console.log("Initialisation du SDK Pi...");
      await window.Pi.init();  // Initialise le Pi SDK
      window.Pi.isInitialized = true;  // Marquer comme initialisé
    }

    const payment = await window.Pi.createPayment({
      amount,
      memo,
      metadata
    }, {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        await fetch('/api/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        });
      },
      onCancel: (paymentId) => {
        console.log('Paiement annulé', paymentId);
      },
      onError: (error, paymentId) => {
        console.error('Erreur de paiement', error, paymentId);
      }
    });

    console.log('Paiement initié :', payment);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du Pi SDK ou du paiement :', error);
  }
}
