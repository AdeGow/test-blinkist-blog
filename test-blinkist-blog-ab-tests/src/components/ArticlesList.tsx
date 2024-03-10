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
      { path.startsWith('/magazine/articles') &&
        <div>
          <ul>
          {articles != null && articles.map(article => (
            <li key={article.id}>
              <div className="mb-16">
                <div className="mb-4">
                  <h3 className ="mb-8 underline decoration-blue decoration-4 underline-offset-[15px]">Article nº{article.id}</h3>
                  <h4 className ="mb-8">{article.title}</h4>
                </div>
                <div className="bg-blue rounded-sm text-white cursor-pointer w-40 h-12 flex md:border-none items-center justify-center hover:bg-prussian-blue">
                  <Link to={`/magazine/articles/${article.id}`}>
                    See the article
                  </Link>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      }
      {/* CONTENT EDITORS DASHBOARD */}
      { path.startsWith('/editors-dashboard/articles') &&
        <div>
          <ul>
          {articles != null && articles.map(article => (
            <li key={article.id}>
              <div className="mb-16">
                <div className="mb-4">
                  <h3 className ="mb-8 underline decoration-blue decoration-4 underline-offset-[15px]">Article nº{article.id}</h3>
                  <h4 className ="mb-8">{article.title}</h4>
                </div>
                <div className="bg-blue rounded-sm text-white cursor-pointer w-40 h-12 flex md:border-none items-center justify-center hover:bg-prussian-blue">
                <Link to={`/editors-dashboard/articles/${article.id}/ab-tests`}>
                  See the article
                </Link>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default ArticlesList;
