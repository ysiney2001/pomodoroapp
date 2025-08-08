import React from 'react';

const Terms = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        
        <div className="text-white/90 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p>By using PomodoroFocus, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Use of Service</h2>
            <p>You agree to use PomodoroFocus responsibly and in accordance with all applicable laws and regulations.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Account Responsibility</h2>
            <p>You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes and are responsible for staying informed of updates.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p>PomodoroFocus is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our service.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Terms;