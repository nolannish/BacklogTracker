'use client';

import { useEffect, useState } from 'react';
import FetchUserData from '@/app/api/database/fetchUserData';
import { UpdateFirstnameFrontend } from '@/app/lib/updateFirstnameFrontend';
import { UpdateLastnameFrontend } from '@/app/lib/updateLastnameFrontend';
import { UpdateEmailFrontend } from '@/app/lib/updateEmailFrontend';

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function AccountSettings() {
  const [user, setUser] = useState<{ email: string, userId: string } | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loadingFirstName, setLoadingFirstName] = useState(false);
  const [loadingLastName, setLoadingLastName] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [firstNameSuccessMessage, setFirstNameSuccessMessage] = useState('');
  const [lastNameSuccessMessage, setLastNameSuccessMessage] = useState('');
  const [emailSuccessMessage, setEmailSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchUserJWT() {
      const response = await fetch('/api/auth/getjwt', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch jwt');
      }
    }

    fetchUserJWT();
  }, []);

  useEffect(() => {
    async function getUserData(){
      if (user) {
        // console.log('user: ', user);
        const response = await FetchUserData(user.userId);
        // console.log("response: ", response);
        if(response){
          // console.log("pass");
          // const data = await response.json();
          const mappedUserData: UserData = {
            id: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            password: response.password
          };
          setUserData(mappedUserData);
        } else {
          console.error("failed to fetch user data");
        }
      }
    }

    getUserData();
  }, [user])

  useEffect(() => {
    if (firstNameSuccessMessage) {
      const timeout = setTimeout(() => {
        setFirstNameSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [firstNameSuccessMessage]);

  useEffect(() => {
    if(lastNameSuccessMessage) {
      const timeout = setTimeout(() => {
        setLastNameSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [lastNameSuccessMessage]);

  useEffect(() => {
    if(emailSuccessMessage) {
      const timeout = setTimeout(() => {
        setLastNameSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [emailSuccessMessage])

  const handleUpdateFirstname = async () => {
    if (!userData) return;

    setLoadingFirstName(true);
    const results = await UpdateFirstnameFrontend(userData.id, firstName);
    setFirstNameSuccessMessage(results.message);
    setLoadingFirstName(false);
  }

  const handleUpdateLastname = async () => {
    if (!userData) return;

    setLoadingLastName(true);
    const results = await UpdateLastnameFrontend(userData.id, lastName);
    setLastNameSuccessMessage(results.message);
    setLoadingLastName(false);
  }

  const handleUpdateEmail = async () => {
    if (!userData) return;

    setLoadingEmail(true);
    const results = await UpdateEmailFrontend(userData.id, email);
    setEmailSuccessMessage(results.message);
    setLoadingEmail(false);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <div
            id="userId"
            className="mt-1 w-full block mb-6 px-3 py-2  rounded-md"
          >
            {userData ? userData.id : "Loading..."}
          </div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full block mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={userData ? userData.first_name : "First Name"}
          />
          <button
            onClick={handleUpdateFirstname}
            disabled={loadingFirstName}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingFirstName ? 'Updating...' : 'Update First name'}
          </button>
          {firstNameSuccessMessage && <p className="text-sm text-green-600">{firstNameSuccessMessage}</p>}
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full block mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={userData ? userData.last_name : "Last Name"}
          />
          <button
            onClick={handleUpdateLastname}
            disabled={loadingLastName}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingLastName ? 'Updating...' : 'Update Last Name'}
          </button>
          {lastNameSuccessMessage && <p className="text-sm text-green-600">{lastNameSuccessMessage}</p>}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full block mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={userData ? userData.email : "Email"}
          />
          <button
            onClick={handleUpdateEmail}
            disabled={loadingEmail}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingEmail ? 'Updating...' : 'Update email'}
          </button>
          {emailSuccessMessage && <p className="text-sm text-green-600">{emailSuccessMessage}</p>}
        </div>
      </div>
      <p>This is account settings section</p>
    </div>
  )
}