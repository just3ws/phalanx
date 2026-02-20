(function () {
  const suits = [
    { code: "D", name: "Diamond" },
    { code: "H", name: "Heart" },
    { code: "C", name: "Club" },
    { code: "S", name: "Spade" },
  ];

  const ranks = [
    { code: "A", value: 1, label: "A" },
    { code: "2", value: 2, label: "2" },
    { code: "3", value: 3, label: "3" },
    { code: "4", value: 4, label: "4" },
    { code: "5", value: 5, label: "5" },
    { code: "6", value: 6, label: "6" },
    { code: "7", value: 7, label: "7" },
    { code: "8", value: 8, label: "8" },
    { code: "9", value: 9, label: "9" },
    { code: "10", value: 10, label: "10" },
    { code: "J", value: 11, label: "J" },
    { code: "Q", value: 11, label: "Q" },
    { code: "K", value: 11, label: "K" },
  ];

  const suitSymbol = { D: "D", H: "H", C: "C", S: "S" };
  const suitName = { D: "Diamond", H: "Heart", C: "Club", S: "Spade" };

  function parseCard(token) {
    if (!token || token === "EMPTY") return null;
    const [suit, rank] = token.split("-");
    const rankDef = ranks.find((entry) => entry.code === rank);
    if (!rankDef || !suitName[suit]) return null;

    return {
      suit: suit,
      rank: rankDef.code,
      value: rankDef.value,
      label: rankDef.label + suitSymbol[suit],
      verbose: suitName[suit] + " " + rankDef.label,
    };
  }

  function cardOutcome(card, health, survives, aceProtected) {
    if (!card) return "Empty slot";
    if (aceProtected) return "Survives (Ace rule)";
    if (survives) return "Survives (" + health + " HP)";
    return "Discarded";
  }

  function createOption(value, text) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    return opt;
  }

  function populateCardSelect(selectEl, includeEmpty) {
    selectEl.innerHTML = "";
    if (includeEmpty) {
      selectEl.appendChild(createOption("EMPTY", "Empty"));
    }

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const value = suit.code + "-" + rank.code;
        const text = rank.label + suitSymbol[suit.code] + " (" + suit.name + ")";
        selectEl.appendChild(createOption(value, text));
      });
    });
  }

  function modeLabel(mode) {
    if (mode === "intro_rules") return "Current Rules";
    return "Historical Rules";
  }

  function renderProgression(result) {
    const steps = Array.isArray(result.progression) ? result.progression : [];
    if (!steps.length) return "<p class=\"small-note\">No progression data available.</p>";

    const rows = steps.map(function (step) {
      return "<tr><td>" + step.stage + "</td><td>" + step.before + "</td><td>" + step.after + "</td><td>" + (step.note || "") + "</td></tr>";
    }).join("");

    return '<div class="table-wrap"><table><thead><tr><th>Stage</th><th>Damage Before</th><th>Damage After</th><th>Note</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }

  function renderResult(root, attacker, front, back, mode, result) {
    const discarded = [];
    if (front && result.survivors.front === false) discarded.push(front.label);
    if (back && result.survivors.back === false) discarded.push(back.label);

    const survivors = [];
    survivors.push(attacker.label + " (attacker)");
    if (front && result.survivors.front) survivors.push(front.label + " (front)");
    if (back && result.survivors.back) survivors.push(back.label + " (back)");

    const logItems = result.log.map(function (entry) {
      return "<li>" + entry + "</li>";
    }).join("");

    root.innerHTML =
      '<p><strong>Mode:</strong> ' + modeLabel(mode) + "</p>" +
      '<p><strong>LP Damage:</strong> ' + result.lpDamage + "</p>" +
      '<div class="result-grid">' +
      '<div class="result-block"><h3>Front Slot</h3><p><strong>Card:</strong> ' + (front ? front.verbose : "Empty") + '</p><p><strong>Outcome:</strong> ' + cardOutcome(front, result.frontHealth, result.survivors.front, result.specials && result.specials.frontAceProtected) + "</p></div>" +
      '<div class="result-block"><h3>Back Slot</h3><p><strong>Card:</strong> ' + (back ? back.verbose : "Empty") + '</p><p><strong>Outcome:</strong> ' + cardOutcome(back, result.backHealth, result.survivors.back, false) + "</p></div>" +
      '<div class="result-block"><h3>Attacker</h3><p><strong>Card:</strong> ' + attacker.verbose + '</p><p><strong>Outcome:</strong> Survives (no retaliation in this model)</p></div>' +
      "</div>" +
      "<p><strong>Survivors:</strong> " + (survivors.length ? survivors.join(", ") : "None") + "</p>" +
      "<p><strong>Discarded:</strong> " + (discarded.length ? discarded.join(", ") : "None") + "</p>" +
      "<h3>Damage Progression</h3>" +
      renderProgression(result) +
      "<h3>Resolution Trace</h3>" +
      '<ol class="quick-list">' + logItems + "</ol>";
  }

  function init() {
    const attackerSelect = document.getElementById("attacker-card");
    const frontSelect = document.getElementById("front-card");
    const backSelect = document.getElementById("back-card");
    const modeSelect = document.getElementById("battle-mode");
    const button = document.getElementById("simulate-battle");
    const resultRoot = document.getElementById("battle-result");

    if (!attackerSelect || !frontSelect || !backSelect || !modeSelect || !button || !resultRoot) return;

    populateCardSelect(attackerSelect, false);
    populateCardSelect(frontSelect, true);
    populateCardSelect(backSelect, true);

    attackerSelect.value = "S-9";
    frontSelect.value = "D-3";
    backSelect.value = "H-2";
    modeSelect.value = "intro_rules";

    button.addEventListener("click", function () {
      const attacker = parseCard(attackerSelect.value);
      const front = parseCard(frontSelect.value);
      const back = parseCard(backSelect.value);
      const mode = modeSelect.value;

      if (!attacker) {
        resultRoot.innerHTML = '<p class="small-note">Select an attacker card to run simulation.</p>';
        return;
      }

      if (!window.PhxBattle || typeof window.PhxBattle.resolveBattle !== "function") {
        resultRoot.innerHTML = '<p class="small-note">Battle engine unavailable on this page.</p>';
        return;
      }

      const result = window.PhxBattle.resolveBattle({
        attacker: attacker,
        front: front,
        back: back,
        mode: mode,
      });
      renderResult(resultRoot, attacker, front, back, mode, result);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
