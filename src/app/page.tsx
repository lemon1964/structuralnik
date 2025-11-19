// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DemoProject } from "@features/demo-project";
import { SearchCards } from "@features/search-cards";
import { ProjectsLibrary } from "@features/projects-library";
import { createProject, getUserProjects } from "@/services/api";
import { demoProject } from "@/data/demo-project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const userProjects = await getUserProjects();
      setProjects(userProjects);
    };
    loadProjects();
  }, []);

  const handleCreate = async () => {
    try {
      const newProject = {
        id: Date.now().toString(),
        name: "Мой новый проект", // УБИРАЕМ id отсюда!
        sections: [
          {
            id: Date.now(),
            name: "Описание проекта",
            cards: [],
          },
        ],
      };
      const createdProject = await createProject(newProject);

      // Принудительно обновляем список проектов
      const userProjects = await getUserProjects();
      setProjects(userProjects);

      // Переход на страницу проекта
      window.location.href = `/projects/${createdProject.id}`;
    } catch (error) {
      console.error("Ошибка создания проекта:", error);
      alert("Ошибка при создании проекта");
    }
  };

  // const handleClearProjects = () => {
  //   if (confirm("Очистить все пользовательские проекты?")) {
  //     sessionStorage.removeItem("structural-user-projects");
  //     setProjects([]);
  //     alert("Проекты очищены");
  //   }
  // };

  return (
    <main className="p-8 bg-gradient-to-r from-purple-100 via-white to-indigo-100 min-h-screen">
      {/* <h1 className="text-4xl font-bold text-indigo-700 mb-8">🗂 Структурник</h1> */}

      {/* Компонент поиска */}
      <SearchCards sections={demoProject.sections} />

      {/* Демо-проект */}
      <DemoProject />

      {/* Библиотека проектов */}
      <ProjectsLibrary />

      {/* Кнопка создания проекта */}
      <div className="text-center">
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium"
        >
          + Создать свой проект
        </button>

        {/* Временная кнопка для отладки 
        <div>
          <button
            onClick={handleClearProjects}
            className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
          >
            Очистить проекты
          </button>
        </div>
        */}
      </div>

      {projects.length !== 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ваши проекты ({projects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {project.sections.length} разделов •{" "}
                  {project.sections.reduce((sum, section) => sum + section.cards.length, 0)}{" "}
                  карточек
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      <p className="text-gray-500 text-center mt-1 text-xs">
        ⚠️ В тестовой версии ваши проекты сохраняются только в этой вкладке браузера. Если закроете
        вкладку — данные очистятся.
      </p>
      <p className="text-gray-600 text-center mt-2 text-sm">
        Начните структурировать свои идеи и проекты
      </p>
    </main>
  );
}
