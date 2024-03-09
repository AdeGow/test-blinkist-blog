import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./global.css";
import Magazine from './components/Magazine';
import LandingPage from './pages/LandingPage';
import ArticleDetail from './components/ArticleDetail';
import EditorsDashboard from './components/EditorsDashboard';
import ArticleAbTests from './components/ArticleAbTests';

const App = () => {

  return (
    <div className="container m-12">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/magazine/articles" Component={Magazine} />
          <Route path="/magazine/articles/:article_id" Component={ArticleDetail} />
          <Route path="/editors-dashboard/articles" Component={EditorsDashboard} />
          <Route path="/editors-dashboard/articles/:article_id" Component={ArticleAbTests} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
