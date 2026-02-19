---
title: Home
description: Phalanx is a tactical head-to-head card duel you can play with standard suited decks.
---

<section class="hero" aria-labelledby="hero-title">
  <h1 id="hero-title">Tactical Card Duels, Anywhere</h1>
  <p>Deploy your formation. Attack by column. Drain your opponent to zero LP. Phalanx turns a standard deck of cards into a head-to-head battle of wits — playable on a kitchen table or in any browser.</p>
  <div class="cta-row">
    <a class="button-link primary" href="https://phalanx-game.fly.dev" target="_blank" rel="noopener noreferrer">Play Online &rarr;</a>
    <a class="button-link" href="{{ '/how-to-play/' | relative_url }}">Learn to Play</a>
    <a class="button-link secondary" href="{{ '/rules/' | relative_url }}">Rules</a>
  </div>
</section>

<section class="card" aria-labelledby="status-at-a-glance">
  <h2 id="status-at-a-glance">Status at a Glance</h2>
  <ul class="quick-list">
    <li><strong>Phase:</strong> pre-alpha active development</li>
    <li><strong>Playable:</strong> yes, real-time two-player browser matches</li>
    <li><strong>Known limitation:</strong> reconnect behavior is still being hardened</li>
  </ul>
  <p><a href="{{ '/status/' | relative_url }}">Read full status and known limitations.</a></p>
</section>

<section class="grid three" aria-label="Core Features of Phalanx">
  <article class="card">
    <h2>Play With Standard Cards</h2>
    <p>Use Ace through King in all four suits. Jokers are optional and currently treated as a future expansion path.</p>
  </article>
  <article class="card">
    <h2>Formation-Based Combat</h2>
    <p>Build two rows of squads, attack by column, and manage how damage overflows from front line to back line to player LP.</p>
  </article>
  <article class="card">
    <h2>Suit Identity Matters</h2>
    <p><strong>Hearts + Diamonds</strong> function as Shields. <strong>Spades + Clubs</strong> function as Weapons.</p>
  </article>
</section>

<section class="card" aria-labelledby="learn-in-2-minutes">
  <h2 id="learn-in-2-minutes">Learn in 2 Minutes</h2>
  <ol class="quick-list">
    <li>Grab one standard suited deck per player (ideal), or any standard suited deck to start.</li>
    <li>Set up each side as a two-row formation.</li>
    <li>Take turns attacking by column with front-row cards.</li>
    <li>Track overflow from front card to back card to player LP.</li>
    <li>Use suit strengths: Shields (Hearts, Diamonds), Weapons (Spades, Clubs).</li>
  </ol>
  <p><a href="{{ '/how-to-play/' | relative_url }}">Open the full quickstart.</a></p>
</section>

<section class="card" aria-labelledby="how-to-help-title">
  <h2 id="how-to-help-title">How to Help</h2>
  <div class="cta-row">
    <a class="button-link" href="{{ '/get-involved/' | relative_url }}">Get Involved</a>
    <a class="button-link secondary" href="{{ '/support/' | relative_url }}">Support Phalanx</a>
  </div>
</section>

<section class="card" aria-labelledby="digital-alpha-title">
  <h2 id="digital-alpha-title">Play Online — Digital Alpha</h2>
  <p>Real-time 1v1 in your browser. Choose between cumulative damage mode (damage carries turn to turn) or per-turn reset (tabletop faithful). No account needed — create a match, share the code, and duel.</p>
  <div class="cta-row">
    <a class="button-link primary" href="https://phalanx-game.fly.dev" target="_blank" rel="noopener noreferrer">Open the Game &rarr;</a>
    <a class="button-link secondary" href="https://github.com/just3ws/phalanx/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a>
  </div>
  <p class="small-note">Early alpha — the server may restart unexpectedly. Your feedback shapes what gets built next.</p>
</section>

<section class="card">
  <h2>From Notebook to Modern Rules</h2>
  <p>Phalanx started as physical notebook-driven design work in 2022 and has evolved into a modern rules-engine and multiplayer implementation.</p>
  <p><a href="{{ '/history/' | relative_url }}">Read the evolution timeline and explore archived artifacts.</a></p>
</section>

<p class="small-note">This website is an introductory guide. Canonical rules, protocol, and implementation docs live in the main Phalanx repository.</p>
