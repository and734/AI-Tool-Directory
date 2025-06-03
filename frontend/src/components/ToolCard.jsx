function ToolCard({ tool }) {
  const getCategoryColor = (category) => {
    const colors = {
      "Image Generation": "bg-pink-100 text-pink-800",
      "Natural Language Processing": "bg-blue-100 text-blue-800",
      "Productivity": "bg-green-100 text-green-800",
      "Video Editing": "bg-purple-100 text-purple-800"
    };

    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
      <div className="h-12 flex items-center px-4 bg-gray-50 border-b">
        <img src={tool.icon} alt={`${tool.name} icon`} className="h-6 w-6 mr-3" />
        <h3 className="text-lg font-semibold">{tool.name}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
        <div className="flex justify-between items-center">
          <span className={`inline-block px-3 py-1 text-xs font-semibold ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            Visit Website
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}