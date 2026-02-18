---
title: Battle Calculator
description: Simulate one Phalanx column attack with suit bonuses, overflow, and discard outcomes.
battle_calculator: true
---

# Battle Calculator

<section class="card">
  <h2>Simulate One Column Attack</h2>
  <p>Select an attacker and the defending front/back cards, then run the battle simulation.</p>
  <p class="small-note"><strong>Rules Mode</strong> picks which battle logic profile is used. See "Mode Guide" below for exact differences.</p>
  <div class="calculator-grid">
    <label class="field">
      <span>Rules Mode</span>
      <select id="battle-mode" aria-label="Rules mode">
        <option value="intro_rules">Current Rules</option>
        <option value="legacy_reference">Historical Rules</option>
      </select>
    </label>

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
  <p><a href="{{ '/battle-calculator-tests/' | relative_url }}">Open calculator unit tests</a></p>
</section>

<section class="card">
  <h2>Mode Guide</h2>
  <p><strong>Current Rules</strong> reflects the current intended rules behavior on this site. <strong>Historical Rules</strong> preserves the older prototype ordering for reference/comparison.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Step</th><th>Historical Rules</th><th>Current Rules</th></tr>
      </thead>
      <tbody>
        <tr><td>Diamond shield vs Club bonus order</td><td>Club doubles overflow first, then Diamond absorbs.</td><td>Diamond absorbs overflow first, then Club doubles what remains.</td></tr>
        <tr><td>Heart trigger</td><td>Heart shield triggers when no card is behind that Heart card.</td><td>Heart shield triggers when no card is behind that Heart card.</td></tr>
        <tr><td>Spade LP bonus</td><td>Doubles final LP damage.</td><td>Doubles final LP damage.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="small-note"><strong>If you're unsure:</strong> use <strong>Current Rules</strong>. Use <strong>Historical Rules</strong> only when checking older examples.</p>
</section>

<section class="card" aria-live="polite">
  <h2>Battle Result</h2>
  <p class="small-note">Result output includes stage-by-stage damage totals: attacker base, after front, after back, and final player LP damage.</p>
  <div id="battle-result">
    <p class="small-note">Run a simulation to see LP damage, suit effects, and which cards survive.</p>
  </div>
</section>

<section class="card">
  <h2>Suit Rules Used By This Calculator</h2>
  <ul class="quick-list">
    <li><strong>Diamond defender:</strong> If front breaks, Diamond grants a shield equal to its value to absorb overflow before back-row damage.</li>
    <li><strong>Heart defender:</strong> Works like a shield when there is no card behind it (player directly behind).</li>
    <li><strong>Club attacker:</strong> Applies extra pressure to the back-row defender.</li>
    <li><strong>Spade attacker:</strong> Doubles final LP damage once overflow reaches the player.</li>
    <li><strong>Ace defender exception:</strong> A front-row Ace is not discarded by non-Ace direct attacks; it is discarded only by a direct Ace-vs-Ace front-row attack.</li>
  </ul>
  <p><strong>Heart vs Diamond trigger:</strong> Diamond triggers when a card is behind it. Heart triggers when no card is behind it.</p>
  <p><strong>Example (Historical):</strong> 10C into 1D with back 5S: overflow 9 -> Club 18 -> Diamond shields 1 -> 17 hits back.</p>
  <p><strong>Example (Current):</strong> 10C into 1D with back 5S: overflow 9 -> Diamond shields 1 -> Club 16 -> 16 hits back.</p>
  <p class="small-note">This simulator uses the site's published suit behavior and legacy reference battle math for concrete timing/order.</p>
</section>
