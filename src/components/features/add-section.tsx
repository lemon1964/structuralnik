// src/components/features/add-section.tsx
'use client'

import { useState } from 'react'
import { getProject, updateProject } from '@/services/api'

interface AddSectionProps {
  projectId: string
  onSectionAdded: () => void
}

export function AddSection({ projectId, onSectionAdded }: AddSectionProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [sectionName, setSectionName] = useState('')

  const handleAddSection = async () => {
    if (!sectionName.trim()) return

    try {
      const project = await getProject(projectId)
      if (!project) return

      const newSection = {
        id: Date.now(),
        name: sectionName,
        cards: []
      }

      const updatedProject = {
        ...project,
        sections: [...project.sections, newSection]
      }

      await updateProject(projectId, updatedProject)

      setSectionName('')
      setIsAdding(false)
      onSectionAdded()
    } catch (error) {
      console.error('Error adding section:', error)
      alert('Ошибка при добавлении раздела')
    }
  }

  if (isAdding) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <input
          type="text"
          placeholder="Название раздела"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddSection}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Добавить раздел
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Отмена
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 mb-6"
    >
      + Добавить раздел
    </button>
  )
}