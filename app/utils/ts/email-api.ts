import axios from 'axios';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  sendCopy: boolean;
}

export const sendEmail = async (data: EmailData) => {
  const response = await axios.post('/api/send-email', data);
  return response.data;
};
