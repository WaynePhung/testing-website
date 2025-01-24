import React from 'react';

export const EmailTemplate: React.FC<{ firstName: string }> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    {/* Rest of your email template */}
  </div>
);
