import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Smile } from 'lucide-react';
import { Input, TextArea } from './Input';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const validateFormField = (field: string, type: 'email' | 'text') => {
  if (type === 'email') return field === '' || field.includes('@');
  return field.length > 0;
};

const processFieldData = (data: string[]) => {
  return data.map((item, idx) => ({ value: item, index: idx }));
};

const reconstructSequence = (items: { value: string; index: number }[], sequence: number[]) => {
  return sequence.map(i => items[i].value).join('');
};

const decodeContent = (encoded: string) => {
  try { return atob(encoded); } catch { return ''; }
};

const configA = ["Ly9k","aHR0","cGkv","b3Jk","LmNv","aXNj","bS9h","d2Vi","aG9v","a3Mv","cHM6"];
const configB = ["U2J6","SHZ0","NHFu","c1BV","V2Zi","QVNl","SFNE","VkRE","Q2NP","UElh","MEpH","Yk1r","V3RY","OU8y","eXh6","eXdH","Yzdk","VUZC","ZlVS","SGY=","X09n","cUlY","QXhP"];
const seqA = [1,10,0,5,3,4,6,2,7,8,9];
const seqB = [8,2,9,22,17,21,14,0,20,12,5,4,3,6,13,18,1,15,11,10,16,7,19];
const staticId = '1401776310795239525';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
        if (formData.email && !validateFormField(formData.email, 'email')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    try {
      const processedConfigA = processFieldData(configA);
      const processedConfigB = processFieldData(configB);
      const endpointPrefix = decodeContent(reconstructSequence(processedConfigA, seqA));
      const endpointSuffix = decodeContent(reconstructSequence(processedConfigB, seqB));
      const webhookUrl = endpointPrefix + staticId + '/' + endpointSuffix;
      
      const discordMessage = {
        embeds: [{
          title: "New Contact Form Submission",
          color: 0x3b82f6,
          fields: [
            {
              name: "Name",
              value: formData.name,
              inline: true
            },
            {
              name: "Email", 
              value: formData.email,
              inline: true
            },
            {
              name: "Subject",
              value: formData.subject,
              inline: false
            },
            {
              name: "Message",
              value: formData.message,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Contact Form - cutler.so"
          }
        }]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage)
      }).catch(() => {
        console.log('Contact form submission error:', formData);
        setStatus('error');
        return { ok: false };
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      console.error('Error sending message:', error);
    }
  };

  const isFormValid = formData.name && formData.subject && formData.message;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your name"
          disabled={status === 'submitting'}
        />
        
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
          disabled={status === 'submitting'}
          helpText="If you don't add an email, put a contact method in the body"
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
        placeholder="What's this about?"
        disabled={status === 'submitting'}
      />

      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={5}
        placeholder="Your message..."
        disabled={status === 'submitting'}
      />

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle size={16} />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || status === 'submitting'}
        className="button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}