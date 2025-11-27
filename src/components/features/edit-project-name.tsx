// src/components/features/edit-project-name.tsx
'use client'

import { useState } from 'react'
import { updateProject } from '@/services/api'


interface EditProjectNameProps {
  projectId: string
  currentName: string
  onUpdate: (newName: string) => void
}

export function EditProjectName({ projectId, currentName, onUpdate }: EditProjectNameProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentName)

  const handleSave = async () => {
    try {
      const updatedProject = await updateProject(projectId, { name })
      if (updatedProject) {
        onUpdate(name)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating project name:', error)
      alert('Ошибка при сохранении названия')
    }
  }

  if (isEditing) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            ✓ Сохранить
          </button>
          <button
            onClick={() => {
              setName(currentName)
              setIsEditing(false)
            }}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
          >
            ✕ Отмена
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-gray-300">{currentName}</h1>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-500 hover:text-indigo-600 text-sm"
      >
        ✏️
      </button>
    </div>
  )
}