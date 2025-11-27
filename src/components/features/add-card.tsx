// src/components/features/add-card.tsx
'use client'

import { useState } from 'react'
import { getProject, updateProject } from '@/services/api'

interface AddCardProps {
  projectId: string
  sectionId: number
  onCardAdded: () => void
}

export function AddCard({ projectId, sectionId, onCardAdded }: AddCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [cardData, setCardData] = useState({
    title: '',
    type: 'idea' as 'idea' | 'solution' | 'question' | 'link' | 'file',
    content: ''
  })

  const handleAddCard = async () => {
    if (!cardData.title.trim()) return

    try {
      const project = await getProject(projectId)
      if (!project) return

      const newCard = {
        id: Date.now(),
        title: cardData.title,
        type: cardData.type,
        content: cardData.content
      }

      const updatedSections = project.sections.map((section: Section) => 
        section.id === sectionId 
          ? { ...section, cards: [...section.cards, newCard] }
          : section
      )

      const updatedProject = {
        ...project,
        sections: updatedSections
      }

      await updateProject(projectId, updatedProject)

      setCardData({ title: '', type: 'idea', content: '' })
      setIsAdding(false)
      onCardAdded()
    } catch (error) {
      console.error('Error adding card:', error)
      alert('Ошибка при добавлении карточки')
    }
  }

  if (isAdding) {
    return (
      <div className="bg-white border-2 border-dashed border-indigo-200 p-4 rounded-lg mb-4">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Заголовок карточки*"
            value={cardData.title}
            onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoFocus
          />
          
          <select
            value={cardData.type}
            onChange={(e) => setCardData({ ...cardData, type: e.target.value as typeof cardData.type })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="idea">💡 Идея</option>
            <option value="solution">✅ Решение</option>
            <option value="question">❓ Вопрос</option>
            <option value="link">🔗 Ссылка</option>
            <option value="file">📎 Файл</option>
          </select>

          <textarea
            placeholder="Описание (необязательно)"
            value={cardData.content}
            onChange={(e) => setCardData({ ...cardData, content: e.target.value })}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddCard}
              disabled={!cardData.title.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Добавить карточку
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setCardData({ title: '', type: 'idea', content: '' })
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full text-center py-3 text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors"
    >
      + Добавить карточку
    </button>
  )
}