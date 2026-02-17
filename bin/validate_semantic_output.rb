#!/usr/bin/env ruby
# frozen_string_literal: true

require "rexml/document"
require "yaml"

ROOT = File.expand_path("..", __dir__)
SITE_DIR = File.join(ROOT, "_site")
SITEMAP = File.join(SITE_DIR, "sitemap.xml")
CONFIG = File.join(ROOT, "_config.yml")

abort("Missing sitemap: #{SITEMAP}") unless File.exist?(SITEMAP)

xml = REXML::Document.new(File.read(SITEMAP))
baseurl = if File.exist?(CONFIG)
            (YAML.load_file(CONFIG)["baseurl"] || "").to_s
          else
            ""
          end
baseurl = "" if baseurl == "/"

paths = []
xml.elements.each("urlset/url/loc") do |loc|
  path = loc.text.to_s.sub(%r{\Ahttps?://[^/]+}, "")
  path = "/" if path.empty?
  path = path.sub(/\A#{Regexp.escape(baseurl)}(?=\/|$)/, "") unless baseurl.empty?
  path = "/" if path.empty?
  paths << path
end
paths = paths.uniq
abort("No routes found in sitemap.xml") if paths.empty?

errors = []

extract_attr = lambda do |tag_text, attr|
  m = tag_text.match(/\b#{Regexp.escape(attr)}\s*=\s*(["'])(.*?)\1/i)
  m ? m[2] : nil
end

paths.each do |path|
  html_path = if path == "/"
                File.join(SITE_DIR, "index.html")
              else
                clean = path.sub(%r{\A/}, "").sub(%r{/$}, "")
                File.join(SITE_DIR, clean, "index.html")
              end

  unless File.exist?(html_path)
    errors << "#{path}: missing rendered file #{html_path}"
    next
  end

  html = File.read(html_path)

  html_tag = html[/<html\b[^>]*>/im]
  if html_tag.nil?
    errors << "#{path}: missing <html> tag"
  else
    lang = extract_attr.call(html_tag, "lang").to_s.strip
    errors << "#{path}: missing html[lang]" if lang.empty?
  end

  title = html[/<title\b[^>]*>(.*?)<\/title>/im, 1].to_s.gsub(/\s+/, " ").strip
  errors << "#{path}: missing <title>" if title.empty?

  main_count = html.scan(/<main\b[^>]*>/i).length
  errors << "#{path}: expected exactly one <main>, got #{main_count}" unless main_count == 1

  h1_values = html.scan(/<h1\b[^>]*>(.*?)<\/h1>/im).flatten.map { |v| v.gsub(/<[^>]+>/, "").strip }.reject(&:empty?)
  errors << "#{path}: expected exactly one non-empty <h1>, got #{h1_values.length}" unless h1_values.length == 1

  skip_tag = html[/<a\b[^>]*class\s*=\s*(["'])[^"']*\bskip-link\b[^"']*\1[^>]*>/im]
  if skip_tag.nil?
    errors << "#{path}: missing .skip-link"
  else
    href = extract_attr.call(skip_tag, "href").to_s
    errors << "#{path}: skip-link href must be #main" unless href == "#main"
    errors << "#{path}: missing #main target" unless html.match?(/<[^>]+id\s*=\s*(["'])main\1/i)
  end

  html.scan(/<nav\b[^>]*>/i).each do |nav_tag|
    label = extract_attr.call(nav_tag, "aria-label").to_s.strip
    labelledby = extract_attr.call(nav_tag, "aria-labelledby").to_s.strip
    if label.empty? && labelledby.empty?
      errors << "#{path}: found nav without aria-label/aria-labelledby"
      break
    end
  end

  html.scan(/<img\b[^>]*>/i).each do |img_tag|
    errors << "#{path}: image missing alt attribute" unless img_tag.match?(/\balt\s*=\s*(["']).*?\1/i)
  end
end

abort(errors.join("\n")) unless errors.empty?
puts "Semantic/a11y validation passed for #{paths.length} route(s)."
