import React from 'react';
import ArticlesList from './ArticlesList';

const EditorsDashboard = () => {

  return (
    <div>
      <h1>Blinkist <span className="text-blue">Content Editors Dashboard</span></h1>
      <div>
      <ArticlesList />
    </div>
    </div>
  );
}

export default EditorsDashboard;
