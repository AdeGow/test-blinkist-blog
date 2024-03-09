import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, AbTests } from '../types/seeds.types';

const ArticleAbTests = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [abTests, setAbTests] = useState<AbTests>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/magazine/articles/${article_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const articleData = await response.json();
        setArticle(articleData);

        // Fetch A/B tests data for the article
        const abTestsResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests`);
        if (!abTestsResponse.ok) {
          throw new Error('Failed to fetch A/B tests for the article');
        }
        const abTestsData = await abTestsResponse.json();

        // Check if the article has associated A/B tests
        if (abTestsData) {
          setAbTests(abTestsData)
        } else {
          console.log("This article has no Ab Tests at the moment.")
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [article_id]);


  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* VISITORS MAGAZINE */}
      <h1 className="text-4xl mb-12">Articles</h1>
      <div>
        <ul>
        {abTests != null && abTests.map(abTest => (
          <li key={abTest.id}>
            <div className="mb-8">
              <div className="mb-4">
                <p className ="font-bold">A/B Test nº{abTest.id}</p>
                <p>{abTest.is_active? "This A/B Test is currenlty active." : "Not active."}</p>
              </div>
              <div className="bg-white border border-slate-50 rounded-[20px] cursor-pointer w-36 h-12 flex shadow-md md:shadow-lg shadow-lg shadow-gray-200 duration-300 lg:hover:-translate-y-1 md:border-none items-center justify-center">
                <Link to={`/magazine/abTests/${abTest.id}`}>
                  See the A/B Test
                </Link>
              </div>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default ArticleAbTests;
