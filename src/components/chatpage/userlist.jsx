import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import useSWR from '../../HOOKS/useSWR';
import{ SignoutuserSuccess} from "../../redux/user/useSlice";
import { useDispatch } from 'react-redux'; 


const UserList = () => {
  const { data: user, isValidating } = useSWR('users/getalluser');
  console.log(user, '111');
  const dispatch=useDispatch()
  const navigate=useNavigate();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const users = user.data.data.data;

  const handleLogout = () => {
    dispatch(SignoutuserSuccess()); // Dispatch Redux action for logout
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Users</h2>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white focus:outline-none"
          >
            Logout
          </button>
        </div>
        <div className="p-4">
          {isValidating ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id} className="border-b border-gray-200 last:border-b-0">
                  <Link
                    to={`/chat/${user._id}`}
                    className="block px-6 py-4 hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-500 text-white flex items-center justify-center h-10 w-10 font-semibold text-lg mr-4">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-lg">{user.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
