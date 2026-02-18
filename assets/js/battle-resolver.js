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

  function addStep(steps, stage, before, after, note) {
    steps.push({
      stage: stage,
      before: before,
      after: after,
      note: note || "",
    });
  }

  function resolveLegacy(attacker, front, back) {
    let damage = attacker.value;
    const log = [];
    const progression = [];

    log.push("Base attack damage: " + attacker.value + ".");
    addStep(progression, "Attacker Base Damage", attacker.value, attacker.value, attacker.suit + " attacker");

    let overflow = damage;
    let frontHealth = null;
    if (front) {
      const before = damage;
      frontHealth = front.value - damage;
      log.push("Front takes " + damage + " damage.");
      overflow = clampToZero(damage - front.value);
      addStep(progression, "After Front Defender", before, overflow, front.suit + " " + front.value + " in front");

      if (front.suit === "H" && !back) {
        const heartBefore = overflow;
        overflow -= front.value;
        overflow = clampToZero(overflow);
        log.push("Heart front bonus triggers (no back defender): -" + front.value + " overflow.");
        addStep(progression, "Front Heart Bonus", heartBefore, overflow, "Heart reduces overflow");
      }
    } else {
      log.push("No front defender: damage overflows directly.");
      overflow = damage;
      addStep(progression, "No Front Defender", damage, overflow, "Unblocked overflow");
    }

    if (attacker.suit === "C" && overflow > 0 && back) {
      const before = overflow;
      overflow += overflow;
      log.push("Club attacker bonus triggers: overflow to back doubled.");
      addStep(progression, "Club Overflow Bonus", before, overflow, "Overflow doubled before back");
    }

    if (front && front.suit === "D" && overflow > 0) {
      const before = overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Diamond front bonus triggers: shield absorbs " + (before - overflow) + " overflow.");
      addStep(progression, "Diamond Shield", before, overflow, "Diamond absorbs overflow");
    }

    let backHealth = null;
    damage = overflow;
    if (back) {
      const before = damage;
      backHealth = back.value - damage;
      log.push("Back takes " + damage + " damage.");

      damage -= back.value;
      damage = clampToZero(damage);
      addStep(progression, "After Back Defender", before, damage, back.suit + " " + back.value + " in back");

      if (back.suit === "H") {
        const heartBefore = damage;
        damage -= back.value;
        damage = clampToZero(damage);
        log.push("Heart back bonus triggers: -" + back.value + " overflow.");
        addStep(progression, "Back Heart Bonus", heartBefore, damage, "Heart reduces overflow");
      }
    } else {
      log.push("No back defender: remaining damage targets LP.");
      addStep(progression, "No Back Defender", damage, damage, "Remaining overflow goes to LP");
    }

    if (attacker.suit === "S" && damage > 0) {
      const before = damage;
      damage += damage;
      log.push("Spade attacker bonus triggers: LP damage doubled.");
      addStep(progression, "Spade LP Bonus", before, damage, "Final LP damage doubled");
    }

    addStep(progression, "Damage To Player LP", damage, damage, "Final LP damage");

    return {
      mode: "legacy_reference",
      lpDamage: damage,
      frontHealth: frontHealth,
      backHealth: backHealth,
      log: log,
      progression: progression,
    };
  }

  function resolveIntro(attacker, front, back) {
    let overflow = attacker.value;
    const log = [];
    const progression = [];

    log.push("Base attack damage: " + attacker.value + ".");
    addStep(progression, "Attacker Base Damage", overflow, overflow, attacker.suit + " attacker");

    let frontHealth = null;
    if (front) {
      const before = overflow;
      frontHealth = front.value - overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Front takes incoming damage first.");
      addStep(progression, "After Front Defender", before, overflow, front.suit + " " + front.value + " in front");
    } else {
      log.push("No front defender: damage overflows directly.");
      addStep(progression, "No Front Defender", overflow, overflow, "Unblocked overflow");
    }

    if (attacker.suit === "C" && overflow > 0 && back) {
      const before = overflow;
      overflow += overflow;
      log.push("Club attacker bonus triggers: overflow to back doubled.");
      addStep(progression, "Club Overflow Bonus", before, overflow, "Overflow doubled before back");
    }

    if (front && front.suit === "D" && overflow > 0) {
      const before = overflow;
      overflow = clampToZero(overflow - front.value);
      log.push("Diamond front bonus triggers: shield absorbs " + (before - overflow) + " overflow.");
      addStep(progression, "Diamond Shield", before, overflow, "Diamond absorbs overflow");
    }

    let backHealth = null;
    if (back) {
      const before = overflow;
      backHealth = back.value - overflow;
      log.push("Back takes " + overflow + " damage.");
      overflow = clampToZero(overflow - back.value);
      addStep(progression, "After Back Defender", before, overflow, back.suit + " " + back.value + " in back");
    } else {
      log.push("No back defender: remaining damage targets LP.");
      addStep(progression, "No Back Defender", overflow, overflow, "Remaining overflow goes to LP");
    }

    let lpDamage = overflow;
    if (front && front.suit === "H" && !back && lpDamage > 0) {
      const before = lpDamage;
      lpDamage = clampToZero(lpDamage - front.value);
      log.push("Heart front bonus triggers (no back defender): -" + front.value + " overflow.");
      addStep(progression, "Front Heart Bonus", before, lpDamage, "Heart reduces overflow");
    }

    if (back && back.suit === "H" && lpDamage > 0) {
      const before = lpDamage;
      lpDamage = clampToZero(lpDamage - back.value);
      log.push("Heart back bonus triggers: -" + back.value + " overflow.");
      addStep(progression, "Back Heart Bonus", before, lpDamage, "Heart reduces overflow");
    }

    if (attacker.suit === "S" && lpDamage > 0) {
      const before = lpDamage;
      lpDamage += lpDamage;
      log.push("Spade attacker bonus triggers: LP damage doubled.");
      addStep(progression, "Spade LP Bonus", before, lpDamage, "Final LP damage doubled");
    }

    addStep(progression, "Damage To Player LP", lpDamage, lpDamage, "Final LP damage");

    return {
      mode: "intro_rules",
      lpDamage: lpDamage,
      frontHealth: frontHealth,
      backHealth: backHealth,
      log: log,
      progression: progression,
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
