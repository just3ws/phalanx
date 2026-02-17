#!/usr/bin/env sh
set -e

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required for Playwright smoke checks." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required for local preview server." >&2
  exit 1
fi

PORT="${PORT:-4173}"
BASE_URL="http://127.0.0.1:${PORT}"
SESSION_BASE="${GITHUB_RUN_ID:-$$}"
SESSION="phalanx-smoke-${SESSION_BASE}"
NPM_CACHE_DIR="${TMPDIR:-/tmp}/npm-cache-${SESSION}"
export npm_config_cache="${NPM_CACHE_DIR}"
PWCLI="npx --yes --package @playwright/cli playwright-cli --session ${SESSION}"

python3 -m http.server "$PORT" --directory _site >/tmp/phalanx-playwright-smoke-server.log 2>&1 &
SERVER_PID="$!"

cleanup() {
  $PWCLI close >/dev/null 2>&1 || true
  if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
  rm -rf "${NPM_CACHE_DIR}"
  rm -rf .playwright-cli
}
trap cleanup EXIT

assert_route() {
  route="$1"
  $PWCLI goto "${BASE_URL}${route}" >/dev/null
  $PWCLI eval '() => {
    const title = document.title && document.title.trim();
    if (!title) throw new Error("missing title");
    const h1 = document.querySelector("h1")?.textContent?.trim();
    if (!h1) throw new Error("missing h1");
    const skip = document.querySelector("a.skip-link");
    if (!skip) throw new Error("missing skip-link");
    return { title, h1 };
  }' >/dev/null
}

published_routes="$(ruby -rrexml/document -e '
  config_baseurl = ""
  if File.exist?("_config.yml")
    begin
      require "yaml"
      config_baseurl = (YAML.load_file("_config.yml")["baseurl"] || "").to_s
      config_baseurl = "" if config_baseurl == "/"
    rescue StandardError
      config_baseurl = ""
    end
  end

  doc = REXML::Document.new(File.read("_site/sitemap.xml"))
  routes = []
  doc.elements.each("urlset/url/loc") do |loc|
    path = loc.text.to_s.sub(%r{\Ahttps?://[^/]+}, "")
    path = path.sub(%r{\A#{Regexp.escape(config_baseurl)}(?=/|$)}, "") unless config_baseurl.empty?
    path = "/" if path.empty?
    path = "#{path}/" unless path.end_with?("/")
    routes << path
  end
  puts routes.uniq.sort
')"

if [ -z "$published_routes" ]; then
  echo "No published routes discovered from _site/sitemap.xml" >&2
  exit 1
fi

echo "$published_routes" | while IFS= read -r route; do
  [ -z "$route" ] && continue
  assert_route "$route"
done
