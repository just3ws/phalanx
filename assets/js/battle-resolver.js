(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PhxBattle = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function clampToZero(num) {
    return num < 0 ? 0 : num;
  }

  function resolveLegacy(attacker, front, back) {
    let damage = attacker.value;
    const log = [];

    log.push("Base attack damage: " + attacker.value + ".");

    let overflow = damage;
    let frontHealth = null;
    if (front) {
      frontHealth = front.value - damage;
      log.push("Front takes " + damage + " damage.");
      overflow = clampToZero(damage - front.value);

      if (front.suit === "H" && !back) {
        overflow -= front.value;
        overflow = clampToZero(overflow);
        log.push("Heart front bonus triggers (no back defender): -" + front.value + " overflow.");
      }
    } else {
      log.push("No front defender: damage overflows directly.");
      overflow = damage;
    }

    if (attacker.suit === "C" && overflow > 0 && back) {
      overflow += overflow;
      log.push("Club attacker bonus triggers: overflow to back doubled.");
    }

    if (front && front.suit === "D" && overflow > 0) {
      const before = overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Diamond front bonus triggers: shield absorbs " + (before - overflow) + " overflow.");
    }

    let backHealth = null;
    damage = overflow;
    if (back) {
      backHealth = back.value - damage;
      log.push("Back takes " + damage + " damage.");

      damage -= back.value;
      damage = clampToZero(damage);

      if (back.suit === "H") {
        damage -= back.value;
        damage = clampToZero(damage);
        log.push("Heart back bonus triggers: -" + back.value + " overflow.");
      }
    } else {
      log.push("No back defender: remaining damage targets LP.");
    }

    if (attacker.suit === "S" && damage > 0) {
      damage += damage;
      log.push("Spade attacker bonus triggers: LP damage doubled.");
    }

    return {
      mode: "legacy_reference",
      lpDamage: damage,
      frontHealth: frontHealth,
      backHealth: backHealth,
      log: log,
    };
  }

  function resolveIntro(attacker, front, back) {
    let overflow = attacker.value;
    const log = [];

    log.push("Base attack damage: " + attacker.value + ".");

    let frontHealth = null;
    if (front) {
      frontHealth = front.value - overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Front takes incoming damage first.");
    } else {
      log.push("No front defender: damage overflows directly.");
    }

    if (attacker.suit === "C" && overflow > 0 && back) {
      overflow += overflow;
      log.push("Club attacker bonus triggers: overflow to back doubled.");
    }

    if (front && front.suit === "D" && overflow > 0) {
      const before = overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Diamond front bonus triggers: shield absorbs " + (before - overflow) + " overflow.");
    }

    let backHealth = null;
    if (back) {
      backHealth = back.value - overflow;
      log.push("Back takes " + overflow + " damage.");
      overflow = clampToZero(overflow - back.value);
    } else {
      log.push("No back defender: remaining damage targets LP.");
    }

    let lpDamage = overflow;
    if (lpDamage > 0) {
      let heartMitigation = 0;
      if (front && front.suit === "H") heartMitigation += front.value;
      if (back && back.suit === "H") heartMitigation += back.value;
      if (heartMitigation > 0) {
        lpDamage = clampToZero(lpDamage - heartMitigation);
        log.push("Heart defender bonus triggers: -" + heartMitigation + " LP overflow.");
      }
    }

    if (attacker.suit === "S" && lpDamage > 0) {
      lpDamage += lpDamage;
      log.push("Spade attacker bonus triggers: LP damage doubled.");
    }

    return {
      mode: "intro_rules",
      lpDamage: lpDamage,
      frontHealth: frontHealth,
      backHealth: backHealth,
      log: log,
    };
  }

  function resolveBattle(input) {
    const attacker = input && input.attacker;
    const front = input && input.front ? input.front : null;
    const back = input && input.back ? input.back : null;
    const mode = (input && input.mode) || "legacy_reference";

    if (!attacker || typeof attacker.value !== "number") {
      throw new Error("resolveBattle requires an attacker card with numeric value");
    }

    const core = mode === "intro_rules"
      ? resolveIntro(attacker, front, back)
      : resolveLegacy(attacker, front, back);

    return Object.assign(core, {
      survivors: {
        attacker: true,
        front: front ? core.frontHealth > 0 : null,
        back: back ? core.backHealth > 0 : null,
      },
    });
  }

  return {
    resolveBattle: resolveBattle,
  };
});
