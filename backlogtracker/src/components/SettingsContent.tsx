'use client';

import { useEffect, useState } from 'react';
import FetchUserData from '@/app/api/database/fetchUserData';
import SettingsSidebar from './SettingsSidebar';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';

type Section = 'account' | 'privacy'

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SettingsContent() {
  const [selectedSection, setSelectedSection] = useState<Section>('account');
  const [user, setUser] = useState<{ email: string, userId: string } | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserJWT() {
      const response = await fetch('/api/auth/getjwt', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok){
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch jwt');
      }
    }

    fetchUserJWT();
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (user) {
        const response = await FetchUserData(user.userId);
        if (response){
          const mappedUserData: UserData = {
            id: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            password: response.password
          };
          
          setUserData(mappedUserData);
        } else {
          console.error('Failed to fetch user data');
        }
      }
    }

    getUserData();
  }, [user]);
  return (
    <>
      <SettingsSidebar  selected={selectedSection} onSelect={setSelectedSection} />

      <div className="flex-1 p-6">
        {selectedSection === 'account' && <AccountSettings userData={userData}/>}
        {selectedSection === 'privacy' && <PrivacySettings userData={userData}/>}
      </div>
    </>
  )
}