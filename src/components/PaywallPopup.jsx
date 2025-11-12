import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this

export default function Paywall() {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const plans = [
    {
      id: "essential",
      name: "Essential",
      price: "$2.95",
      period: "/month",
      description: "Perfect for getting started with premium features",
      savings: null,
      badge: null
    },
    {
      id: "annual",
      name: "Annual",
      price: "$35.40",
      period: "/year",
      description: "Best value - Pay annually and save!",
      savings: "Save $0.05/mo",
      badge: "🔥 MOST POPULAR"
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: "$399",
      period: "one-time",
      description: "Unlimited access forever",
      savings: "Best Deal",
      badge: "⭐ BEST VALUE"
    }
  ];

  const features = [
    {
      icon: "🔄",
      title: "Career Changer Tools",
      description: "Skills translation, upskilling roadmaps, and pivot strategies"
    },
    {
      icon: "💼",
      title: "Professional Advancement",
      description: "Executive presence builder and leadership development"
    },
    {
      icon: "🎯",
      title: "Advanced AI Coaching",
      description: "Unlimited personalized career guidance and planning"
    },
    {
      icon: "📊",
      title: "Skills Gap Analysis",
      description: "Track trending skills and get personalized recommendations"
    },
    {
      icon: "🌟",
      title: "Priority Support",
      description: "Get faster responses and dedicated assistance"
    },
    {
      icon: "📈",
      title: "Advanced Analytics",
      description: "Detailed insights into your career progress and goals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer → Product Manager",
      avatar: "👩‍💼",
      text: "Wayvian Premium helped me successfully transition from engineering to product management. The skills translation tool was a game-changer!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Manager",
      avatar: "👨‍💼",
      text: "The career advancement tools gave me the confidence to negotiate a promotion. Worth every penny!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Recent Career Changer",
      avatar: "👩‍🎓",
      text: "I was nervous about changing careers at 35, but the personalized roadmap made it so much easier. Already got two interviews!",
      rating: 5
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#48bb78',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 2000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification}
        </div>
      )}

      <nav style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer'
          }}>
            🚀 Wayvian
          </div>
          
         <button onClick={() => {
    showNotification("Returning to Dashboard...");
    setTimeout(() => navigate("/dashboard"), 1000); // ✅ Navigate after 1s
  }}
            style={{
              background: 'none',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#667eea';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea20, #764ba220)',
            padding: '8px 20px',
            borderRadius: '20px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#667eea'
          }}>
            ✨ UNLOCK YOUR FULL POTENTIAL
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2'
          }}>
            Upgrade to Premium
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Get unlimited access to advanced career tools, personalized coaching, and premium features designed to accelerate your success.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}>
            {[
              { number: "10,000+", label: "Happy Members" },
              { number: "95%", label: "Success Rate" },
              { number: "50+", label: "Career Paths" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: '#718096', fontSize: '0.95rem', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#2d3748'
          }}>
            Choose Your Plan
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  border: selectedPlan === plan.id ? '3px solid #667eea' : '2px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  transform: selectedPlan === plan.id ? 'translateY(-8px) scale(1.03)' : 'none',
                  boxShadow: selectedPlan === plan.id 
                    ? '0 20px 40px rgba(102, 126, 234, 0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  if (selectedPlan !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPlan !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    whiteSpace: 'nowrap'
                  }}>
                    {plan.badge}
                  </div>
                )}

                {plan.savings && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f6e05e20, #ecc94b20)',
                    color: '#744210',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}>
                    💰 {plan.savings}
                  </div>
                )}

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#2d3748'
                }}>
                  {plan.name}
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#718096', fontSize: '1.1rem', marginLeft: '8px' }}>
                    {plan.period}
                  </span>
                </div>

                <p style={{
                  color: '#4a5568',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  minHeight: '48px'
                }}>
                  {plan.description}
                </p>

                <button
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: selectedPlan === plan.id
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#e2e8f0',
                    color: selectedPlan === plan.id ? 'white' : '#718096',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPlan === plan.id) {
                      e.currentTarget.style.opacity = '0.9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPlan === plan.id) {
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                >
                  {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => {
                showNotification(`Processing payment for ${plans.find(p => p.id === selectedPlan).name} plan...`);
                setTimeout(() => {
                  showNotification("Premium activated! 🎉");
                }, 2000);
              }}
              style={{
                padding: '18px 60px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }}
            >
              🚀 Upgrade Now
            </button>
            <p style={{ color: '#718096', marginTop: '16px', fontSize: '0.9rem' }}>
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#2d3748'
          }}>
            Everything You Get with Premium
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#718096',
            fontSize: '1.1rem',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            Unlock powerful tools and features designed to accelerate your career growth
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#2d3748'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#718096', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#2d3748'
          }}>
            What Our Premium Members Say
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#f6e05e', fontSize: '1.2rem' }}>⭐</span>
                  ))}
                </div>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.7',
                  fontSize: '1rem',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{testimonial.avatar}</div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      fontSize: '1rem'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '20px'
          }}>
            Ready to Transform Your Career?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Join thousands of professionals who've accelerated their career growth with Wayvian Premium
          </p>
          <button
            onClick={() => {
              showNotification(`Processing payment for ${plans.find(p => p.id === selectedPlan).name} plan...`);
              setTimeout(() => {
                showNotification("Premium activated! 🎉");
              }, 2000);
            }}
            style={{
              padding: '18px 60px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
          >
            Get Started Today
          </button>
        </section>
      </main>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}