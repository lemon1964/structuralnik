// src/components/features/demo-project.tsx
import { demoProject } from '@/data/demo-project'

export function DemoProject() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📊 Демо-проект: `{demoProject.name}`
      </h2>
      
      {demoProject.sections.map(section => (
        <div key={section.id} className="mb-6 bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium text-gray-700 mb-3">
            {section.name} ({section.cards.length})
            {/* {section.name} ({section.cards.length} карточек) */}
          </h3>
          
          <div className="space-y-3">
            {section.cards.map(card => (
              <div
                key={card.id}
                className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      card.type === "solution"
                        ? "bg-green-100 text-green-800"
                        : card.type === "idea"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {card.type}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900">{card.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}