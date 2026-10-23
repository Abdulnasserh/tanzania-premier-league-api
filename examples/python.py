# NBC Premier League (Tanzania) — quickstart for Python 3.9+.
# Get your free key at https://rapidapi.com/xeirto/api/global-football-api1
# then run: RAPIDAPI_KEY=xxxx python examples/python.py

import os

import requests

HOST = "global-football-api1.p.rapidapi.com"
HEADERS = {
    "X-RapidAPI-Key": os.environ["RAPIDAPI_KEY"],
    "X-RapidAPI-Host": HOST,
}


def get(path: str) -> dict:
    url = f"https://{HOST}{path}"
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.json()


def main() -> None:
    # 1. Discover competitions — find the slug for the NBC Premier League
    leagues = get("/get/soccer/leagues")["leagues"]
    tza = [l for l in leagues if l.get("country") == "Tanzania"]
    print("Tanzania competitions:", [f"{l['slug']} — {l['name']}" for l in tza])
    # => ['tza.1 — NBC Premier League', 'tza.2 — NBC Championship League']

    # 2. Upcoming fixtures
    fixtures = get("/get/soccer/tza.1/fixtures?status=pre&limit=5")
    for event in fixtures["events"]:
        print(event["date"], event["name"])

    # 3. Standings — Simba SC, Young Africans, Azam FC on top
    table = get("/get/soccer/tza.1/standings?season=2026")
    for row in table["children"][0]["standings"]["entries"][:5]:
        print(row["rank"], row["team"]["displayName"])


if __name__ == "__main__":
    main()
