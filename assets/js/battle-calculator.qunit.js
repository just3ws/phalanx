(function () {
  function card(suit, value) {
    return { suit: suit, value: value };
  }

  QUnit.module("Battle Resolver", function () {
    QUnit.test("legacy: spade doubles LP damage after overflow", function (assert) {
      const result = window.PhxBattle.resolveBattle({
        mode: "legacy_reference",
        attacker: card("S", 9),
        front: null,
        back: null,
      });

      assert.equal(result.lpDamage, 18, "LP damage is doubled by spade");
      assert.equal(result.frontHealth, null, "front is empty");
      assert.equal(result.backHealth, null, "back is empty");
    });

    QUnit.test("legacy: 6H attacks 6D discards front with no carryover", function (assert) {
      const result = window.PhxBattle.resolveBattle({
        mode: "legacy_reference",
        attacker: card("H", 6),
        front: card("D", 6),
        back: card("C", 5),
      });

      assert.equal(result.frontHealth, 0, "front is discarded at equal value");
      assert.equal(result.backHealth, 5, "no overflow reaches back");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("legacy: 7C into 6D uses diamond shield to absorb club carryover", function (assert) {
      const result = window.PhxBattle.resolveBattle({
        mode: "legacy_reference",
        attacker: card("C", 7),
        front: card("D", 6),
        back: card("S", 4),
      });

      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield absorbs doubled carryover");
      assert.equal(result.lpDamage, 0, "no LP damage after shield");
    });

    QUnit.test("intro: diamond shield applies after front breaks", function (assert) {
      const result = window.PhxBattle.resolveBattle({
        mode: "intro_rules",
        attacker: card("C", 7),
        front: card("D", 6),
        back: card("S", 4),
      });

      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield prevents carryover damage");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("intro: hearts reduce LP overflow from either row", function (assert) {
      const result = window.PhxBattle.resolveBattle({
        mode: "intro_rules",
        attacker: card("D", 11),
        front: card("H", 3),
        back: card("H", 2),
      });

      assert.equal(result.lpDamage, 1, "LP overflow reduced by both hearts");
    });
  });
})();
