import { useState } from "react";
import { Editor, EditorState, RichUtils, DraftHandleValue } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js CSS
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


// Define the component
export const Publish = () => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [bodyEditorState, setBodyEditorState] = useState<EditorState>(EditorState.createEmpty());

  // Handle key commands (for bold, italic, etc.) for title
  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Handle key commands (for bold, italic, etc.) for body
  const handleKeyCommandBody = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(bodyEditorState, command);
    if (newState) {
      setBodyEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Toggle inline styles (bold, italic, etc.) for title
  const toggleInlineStyle = (style: string): void => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Toggle block types (heading, list, etc.) for title
  const toggleBlockType = (blockType: string): void => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Toggle inline styles (bold, italic, etc.) for body
  const toggleInlineStyleBody = (style: string): void => {
    setBodyEditorState(RichUtils.toggleInlineStyle(bodyEditorState, style));
  };

  // Toggle block types (heading, list, etc.) for body
  const toggleBlockTypeBody = (blockType: string): void => {
    setBodyEditorState(RichUtils.toggleBlockType(bodyEditorState, blockType));
  };

  // Publish the blog post to the backend
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate()

const publishBlog = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title: editorState.getCurrentContent().getPlainText(),
      content: bodyEditorState.getCurrentContent().getPlainText(),
      createdAt: new Date().toISOString(),
    }, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Blog published', response.data);
    navigate(`/blog/${response.data.id}`)
  } catch (error) {
    console.error('Error publishing the blog:', error);
  }
};

  return (
    <div>
      <Appbar />
      <div className="max-w-3xl mx-auto my-8">
        {/* Toolbar for Title */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => toggleInlineStyle("BOLD")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Bold
          </button>
          <button
            onClick={() => toggleInlineStyle("ITALIC")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Italic
          </button>
          <button
            onClick={() => toggleInlineStyle("UNDERLINE")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Underline
          </button>
          <button
            onClick={() => toggleBlockType("header-one")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            H1
          </button>
          <button
            onClick={() => toggleBlockType("unordered-list-item")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Bullet List
          </button>
          <button
            onClick={() => toggleBlockType("ordered-list-item")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Numbered List
          </button>
        </div>

        {/* Title Editor */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Editor
            placeholder="Title of blog..."
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </div>

        {/* Toolbar for Body */}
        <div className="flex space-x-2 mb-4 mt-6">
          <button
            onClick={() => toggleInlineStyleBody("BOLD")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Bold
          </button>
          <button
            onClick={() => toggleInlineStyleBody("ITALIC")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Italic
          </button>
          <button
            onClick={() => toggleInlineStyleBody("UNDERLINE")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Underline
          </button>
          <button
            onClick={() => toggleBlockTypeBody("unordered-list-item")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Bullet List
          </button>
          <button
            onClick={() => toggleBlockTypeBody("ordered-list-item")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Numbered List
          </button>
        </div>

        {/* Body Editor */}
        <div className="border p-4 rounded-lg shadow-lg mt-6 h-52">
          <Editor
            placeholder="Write your blog..."
            editorState={bodyEditorState}
            onChange={setBodyEditorState}
            handleKeyCommand={handleKeyCommandBody}
          />
        </div>

        {/* Publish Button */}
        <div>
          <button
            className="w-32 py-3 mt-4 bg-purple-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-600 font-bold"
            onClick={publishBlog}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
