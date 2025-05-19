import Header from '@/components/Header';
import SettingsContent from '@/components/SettingsContent';
import authenticateUser from '../api/auth/authentication';
import Link from 'next/link';

export default async function Settings(){
  await authenticateUser();
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SettingsContent />
      </div>
    </main>
	)
}