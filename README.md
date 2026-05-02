# klaarvooradvies

Voorbereidingstool en website **Klaar voor advies** (Next.js). Broncode staat in [`website/`](./website).

- Lokaal: `cd website` en `npm install` / `npm run dev`
- **Vercel:** root van de repo is één map boven `website/`. Dit project bevat `vercel.json` zodat build/install in `website/` draaien. Alternatief: in Vercel **Project ? Settings ? General ? Root Directory** op `website` zetten (dan kun je `vercel.json` op root vaak weglaten).
- Productie: koppel aan [Vercel](https://vercel.com) of je host; zet `NEXT_PUBLIC_SITE_URL` en Supabase-keys in de omgeving.
