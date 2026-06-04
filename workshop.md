# Workshop

## Agenda

- Introduksjon
- Oppsett for agentisk utvikling
- Arbeidsflyt
- Oppsett av prosjekt for oppgaven
- Oppgave

## Introduksjon

- Oppsett man kan ta med seg videre i andre prosjekter
- Forstå hvordan man kan lage egne arbeidsflyter
- Bli inspirert til å teste på egen hånd

---

## Oppsett for agentisk utvikling

- **Install opencode** - <https://opencode.ai/>
- **Install PNPM** - <https://pnpm.io/installation>
- **Install a modern terminal emulator** - <https://www.warp.dev/>

## Arbeidsflyt

- Worktree
- Plan
- Implement
- PR

## Oppsett av prosjekt for oppgaven

1. **GitHub:** Clone/fork repo <https://github.com/torleifhalseth/workshop>

2. **Sanity:** Opprett bruker og prosjekt med nytt dataset <https://www.sanity.io/login/sign-up>

3. **Sanity:** Installer CLI

   ```bash
   pnpm install --global sanity@latest
   ```

4. **Sanity:** Lag prosjekt og dataset

   ```bash
   sanity projects create "Your Project Name"
   ```

5. **Config:** Endre project id `NEXT_PUBLIC_SANITY_PROJECT_ID` i `frontend/.env.local` og `SANITY_STUDIO_PROJECT_ID` i `studio/.env`

6. **Config:** Lag nytt `SANITY_API_READ_TOKEN` med read-rettigheter som oppdateres i `frontend/.env.local`

7. **Data:** Importer eksempeldata

   ```bash
   pnpm run import-sample-data
   ```

---

## Oppgave

### Norsk

- Bygg en applikasjon som presenterer spillere og lag som deltar i Fotball-VM 2026.
- Opprett sidetyper for spillere, landslag og klubber.
- Presenter landslag og klubber sammen med tilhørende spillere.
- Vis detaljert informasjon om hver enkelt spiller.
- Gjør det mulig å navigere til spillerprofiler fra både klubb- og landslagssider.
- Implementer en URL-struktur med unike slugs for spillere, landslag og klubber, slik at vi får ruter som:
  - `/spiller/<navn>`
  - `/klubb/<navn>`
  - `/landslag/<navn>`
- Fokuser på det norske landslaget og hent spiller-, klubb- og landslagsinformasjon fra TV 2: [TV 2 - Norges VM-tropp](https://www.tv2.no/spesialer/sport/norgesvmtropp).

### Engelsk

- Build an application that showcases players and teams participating in the 2026 FIFA World Cup.
- Create page types for players, national teams, and clubs.
- Display national teams and clubs along with their associated players.
- Present detailed information about individual players.
- Enable navigation to player pages from both club pages and national team pages.
- Implement a URL structure with unique slugs for players, national teams, and clubs, resulting in routes such as:
  - `/player/<name>`
  - `/club/<name>`
  - `/national-team/<name>`
- Focus on the Norwegian national team and source player, club, and national team information from TV 2: [TV 2 - Norway World Cup Squad](https://www.tv2.no/spesialer/sport/norgesvmtropp).

### Tips

- Vi bruker Sanity MCP til å opprette spillere, klubber og landslag basert på data fra <https://www.tv2.no/spesialer/sport/norgesvmtropp>. Vi bruker Chrome DevTools eller Playwright til å hente ut data fra siden og strukturere.
- Hvis det blir generert script for å populere data, kan det være nyttig med API-key mot Sanity. Velg **developer**-rolle på nøkkelen du lager.

### Bonus

- Lag et søk hvor man kan finne klubber, spillere og landslag.
