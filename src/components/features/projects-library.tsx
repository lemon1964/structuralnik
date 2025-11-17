// src/components/features/projects-library.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
// import { demoProject } from "@/data/demo-project";
import { flowerShopProject } from "@/data/flower-shop-project";
import { learningEnglish } from "@/data/learning-english";

const demoProjects = [learningEnglish, flowerShopProject]
// const demoProjects = [demoProject, flowerShopProject, learningEnglish]

export function ProjectsLibrary() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-8">
      <div 
        className="flex items-center justify-between cursor-pointer bg-white rounded-lg p-4 shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          📚 Библиотека проектов
        </h2>
        <span className="text-gray-400 text-lg">
          {isExpanded ? '▼' : '►'}
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoProjects.map(project => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500"
            >
              <h3 className="font-medium text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm">
                {project.sections.length} разделов •{' '}
                {project.sections.reduce((sum, section) => sum + section.cards.length, 0)} карточек
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.sections.slice(0, 3).map(section => (
                  <span 
                    key={section.id}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    {section.name}
                  </span>
                ))}
                {project.sections.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{project.sections.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}