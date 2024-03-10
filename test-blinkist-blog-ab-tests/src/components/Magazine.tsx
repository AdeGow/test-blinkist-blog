import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';
import { clearCookieData } from '../analytics-api';

const Magazine = () => {
  const [cookieSet, setCookieSet] = useState<boolean>(false);

  const handleClearCookies = () => {
    // Call the clearCookieData function to clear cookies
    clearCookieData();
    // Update state to indicate that cookies have been cleared
    setCookieSet(false);
  };

  useEffect(() => {
    if (!cookieSet) {
      // Calculate expiration time (1 minute from now)
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 day in milliseconds

      // Set a cookie with a unique identifier
      const cookieName = `myCookie_${expirationDate.getTime()}`;
      document.cookie = `${cookieName}=myValue; expires=${expirationDate.toUTCString()}; path=/magazine`;


      // Update state to indicate that the cookie has been set
      setCookieSet(true);
    }
  }, [cookieSet]);

  return (
    <div>
      <h1>Blinkist <span className="text-blue">Magazine</span></h1>
      <ArticlesList />
      <button className="bg-grey rounded-sm text-white cursor-pointer w-28 h-10 flex md:border-none items-center justify-center hover:bg-dark-grey text-sm" onClick={handleClearCookies}>Clear cookies</button>
    </div>
  );
}

export default Magazine;
