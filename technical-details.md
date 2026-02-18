---
title: Technical Details
description: Game loop diagrams, state model, and suit trigger timing for Phalanx.
mermaid: true
---

# Technical Details

<p class="small-note">This page documents the gameplay flow used on this site. Canonical draft rules remain in the primary repository.</p>

<section class="card">
  <h2>Turn Sequence</h2>
  <p>One turn executes in this order: attack declaration, damage path resolution, suit effects, reinforcement, then pass.</p>
  <div class="mermaid diagram">
flowchart LR
  A[Select Front-Row Attacker] --> B[Choose Opposing Column]
  B --> C[Resolve Damage<br/>Front -> Back -> LP]
  C --> D[Apply Suit Effects]
  D --> E{Column Open?}
  E -- Yes --> F[Reinforce]
  E -- No --> G[Pass Turn]
  F --> G
  </div>
</section>

<section class="card">
  <h2>Gameplay Loop</h2>
  <p>The game alternates active player turns until a victory condition is met.</p>
  <div class="mermaid diagram">
flowchart TD
  S[Setup<br/>Shuffle, Draw, Deploy] --> T[Player Turn]
  T --> V{Victory Check}
  V -- No --> O[Opponent Turn]
  O --> V
  V -- Yes --> X[Game Over]
  </div>
</section>

<section class="card">
  <h2>Statechart</h2>
  <p>State-level view of turn progression and terminal conditions.</p>
  <div class="mermaid diagram">
stateDiagram-v2
  [*] --> Setup
  Setup --> TurnStart
  TurnStart --> SelectAttacker
  SelectAttacker --> SelectTarget
  SelectTarget --> ResolveDamage
  ResolveDamage --> ApplySuitEffects
  ApplySuitEffects --> Reinforce: open slot exists
  ApplySuitEffects --> PassTurn: no reinforcement needed
  Reinforce --> PassTurn
  PassTurn --> VictoryCheck
  VictoryCheck --> TurnStart: no winner
  VictoryCheck --> GameOver: LP <= 0 OR no draw/reinforce
  GameOver --> [*]
  </div>
</section>

<section class="card">
  <h2>Suit Ability Timing</h2>
  <p>Suit effects are applied in the turn step after base damage path resolution, and each suit keys off a specific damage location or board context.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Suit</th><th>Role</th><th>Trigger Window</th><th>When It Triggers</th><th>Practical Effect</th></tr>
      </thead>
      <tbody>
        <tr><td>Diamonds</td><td>Shield</td><td>Front-line defense context</td><td>When front-row defensive pressure is being resolved in the attacked column</td><td>Amplifies defensive resistance at the front line</td></tr>
        <tr><td>Hearts</td><td>Shield</td><td>Overflow to LP context</td><td>When overflow pressure would continue from cards into player LP</td><td>Reduces overflow pressure into LP</td></tr>
        <tr><td>Clubs</td><td>Weapon</td><td>Overflow to back-row context</td><td>When damage overflows from front card into back card</td><td>Increases pressure on back-row defense</td></tr>
        <tr><td>Spades</td><td>Weapon</td><td>Direct LP context</td><td>When damage reaches the player LP step</td><td>Increases direct LP threat</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="card">
  <h2>Victory States</h2>
  <ul class="quick-list">
    <li><strong>LP defeat:</strong> A player reaches 0 Life Points.</li>
    <li><strong>Resource defeat:</strong> A player cannot draw or reinforce (out of cards).</li>
  </ul>
</section>
