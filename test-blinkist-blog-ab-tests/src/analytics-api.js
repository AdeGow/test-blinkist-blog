// Function to get or generate a unique user ID
const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2); // Generate a random user ID
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Function to track pageviews
export const trackPageview = (pageUrl, articleId) => {
  const userId = getUserId();

  document.cookie = `pageview_${articleId}_${userId}=${JSON.stringify({ article: articleId, url: pageUrl, timestamp: new Date() })}; path=/magazine`;
};

// Function to calculate the number of pageviews for each article URL
export const calculatePageviews = (articleId) => {
  // Get the pageview cookie data
  const pageviewCookie = document.cookie.match(`(^|;)\\s*pageview_${articleId}\\s*=\\s*([^;]+)`);
  if (!pageviewCookie) {
    return {};
  }

  const pageviewData = JSON.parse(decodeURIComponent(pageviewCookie[1]));
  console.log(pageviewData)

  const pageviewCounts = {};

  // Loop through the pageview data and count occurrences of each article URL
  pageviewData.forEach(({ url }) => {
    pageviewCounts[url] = (pageviewCounts[url] || 0) + 1;
  });

  return pageviewCounts;
};

// Function to track events
export const trackEvent = (eventName, eventParams) => {
  // Store event data in cookie with a unique identifier for each user
  const userId = getUserId();
  document.cookie = `event_${userId}=${JSON.stringify({ name: eventName, params: eventParams, timestamp: new Date() })}; path=/magazine`;
};

// Function to clear session data
export const clearCookieData = () => {
  // Clear all cookies
  document.cookie.split(";").forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/magazine`);
  });
  console.log("Cookies all cleared!")
};
