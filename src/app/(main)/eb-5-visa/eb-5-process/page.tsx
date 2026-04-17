import ProcessBanner from '@/components/visa/process-banner'
import ProcessWork from '@/components/visa/process-work'
import ProcessCTA from '@/components/visa/process-cta'
import React from 'react'
import ReusableHeader from '@/hook/resuable-header'

export default function Process() {
    return (
        <div>
            <ProcessBanner />
            <ReusableHeader
                title="How the EB-5 Process Works"
                description="Navigating the federal investment landscape requires a strategic roadmap. Our
institutional approach ensures transparency at every milestone."
            />
            <ProcessWork />
            <ProcessCTA />
        </div>
    )
}
