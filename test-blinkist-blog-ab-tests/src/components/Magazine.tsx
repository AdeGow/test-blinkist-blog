import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
import { clearCookieData } from '../analytics-api';
import { Link } from 'react-router-dom';

const Magazine = () => {
  const [cookieSet, setCookieSet] = useState<boolean>(false);

  const handleClearCookies = () => {
    // Clear all cookies to facilitate manual tests
    clearCookieData();
    setCookieSet(false);
  };

  useEffect(() => {
    if (!cookieSet) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 day expiration time

      // Set a cookie with a unique identifier
      const cookieName = `myCookie_${expirationDate.getTime()}`;
      document.cookie = `${cookieName}=myValue; expires=${expirationDate.toUTCString()}; path=/`;

      setCookieSet(true);

    }
  }, [cookieSet]);


  return (
    <div>
      <div className="text-grey underline hover:text-dark-grey text-base cursor-pointer h-10 flex md:border-none items-center justify-left hover:">
        <Link to={`/`}>
          Back to landing page
        </Link>
      </div>

      <h1>Blinkist <span className="text-blue">Magazine</span></h1>
      <ArticlesList />
      <button className="bg-grey rounded-sm text-white cursor-pointer w-28 h-10 flex md:border-none items-center justify-center hover:bg-dark-grey text-sm" onClick={handleClearCookies}>Clear cookies</button>
    </div>
  );
}

export default Magazine;
