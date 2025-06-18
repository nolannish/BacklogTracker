'use client';

import { useEffect, useState } from 'react';
import { 
  UpdateFirstnameFrontend,
  UpdateLastnameFrontend,
  UpdateEmailFrontend,
} from '@/app/lib/database-library/database';
// import { UpdateFirstnameFrontend } from '@/app/lib/updateFirstnameFrontend';
// import { UpdateLastnameFrontend } from '@/app/lib/updateLastnameFrontend';
// import { UpdateEmailFrontend } from '@/app/lib/updateEmailFrontend';

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

type SteamUserData = {
  id: string;
  steamId: string;
  username: string;
}

type Props = {
  userType: string | null;
  userData: UserData | null;
  steamUserData: SteamUserData | null;
}

export default function AccountSettings({ userType, userData, steamUserData }: Props) {
  const [user, setUser] = useState<{ email: string, userId: string } | null>(null);
  // const [userData, setUserData] = useState<UserData | null>(null);
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
    if (userData) {
      if (firstNameSuccessMessage) {
        const timeout = setTimeout(() => {
          setFirstNameSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }
  }, [firstNameSuccessMessage]);

  useEffect(() => {
    if (userData) {
      if(lastNameSuccessMessage) {
        const timeout = setTimeout(() => {
          setLastNameSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }
  }, [lastNameSuccessMessage]);

  useEffect(() => {
    if (userData) {
      if(emailSuccessMessage) {
        const timeout = setTimeout(() => {
          setLastNameSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timeout);
      }
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

  console.log('steamUserData: ', steamUserData);
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
            { userData ? userData.id : steamUserData ? steamUserData.id : 'Loading...' }
          </div>
          {/* Specific to 'user' type */}
          {userType === 'user' && userData && (
            <>
              {/* First Name */}
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
                placeholder={userData.first_name}
              />
              <button
                onClick={handleUpdateFirstname}
                disabled={loadingFirstName}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingFirstName ? 'Updating...' : 'Update First Name'}
              </button>
              {firstNameSuccessMessage && <p className="text-sm text-green-600">{firstNameSuccessMessage}</p>}

              {/* Last Name */}
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
                placeholder={userData.last_name}
              />
              <button
                onClick={handleUpdateLastname}
                disabled={loadingLastName}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingLastName ? 'Updating...' : 'Update Last Name'}
              </button>
              {lastNameSuccessMessage && <p className="text-sm text-green-600">{lastNameSuccessMessage}</p>}

              {/* Email */}
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
                placeholder={userData.email}
              />
              <button
                onClick={handleUpdateEmail}
                disabled={loadingEmail}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingEmail ? 'Updating...' : 'Update Email'}
              </button>
              {emailSuccessMessage && <p className="text-sm text-green-600">{emailSuccessMessage}</p>}
            </>
          )}

          {/* Specific to 'steamuser' type */}
          {userType === 'steamuser' && steamUserData && (
            <>
              <p className="text-sm text-gray-700">Steam ID: {steamUserData.steamId}</p>
              <p className="text-sm text-gray-700">Steam Username: {steamUserData.username}</p>
              <p className="text-sm text-gray-500 mt-2">Steam users cannot update their profile information from this page.</p>
            </>
          )}
        </div>
      </div>
      <p>This is account settings section</p>
    </div>
  );
}