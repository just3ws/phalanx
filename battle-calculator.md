---
title: Battle Calculator
description: Simulate one Phalanx column attack with suit bonuses, overflow, and discard outcomes.
battle_calculator: true
---

# Battle Calculator

<section class="card">
  <h2>Simulate One Column Attack</h2>
  <p>Select an attacker and the defending front/back cards, then run the battle simulation.</p>
  <div class="calculator-grid">
    <label class="field">
      <span>Attacker Card</span>
      <select id="attacker-card" aria-label="Attacker card"></select>
    </label>

    <label class="field">
      <span>Defender Front Card</span>
      <select id="front-card" aria-label="Defender front card"></select>
    </label>

    <label class="field">
      <span>Defender Back Card</span>
      <select id="back-card" aria-label="Defender back card"></select>
    </label>
  </div>
  <p>
    <button id="simulate-battle" type="button" class="button-link">Simulate Battle</button>
  </p>
</section>

<section class="card" aria-live="polite">
  <h2>Battle Result</h2>
  <div id="battle-result">
    <p class="small-note">Run a simulation to see LP damage, suit effects, and which cards survive.</p>
  </div>
</section>

<section class="card">
  <h2>Suit Rules Used By This Calculator</h2>
  <ul class="quick-list">
    <li><strong>Diamond defender:</strong> Front defense is amplified when back row is occupied.</li>
    <li><strong>Heart defender:</strong> Reduces overflow pressure into LP paths.</li>
    <li><strong>Club attacker:</strong> Applies extra pressure to the back-row defender.</li>
    <li><strong>Spade attacker:</strong> Doubles final LP damage once overflow reaches the player.</li>
  </ul>
  <p class="small-note">This simulator uses the site's published suit behavior and legacy reference battle math for concrete timing/order.</p>
</section>
