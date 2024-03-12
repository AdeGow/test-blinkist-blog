import React from 'react';
import { Link } from 'react-router-dom';
import ArticlesList from './ArticlesList';

const EditorsDashboard = () => {

  return (
    <div>
      <div className="text-grey underline hover:text-dark-grey text-base cursor-pointer h-10 flex md:border-none items-center justify-left hover:">
        <Link to={`/`}>
          Back to landing page
        </Link>
      </div>
      <h1>Blinkist <span className="text-blue">Content Editors Dashboard</span></h1>
      <div>
        <ArticlesList />
      </div>
    </div>
  );
}

export default EditorsDashboard;
