import React from 'react';

export default function Contact() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#01458e',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Encabezado */}
      <h1
        style={{
          fontSize: '1.6em', // Tamaño más pequeño
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginTop: '15vh',
        }}
      >
        AUTOESCUELA <br /> UNIVERSITARIA BAMI
      </h1>

      {/* Logo */}
      <img
        src="content/images/logo.png" // Cambiar por la ruta de tu logo
        alt="Logo Autoescuela"
        style={{
          width: '120px', // Logo más pequeño
          margin: '15px 0px',
        }}
      />

      {/* Sección de contacto */}
      <div
        style={{
          fontSize: '1em', // Texto más pequeño
          lineHeight: '1.6',
          fontWeight: 'normal',
        }}
      >
        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Contacto:
        </h5>
        <p>Francisco José Millán Calleja</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Tlf. Móvil:
        </h5>
        <p>
          687883411 <br /> 600588546
        </p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Tlf. Fijo:
        </h5>
        <p>954707080</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Email:
        </h5>
        <p>aeuniversitariafranmillanbami@gmail.com</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Instagram:
        </h5>
        <p>autoescuelauniversitariabami</p>
      </div>
    </div>
  );
}
