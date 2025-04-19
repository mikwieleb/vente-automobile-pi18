import React from 'react';
import { createPiPayment } from '../utils/pi';

const PiPayButtons = () => {
  const handlePiPayment = async () => {
    try {
      await createPiPayment(0.001, 'Paiement voiture');
    } catch (error) {
      console.error('Erreur paiement Pi :', error);
    }
  };

  const handleOpenApp = () => {
    window.location.href = 'https://vente-automobile-pi-g6hd.vercel.app';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={handlePiPayment} style={{ padding: '12px', fontSize: '16px' }}>
        Payer 0,001 Pi
      </button>
      <button onClick={handleOpenApp} style={{ padding: '12px', fontSize: '16px' }}>
        Ouvrir l'application
      </button>
    </div>
  );
};

export default PiPayButtons;
