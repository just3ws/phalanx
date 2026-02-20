---
title: Rules of Engagement
description: The core rules for Phalanx, the tactical 1v1 card duel.
---

# The Rules of Engagement

<p class="small-note">This document provides a scannable overview of Phalanx’s mechanical framework.</p>

<section class="hero">
  <h2>Your Objective</h2>
  <p>Your goal in Phalanx is to overwhelm your opponent. You'll deploy cards into a tactical formation and attack in columns, aiming to break through their lines and reduce their Life Points (LP) to zero. Victory can also be claimed if your opponent cannot draw or reinforce, running out of cards completely.</p>
</section>

<section class="two-col">
  <article class="card">
    <h2>Card Values & Tactics</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Rank</th><th>Combat Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Ace</td><td>1 (Unkillable*)</td></tr>
          <tr><td>2 through 10</td><td>Face value</td></tr>
          <tr><td>Jack, Queen, King</td><td>11 (Combatant)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="small-note">*Aces cannot be destroyed by normal damage, but another Ace will destroy them instantly.</p>
  </article>

  <article class="card">
    <h2>Conditions for Victory</h2>
    <ul class="quick-list">
      <li><strong>LP Depletion:</strong> Reduce your opponent’s Life Points to zero.</li>
      <li><strong>Formation Collapse:</strong> Your opponent has no cards left on the battlefield and cannot reinforce.</li>
      <li><strong>Attrition:</strong> Your opponent cannot draw from their deck and cannot reinforce their formation.</li>
    </ul>
  </article>
</section>

<section class="card">
  <h2>Anatomy of a Combat Turn</h2>
  <ol class="quick-list">
    <li><strong>Attack:</strong> Choose a Front-row card from your formation. Select an opposing column.</li>
    <li><strong>Target Selection:</strong> Attacks always target the Front-row card in the selected column first.</li>
    <li><strong>Damage Resolution:</strong> Damage cascades down the column: Front-card, then Back-card, then Player LP.</li>
    <li><strong>Suit Trigger:</strong> Automated suit powers (Shields and Weapons) activate during resolution.</li>
    <li><strong>Reinforce Phase:</strong> Any open position in your formation may be reinforced from your hand.</li>
    <li><strong>Pass Control:</strong> Control is handed back to the opponent.</li>
  </ol>
</section>

<section class="card">
  <h2>Formation Architecture</h2>
  <p>Your **Front Row** is your first line of offense and primary shield. The **Back Row** provides tactical depth, absorbs overflow damage from major attacks, and steps into the Front Row if it falls. Mastering this column-based rotation is the key to high-level Phalanx play.</p>
</section>

<div class="cta-row">
  <a class="button-link primary" href="https://phalanx-game.fly.dev" target="_blank" rel="noopener noreferrer">Play the Digital Alpha &rarr;</a>
  <a class="button-link" href="{{ '/suits-strategy/' | relative_url }}">Suits & Strategy</a>
</div>

<p class="small-note">Note: Canonical draft rules are actively maintained in the main repository <a href="https://github.com/just3ws/phalanx/blob/main/docs/RULES.md" target="_blank" rel="noopener noreferrer">RULES.md</a>.</p>
