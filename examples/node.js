// NBC Premier League (Tanzania) — quickstart for Node.js 18+ (fetch is built in).
// Get your free key at https://rapidapi.com/xeirto/api/global-football-api1
// then run: RAPIDAPI_KEY=xxxx node examples/node.js

const HOST = 'global-football-api1.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  'X-RapidAPI-Host': HOST,
};

async function get(path) {
  const res = await fetch(`https://${HOST}${path}`, { headers });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${path}`);
  }
  return res.json();
}

async function main() {
  // 1. Discover competitions — find the slug for the NBC Premier League
  const leagues = await get('/get/soccer/leagues');
  const tza = leagues.leagues.filter((l) => l.country === 'Tanzania');
  console.log('Tanzania competitions:', tza.map((l) => `${l.slug} — ${l.name}`));
  // => [ 'tza.1 — NBC Premier League', 'tza.2 — NBC Championship League' ]

  // 2. Whole-season fixtures
  const fixtures = await get('/get/soccer/tza.1/fixtures?limit=10');
  for (const e of fixtures.events) {
    console.log(e.date, e.name, e.competitions[0].status.type.shortDetail);
  }

  // 3. Standings — Simba SC, Young Africans, Azam FC on top
  const table = await get('/get/soccer/tza.1/standings?season=2026');
  for (const row of table.children[0].standings.entries.slice(0, 5)) {
    console.log(row.rank, row.team.displayName);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
