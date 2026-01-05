'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Welcome, {user?.firstName || 'User'}!
      </h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Your Premium Finance Pro dashboard is loading...
      </p>
      <div style={{ 
        marginTop: '40px', 
        padding: '30px', 
        background: '#f0f9ff', 
        borderRadius: '12px',
        border: '2px solid #3b82f6'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🎉 You're Live!</h2>
        <p>Your app is successfully deployed and running on Vercel!</p>
        <p style={{ marginTop: '12px' }}>Next steps: Add your financial data and start tracking!</p>
      </div>
    </div>
  )
}
