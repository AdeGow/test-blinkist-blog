import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          console.log("article id is:", article_id)
          console.log("active ab test is:", activeAbTest)
          if (activeAbTest) {
            // Find the control_variation of the ActiveAbTest
            console.log("active abtest id is:", activeAbTest.id)
            const controlVariationResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${activeAbTest.id}/variations/control-variation`);
            if (!controlVariationResponse.ok) {
              throw new Error('Failed to fetch the control_variation for the active A/B tests');
            }
            const controlVariationData = await controlVariationResponse.json();
            console.log("control variation DATA is:", controlVariationData)
            setControlVariation(controlVariationData);

            // Find the test_variation of the ActiveAbTest
            const testVariationResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${activeAbTest.id}/variations/test-variation`);
            if (!testVariationResponse.ok) {
              throw new Error('Failed to fetch the test_variation for the active A/B tests');
            }
            const testVariationData = await testVariationResponse.json();
            console.log("test variation DATA is:", testVariationData)
            setTestVariation(testVariationData);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [article_id]);

  useEffect(() => {
    const cookieSelectedVariation = document.cookie.replace(/(?:(?:^|.*;\s*)cookieSelectedVariation\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (cookieSelectedVariation === "null") {
      console.log("Cookie selectedVariation is null");
      // If cookie is not set, randomly select a variation
      const randomNumber = Math.floor(Math.random() * 10) / 10 + 0.1;
      const randomSelectedVariation = randomNumber < 0.5 ? controlVariation : testVariation;
      console.log("randomSelectedVariation is", randomSelectedVariation);
      // Set the selectedVariation in component state
      setSelectedVariation(randomSelectedVariation);
      // Store the selectedVariation in cookie
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // 1 day expiration
      document.cookie = `cookieSelectedVariation=${JSON.stringify(randomSelectedVariation)}; expires=${expirationDate.toUTCString()}; path=/magazine`;
    } else {
      // Parse the string cookieSelectedVariation into a Variation object
      const parsedVariation: Variation = JSON.parse(cookieSelectedVariation);
      setSelectedVariation(parsedVariation);
    }
  }, [controlVariation, testVariation]);



  if (!article) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    // Track event when button is clicked
    trackEvent('Button Clicked', { article_id });
  };

  return (
    <div>
      <div>
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
