---
title: Rules
description: Intro-level rules for Phalanx based on the canonical draft.
---

# Intro Rules

<p class="small-note">This page is intentionally scannable. Canonical draft language is maintained in <code>docs/RULES.md</code> in the primary repository.</p>

<section class="card">
  <h2>Core Objective</h2>
  <p>Phalanx is a head-to-head combat card game using standard 52-card suited decks. Players deploy cards into formation and take turns attacking. Games end when a victory condition is met, such as LP depletion or full card depletion.</p>
</section>

<section class="two-col">
  <article class="card">
    <h2>Cards and Values</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Rank</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Ace</td><td>1</td></tr>
          <tr><td>2-10</td><td>Face value</td></tr>
          <tr><td>Jack, Queen, King</td><td>11</td></tr>
        </tbody>
      </table>
    </div>
    <p>Jokers are excluded from v1; optional Joker expansion ideas are planned.</p>
  </article>

  <article class="card">
    <h2>Life Points and Win Direction</h2>
    <p>Players start with LP and lose LP when overflow passes through a column. Defensive positioning and suit effects shape the pace of LP pressure.</p>
    <p>You also pressure total resources, since long games can end via full card depletion.</p>
  </article>
</section>

<section class="card">
  <h2>Turn Flow</h2>
  <ol class="quick-list">
    <li>Attack with a front-row card.</li>
    <li>Resolve target column in order: front -> back -> player LP.</li>
    <li>Apply suit effects where relevant.</li>
    <li>If cards are destroyed, handle reinforcement.</li>
    <li>Next player acts.</li>
  </ol>
</section>

<section class="card">
  <h2>Formation Rule of Thumb</h2>
  <p>Front row is the first shield and first point of impact. Back row supports, survives overflow, and sets up future attacks once advanced forward.</p>
</section>
