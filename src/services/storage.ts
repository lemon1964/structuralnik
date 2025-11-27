// src/services/storage.ts
// import { demoProject } from "@/data/demo-project";
import { flowerShopProject } from "@/data/flower-shop-project";
import { learningEnglish } from "@/data/learning-english";

// ID демо-проектов, которые всегда должны быть доступны
const DEMO_PROJECT_IDS = ["1", "5678", "4723"];

export const storage = {
  // Загружаем все проекты: демо + пользовательские
  getProjects(): Project[] {
    if (typeof window === "undefined") return [];

    // Демо-проекты (всегда доступны)
    const demoProjects = [flowerShopProject, learningEnglish];
    // const demoProjects = [demoProject, flowerShopProject, learningEnglish];

    // Пользовательские проекты из sessionStorage (временные)
    const sessionProjects = this.getSessionProjects();

    // Объединяем, убирая дубликаты
    const allProjects = [...demoProjects, ...sessionProjects];

    // Убираем дубликаты по ID
    const uniqueProjects = allProjects.filter(
      (project, index, self) => index === self.findIndex(p => p.id === project.id)
    );

    return uniqueProjects;
  },

  // Получаем только пользовательские проекты (для списка "Ваши проекты")
  getUserProjects(): Project[] {
    const allProjects = this.getProjects();
    return allProjects.filter(project => !DEMO_PROJECT_IDS.includes(project.id.toString()));
  },

  // Получаем проект по ID
  getProject(projectId: string): Project | null {
    const projects = this.getProjects();
    return projects.find(p => p.id.toString() === projectId) || null;
  },

  // Создаем новый проект (сохраняем в sessionStorage)
  createProject(projectData: Omit<Project, "id">): Project {
    // console.log('Creating project with data:', projectData)

    const newProject = {
      ...projectData,
      id: Date.now().toString(),
    };
    // console.log('New project:', newProject)

    // Добавляем в sessionStorage
    const sessionProjects = this.getSessionProjects();
    // console.log('Current session projects:', sessionProjects)

    const updatedSessionProjects = [...sessionProjects, newProject];
    this.saveSessionProjects(updatedSessionProjects);
    // console.log('Updated session projects:', updatedSessionProjects)
    // console.log('SessionStorage after save:', sessionStorage.getItem('structural-user-projects'))
    return newProject;
  },

  // Обновляем проект
  updateProject(projectId: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(p => p.id.toString() === projectId);

    if (projectIndex === -1) return null;

    const updatedProject = { ...projects[projectIndex], ...updates };

    // Если это пользовательский проект - обновляем в sessionStorage
    if (!DEMO_PROJECT_IDS.includes(projectId)) {
      const sessionProjects = this.getSessionProjects();
      const sessionProjectIndex = sessionProjects.findIndex(p => p.id.toString() === projectId);

      if (sessionProjectIndex !== -1) {
        sessionProjects[sessionProjectIndex] = updatedProject;
        this.saveSessionProjects(sessionProjects);
      }
    }

    return updatedProject;
  },

  // Удаляем проект (только пользовательские)
  deleteProject(projectId: string): boolean {
    if (DEMO_PROJECT_IDS.includes(projectId)) {
      console.warn("Нельзя удалить демо-проект");
      return false;
    }

    const sessionProjects = this.getSessionProjects();
    const filteredProjects = sessionProjects.filter(p => p.id.toString() !== projectId);

    if (filteredProjects.length === sessionProjects.length) return false;

    this.saveSessionProjects(filteredProjects);
    return true;
  },

  // Вспомогательные методы для работы с sessionStorage
  getSessionProjects(): Project[] {
    //   private getSessionProjects(): Project[] {
    if (typeof window === "undefined") return [];
    const stored = sessionStorage.getItem("structural-user-projects");
    // console.log('Getting session projects from:', stored)

    return stored ? JSON.parse(stored) : [];
  },

  saveSessionProjects(projects: Project[]) {
    //   private saveSessionProjects(projects: Project[]) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("structural-user-projects", JSON.stringify(projects));
  },

  // Очистка пользовательских проектов (для тестирования)
  clearUserProjects() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("structural-user-projects");
  },
};
