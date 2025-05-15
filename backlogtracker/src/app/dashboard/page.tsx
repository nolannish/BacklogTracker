'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function Dashboard() {
  interface User {
    id: string
    // Add other properties of the user object if needed
  }

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      // Fetch user data or verify token
      const res = await fetch('/api/user', { method: 'GET', credentials: 'include' })

      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        // If the user is not authenticated, redirect to unauthorized page
        router.push('/unauthorized')
      }
    }

    fetchUser()
  }, [router])

  if (!user) {
    return <div>Loading...</div> // Or a loading spinner
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
          <p>Your authentication is working successfully!</p>
        </div>
      </div>
    </>
  )
}
