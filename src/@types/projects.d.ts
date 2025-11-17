// src/@types/projects.d.ts
type Card = {
    id: number
    title: string
    type: string
    content: string
  }
  
  type Section = {
    id: number
    name: string
    cards: Card[]
  }


  type Project = {
    id: string | number
    name: string
    sections: Section[]
  }