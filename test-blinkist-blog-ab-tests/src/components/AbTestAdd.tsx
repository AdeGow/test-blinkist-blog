import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AbTest, Category, Editor, Variation } from '../types/seeds.types';

const AbTestAdd = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const navigate = useNavigate();

  const [abTest, setAbTest] = useState<AbTest>({
    id: 0,
    article_id: Number(article_id),
    editor_id: 0,
    control_variation: { id: 0, category_id: 0, content: '' },
    test_variation: { id: 0, category_id: 0, content: '' },
    start_date: new Date(),
    end_date: new Date(),
    is_active: false
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [editors, setEditors] = useState<Editor[]>([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:3000/api/v1/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch editors from the API
    const fetchEditors = async () => {
      try {
        const editorsResponse = await fetch('http://localhost:3000/api/v1/editors');
        if (!editorsResponse.ok) {
          throw new Error('Failed to fetch editors');
        }
        const editorsData = await editorsResponse.json();
        setEditors(editorsData);
      } catch (error) {
        console.error('Error fetching editors:', error);
      }
    };

    fetchEditors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setAbTest(prevState => ({
    ...prevState,
    [name]: value
  }));
};

  const handleEditorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const editorId = parseInt(e.target.value);
    console.log("editor id is:", editorId)
    setAbTest(prevState => ({
      ...prevState,
      editor_id: editorId
    }));
  };

  const handleControlCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const controlCategoryId = parseInt(e.target.value);
    console.log("controlCategoryId is:", controlCategoryId)
      setAbTest(prevState => ({
        ...prevState,
        control_variation: {
          ...prevState.control_variation,
          category_id: controlCategoryId,
        }
      }));
  };

  const handleTestCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const testCategoryId = parseInt(e.target.value);
    console.log("testCategoryId is:", testCategoryId)
      setAbTest(prevState => ({
        ...prevState,
        test_variation: {
          ...prevState.test_variation,
          category_id: testCategoryId
        }
      }));
  };

  const handleControlVariationContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAbTest(prevState => ({
      ...prevState,
      control_variation: {
        ...prevState.control_variation,
        content: value
      }
    }));
  };

  const handleTestVariationContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAbTest(prevState => ({
      ...prevState,
      test_variation: {
        ...prevState.test_variation,
        content: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert start_date and end_date strings back to Date objects
      const startDate = new Date(abTest.start_date);
      const endDate = new Date(abTest.end_date);

      // Construct the payload object
      const payload = {
        ab_test: {
          article_id: abTest.article_id,
          editor_id: abTest.editor_id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          is_active: abTest.is_active,
          control_variation_attributes: {
            category_id: abTest.control_variation.category_id,
            content: abTest.control_variation.content
          },
          test_variation_attributes: {
            category_id: abTest.test_variation.category_id,
            content: abTest.test_variation.content
          }
        }
      };

      // Submit the form with the payload data
      const response = await fetch(`http://localhost:3000/api/v1/editors-dashboard/articles/${article_id}/ab-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create A/B test');
      }

      // Display a success message
      alert('A/B Test created successfully!');

      // Redirect to the specified page
      navigate(`/editors-dashboard/articles/${article_id}/ab-tests`);
    } catch (error) {
      console.error('Error creating A/B test:', error);
    }
  };

  return (
    <div>
      <h2>Create A/B Test</h2>
      <form onSubmit={handleSubmit}>
        <p>A/B Test information:</p>
        {/* Editor's name input field */}
        <div>
          <label htmlFor="editor">Content editor:</label>
          <select id="editor" name="editor" onChange={(e) => handleEditorChange(e)}>
            <option value="">Select a content editor</option>
            {editors.map(editor => (
              <option key={editor.id} value={editor.id}>{editor.name}</option>
            ))}
          </select>
        </div>

        {/* Start Date input field */}
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input type="date" id="start_date" name="start_date" onChange={handleChange} />
        </div>

        {/* End Date input field */}
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input type="date" id="end_date" name="end_date" onChange={handleChange} />
        </div>

        <p>CREATE THE CONTROL VARIATION:</p>
        {/* Control Variation Category input field */}
        <div>
          <label htmlFor="control_variation_category">Control Variation Format Category:</label>
          <select id="control_variation_category" name="control_variation_category" onChange={(e) => handleControlCategoryChange(e)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Control Variation Content input field */}
        <div>
          <label htmlFor="control_variation_content">Control Variation Content:</label>
          <textarea
            id="control_variation_content"
            name="control_variation_content"
            value={abTest.control_variation.content}
            onChange={handleControlVariationContentChange}
          />
        </div>

        <p>CREATE THE TEST VARIATION:</p>
        {/* Test Variation Category input field */}
        <div>
          <label htmlFor="test_variation_category">Test Variation Format Category:</label>
          <select id="test_variation_category" name="test_variation_category" onChange={(e) => handleTestCategoryChange(e)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Test Variation Content input field */}
        <div>
          <label htmlFor="test_variation_content">Test Variation Content:</label>
          <textarea
            id="test_variation_content"
            name="test_variation_content"
            value={abTest.test_variation.content}
            onChange={handleTestVariationContentChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit">Create A/B Test</button>
      </form>
    </div>
  );
}

export default AbTestAdd;
