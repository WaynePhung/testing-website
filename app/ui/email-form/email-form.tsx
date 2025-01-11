import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    sendCopy: false,
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
  
    try {
      const response = await axios.post('/api/send-email', formData);
      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', sendCopy: false });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Subject</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
      </div>
      <div>
        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>
      <div>
        <label>
          <input type="checkbox" name="sendCopy" checked={formData.sendCopy} onChange={handleChange} />
          Send a copy to myself
        </label>
      </div>
      <button type="submit">Send Email</button>
      {status === 'loading' && <p>Sending...</p>}
      {status === 'success' && <p>Email sent successfully!</p>}
      {status === 'error' && (
        <>
          <p>Failed to send email. Please try again.</p>
          {errorMessage && <p>Error: {errorMessage}</p>}
        </>
      )}
    </form>
  );
};

export default EmailForm;