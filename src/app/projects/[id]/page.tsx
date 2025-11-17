// src/app/projects/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EditProjectName } from "@/components/features/edit-project-name";
import { AddSection } from "@/components/features/add-section";
import { AddCard } from "@/components/features/add-card";
import { getProject } from "@/services/api";

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0); // Для принудительного обновления

  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const fetchProject = async () => {
    try {
      const projectData = await getProject(params.id as string)
      if (projectData) {
        setProject(projectData)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, refresh]);

  const handleProjectUpdate = (newName: string) => {
    if (project) {
      setProject({ ...project, name: newName });
    }
  };

  const handleSectionAdded = () => {
    setRefresh(prev => prev + 1); // Принудительно обновляем данные
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Проект не найден</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <EditProjectName
        projectId={params.id as string}
        currentName={project.name}
        onUpdate={handleProjectUpdate}
      />

      <AddSection projectId={params.id as string} onSectionAdded={handleSectionAdded} />

      <div className="space-y-6">
        {project.sections.map(section => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {section.name}
                <span className="text-sm text-gray-500 ml-2">({section.cards.length})</span>
              </h2>
              <span className="text-gray-400">{expandedSections.has(section.id) ? "▼" : "►"}</span>
            </div>

            {expandedSections.has(section.id) && (
              <>
                <div className="space-y-3 mb-4">
                  {section.cards.map(card => (
                    <div
                      key={card.id}
                      className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            card.type === "solution"
                              ? "bg-green-100 text-green-800"
                              : card.type === "idea"
                              ? "bg-blue-100 text-blue-800"
                              : card.type === "question"
                              ? "bg-yellow-100 text-yellow-800"
                              : card.type === "link"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {card.type === "solution"
                            ? "✅ Решение"
                            : card.type === "idea"
                            ? "💡 Идея"
                            : card.type === "question"
                            ? "❓ Вопрос"
                            : card.type === "link"
                            ? "🔗 Ссылка"
                            : "📎 Файл"}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 text-lg mb-1">{card.title}</h3>
                      {card.content && <p className="text-gray-600 text-sm">{card.content}</p>}
                    </div>
                  ))}

                  {section.cards.length === 0 && (
                    <p className="text-gray-500 text-sm italic text-center py-4">
                      Пока нет карточек. Добавьте первую!
                    </p>
                  )}
                </div>

                <AddCard
                  projectId={params.id as string}
                  sectionId={section.id}
                  onCardAdded={() => setRefresh(prev => prev + 1)}
                />
              </>
            )}
          </div>
        ))}

        {project.sections.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Пока нет разделов</p>
          </div>
        )}
      </div>
    </div>
  );
}
