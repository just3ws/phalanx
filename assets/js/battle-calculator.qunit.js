(function () {
  function card(suit, value) {
    return { suit: suit, value: value };
  }

  function resolve(mode, attacker, front, back) {
    return window.PhxBattle.resolveBattle({
      mode: mode,
      attacker: attacker,
      front: front || null,
      back: back || null,
    });
  }

  QUnit.module("Battle Resolver - Common Scenarios", function () {
    QUnit.test("legacy: no defenders sends all damage to LP", function (assert) {
      const result = resolve("legacy_reference", card("D", 9), null, null);
      assert.equal(result.lpDamage, 9, "all attack damage reaches LP");
      assert.equal(result.frontHealth, null, "no front slot selected");
      assert.equal(result.backHealth, null, "no back slot selected");
    });

    QUnit.test("legacy: spade doubles LP damage", function (assert) {
      const result = resolve("legacy_reference", card("S", 9), null, null);
      assert.equal(result.lpDamage, 18, "spade doubles final LP damage");
    });

    QUnit.test("legacy: equal attack into front card discards with zero overflow", function (assert) {
      const result = resolve("legacy_reference", card("H", 6), card("D", 6), card("C", 5));
      assert.equal(result.frontHealth, 0, "front is discarded");
      assert.equal(result.backHealth, 5, "back remains untouched");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("legacy: club plus diamond shield example", function (assert) {
      const result = resolve("legacy_reference", card("C", 7), card("D", 6), card("S", 4));
      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield absorbs doubled carryover");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("legacy: back heart mitigates overflow", function (assert) {
      const result = resolve("legacy_reference", card("D", 9), card("C", 2), card("H", 3));
      assert.equal(result.backHealth, -4, "back is defeated");
      assert.equal(result.lpDamage, 1, "heart mitigation reduces LP overflow");
    });

    QUnit.test("intro: no defenders sends all damage to LP", function (assert) {
      const result = resolve("intro_rules", card("D", 9), null, null);
      assert.equal(result.lpDamage, 9, "all attack damage reaches LP");
    });

    QUnit.test("intro: diamond shield applies after front break", function (assert) {
      const result = resolve("intro_rules", card("C", 7), card("D", 6), card("S", 4));
      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield prevents back damage");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("intro: back heart mitigates overflow", function (assert) {
      const result = resolve("intro_rules", card("D", 11), card("H", 3), card("H", 2));
      assert.equal(result.lpDamage, 4, "back heart applies when it is last defender before player");
    });

    QUnit.test("intro: front heart activates only when no back card exists", function (assert) {
      const withBack = resolve("intro_rules", card("D", 8), card("H", 3), card("C", 2));
      const noBack = resolve("intro_rules", card("D", 8), card("H", 3), null);

      assert.equal(withBack.lpDamage, 3, "front heart does not trigger if a back card is behind it");
      assert.equal(noBack.lpDamage, 2, "front heart triggers when player is directly behind");
    });
  });

  QUnit.module("Battle Resolver - Mode Contrast", function () {
    QUnit.test("legacy and intro diverge on Club-vs-Diamond ordering", function (assert) {
      const legacy = resolve("legacy_reference", card("C", 10), card("D", 1), card("S", 5));
      const intro = resolve("intro_rules", card("C", 10), card("D", 1), card("S", 5));

      assert.equal(legacy.backHealth, -12, "legacy: club doubling happens before diamond shield");
      assert.equal(intro.backHealth, -11, "intro: diamond shield happens before club doubling");
      assert.equal(legacy.lpDamage, 12, "legacy final LP damage");
      assert.equal(intro.lpDamage, 11, "intro final LP damage");
      assert.notEqual(legacy.lpDamage, intro.lpDamage, "modes produce different outcomes");
    });

    QUnit.test("progression order differs between modes", function (assert) {
      const legacy = resolve("legacy_reference", card("C", 10), card("D", 1), card("S", 5));
      const intro = resolve("intro_rules", card("C", 10), card("D", 1), card("S", 5));

      const legacyStages = legacy.progression.map(function (s) { return s.stage; }).join(" > ");
      const introStages = intro.progression.map(function (s) { return s.stage; }).join(" > ");

      assert.true(legacyStages.indexOf("Club Overflow Bonus") < legacyStages.indexOf("Diamond Shield"), "legacy applies Club before Diamond");
      assert.true(introStages.indexOf("Diamond Shield") < introStages.indexOf("Club Overflow Bonus"), "intro applies Diamond before Club");
    });
  });

  QUnit.module("Battle Resolver - Edge Cases", function () {
    QUnit.test("low attacker into stronger defenders yields zero LP damage", function (assert) {
      const modes = ["legacy_reference", "intro_rules"];
      modes.forEach(function (mode) {
        const result = resolve(mode, card("D", 1), card("C", 10), card("S", 10));
        assert.equal(result.lpDamage, 0, mode + " has no LP leakage");
      });
    });

    QUnit.test("heart mitigation cannot push LP damage below zero", function (assert) {
      const result = resolve("intro_rules", card("D", 4), card("H", 3), null);
      assert.equal(result.lpDamage, 0, "LP damage clamps to zero");
    });

    QUnit.test("survivor flags for empty defender slots are null", function (assert) {
      const result = resolve("legacy_reference", card("D", 5), null, null);
      assert.equal(result.survivors.front, null, "front survivor flag is null for empty slot");
      assert.equal(result.survivors.back, null, "back survivor flag is null for empty slot");
    });

    QUnit.test("progression includes final LP stage", function (assert) {
      const result = resolve("legacy_reference", card("S", 9), null, null);
      const last = result.progression[result.progression.length - 1];
      assert.equal(last.stage, "Damage To Player LP", "last stage reports LP damage");
      assert.equal(last.after, result.lpDamage, "final progression matches LP damage");
    });

    QUnit.test("front Ace survives non-Ace direct attack (legacy and current)", function (assert) {
      const legacy = resolve("legacy_reference", card("H", 6), card("D", 1), card("C", 4));
      const current = resolve("intro_rules", card("H", 6), card("D", 1), card("C", 4));

      assert.true(legacy.survivors.front, "legacy: front Ace survives");
      assert.true(current.survivors.front, "current: front Ace survives");
      assert.true(legacy.specials.frontAceProtected, "legacy: Ace protection flagged");
      assert.true(current.specials.frontAceProtected, "current: Ace protection flagged");
    });

    QUnit.test("front Ace is discarded by direct Ace attack", function (assert) {
      const legacy = resolve("legacy_reference", card("H", 1), card("D", 1), card("C", 4));
      const current = resolve("intro_rules", card("H", 1), card("D", 1), card("C", 4));

      assert.notOk(legacy.survivors.front, "legacy: front Ace discarded by Ace");
      assert.notOk(current.survivors.front, "current: front Ace discarded by Ace");
      assert.notOk(legacy.specials.frontAceProtected, "legacy: no Ace protection");
      assert.notOk(current.specials.frontAceProtected, "current: no Ace protection");
    });
  });

  QUnit.module("Battle Resolver - Permutations", function () {
    const modes = ["legacy_reference", "intro_rules"];
    const attackers = ["D", "H", "C", "S"];
    const slotPermutations = [
      { front: null, back: null, label: "no defenders" },
      { front: card("C", 5), back: null, label: "front only" },
      { front: null, back: card("S", 5), label: "back only" },
      { front: card("D", 5), back: card("H", 4), label: "front and back" },
    ];

    modes.forEach(function (mode) {
      attackers.forEach(function (suit) {
        QUnit.test(mode + ": attacker " + suit + " with no defenders", function (assert) {
          const result = resolve(mode, card(suit, 8), null, null);
          const expected = suit === "S" ? 16 : 8;
          assert.equal(result.lpDamage, expected, "expected LP damage for " + suit + " with empty column");
        });
      });

      slotPermutations.forEach(function (perm) {
        QUnit.test(mode + ": permutation " + perm.label, function (assert) {
          const result = resolve(mode, card("C", 8), perm.front, perm.back);
          assert.true(result.lpDamage >= 0, "LP damage is non-negative");
          assert.true(Array.isArray(result.progression), "progression is available");
          assert.true(result.progression.length >= 2, "progression has multiple stages");
        });
      });
    });
  });
})();
