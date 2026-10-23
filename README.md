# Tanzania Premier League API — Ligi Kuu Bara football data

The most complete [Tanzania football API](https://rapidapi.com/xeirto/api/global-football-api1) — **Ligi Kuu Bara** (the Tanzania Mainland Premier League) as clean, fast REST JSON.

Live scores, fixtures, results, league tables, club directory, and goal timelines for `tza.1` (NBC Premier League / Ligi Kuu Bara) and `tza.2` (NBC Championship League), plus 58 other competitions worldwide — Premier League, LaLiga, Serie A, MLS, Brasileirão, Saudi Pro League and more, all through one API.

> **Key features**
> - Live scoreboard — matches kicking off today with scores and status
> - Full season fixtures & results with venues
> - League standings (Simba SC, Young Africans, Azam FC…) computed from real results
> - Match detail: rosters with shirt numbers, goals with minutes, saves, assists
> - Club crests, colors and stadiums
> - 60 competitions, 13,900+ matches, one consistent JSON shape

---

## 🔑 Get your key (free)

This API is served through [RapidAPI](https://rapidapi.com/xeirto/api/global-football-api1). All requests are proxied there and every developer gets their own key on the marketplace.

1. Open **[Global-Football-API on RapidAPI](https://rapidapi.com/xeirto/api/global-football-api1)**
2. Subscribe to the **BASIC plan — free**, 500 requests/month (Pro, Ultra and Mega plans available for serious traffic)
3. Copy your `X-RapidAPI-Key`
4. Make your first call — two headers and you're in

```bash
curl 'https://global-football-api1.p.rapidapi.com/get/soccer/leagues' \
  -H 'X-RapidAPI-Key: YOUR_KEY' \
  -H 'X-RapidAPI-Host: global-football-api1.p.rapidapi.com'
```

**Base URL (all endpoints):** `https://global-football-api1.p.rapidapi.com`

| Header | Value |
|---|---|
| `X-RapidAPI-Key` | `YOUR_KEY` — get it free on [RapidAPI](https://rapidapi.com/xeirto/api/global-football-api1) |
| `X-RapidAPI-Host` | `global-football-api1.p.rapidapi.com` |

Never commit your key to a repository. Load it from an environment variable (`RAPIDAPI_KEY`) in your app.

---

## 🇹🇿 Tanzania coverage at a glance

| Slug | Competition | Season | Matches | Clubs |
|---|---|---|---|---|
| `tza.1` | NBC Premier League (Ligi Kuu Bara) | 2026/27 | 215 | 16 |
| `tza.2` | NBC Championship League | 2026/27 | 239 | 16 |

Current form in `tza.1` (real standings via the API):

| # | Club | Pts |
|---|---|---|
| 1 | Simba SC | 24 |
| 2 | Young Africans | 18 |
| 3 | Azam FC | 17 |
| 4 | Dodoma Jiji | 14 |

---

## 📚 Endpoints

Full parameter and status details: [docs/ENDPOINTS.md](docs/ENDPOINTS.md)

| Endpoint | What you get |
|---|---|
| `GET /get/soccer/leagues` | Discover every competition and its slug — call this first |
| `GET /get/soccer/meta` | Coverage counts and freshness for the whole API |
| `GET /get/soccer/{league}/scoreboard?dates=20261024` | One day's scores, perfect for livescore pages |
| `GET /get/soccer/{league}/fixtures` | Whole season schedule and results, with paging |
| `GET /get/soccer/{league}/standings?season=2026` | League table — positions, points, W-D-L, goals |
| `GET /get/soccer/{league}/clubs` | Club directory with crests and colors |
| `GET /get/soccer/{league}/clubs/{clubId}` | One club with stadium details |
| `GET /get/soccer/{league}/events/{eventId}` | Match detail: score, statuses, rosters, goal events |
| `GET /get/soccer/{league}/events/{eventId}/plays` | Minute-by-minute timeline where available |
| `GET /get/soccer/{league}/injuries` | Availability flags for clubs in season |

`{league}` is a competition **slug** — `tza.1` for the NBC Premier League.
Familiar examples: `eng.1` (Premier League), `usa.1` (MLS), `bra.1` (Brasileirão).

---

## 💻 Quick start

**Node.js / JavaScript:**

```js
const host = 'global-football-api1.p.rapidapi.com';

async function tanzaniaPremierLeagueTable() {
  const res = await fetch(
    `https://${host}/get/soccer/tza.1/standings?season=2026`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // get yours free at rapidapi.com
        'X-RapidAPI-Host': host,
      },
    }
  );
  const data = await res.json();
  for (const entry of data.children[0].standings.entries.slice(0, 5)) {
    console.log(entry.rank, entry.team.displayName);
  }
}

tanzaniaPremierLeagueTable(); // 1 Simba SC · 2 Young Africans · 3 Azam FC …

```

**Python:**

```python
import os, requests

