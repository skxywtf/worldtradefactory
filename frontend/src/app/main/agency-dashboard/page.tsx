"use client"
import Dashboard from '@/components/agency-dashboard/Dashboard'
import { useTheme } from '@mui/material'
import React from 'react'

type Props = {}

const AgencyDashboardPage = (props: Props) => {
  return (
    <div className='h-full w-full bg-black'>
      <Dashboard/>
    </div>
  )
}

export default AgencyDashboardPage
