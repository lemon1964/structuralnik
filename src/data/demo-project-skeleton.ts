// src/data/demo-project.ts
export const demoProject = {
    id: "1",
    name: "Разработка Project Skeleton",
    sections: [
      {
        id: 1,
        name: "Концепт",
        cards: [
          {
            id: 1,
            title: "Project Skeleton - скелет проектов", 
            type: "solution" as const,
            status: "accepted" as const,
            content: "Инструмент для сохранения проектной памяти"
          },
          {
            id: 2, 
            title: "Фокус на одну боль",
            type: "solution" as const,
            status: "accepted" as const,
            content: "Решаем проблему потери принятых решений в проектах"
          }
        ]
      },
      {
        id: 2,
        name: "MVP Фичи",
        cards: [
          {
            id: 3,
            title: "Жёсткая иерархия",
            type: "solution" as const, 
            status: "accepted" as const,
            content: "Проект → Раздел → Карточка"
          }
        ]
      }
    ]
  }