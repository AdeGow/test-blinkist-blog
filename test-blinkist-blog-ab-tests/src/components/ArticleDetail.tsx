import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, AbTest, Variation } from '../types/seeds.types';
import { trackPageview, trackEvent } from '../analytics-api';
import DOMPurify from 'dompurify';

const ArticleDetail = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [controlVariation, setControlVariation] = useState<Variation | null>(null);
  const [testVariation, setTestVariation] = useState<Variation | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleResponse = await fetch(`http://localhost:3000/api/v1/magazine/articles/${article_id}`);
        if (!articleResponse.ok) {
          throw new Error('Failed to fetch article');
        }
        const articleData = await articleResponse.json();
        setArticle(articleData);
        trackPageview(`/magazine/articles/${article_id}`, article_id);

        // Fetch A/B tests data for the article
        const abTestsResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests`);
        if (!abTestsResponse.ok) {
          throw new Error('Failed to fetch A/B tests for the article');
        }
        const abTestsData = await abTestsResponse.json();

        // Check if the article has associated A/B tests
        if (abTestsData) {
          // Find the active A/B test
          const activeAbTest = abTestsData.find((abTest: AbTest) => abTest.is_active);
          if (activeAbTest) {
            // Find the control_variation of the ActiveAbTest
            const controlVariationResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${activeAbTest.id}/variations/control-variation`);
            if (!controlVariationResponse.ok) {
              throw new Error('Failed to fetch the control_variation for the active A/B test');
            }
            const controlVariationData = await controlVariationResponse.json();
            setControlVariation(controlVariationData);

            // Find the test_variation of the ActiveAbTest
            const testVariationResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${activeAbTest.id}/variations/test-variation`);
            if (!testVariationResponse.ok) {
              throw new Error('Failed to fetch the test_variation for the active A/B test');
            }
            const testVariationData = await testVariationResponse.json();
            setTestVariation(testVariationData);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [article_id]);

  function getCookie(name: string): string | null {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() || null : null;
  }

  useEffect(() => {
    const cookieNameWithArticleId = `cookieSelectedVariation_article_${article_id}`;

    const cookieArticleValue = getCookie(cookieNameWithArticleId);

    if (!cookieArticleValue || cookieArticleValue === "null") {
      // If the cookie is not set, randomly select a variation
      const randomNumber = Math.random();
      const randomSelectedVariation = randomNumber < 0.5 ? controlVariation : testVariation;

      // Set the selectedVariation in component state
      setSelectedVariation(randomSelectedVariation);

      // Store the selectedVariation in cookie
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // 1 day expiration
      document.cookie = `cookieSelectedVariation_article_${article_id}=${JSON.stringify(randomSelectedVariation)}; expires=${expirationDate.toUTCString()}; path=/magazine`;

    } else if (cookieArticleValue && cookieArticleValue != null) {
      // Parse the cookie value into a JSON object
      const parsedCookieValue = JSON.parse(cookieArticleValue);

      // Set the selectedVariation from the cookie
      setSelectedVariation(parsedCookieValue);
    } else {
      return console.log("Could not set variation")
    }
  }, [controlVariation, testVariation, article_id]);


  if (!article) {
    return <div>Loading...</div>;
  }

  const handleSubscribeButtonClick = () => {
    // Track event when button is clicked
    trackEvent('Sign Up Button Clicked', article_id);
  };


  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div>
      <div className="text-grey underline hover:text-dark-grey text-base cursor-pointer h-10 flex md:border-none items-center justify-left hover:">
        <Link to={`/magazine/articles`}>
          Back to the list of articles
        </Link>
      </div>
      <div className="my-8">
        <h3 className="text-4xl mb-12">{article.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(selectedVariation?.content || article?.content || '') }} />
      </div>
      <div>
        <p>Thanks a lot for reading the article!</p>
        <button className="my-8 bg-blue rounded-sm text-white cursor-pointer w-56 h-12 flex md:border-none items-center justify-center hover:bg-prussian-blue" onClick={handleSubscribeButtonClick}>Start your free 7-day trial</button>
      </div>
    </div>
  );
}

export default ArticleDetail;
