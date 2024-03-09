import React, { useState, useEffect } from 'react';
import { Articles } from '../types/seeds.types';
import { Link, useLocation } from 'react-router-dom';

const ArticlesList = () => {
  const [articles, setArticles] = useState<Articles | null>(null);
  const location = useLocation();
  const path = location.pathname;

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
      {/* VISITORS MAGAZINE */}
      <h1 className="text-4xl mb-12">Articles</h1>
      { path.startsWith('/magazine/articles') &&
        <div>
          <ul>
          {articles != null && articles.map(article => (
            <div className="mb-8">
              <div className="mb-4">
                <p className ="font-bold">Article nº{article.id}</p>
                <li key={article.id}>{article.title}</li>
              </div>
              <div className="bg-white border border-slate-50 rounded-[20px] cursor-pointer w-36 h-12 flex shadow-md md:shadow-lg shadow-lg shadow-gray-200 duration-300 lg:hover:-translate-y-1 md:border-none items-center justify-center">
                <Link to={`/magazine/articles/${article.id}`}>
                  See the article
                </Link>
              </div>
            </div>
          ))}
          </ul>
        </div>
      }
      {/* CONTENT EDITORS DASHBOARD */}
      { path.startsWith('/editors-dashboard/articles') &&
        <div>
          <ul>
          {articles != null && articles.map(article => (
            <div className="mb-8">
              <div className="mb-4">
                <p className ="font-bold">Article nº{article.id}</p>
                <li key={article.id}>{article.title}</li>
              </div>
              <div className="bg-white border border-slate-50 rounded-[20px] cursor-pointer w-36 h-12 flex shadow-md md:shadow-lg shadow-lg shadow-gray-200 duration-300 lg:hover:-translate-y-1 md:border-none items-center justify-center">
                <Link to={`/editors-dashboard/articles/${article.id}`}>
                  See the article
                </Link>
              </div>
            </div>
          ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default ArticlesList;
