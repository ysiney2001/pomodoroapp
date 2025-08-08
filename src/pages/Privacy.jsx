import React from 'react';

const Privacy = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        
        <div className="text-white/90 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Our Commitment to Privacy</h2>
            <p>At PomodoroFocus, we are committed to protecting your privacy and ensuring the security of your personal information.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Email address for account management</li>
              <li>Timer settings and preferences</li>
              <li>Productivity statistics and session data</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p>We collect this information to provide you with a personalized experience, save your preferences, and help you track your productivity progress.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
            <p>We do not sell, trade, or share your personal data with third parties. Your information is kept secure and private.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal data at any time through your account settings.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Privacy;