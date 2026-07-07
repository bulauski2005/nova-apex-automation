import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState(''); // Added to display actual error

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    // Fallback defaults to ensure no 'null' values are passed to backend JSON
    const payload = {
      name: (formData.get('name') as string || '').trim(),
      email: (formData.get('email') as string || '').trim(),
      phone: (formData.get('phone') as string || '').trim(), // Added to match backend expected keys
      message: (formData.get('message') as string || '').trim(),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        // Captures the message so you see exactly what failed (e.g. Resend error, Missing fields)
        setErrorMessage(result.error || 'Failed to dispatch email'); 
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error: Could not reach the email server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 border rounded-xl shadow-sm bg-white">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name *</label>
        <input 
          name="name" 
          type="text" 
          required // Made required to stop 400 errors from empty submissions
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input 
          name="email" 
          type="email" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
        <input 
          name="phone" 
          type="tel" 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message *</label>
        <textarea 
          name="message" 
          required 
          rows={4} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-sm font-medium">Message sent successfully!</p>
      )}
      
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm font-semibold">Submission Failed</p>
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
