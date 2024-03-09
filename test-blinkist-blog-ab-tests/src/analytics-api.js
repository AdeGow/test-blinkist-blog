// Function to track pageviews
export const trackPageview = (pageUrl) => {
  // Store pageview data in cookie
  document.cookie = `pageview=${JSON.stringify({ url: pageUrl, timestamp: new Date() })}; path=/magazine`;
};

// Function to track events
export const trackEvent = (eventName, eventParams) => {
  // Store event data in cookie
  document.cookie = `event=${JSON.stringify({ name: eventName, params: eventParams, timestamp: new Date() })}; path=/magazine`;
};

// Function to clear session data
export const clearCookieData = () => {
  // Clear all cookies
  document.cookie.split(";").forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/magazine`);
  });
  console.log("Cookies all cleared!")
};
