# edpro web (Next.js + TypeScript + Supabase)

Web comercial para edpro implementada en App Router con TypeScript y React.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript estricto
- Supabase (persistencia de leads y reservas)
- Zod (validacion de payloads en API)

## Rutas

- /
- /como-funciona
- /precios
- /casos
- /contacto

## API (server-side)

- POST /api/leads
- POST /api/bookings

Ambas rutas validan entrada con Zod y escriben en Supabase usando Service Role solo en servidor.

## Variables de entorno

Copia .env.example a .env.local y rellena valores reales:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## Base de datos Supabase

Ejecuta el SQL de supabase/schema.sql en el SQL editor de Supabase.

Esto crea:

- public.leads
- public.bookings

Tambien activa RLS y bloquea acceso anonimo directo (las inserciones pasan por API de Next).

## Desarrollo

npm install
npm run dev

## Calidad

npm run lint

## Produccion

1. Configura variables de entorno en tu proveedor (Vercel, Fly, etc.).
2. Ejecuta schema.sql en Supabase antes del primer deploy.
3. Despliega con:

npm run build
npm run start
