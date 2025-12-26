import React, { useState } from 'react';
import faqs from '../data/faqs.json';

const FAQCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      margin: '10px 0', padding: '15px',
      border: '1px solid #ddd', borderRadius: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h4>{question}</h4>
      {open && <p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>}
      <button onClick={() => setOpen(!open)} style={{
        marginTop: '8px',
        background: '#007bff', color: 'white',
        border: 'none', padding: '6px 12px', borderRadius: '4px'
      }}>
        {open ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
};

const FAQsSection = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Frequently Asked Questions</h2>
      {faqs.slice(0, 5).map((faq, idx) => (
        <FAQCard key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQsSection;
