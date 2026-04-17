import ManagementBanner from '@/components/wealth-management/management--banner'
import Onboarding from '@/components/wealth-management/Onboarding'
import Practices from '@/components/wealth-management/Practices'
import React from 'react'

export default function WealthManagement() {
    return (
        <div className='py-[32px]'>
            <ManagementBanner />
            <Onboarding />
            <Practices />
        </div>
    )
}