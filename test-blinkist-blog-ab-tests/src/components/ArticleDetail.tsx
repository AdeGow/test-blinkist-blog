import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, AbTest, Variation } from '../types/seeds.types';
import { trackPageview, trackEvent } from '../analytics-api';

const ArticleDetail = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [controlVariation, setControlVariation] = useState<Variation | null>(null);
  const [testVariation, setTestVariation] = useState<Variation | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/magazine/articles/${article_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const articleData = await response.json();
        setArticle(articleData);
        trackPageview(`/magazine/articles/${article_id}`);

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
              throw new Error('Failed to fetch the control_variation for the active A/B tests');
            }
            const controlVariationData = await controlVariationResponse.json();
            setControlVariation(controlVariationData);

            // Find the test_variation of the ActiveAbTest
            const testVariationResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${activeAbTest.id}/variations/test-variation`);
            if (!testVariationResponse.ok) {
              throw new Error('Failed to fetch the test_variation for the active A/B tests');
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
    console.log("from getCookie function, cookieValue is :", cookieValue)
    return cookieValue ? cookieValue.pop() || null : null;
  }

  useEffect(() => {
    const cookieNameWithArticleId = `cookieSelectedVariation_article_${article_id}`;

    const cookieArticleValue = getCookie(cookieNameWithArticleId);
    console.log("cookieArticleValue", cookieArticleValue)

    if (!cookieArticleValue || cookieArticleValue === "null") {
      // If the cookie is not set, and neither control nor test variations are available, do nothing

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
      console.log("parsedCookieValue is", parsedCookieValue)

      // Set the selectedVariation from the cookie
      setSelectedVariation(parsedCookieValue);
    } else {
      return console.log("Could not set variation")
    }
  }, [controlVariation, testVariation, article_id]);


  if (!article) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    // Track event when button is clicked
    trackEvent('Button Clicked', { article_id });
  };

  return (
    <div>
      <div className="bg-white border border-slate-50 rounded-[20px] cursor-pointer w-36 h-12 flex shadow-md md:shadow-lg shadow-lg shadow-gray-200 duration-300 lg:hover:-translate-y-1 md:border-none items-center justify-center">
        <Link to={`/magazine/articles`}>
          Back to list
        </Link>
      </div>
      <div>
        <p className="font-bold text-3xl my-10">{selectedVariation != null && selectedVariation.id}</p>
        <h1>{article.title}</h1>
        <p>{selectedVariation != null ? selectedVariation.content : article.content}</p>
      </div>

      <div>
        <p>Thanks a lot for reading the article!</p>
        <button onClick={handleButtonClick}>SIGN UP for Blinkist</button>
      </div>
    </div>
  );
}

export default ArticleDetail;
