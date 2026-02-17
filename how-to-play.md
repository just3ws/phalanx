---
title: How to Play
description: Quickstart setup and game loop for Phalanx.
---

# How to Play Phalanx

<section class="card">
  <h2>What You Need</h2>
  <ul class="quick-list">
    <li>Two players.</li>
    <li>Ideally one standard suited deck per player.</li>
    <li>Any standard suited deck works for learning and casual play.</li>
    <li>Card set: Ace, numbered cards, Jack/Queen/King. Joker is optional and reserved for future expansion ideas.</li>
  </ul>
</section>

<section class="card">
  <h2>High-Level Setup</h2>
  <ol class="quick-list">
    <li>Each player shuffles and draws their starting hand.</li>
    <li>Each player deploys into a two-row formation (front row and back row) across columns.</li>
    <li>Players alternate actions after deployment is complete.</li>
  </ol>
</section>

<section class="card">
  <h2>Turn Structure (Quick Loop)</h2>
  <ol class="quick-list">
    <li>Choose an attacking front-row card.</li>
    <li>Attack the opposing column.</li>
    <li>Resolve overflow: front card, then back card, then player LP.</li>
    <li>Pass turn to opponent.</li>
    <li>Reinforce when a column is broken.</li>
  </ol>
</section>

<section class="formation" aria-labelledby="formation-title">
  <h2 id="formation-title">Formation Snapshot</h2>
  <p class="row-label">Front row (toward opponent)</p>
  <div class="formation-grid" role="img" aria-label="Two-row, four-column formation">
    <div class="slot">F1</div>
    <div class="slot">F2</div>
    <div class="slot">F3</div>
    <div class="slot">F4</div>
  </div>
  <p class="arrow">Damage path by column: Front -> Back -> Player LP</p>
  <p class="row-label">Back row (toward player)</p>
  <div class="formation-grid">
    <div class="slot back">B1</div>
    <div class="slot back">B2</div>
    <div class="slot back">B3</div>
    <div class="slot back">B4</div>
  </div>
</section>

<p><a class="button-link" href="{{ '/quick-reference/' | relative_url }}">Open Printable Quick Reference</a></p>
