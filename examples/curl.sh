#!/usr/bin/env bash
# NBC Premier League (Tanzania) quickstart — Get your free key at
# https://rapidapi.com/xeirto/api/global-football-api1
set -euo pipefail

HOST="global-football-api1.p.rapidapi.com"
KEY="${RAPIDAPI_KEY:?Set RAPIDAPI_KEY to your X-RapidAPI-Key (free on RapidAPI)}"

# 1. Discover competitions (find tza.1 — NBC Premier League)
curl -s "https://${HOST}/get/soccer/leagues" \
  -H "X-RapidAPI-Key: ${KEY}" \
  -H "X-RapidAPI-Host: ${HOST}"

# 2. Today's livescores for Tanzania
curl -s "https://${HOST}/get/soccer/tza.1/scoreboard?dates=$(date -u +%Y%m%d)" \
  -H "X-RapidAPI-Key: ${KEY}" \
  -H "X-RapidAPI-Host: ${HOST}"

# 3. League table
curl -s "https://${HOST}/get/soccer/tza.1/standings?season=2026" \
  -H "X-RapidAPI-Key: ${KEY}" \
  -H "X-RapidAPI-Host: ${HOST}"
