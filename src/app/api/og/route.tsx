// src/app/api/og/route.tsx - если хочешь динамическую OG image
import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: 'black',
          background: 'linear-gradient(to right, #e0e7ff, white, #e0e7ff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 50,
        }}
      >
        <div style={{ fontSize: 80 }}>🗂</div>
        <div style={{ marginTop: 20 }}>Структурник</div>
        <div style={{ fontSize: 30, marginTop: 20, textAlign: 'center' }}>
          Конструктор для структурирования проектов
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}