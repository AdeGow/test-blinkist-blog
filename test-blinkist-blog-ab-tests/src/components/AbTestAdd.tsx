import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AbTest, Category, Editor } from '../types/seeds.types';

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


    // Functions to update the aBTest variable with the selected input's value, including the inputs related to variations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setAbTest(prevState => ({
    ...prevState,
    [name]: value
  }));
};

  const handleEditorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const editorId = parseInt(e.target.value);
    setAbTest(prevState => ({
      ...prevState,
      editor_id: editorId
    }));
  };

  const handleControlCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const controlCategoryId = parseInt(e.target.value);
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

  const htmlString = "&lt;p&gt;&lt;/p&gt;";

  return (
    <div>
      <h1>Create a new A/B Test</h1>
      {/* INSTRUCTIONS */}
      <div className="mb-6">
        <h3 className="mb-6">Instructions to create your new A/B Test.</h3>
        <p>Here are guidelines to help you write the content for your control and test variations.</p>
        <p>You will write the content as HTML tags to facilitate the integration of your A/B Test's variations inside the articles of the Blinkist Magazine</p>
        <p className="mt-2">It is very simple, according to the type of content you want to display, you will use a specific HTML tag. When you know which tag you want to use, just open the tag, write your content following the guidelines below and close the tag.</p>
      </div>
      <ul className="mb-10">
        <li className="pl-4 mb-4">
          <p><span className="font-normal">✅ TITLE:</span> use the &lt;h4&gt;&lt;/h4&gt; tag for titles.</p>
          <p>Example: &lt;h4&gt;This is a title example&lt;/h4&gt;</p>
        </li>
        <li className="pl-4 mb-4">
          <p><span className="font-normal">✅ TEXT AND PARAGRAPHS:</span> use the &lt;p&gt; &lt;/p&gt; paragraph tag, placing your content inside the tags.</p>
          <p>Example: &lt;p&gt;This is an example of how to include text. You can keep using the same paragraphs tags for the same text section. When the text section is finished, just close the "p" tag.&lt;/p&gt;</p>
        </li>
        <li className="pl-4 mb-4">
          <p><span className="font-normal">✅ IMAGE: </span>use the &lt;img src="" alt="" /&gt; tag, specifying the source of the image and the alternative text.</p>
          <p>Example: &lt;img src="img_example.jpg" alt="Image example" /&gt;</p>
        </li>
        <li className="pl-4 mb-4">
          <p><span className="font-normal">✅ LINK:</span> use the &lt;a href=""&gt;&lt;/a&gt; tag, specifying the URL you want to redirect the visitor and inside the tags place the anchor text.</p>
          <p>Example: &lt;a href="https://www.blinkist.com/"&gt;Visit Blinkist.&lt;/a&gt;</p>
        </li>
      </ul>

      {/* FORM */}
      <h3 className="mb-6">Create the A/B Test:</h3>
      <div className="">
        <form onSubmit={handleSubmit}>
          <p className="mb-4">A/B Test information:</p>
          {/* Editor's name input field */}
          <div className="mb-3">
            <label htmlFor="editor">Content editor:</label>
            <select className="ml-3 w-2/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" id="editor" name="editor" onChange={(e) => handleEditorChange(e)}>
              <option value="">Select a content editor</option>
              {editors.map(editor => (
                <option key={editor.id} value={editor.id}>{editor.name}</option>
              ))}
            </select>
          </div>

          {/* Start Date input field */}
          <div className="mb-3">
            <label htmlFor="start_date">Start Date:</label>
            <input className="ml-3 w-2/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="date" id="start_date" name="start_date" onChange={handleChange} />
          </div>

          {/* End Date input field */}
          <div className="mb-3">
            <label htmlFor="end_date">End Date:</label>
            <input className="ml-3 w-2/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" type="date" id="end_date" name="end_date" onChange={handleChange} />
          </div>

          <p className="mt-10 mb-6">Control variation information:</p>
          {/* Control Variation Category input field */}
          <div className="mb-3">
            <label htmlFor="control_variation_category">Control Variation Format Category:</label>
            <select className="ml-3 w-2/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" id="control_variation_category" name="control_variation_category" onChange={(e) => handleControlCategoryChange(e)}>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Control Variation Content input field */}
          <div className="mb-3">
            <label className="block mb-2" htmlFor="control_variation_content">Control Variation Content:</label>
            <textarea
              id="control_variation_content"
              name="control_variation_content"
              value={abTest.control_variation.content}
              onChange={handleControlVariationContentChange}
              className="w-6/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <p className="my-6">Test variation information:</p>
          {/* Test Variation Category input field */}
          <div className="mb-3">
            <label htmlFor="test_variation_category">Test Variation Format Category:</label>
            <select className="ml-3 w-2/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" id="test_variation_category" name="test_variation_category" onChange={(e) => handleTestCategoryChange(e)}>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Test Variation Content input field */}
          <div className="mb-3">
            <label className="block mb-2" htmlFor="test_variation_content">Test Variation Content:</label>
            <textarea
              id="test_variation_content"
              name="test_variation_content"
              value={abTest.test_variation.content}
              onChange={handleTestVariationContentChange}
              className="w-6/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          {/* Submit button */}
          <button className="bg-blue rounded-sm text-white cursor-pointer w-40 h-12 flex md:border-none items-center justify-center hover:bg-prussian-blue" type="submit">Create A/B Test</button>
        </form>
      </div>
    </div>
  );
}

export default AbTestAdd;
