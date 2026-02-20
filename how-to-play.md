---
title: How to Play
description: Your first deployment in Phalanx, from setup to victory.
---

# Your First Deployment

<section class="hero">
  <h2>Tactical Essentials</h2>
  <ul class="quick-list">
    <li><strong>Participants:</strong> Two-player tactical duel.</li>
    <li><strong>Armament:</strong> One standard deck per player (recommended) or one shared deck.</li>
    <li><strong>Objective:</strong> Deplete the opponent’s 20 LP or destroy their entire formation.</li>
  </ul>
  <p class="small-note">Use Ace through King. Jokers are currently excluded from core tactical rules.</p>
</section>

<section class="card">
  <h2>1. Setting the Battlefield</h2>
  <ol class="quick-list">
    <li><strong>Shuffle & Draw:</strong> Prepare your deck and draw your starting hand.</li>
    <li><strong>Deploy:</strong> Secretly place 8 cards into your 4x2 formation. Your formation consists of a **Front Row** (offensive/defensive line) and a **Back Row** (support/reserve).</li>
    <li><strong>Initiate:</strong> Once both formations are locked, the first turn begins.</li>
  </ol>
</section>

<section class="formation" aria-labelledby="formation-title">
  <h2 id="formation-title">Formation Intelligence</h2>
  <p class="row-label">Front row (Facing Opponent)</p>
  <div class="formation-grid" role="img" aria-label="Diagram of a two-row, four-column Phalanx formation.">
    <div class="slot">F1</div>
    <div class="slot">F2</div>
    <div class="slot">F3</div>
    <div class="slot">F4</div>
  </div>
  <p class="arrow">↓ Damage Path: Front → Back → Player LP ↓</p>
  <p class="row-label">Back row (Reserves)</p>
  <div class="formation-grid">
    <div class="slot back">B1</div>
    <div class="slot back">B2</div>
    <div class="slot back">B3</div>
    <div class="slot back">B4</div>
  </div>
</section>

<section class="card">
  <h2>2. The Rhythm of Combat</h2>
  <ol class="quick-list">
    <li><strong>Select Attacker:</strong> Choose one active card from your Front Row.</li>
    <li><strong>Target Column:</strong> Direct your attack at one of the opponent’s four columns.</li>
    <li><strong>Resolve Damage:</strong> Damage cascades down the column. It hits the Front card first, any **Overflow** hits the Back card, and remaining damage hits the Player’s LP.</li>
    <li><strong>Reinforce:</strong> If a card is destroyed, you may reinforce that column from your hand during your next phase.</li>
    <li><strong>Pass:</strong> Control shifts to your opponent.</li>
  </ol>
</section>

<section class="card">
  <h2>3. Suit Powers (Automated)</h2>
  <p>Suits are more than just colors; they are tactical modifiers that trigger during combat:</p>
  <ul class="quick-list">
    <li><strong>♦ Diamonds:</strong> On death, grants a Shield to the column to absorb further overflow.</li>
    <li><strong>♥ Hearts:</strong> Grants a Shield only if it is the last card standing in its column.</li>
    <li><strong>♣ Clubs:</strong> Overflow damage into the Back Row is doubled (×2).</li>
    <li><strong>♠ Spades:</strong> Overflow damage into the Player LP is doubled (×2).</li>
  </ul>
</section>

<div class="cta-row">
  <a class="button-link primary" href="https://phalanx-game.fly.dev" target="_blank" rel="noopener noreferrer">Enter Digital Alpha &rarr;</a>
  <a class="button-link" href="{{ '/quick-reference/' | relative_url }}">Print Quick Reference</a>
</div>

<p class="small-note">Note: This guide is for rapid onboarding. Detailed edge cases and mechanical definitions are maintained in the <a href="https://github.com/just3ws/phalanx/blob/main/docs/RULES.md" target="_blank" rel="noopener noreferrer">Official Rules (RULES.md)</a>.</p>
