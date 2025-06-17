'use client';

import { useEffect, useState } from "react";
import {
  UpdatePasswordFrontend,
  DeleteAccountFrontend
} from '@/app/lib/database-library/database';
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from 'next/navigation';

type UserData = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

type SteamUserData = {
  id: string,
  steamId: string;
  username: string;
}

type Props = {
  userData: UserData | null;
  steamUserData: SteamUserData | null;
}

export default function PrivacySettings({ userData, steamUserData }: Props) {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [newPasswordSuccessMessage, setNewPasswordSuccessMessage] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (newPasswordSuccessMessage) {
      const timeout = setTimeout(() => {
        setNewPasswordSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [newPasswordSuccessMessage]);

  useEffect(() => {
    if (deleteSuccessMessage) {
      const timeout = setTimeout(() => {
        setDeleteSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [deleteSuccessMessage]);

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

  const handleDelete = async () => {
    if(!userData) return;

    setLoadingDelete(true);
    const results = await DeleteAccountFrontend(userData.id);
    setIsModalOpen(false);
    alert(results.message);
    setLoadingDelete(false);
    router.push('/');
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>
      <div className="space-y-4">
        <h3 className="text-xl ">Change your password</h3>
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
      <div className="space-y-4">
        <h3 className="text-xl">Delete your account</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 disabled:opacity-50"
        >
          Delete your account
        </button>
        
        <ConfirmationModal
          isOpen={isModalOpen}
          title="Delete Account?"
          description="Are you sure you want to delete your account? This action is irreversible."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  )
}