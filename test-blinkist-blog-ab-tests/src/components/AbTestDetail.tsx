import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AbTest } from '../types/seeds.types';

const AbTestDetail = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const { ab_test_id } = useParams<{ ab_test_id: string }>();
  const [abTest, setAbTest] = useState<AbTest>();

  useEffect(() => {
    const fetchAbTest = async () => {
      try {
        // Fetch A/B test data
        const abTestResponse = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests/${ab_test_id}`);
        if (!abTestResponse.ok) {
          throw new Error('Failed to fetch A/B test');
        }
        const abTestData = await abTestResponse.json();

        // Check if the article has associated A/B tests
        if (abTestData) {
          setAbTest(abTestData)
        } else {
          console.log("Could not set the A/B Test")
        }
      } catch (error) {
        console.error('Error fetching A/B Test:', error);
      }
    };

    fetchAbTest();
  }, [article_id, ab_test_id]);


  if (!abTest) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-grey underline hover:text-dark-grey text-base cursor-pointer h-10 flex md:border-none items-center justify-left hover:">
        <Link to={`/editors-dashboard/articles/${article_id}/ab-tests`}>
          Back to the list of A/B Tests
        </Link>
      </div>
      <div className="my-8">
        <h1 className="text-4xl mb-12">Details of <span className="text-blue">A/B Test nº{ab_test_id} of Article nº{article_id} </span></h1>
      </div>
      <div>
        <p>{abTest.is_active? <p  className="text-green text-lg font-bold">ACTIVE</p> : <p className="text-grey text-lg font-bold">UNACTIVE</p>}</p>
      </div>
    </div>
  );
}

export default AbTestDetail;
