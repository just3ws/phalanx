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
        <option value="legacy_reference">Legacy Reference</option>
        <option value="intro_rules">Intro Rules</option>
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
  <p><strong>Legacy Reference</strong> means "use the legacy reference battle math that older Phalanx prototypes used."</p>
  <ul class="quick-list">
    <li>Best when you want compatibility with legacy examples and historical balance behavior.</li>
    <li>The in-site test page includes legacy scenarios as pass/fail criteria.</li>
  </ul>
  <p><strong>Intro Rules</strong> means "use the simplified site-intro interpretation of current public rules text."</p>
  <ul class="quick-list">
    <li>Best when you want outcomes that align with how this site explains the game to new players.</li>
    <li>Keeps the same suit concepts, but tuned for clearer educational behavior.</li>
  </ul>
  <p class="small-note"><strong>If you're unsure:</strong> use <strong>Intro Rules</strong> for teaching and <strong>Legacy Reference</strong> for historical rule checks.</p>
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
  </ul>
  <p><strong>Heart vs Diamond trigger:</strong> Diamond triggers when a card is behind it. Heart triggers when no card is behind it.</p>
  <p><strong>Example:</strong> 7C into 6D creates doubled carryover (2), then Diamond shield (+6) absorbs it, so back card takes 0.</p>
  <p class="small-note">This simulator uses the site's published suit behavior and legacy reference battle math for concrete timing/order.</p>
</section>
