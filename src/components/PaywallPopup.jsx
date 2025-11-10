import React from 'react';

export default function PaywallPopup({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s ease'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#2d3748',
          textAlign: 'center'
        }}>
          🌟 Unlock Premium Features
        </h2>
        
        <p style={{
          color: '#4a5568',
          marginBottom: '1.5rem',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Get access to advanced career guidance, personalized recommendations, and expert insights.
        </p>

        <div style={{
          background: '#f7fafc',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#2d3748'
          }}>
            Premium Benefits:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              '✨ Personalized career roadmaps',
              '📊 Industry insights and trends',
              '🎯 Advanced skill recommendations',
              '🤝 Networking strategies',
              '💡 Leadership development resources'
            ].map((benefit, index) => (
              <li key={index} style={{
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#4a5568'
              }}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <button
            onClick={() => window.open('#pricing', '_blank')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              width: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            View Premium Plans
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: '#718096',
              border: 'none',
              padding: '0.5rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4a5568'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
          >
            Maybe Later
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}