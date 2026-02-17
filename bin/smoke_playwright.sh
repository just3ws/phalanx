#!/usr/bin/env sh
set -e

if ! command -v node >/dev/null 2>&1; then
  echo "node is required for Playwright smoke checks." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required for local preview server." >&2
  exit 1
fi

PORT="${PORT:-4173}"

python3 -m http.server "$PORT" --directory _site >/tmp/phalanx-playwright-smoke-server.log 2>&1 &
SERVER_PID="$!"

cleanup() {
  if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

SMOKE_BASE_URL="http://127.0.0.1:${PORT}" node ./bin/smoke_playwright.cjs
