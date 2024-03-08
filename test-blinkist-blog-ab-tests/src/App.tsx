import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./global.css";
import Magazine from './components/Magazine';
import Article from './components/ArticleDetail';
import LandingPage from './pages/LandingPage';

const App = () => {

  return (
    <div className="container m-12">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/magazine/articles" Component={Magazine} />
          <Route path="/magazine/articles/:article_id" Component={Article} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
