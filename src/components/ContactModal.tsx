import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    // Create mailto link with pre-filled subject and body
    const subject = encodeURIComponent('Tune My Heart - Feature Request/Error Report');
    const body = encodeURIComponent(
      `From: ${email}\n\n${message}`
    );
    
    // Open email client
    window.location.href = `mailto:admin@g3min.org?subject=${subject}&body=${body}`;
    
    // Close modal
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={onClose}
      />
      <div className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-7 h-7 text-primary" strokeWidth={1.5} />
              <h2 className="text-2xl font-heading text-gray-900 font-bold">Contact & Report</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto p-6 flex-1">
            <p className="text-gray-600 font-body mb-6 leading-relaxed">
              Have a feature request or found an error? Please let us know below. Clicking send will open your email client.
            </p>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="contact-email" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 text-gray-900"
              />
            </div>

            {/* Message Textarea */}
            <div className="mb-6">
              <label htmlFor="contact-message" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the error or feature request..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 text-gray-900 resize-none"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!email || !message}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
