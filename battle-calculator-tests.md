---
title: Battle Calculator Tests
description: In-browser unit test criteria and pass/fail results for the battle calculator.
qunit: true
---

# Battle Calculator Unit Tests

<section class="card">
  <h2>Test Runner</h2>
  <p>This page runs unit tests against the same pure battle resolver used by the calculator.</p>
  <ul class="quick-list">
    <li><strong>Common scenarios:</strong> expected battle flows and known suit interactions.</li>
    <li><strong>Edge cases:</strong> low/high damage bounds, empty slots, and clamp behavior.</li>
    <li><strong>Mode contrast checks:</strong> explicit pass/fail assertions that Historical Rules and Current Rules produce different outputs in targeted cases.</li>
    <li><strong>Permutations:</strong> mode, suit, and defender-slot combinations.</li>
  </ul>
  <p><a href="{{ '/battle-calculator/' | relative_url }}">Back to Battle Calculator</a></p>
</section>

<div id="qunit"></div>
<div id="qunit-fixture"></div>
