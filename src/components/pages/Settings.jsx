import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// NavButton Component
function NavButton({ onClick, children, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'none',
        border: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        color: active ? 'white' : '#4b5563',
        fontSize: '0.95rem'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
          e.currentTarget.style.color = 'white';
        }
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = '#4b5563';
        }
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
}

// Toggle Switch Component
function Toggle({ checked, onChange, label, theme }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <span style={{ fontSize: '0.95rem', color: theme.labelText, transition: 'color 0.3s ease' }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '52px',
          height: '28px',
          borderRadius: '14px',
          background: checked ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#cbd5e0',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.3s ease'
        }}
      >
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '3px',
          left: checked ? '27px' : '3px',
          transition: 'left 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} />
      </button>
    </div>
  );
}

// Settings Section Component
function SettingsSection({ title, children, theme }) {
  return (
    <div style={{
      background: theme.cardBg,
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        marginBottom: '24px', 
        fontWeight: '600', 
        color: theme.text,
        borderBottom: `2px solid ${theme.border}`,
        paddingBottom: '12px',
        transition: 'all 0.3s ease'
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// Input Field Component
function InputField({ label, value, onChange, type = "text", placeholder, theme }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '8px', 
        fontSize: '0.95rem', 
        fontWeight: '600', 
        color: theme.labelText,
        transition: 'color 0.3s ease'
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: `2px solid ${theme.inputBorder}`,
          fontSize: '1rem',
          outline: 'none',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          background: theme.cardBg,
          color: theme.text
        }}
        onFocus={(e) => e.target.style.borderColor = '#667eea'}
        onBlur={(e) => e.target.style.borderColor = theme.inputBorder}
      />
    </div>
  );
}

// Select Field Component
function SelectField({ label, value, onChange, options, theme }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '8px', 
        fontSize: '0.95rem', 
        fontWeight: '600', 
        color: theme.labelText,
        transition: 'color 0.3s ease'
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: `2px solid ${theme.inputBorder}`,
          fontSize: '1rem',
          outline: 'none',
          cursor: 'pointer',
          background: theme.cardBg,
          color: theme.text,
          transition: 'all 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#667eea'}
        onBlur={(e) => e.target.style.borderColor = theme.inputBorder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Settings() {
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  // Profile Settings
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("Philadelphia, PA");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [careerUpdates, setCareerUpdates] = useState(true);
  const [networkActivity, setNetworkActivity] = useState(false);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);

  // Appearance Settings
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  // Theme colors
  const themes = {
    light: {
      bg: '#f7fafc',
      cardBg: 'white',
      text: '#2d3748',
      subtext: '#718096',
      border: '#e2e8f0',
      inputBorder: '#e2e8f0',
      labelText: '#4a5568'
    },
    dark: {
      bg: '#1a202c',
      cardBg: '#2d3748',
      text: '#f7fafc',
      subtext: '#cbd5e0',
      border: '#4a5568',
      inputBorder: '#4a5568',
      labelText: '#e2e8f0'
    },
    auto: {
      bg: '#f7fafc',
      cardBg: 'white',
      text: '#2d3748',
      subtext: '#718096',
      border: '#e2e8f0',
      inputBorder: '#e2e8f0',
      labelText: '#4a5568'
    }
  };

  const currentTheme = themes[theme];

  // Account Settings
  const [twoFactor, setTwoFactor] = useState(false);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveSettings = () => {
    showNotification("✅ Settings saved successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      showNotification("Account deletion initiated. You will receive a confirmation email.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: currentTheme.bg, transition: 'background 0.3s ease' }}>
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
        background: theme === 'dark' ? 'rgba(45, 55, 72, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${currentTheme.border}`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div 
            onClick={() => showNotification("Returning to Dashboard...")}
            style={{
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
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <NavButton onClick={() => navigate("/dashboard")}>Dashboard</NavButton>
            <NavButton onClick={() => navigate("/net")}>Network</NavButton>
            <NavButton onClick={() => navigate("/careerchat")}>My Plan</NavButton>
            <NavButton onClick={() => showNotification("Already Settings...")}>Settings</NavButton>
            <button 
              onClick={() => {
                setLoggedIn(!loggedIn);
                showNotification(loggedIn ? "Logged out successfully" : "Logged in successfully");
              }}
              style={{
                background: loggedIn 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginLeft: '1rem',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loggedIn ? '👋 Logout' : '🔐 Login'}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: currentTheme.text,
            marginBottom: '8px',
            transition: 'color 0.3s ease'
          }}>
            ⚙️ Settings
          </h1>
          <p style={{ fontSize: '1.1rem', color: currentTheme.subtext, transition: 'color 0.3s ease' }}>
            Manage your account preferences and customize your experience
          </p>
        </div>

        {/* Profile Settings */}
        <SettingsSection title="👤 Profile Information" theme={currentTheme}>
          <InputField 
            label="Full Name" 
            value={fullName} 
            onChange={setFullName}
            placeholder="Enter your full name"
            theme={currentTheme}
          />
          <InputField 
            label="Email Address" 
            value={email} 
            onChange={setEmail}
            type="email"
            placeholder="your.email@example.com"
            theme={currentTheme}
          />
          <InputField 
            label="Phone Number" 
            value={phone} 
            onChange={setPhone}
            type="tel"
            placeholder="+1 (555) 000-0000"
            theme={currentTheme}
          />
          <InputField 
            label="Location" 
            value={location} 
            onChange={setLocation}
            placeholder="City, State"
            theme={currentTheme}
          />
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection title="🔔 Notifications" theme={currentTheme}>
          <Toggle 
            checked={emailNotifications} 
            onChange={setEmailNotifications}
            label="Email Notifications"
            theme={currentTheme}
          />
          <Toggle 
            checked={pushNotifications} 
            onChange={setPushNotifications}
            label="Push Notifications"
            theme={currentTheme}
          />
          <Toggle 
            checked={weeklyDigest} 
            onChange={setWeeklyDigest}
            label="Weekly Progress Digest"
            theme={currentTheme}
          />
          <Toggle 
            checked={careerUpdates} 
            onChange={setCareerUpdates}
            label="Career Opportunities & Job Matches"
            theme={currentTheme}
          />
          <Toggle 
            checked={networkActivity} 
            onChange={setNetworkActivity}
            label="Network Activity Updates"
            theme={currentTheme}
          />
        </SettingsSection>

        {/* Privacy Settings */}
        <SettingsSection title="🔒 Privacy & Sharing" theme={currentTheme}>
          <SelectField
            label="Profile Visibility"
            value={profileVisibility}
            onChange={setProfileVisibility}
            options={[
              { value: "public", label: "Public - Anyone can see your profile" },
              { value: "network", label: "Network Only - Only connections can see" },
              { value: "private", label: "Private - Only you can see" }
            ]}
            theme={currentTheme}
          />
          <Toggle 
            checked={showEmail} 
            onChange={setShowEmail}
            label="Show Email on Public Profile"
            theme={currentTheme}
          />
          <Toggle 
            checked={showPhone} 
            onChange={setShowPhone}
            label="Show Phone Number on Public Profile"
            theme={currentTheme}
          />
          <Toggle 
            checked={allowMessages} 
            onChange={setAllowMessages}
            label="Allow Messages from Other Users"
            theme={currentTheme}
          />
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection title="🎨 Appearance" theme={currentTheme}>
          <SelectField
            label="Theme"
            value={theme}
            onChange={setTheme}
            options={[
              { value: "light", label: "Light Mode" },
              { value: "dark", label: "Dark Mode" },
              { value: "auto", label: "Auto (System Preference)" }
            ]}
            theme={currentTheme}
          />
          <SelectField
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
              { value: "zh", label: "中文" }
            ]}
            theme={currentTheme}
          />
        </SettingsSection>

        {/* Account Security */}
        <SettingsSection title="🔐 Account Security" theme={currentTheme}>
          <Toggle 
            checked={twoFactor} 
            onChange={setTwoFactor}
            label="Two-Factor Authentication"
            theme={currentTheme}
          />
          <button
            onClick={() => showNotification("Password change link sent to your email")}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              marginTop: '16px',
              marginRight: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Change Password
          </button>
          <button
            onClick={() => showNotification("Security report generated")}
            style={{
              padding: '12px 24px',
              background: currentTheme.cardBg,
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginTop: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = currentTheme.cardBg;
              e.currentTarget.style.color = '#667eea';
            }}
          >
            View Login Activity
          </button>
        </SettingsSection>

        {/* Data & Privacy */}
        <SettingsSection title="📊 Data Management" theme={currentTheme}>
          <p style={{ color: currentTheme.subtext, marginBottom: '16px', lineHeight: '1.6', transition: 'color 0.3s ease' }}>
            Manage your data and privacy preferences. You can download your data or permanently delete your account.
          </p>
          <button
            onClick={() => showNotification("Preparing your data export...")}
            style={{
              padding: '12px 24px',
              background: currentTheme.cardBg,
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginRight: '12px',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = currentTheme.cardBg;
              e.currentTarget.style.color = '#667eea';
            }}
          >
            Download My Data
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{
              padding: '12px 24px',
              background: currentTheme.cardBg,
              color: '#ef4444',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = currentTheme.cardBg;
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            Delete Account
          </button>
        </SettingsSection>

        {/* Save Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px',
          marginTop: '32px' 
        }}>
          <button
            onClick={() => showNotification("Changes discarded")}
            style={{
              padding: '14px 32px',
              background: currentTheme.cardBg,
              color: currentTheme.subtext,
              border: `2px solid ${currentTheme.border}`,
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = currentTheme.labelText;
              e.currentTarget.style.color = currentTheme.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = currentTheme.border;
              e.currentTarget.style.color = currentTheme.subtext;
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSettings}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            Save Changes
          </button>
        </div>
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