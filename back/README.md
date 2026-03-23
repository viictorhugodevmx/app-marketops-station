# 🧠 MarketOps Station - Backend

API REST + WebSockets para simulación de plataforma de mercados financieros.

## 🚀 Stack

- Node.js v20.19.4
- TypeScript
- MongoDB v6.0.20
- WebSockets

## 🧱 Arquitectura

src/
├── config/        → configuración (env, db)
├── modules/       → features (auth, market, orders)
├── routes/        → definición de endpoints
├── services/      → lógica de negocio
├── controllers/   → entrada/salida HTTP
├── sockets/       → tiempo real
├── types/         → interfaces y tipos
└── app.ts         → entry point

## 🔌 Funcionalidades

- Auth con JWT
- Market data simulada
- Órdenes simuladas
- WebSockets en tiempo real

## 🧪 Scripts

- dev → modo desarrollo
- build → compilar TS
- start → ejecutar producción

## ⚠️ Nota

Backend ligero, enfocado en soportar frontend Angular de forma eficiente.