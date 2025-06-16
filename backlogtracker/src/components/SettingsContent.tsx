'use client';

import { useEffect, useState } from 'react';
import FetchUserData from '@/app/api/database/fetchUserData';
import SettingsSidebar from './SettingsSidebar';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import { VerifyUserTypeFrontend, FetchSteamUserDataFrontend } from '@/app/lib/database-library/database';

type Section = 'account' | 'privacy'

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

export default function SettingsContent() {
  const [selectedSection, setSelectedSection] = useState<Section>('account');
  const [user, setUser] = useState<{ email: string, userId: string } | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [steamUserData, setSteamUserData] = useState<SteamUserData | null>(null); 
  const [userType, setUserType] = useState('none');

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
    async function verifyUserType() {
      if (user) {
        const response = await VerifyUserTypeFrontend(user.userId);
        if (response) {
          setUserType(response.userType);
        } else {
          console.error('Failed to verify user type');
        }
      }
    }

    verifyUserType();
  }, [user]);

useEffect(() => {
  async function getUserData() {
    if (user && userType === 'user') {
      const response = await FetchUserData(user.userId);
      if (response) {
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
}, [user, userType]);

useEffect(() => {
  async function getSteamUserData() {
    if (user && userType === 'steamuser') {
      const response = await FetchSteamUserDataFrontend(user.userId);
      if (response.success && response.userData) {
        const mappedSteamuserData: SteamUserData = {
          id: response.userData.id,
          steamId: response.userData.steamId,
          username: response.userData.username
        };
        setSteamUserData(mappedSteamuserData);
      } else {
        console.error('Failed to fetch steam user data');
      }
    }
  }

  getSteamUserData();
}, [user, userType]);

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