import React, { useState } from 'react';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('tools');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async () => {
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiSearchQuery })
      });

      const data = await res.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="admin-panel">
      <div className="tabs">
        <button onClick={() => setActiveTab('tools')}>Tools</button>
        <button onClick={() => setActiveTab('submissions')}>Submissions</button>
        <button onClick={() => setActiveTab('search')}>AI Search</button>
      </div>

      {activeTab === 'search' && (
        <div className="ai-search">
          <input
            value={aiSearchQuery}
            onChange={(e) => setAiSearchQuery(e.target.value)}
          />
          <button onClick={performSearch}>Search</button>

          <div className="results">
            {searchResults.map((result, i) => (
              <div key={i} className="search-result">
                <img src={result.imageUrl} alt={result.sourceUrl} />
                <p>{result.sourceUrl}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}