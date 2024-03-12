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
        const articleResponse = await fetch(`http://localhost:3000/api/v1/magazine/articles/${article_id}`);
        if (!articleResponse.ok) {
          throw new Error('Failed to fetch article');
        }
        const articleData = await articleResponse.json();
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
      <div className="text-grey underline hover:text-dark-grey text-base cursor-pointer h-10 flex md:border-none items-center justify-left hover:">
        <Link to={`/editors-dashboard/articles`}>
          Back to the list of articles
        </Link>
      </div>
      <h1 className="text-4xl mb-12">List of all the <span className="text-blue">A/B Tests of Article nº{article_id}</span></h1>
      <h3 className="text-4xl mb-12">Article title: {article.title}</h3>
      <div>
        <div className="flex justify-end">
          <div className="bg-green hover:bg-[#1CB965] cursor-pointer rounded-sm text-navy-blue cursor-pointer w-44 h-12 flex md:border-none items-center justify-center">
            <Link to={`/editors-dashboard/articles/${article_id}/ab-tests/new`}>
              Create new A/B Test
            </Link>
          </div>
        </div>
        <ul>
        {abTests != null && abTests.map(abTest => (
          <li key={abTest.id}>
            <div className="mb-16">
              <div className="mb-4">
                <h4 className ="mb-8 underline decoration-blue decoration-4 underline-offset-[15px]">A/B Test nº{abTest.id}</h4>
                <p>{abTest.is_active? <p  className="text-green text-lg font-bold">ACTIVE</p> : <p className="text-grey text-lg font-bold">UNACTIVE</p>}</p>
              </div>
              <div className="bg-blue rounded-sm text-white cursor-pointer w-40 h-12 flex md:border-none items-center justify-center">
                <Link to={`/editors-dashboard/articles/${article_id}/ab-tests/${abTest.id}`}>
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
