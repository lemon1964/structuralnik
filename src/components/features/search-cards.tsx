// src/components/features/search-cards.tsx
"use client";

import { useState } from "react";

interface SearchCardsProps {
  sections: Section[];
}

export function SearchCards({ sections }: SearchCardsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Собираем все карточки из всех разделов
  const allCards = sections.flatMap(section =>
    section.cards.map(card => ({
      ...card,
      sectionName: section.name,
    }))
  );

  // Фильтруем карточки
  const filteredCards = allCards.filter(card => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || card.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="mb-8">
      {/* Поле поиска и фильтр по типу */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          {/* <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[300px]"> */}
          <input
            type="text"
            placeholder="Поиск по заголовку и тексту карточек..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          // className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">Все типы</option>
          <option value="solution">Решение</option>
          <option value="idea">Идея</option>
          <option value="question">Вопрос</option>
          <option value="link">Ссылка</option>
          <option value="file">Файл</option>
        </select>
      </div>

      {/* Результаты поиска */}
      {searchQuery || selectedType !== "all" ? (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Найдено карточек: {filteredCards.length}
          </h3>

          <div className="space-y-3">
            {filteredCards.map(card => (
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
                  <span className="text-xs text-gray-500">({card.sectionName})</span>
                </div>
                <h4 className="font-medium text-gray-900">{card.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
