import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const AppleWatchBreathingExperience = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale' or 'exhale'
  const [cycleCount, setCycleCount] = useState(0);

  // Breathing cycle: 4s inhale, 6s exhale for calming effect
  useEffect(() => {
    if (currentScreen === 1) {
      const inhaleTime = 4000;
      const exhaleTime = 6000;
      
      const cycle = () => {
        setBreathPhase('inhale');
        setTimeout(() => {
          setBreathPhase('exhale');
        }, inhaleTime);
      };

      cycle();
      const interval = setInterval(() => {
        setCycleCount(prev => prev + 1);
        cycle();
      }, inhaleTime + exhaleTime);

      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const screens = [
    {
      title: "Your heart rate is elevated",
      subtitle: "Let's slow your breathing for a moment",
      component: <AlertScreen />
    },
    {
      title: "Breathe with me",
      subtitle: null,
      component: <BreathingScreen phase={breathPhase} />
    },
    {
      title: "You're doing okay",
      subtitle: "Your breathing slowed",
      component: <CompletionScreen />
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 179, 237, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 218, 220, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 25s ease-in-out infinite reverse'
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {/* Title Section */}
        <div style={{
          textAlign: 'center',
          color: '#ffffff',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Apple Watch Breathing Experience
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            fontWeight: '400',
            letterSpacing: '0.01em'
          }}>
            A calming intervention for elevated heart rate alerts
          </p>
        </div>

        {/* Watch Mockup Container */}
        <div style={{
          display: 'flex',
          gap: '60px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {screens.map((screen, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              {/* Screen Label */}
              <div style={{
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.03em',
                textTransform: 'uppercase'
              }}>
                Screen {index + 1}
              </div>

              {/* Apple Watch Frame */}
              <div 
                onClick={() => setCurrentScreen(index)}
                style={{
                  width: '280px',
                  height: '340px',
                  background: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)',
                  borderRadius: '60px',
                  padding: '14px',
                  boxShadow: `
                    0 30px 60px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: currentScreen === index ? 'scale(1.02)' : 'scale(1)',
                  border: currentScreen === index ? '2px solid rgba(99, 179, 237, 0.3)' : '2px solid transparent',
                  position: 'relative'
                }}
              >
                {/* Digital Crown */}
                <div style={{
                  position: 'absolute',
                  right: '-6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '50px',
                  background: 'linear-gradient(90deg, #3c3c3e 0%, #2c2c2e 100%)',
                  borderRadius: '6px',
                  boxShadow: 'inset -1px 0 2px rgba(0, 0, 0, 0.3)'
                }} />

                {/* Screen */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: '#000000',
                  borderRadius: '48px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {screen.component}
                </div>
              </div>

              {/* Screen Description */}
              <div style={{
                textAlign: 'center',
                maxWidth: '280px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.01em'
                }}>
                  {screen.title}
                </h3>
                {screen.subtitle && (
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                    fontWeight: '400'
                  }}>
                    {screen.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Design Notes */}
        <div style={{
          maxWidth: '900px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '32px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '15px',
          lineHeight: '1.7'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em'
          }}>
            Design Principles Applied
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div><strong style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Color Palette:</strong> Soft blues (#63b3ed) and warm aqua tones (#a8dadc) create safety and calm, avoiding medical white or alarm red</div>
            <div><strong style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Animation:</strong> Breathing guide expands (inhale, 4s) and contracts (exhale, 6s) with smooth easing—longer exhale promotes parasympathetic response</div>
            <div><strong style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Motion:</strong> Indicated with multiple frames showing expansion/contraction rhythm; arrows show directional flow</div>
            <div><strong style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Co-regulation:</strong> The interface "breathes with you" rather than instructing you, creating psychological safety</div>
            <div><strong style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Cognitive Load:</strong> Zero numbers, no metrics, no performance tracking—just calm presence</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.6; }
        }
        
        @keyframes breathe-in {
          0% { transform: scale(0.6); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        
        @keyframes breathe-out {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(0.6); opacity: 0.3; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Screen 1: Alert with calm reframe
const AlertScreen = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      background: 'linear-gradient(180deg, #0a0d1a 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(99, 179, 237, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse-soft 3s ease-in-out infinite'
      }} />

      {/* Soft animated orb */}
      <div style={{
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(168, 218, 220, 0.4) 0%, rgba(99, 179, 237, 0.2) 100%)',
        boxShadow: '0 0 40px rgba(99, 179, 237, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)',
        animation: 'pulse-soft 3s ease-in-out infinite',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }} />

      {/* Text content */}
      <h2 style={{
        fontSize: '19px',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        margin: '0 0 12px 0',
        letterSpacing: '-0.02em',
        lineHeight: '1.3'
      }}>
        Your heart rate<br/>is elevated
      </h2>
      
      <p style={{
        fontSize: '15px',
        color: 'rgba(255, 255, 255, 0.65)',
        textAlign: 'center',
        margin: 0,
        fontWeight: '400',
        lineHeight: '1.4'
      }}>
        Let's slow your<br/>breathing for a moment
      </p>

      {/* Auto-start indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '500',
        letterSpacing: '0.02em'
      }}>
        Starting...
      </div>
    </div>
  );
};

// Screen 2: Breathing guide
const BreathingScreen = ({ phase }) => {
  const isInhale = phase === 'inhale';
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      background: 'linear-gradient(180deg, #0a0d1a 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow that pulses with breath */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isInhale ? '220px' : '160px',
        height: isInhale ? '220px' : '160px',
        background: 'radial-gradient(circle, rgba(99, 179, 237, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        transition: 'all 4s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'blur(30px)'
      }} />

      {/* Title */}
      <h2 style={{
        fontSize: '17px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        margin: '0 0 40px 0',
        letterSpacing: '0.01em'
      }}>
        Breathe with me
      </h2>

      {/* Main breathing guide - organic shape */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Outer ring */}
        <div style={{
          width: isInhale ? '160px' : '100px',
          height: isInhale ? '160px' : '100px',
          borderRadius: '50%',
          border: '2px solid rgba(168, 218, 220, 0.3)',
          position: 'absolute',
          transition: isInhale 
            ? 'all 4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'all 6s cubic-bezier(0.32, 0, 0.67, 0)',
          opacity: isInhale ? 0.6 : 0.3
        }} />

        {/* Inner orb */}
        <div style={{
          width: isInhale ? '130px' : '80px',
          height: isInhale ? '130px' : '80px',
          borderRadius: '50%',
          background: isInhale 
            ? 'radial-gradient(circle at 30% 30%, rgba(168, 218, 220, 0.6) 0%, rgba(99, 179, 237, 0.4) 100%)'
            : 'radial-gradient(circle at 30% 30%, rgba(168, 218, 220, 0.3) 0%, rgba(99, 179, 237, 0.2) 100%)',
          boxShadow: isInhale 
            ? '0 0 50px rgba(99, 179, 237, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.15)'
            : '0 0 30px rgba(99, 179, 237, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.08)',
          transition: isInhale 
            ? 'all 4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'all 6s cubic-bezier(0.32, 0, 0.67, 0)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Phase text inside orb */}
          <span style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)',
            textTransform: 'capitalize',
            letterSpacing: '0.05em'
          }}>
            {phase}
          </span>
        </div>
      </div>

      {/* Subtle instruction below */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: '1.5'
      }}>
        Follow the rhythm<br/>of the circle
      </div>
    </div>
  );
};

// Screen 3: Completion
const CompletionScreen = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px 20px 24px',
      background: 'linear-gradient(180deg, #0a0d1a 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Gentle completion glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(168, 218, 220, 0.12) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      {/* Top section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        animation: 'fade-in-up 0.6s ease-out'
      }}>
        {/* Success icon */}
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(168, 218, 220, 0.3) 0%, rgba(99, 179, 237, 0.15) 100%)',
          border: '2px solid rgba(168, 218, 220, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(168, 218, 220, 0.2)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(168, 218, 220, 0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Text content */}
        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em'
          }}>
            You're doing okay
          </h2>
          
          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            fontWeight: '400'
          }}>
            Your breathing slowed
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button style={{
          width: '100%',
          padding: '14px',
          background: 'rgba(99, 179, 237, 0.15)',
          border: '1px solid rgba(99, 179, 237, 0.3)',
          borderRadius: '22px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          letterSpacing: '0.01em'
        }}>
          Continue breathing
        </button>
        
        <button style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          letterSpacing: '0.01em'
        }}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AppleWatchBreathingExperience;
