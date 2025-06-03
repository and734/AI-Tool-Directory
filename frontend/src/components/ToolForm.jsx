import React, { useState } from 'react';

function ToolForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("✓ Tool submitted for review");
        setFormData({ name: '', description: '', url: '', category: '' });
        onSubmit();
      }
    } catch (err) {
      alert("✗ Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}