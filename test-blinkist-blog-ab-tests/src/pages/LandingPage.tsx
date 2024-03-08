import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div>
      <div className="flex items-center text-4xl">
        <h1 className="w-50 mx-auto mb-12">Welcome to Blinkist</h1>
      </div>
      <div className="flex items-center justify-around">
        <div>
          <Link to="/magazine/articles" className="">Discover Blinkist Magazine</Link>
        </div>
        <div>
          <Link to="/editors-dashboard/articles" className="">See the content editors dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
