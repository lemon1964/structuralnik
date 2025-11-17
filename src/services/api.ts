// src/services/api.ts
import { storage } from './storage'

export async function getProjects() {
  return storage.getProjects()
}

export async function getUserProjects() {
  return storage.getUserProjects()
}

export async function getProject(projectId: string) {
  return storage.getProject(projectId)
}

export async function createProject(projectData: Project) {
  return storage.createProject(projectData)
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
  return storage.updateProject(projectId, updates)
}

export async function deleteProject(projectId: string) {
  return storage.deleteProject(projectId)
}
