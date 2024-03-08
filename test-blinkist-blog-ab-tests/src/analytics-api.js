
// Function to track pageviews
export const trackPageview = (pageUrl) => {
  // Store pageview data in sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem('sessionData')) || [];
  sessionData.push({ type: 'pageview', url: pageUrl, timestamp: new Date() });
  sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
};

// Function to track events
export const trackEvent = (eventName, eventParams) => {
  // Store event data in sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem('sessionData')) || [];
  sessionData.push({ type: 'event', name: eventName, params: eventParams, timestamp: new Date() });
  sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
};

// Function to clear session data
export const clearSessionData = () => {
  sessionStorage.removeItem('sessionData');
};
