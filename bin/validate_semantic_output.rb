#!/usr/bin/env ruby
# frozen_string_literal: true

require "nokogiri"
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

  doc = Nokogiri::HTML(File.read(html_path))

  lang = doc.at_css("html")&.[]("lang").to_s.strip
  errors << "#{path}: missing html[lang]" if lang.empty?

  title = doc.at_css("title")&.text.to_s.strip
  errors << "#{path}: missing <title>" if title.empty?

  mains = doc.css("main")
  errors << "#{path}: expected exactly one <main>, got #{mains.length}" unless mains.length == 1

  h1s = doc.css("h1").map { |h| h.text.strip }.reject(&:empty?)
  errors << "#{path}: expected exactly one non-empty <h1>, got #{h1s.length}" unless h1s.length == 1

  skip = doc.at_css("a.skip-link")
  if skip.nil?
    errors << "#{path}: missing .skip-link"
  else
    href = skip["href"].to_s
    errors << "#{path}: skip-link href must be #main" unless href == "#main"
    errors << "#{path}: missing #main target" if doc.at_css("#main").nil?
  end

  unlabeled_nav = doc.css("nav").find do |nav|
    nav["aria-label"].to_s.strip.empty? && nav["aria-labelledby"].to_s.strip.empty?
  end
  errors << "#{path}: found nav without aria-label/aria-labelledby" if unlabeled_nav

  doc.css("img").each do |img|
    errors << "#{path}: image missing alt attribute" unless img.key?("alt")
  end
end

abort(errors.join("\n")) unless errors.empty?
puts "Semantic/a11y validation passed for #{paths.length} route(s)."
