import React from 'react'
import ProjectHero from '@/components/visa/project/ProjectHero'
import ProjectStats from '@/components/visa/project/ProjectStats'
import ProjectDetails from '@/components/visa/project/ProjectDetails'
import ProjectCTA from '@/components/visa/project/ProjectCTA'

export default function OurProject() {
    return (
        <div className="bg-white">
            <ProjectHero />
            <ProjectStats />
            <ProjectDetails />
            <ProjectCTA />
        </div>
    )
}
