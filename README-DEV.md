Local dev notes

If you see an error about PowerShell execution policies when running `pnpm`/`npx` on Windows, either:

- Open a Git Bash or WSL terminal and run `pnpm dev` there.
- Or run PowerShell as Administrator and temporarily allow scripts for the current session:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
pnpm dev
```

Recommended:
- Use pnpm: `npm i -g pnpm` then `pnpm install` and `pnpm dev`.
- Or with npm: `npm install` then `npm run dev`.

Project structure notes:
- App router (Next.js app directory) in `src/app`.
- Global providers added in `src/providers.tsx` (React Query, next-themes, sonner).
- Basic components: `src/components/Navbar.tsx`, `Footer.tsx`, `VehicleCard.tsx`.
- Vehicles list at `/vehicles` and detail stub at `/vehicles/[id]`.
