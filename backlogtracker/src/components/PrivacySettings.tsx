'use client';

import { useEffect, useState } from "react";
import { UpdatePasswordFrontend } from "@/app/lib/updatePasswordFrontned";

type UserData = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

export default function PrivacySettings({ userData }: {userData: UserData | null}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [newPasswordSuccessMessage, setNewPasswordSuccessMessage] = useState('');

  useEffect(() => {
    if (newPasswordSuccessMessage) {
      const timeout = setTimeout(() => {
        setNewPasswordSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  })

  const handleUpdatePassword = async () => {
    if(!oldPassword || !newPassword || !userData) return;

    if(newPassword !== confirmNewPassword){
      alert("New password and confirm new password do not match");
      return;
    }

    setLoadingPassword(true);
    const results = await UpdatePasswordFrontend(userData.id, oldPassword, newPassword);
    setNewPasswordSuccessMessage(results.message);
    setLoadingPassword(false);
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 w-full block mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Old Password"
          />
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input 
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full block mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password"
          />
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 w-full block mb-8 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new Password"
          />
          <button
            onClick={handleUpdatePassword}
            disabled={loadingPassword}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingPassword ? 'Updating...' : 'Update Password'}
          </button>
          {newPasswordSuccessMessage && <p className="text-sm text-green-600">{newPasswordSuccessMessage}</p>}
        </div>
      </div>
    </div>
  )
}