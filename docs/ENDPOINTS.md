# Endpoints

Base URL: `https://global-football-api1.p.rapidapi.com`
Headers on every request: `X-RapidAPI-Key: YOUR_KEY`, `X-RapidAPI-Host: global-football-api1.p.rapidapi.com`
Get a free key: <https://rapidapi.com/xeirto/api/global-football-api1>

All endpoints return `application/json`. Unknown slugs/ids return `404`, malformed parameters return `400`, against-plan usage returns `429`.

`{league}` is a competition slug: `tza.1` NBC Premier League, `tza.2` NBC Championship League, `eng.1` Premier League, `usa.1` MLS, `bra.1` Brasileirão … Full list: `GET /get/soccer/leagues`.

| Endpoint | Parameters | Returns |
|---|---|---|
| `GET /get/soccer/leagues` | `kind` = `club` \| `international` \| `all` (default `club`) | One entry per competition: slug, name, country, season, coverage counts |
| `GET /get/soccer/meta` | — | Total coverage (competitions, matches, clubs, timeline events) and last successful sync time |
| `GET /get/soccer/{league}/scoreboard` | `dates` = `YYYYMMDD` (required, single date) | Matches kicking off that date with scores and status |
| `GET /get/soccer/{league}/fixtures` | optional `season`, `status` = `pre` \| `in` \| `post`, `from`/`to` = `YYYYMMDD`, `limit`, `pageIndex` | Paged season schedule + results; `count` and `pageCount` in the wrapper |
| `GET /get/soccer/{league}/standings` | optional `season` (default current) | Overall table: rank, team, games, W-D-L, GF-GA, GD, points per entry |
| `GET /get/soccer/{league}/clubs` | optional `page` | Club directory: display names, abbreviations, crests, colors |
| `GET /get/soccer/{league}/clubs/{clubId}` | — | One club with venue/address details |
| `GET /get/soccer/{league}/events/{eventId}` | — | Match summary: score, status, venue, competitors, `keyEvents` (goals with minute clocks), `rosters`, `meta.dataAvailability` |
| `GET /get/soccer/{league}/events/{eventId}/plays` | optional `important=true` | Minute-by-minute timeline where stored; check `events/{id}` → `meta.dataAvailability.timeline` first |
| `GET /get/soccer/{league}/injuries` | optional `season` | Availability flags for clubs in season, derived from stored match events |

## Data honesty

Responses come from a normalized database. Missing values are returned as empty arrays or `null` — never invented. Every event/match response carries `meta.dataAvailability` so you know exactly which features are stored for that item (`timeline`, `matchGoals`, `statisticsAndSummary`) before you build a UI around them.

## Rate limits by plan

| Plan | Rate limit | Requests / month |
|---|---|---|
| BASIC (free) | 10/min | 500 |
| Pro | 60/min | 25,000 |
| Ultra | 300/min | 150,000 |
| Mega | 600/min | 1,000,000 |