host = "global-football-api1.p.rapidapi.com"

r = requests.get(
    f"https://{host}/get/soccer/tza.1/fixtures?status=scheduled&limit=5",
    headers={
        "X-RapidAPI-Key": os.environ["RAPIDAPI_KEY"],  # free key: rapidapi.com
        "X-RapidAPI-Host": host,
    },
)
for event in r.json()["events"]:
    kickoff = event["date"]  # ISO 8601
    print(event["name"], kickoff)
```

Runnable versions in [`examples/`](examples/).

### Today's livescores for Tanzania

```bash
curl 'https://global-football-api1.p.rapidapi.com/get/soccer/tza.1/scoreboard?dates=20261024' \
  -H 'X-RapidAPI-Key: YOUR_KEY' \
  -H 'X-RapidAPI-Host: global-football-api1.p.rapidapi.com'
```

---

## 📝 Example responses

**Standings** (`GET /get/soccer/tza.1/standings?season=2026`) — trimmed:

```json
{
  "league": { "name": "NBC Premier League", "slug": "tza.1", "country": "Tanzania" },
  "season": { "year": 2026 },
  "children": [{
    "name": "Overall",
    "standings": {
      "entries": [
        { "rank": 1, "team": { "displayName": "Simba SC" },
          "stats": [ { "name": "gamesPlayed", "displayValue": "8" },
                     { "name": "wins", "displayValue": "8" },
                     { "name": "points", "displayValue": "24" } ] },
        { "rank": 2, "team": { "displayName": "Young Africans" },
          "stats": [ { "name": "points", "displayValue": "18" } ] }
      ]
    }
  }]
}
```

**Fixture** — schedule and results with venue:

```json
{
  "league": { "name": "NBC Premier League", "slug": "tza.1" },
  "season": { "year": 2026 },
  "events": [{
    "id": "17298",
    "date": "2026-08-14T11:00:00.000Z",
    "name": "Pamba Jiji vs Dodoma Jiji",
    "season": { "year": 2026 },
    "competitions": [{
      "status": { "type": { "state": "post", "detail": "1-1", "shortDetail": "FT" } },
      "venue": { "fullName": "CCM Kirumba, Mwanza" },
      "competitors": [
        { "homeAway": "home", "score": "1", "team": { "displayName": "Pamba Jiji" } },
        { "homeAway": "away", "score": "1", "team": { "displayName": "Dodoma Jiji" } }
      ]
    }]
  }]
}
```

**Goal events with minutes** (`GET /get/soccer/tza.1/events/17360`) — trimmed:

```json
{
  "keyEvents": [
    { "scoringPlay": true,
      "text": "Khleffin Hamdoun goal for Dodoma Jiji",
      "clock": { "value": 180, "displayValue": "3'" },
      "period": 1 },
    { "scoringPlay": true,
      "text": "Mwana Kibuta David goal for Dodoma Jiji",
      "clock": { "value": 360, "displayValue": "6'" } },
    { "scoringPlay": true,
      "text": "Khleffin Hamdoun goal for Dodoma Jiji",
      "clock": { "value": 420, "displayValue": "7'" } }
  ]
}
```

Every match tells you up front what is stored: `meta.dataAvailability` flags `timeline`, `matchGoals` and `statisticsAndSummary` as `available: true/false` — nothing is ever fabricated. Standard responses include confidence-friendly beats: missing values come back as empty arrays or `null`, never invented.

---

## 🚀 What you can build

- **Livescore app or site** for Tanzanian top flight games — scoreboard is one call
- **Fan app** for Simba SC, Young Africans, Azam FC — fixtures, tables, club pages, goal events
- **WhatsApp / Telegram / SMS score bots** — Tanzania's data on cheap plans
- **Sports dashboards and betting-adjacent trackers** — standings and full-season results
- **Content automation** — auto-post ligi kuu results with goal scorers and minutes

---

## 💡 Pricing

| Plan | Requests | Price | Rate limit |
|---|---|---|---|
| **BASIC** | 500 / month | Free | 10/min |
| Pro | 25,000 | $9.99 | 60/min |
| Ultra | 150,000 | $29.99 | 300/min |
| Mega | 1,000,000 | $99.99 | 600/min |

Subscribe on the [RapidAPI listing](https://rapidapi.com/xeirto/api/global-football-api1) — free tier needs no card.

---

## 🔗 Links

- **RapidAPI listing (get your key):** https://rapidapi.com/xeirto/api/global-football-api1
- **Website:** https://matchgrind.space
- **API base URL:** https://global-football-api1.p.rapidapi.com

## ⚖️ Disclaimer

An independent data service by MatchGrind. Not affiliated with, endorsed or sponsored by NBC, the National Microfinance Bank, the Tanzania Premier League Board or any member club. "NBC Premier League" is used descriptively to identify the competition.

## 📄 License

MIT — see [LICENSE](LICENSE).
