import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types/seeds.types';
import { trackPageview, trackEvent } from '../analytics-api';

const ArticleDetail = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/magazine/articles/${article_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
        trackPageview(`/magazine/articles/${article_id}`);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [article_id]);

  const handleButtonClick = () => {
    // Track event when button is clicked
    trackEvent('Button Clicked', { article_id });
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </div>

      <div>
        <p>Thanks a lot for reading the article!</p>
        <button onClick={handleButtonClick}>SIGN UP for Blinkist</button>
      </div>
    </div>
  );
}

export default ArticleDetail;
