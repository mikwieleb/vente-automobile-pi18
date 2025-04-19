import React from 'react';
import PiPayButtons from '../components/PiPayButtons';

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Vente Automobile</h1>
      <p>Bienvenue sur notre plateforme. Veuillez effectuer le paiement :</p>
      <PiPayButtons />
    </div>
  );
}
