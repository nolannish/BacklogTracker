import Header from '@/components/Header'
import authenticateUser from '../api/auth/authentication';

export default async function Dashboard() {
  await authenticateUser();

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
          <p>Your authentication is working successfully!</p>
        </div>
      </div>
    </>
  )
}
