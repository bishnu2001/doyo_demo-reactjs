// Import React and necessary hooks
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { SignoutuserSuccess } from "../../redux/user/useSlice";
import { useDispatch } from "react-redux";

// Define the component
const Adminchat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(SignoutuserSuccess()); // Dispatch Redux action for logout
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  // Navigate to user list function
  const goToChatPage = () => {
    navigate('/userlist');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center text-blue-500 font-semibold">Admin Chat</h1>
        <div className="mb-6 text-center">
          <button
            onClick={goToChatPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none"
          >
            Go to Chat Page
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default Adminchat;
