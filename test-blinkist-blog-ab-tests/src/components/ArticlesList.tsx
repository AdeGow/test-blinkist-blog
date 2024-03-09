import React, { useState, useEffect } from 'react';
import { Articles } from '../types/seeds.types';
import { Link } from 'react-router-dom';



const ArticlesList = () => {
  const [articles, setArticles] = useState<Articles | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/magazine/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-12">Articles</h1>
      <ul>
        {articles != null && articles.map(article => (
          <div className="mb-8">
            <div className="mb-4">
              <p className ="font-bold">Article nº{article.id}</p>
              <li key={article.id}>{article.title}</li>
            </div>
            <div className="bg-white border border-slate-50 rounded-[20px] cursor-pointer w-36 h-12 flex shadow-md md:shadow-lg shadow-lg shadow-gray-200 duration-300 lg:hover:-translate-y-1 md:border-none items-center justify-center">
              <Link to={`/magazine/articles/${article.id}`}>
                Read this article
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ArticlesList;
