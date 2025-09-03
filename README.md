# Entrega N°2 – Arquitectura profesional (Repository/DAO/DTO) + Roles/Autorización + Reset Password + Ticket/Compra

## Iniciar
1) Copiar `.env.example` a `.env` y ajustar si es necesario.
2) `npm i`
3) `npm run seed:admin` (opcional) → admin@test.com / admin123
4) `npm run dev`

## Endpoints resumidos
- Auth/Sesiones: register, login, logout, current (DTO), forgot-password, reset-password
- Productos: público GET, admin-only POST/PUT/DELETE
- Carrito: user-only agregar producto
- Compra: procesa carrito, genera ticket si corresponde

Mirá `/src/` para la arquitectura: DAOs, Repositories, Services, DTOs y Controllers.
