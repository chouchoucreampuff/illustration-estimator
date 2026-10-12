
(() => {
  "use strict";

  const c = window.ESTIMATE_CONFIG;
  const $ = id => document.getElementById(id);
  const yen = n => "¥" + Math.round(n).toLocaleString("ja-JP");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[ch]));

  $("site-title").textContent = c.siteName || "ILLUSTRATION ORDER";
  $("site-subtitle").textContent = c.subtitle || "かんたんお見積もり";

  // 基本メニュー
  $("menu-list").innerHTML = c.menus.map((m, i) => `
    <label class="choice">
      <input type="radio" name="menu" value="${esc(m.id)}" ${i === 0 ? "checked" : ""}>
      <span class="choice-text">
        <span class="choice-name">${esc(m.name)}</span>
        <span class="desc">${esc(m.description || "")}</span>
      </span>
      <span class="price">${yen(m.price)}〜</span>
    </label>
  `).join("");

  // 固定料金オプション
  $("option-list").innerHTML = (c.options || []).map(o => `
    <label class="choice">
      <input type="checkbox" name="option" value="${esc(o.id)}">
      <span class="choice-text">
        <span class="choice-name">${esc(o.name)}</span>
        <span class="desc">${esc(o.description || "")}</span>
      </span>
      <span class="price">＋${yen(o.price)}</span>
    </label>
  `).join("");

  // リピ割と割合加算の選択欄を追加
  const repeat2 = (c.discounts || []).find(d => d.id === "repeat2");
  const repeat3 = (c.discounts || []).find(d => d.id === "repeat3");

  $("option-list").insertAdjacentHTML("afterend", `
    <section class="estimate-extra">
      <h3>リピーター割引</h3>
      <p>今回のご依頼が何回目か選択してください。</p>
      <label for="repeat-level">依頼回数</label>
      <select id="repeat-level">
        <option value="0">初回（割引なし）</option>
        <option value="2">2回目（${Number(repeat2?.value ?? 5)}%割引）</option>
        <option value="3">3回目以降（${Number(repeat3?.value ?? 10)}%割引）</option>
      </select>

      <h3>割合加算オプション</h3>
      <div id="percentage-list"></div>
    </section>
  `);

  $("percentage-list").innerHTML = (c.percentageOptions || []).map(o => {
    const hasRateRange = Number(o.maxRate) > Number(o.rate);
    const rateSelect = hasRateRange ? `
      <label>加算率
        <select class="percentage-rate" data-id="${esc(o.id)}" disabled>
          ${Array.from(
            { length: Math.floor((Number(o.maxRate) - Number(o.rate)) * 100) / 100 + 1 },
            (_, i) => {
              const rate = Math.round((Number(o.rate) + i) * 100) / 100;
              return `<option value="${rate}" ${rate === Number(o.rate) ? "selected" : ""}>${rate * 100}%</option>`;
            }
          ).join("")}
        </select>
      </label>
    ` : "";

    return `
      <label class="choice">
        <input type="checkbox" name="percentageOption" value="${esc(o.id)}">
        <span class="choice-text">
          <span class="choice-name">${esc(o.name)}</span>
          <span class="desc">${esc(o.description || "")}</span>
        </span>
        <span class="price">＋${Number(o.rate) * 100}%〜</span>
      </label>
      ${rateSelect}
    `;
  }).join("");

  // 著作権譲渡など、加算率を選べる項目
  document.querySelectorAll('input[name="percentageOption"]').forEach(input => {
    input.addEventListener("change", () => {
      const select = document.querySelector(
        `.percentage-rate[data-id="${CSS.escape(input.value)}"]`
      );
      if (select) select.disabled = !input.checked;
      calculate();
    });
  });

  document.querySelectorAll(".percentage-rate").forEach(el => {
    el.addEventListener("change", calculate);
  });

  $("notes-list").innerHTML = (c.notes || []).map(n => `<li>${esc(n)}</li>`).join("");

  const pay = $("payment-date");
  const due = $("delivery-date");

  const daysBetween = (a, b) =>
    Math.round((new Date(b + "T00:00:00Z") - new Date(a + "T00:00:00Z")) / 86400000);

  const calcRule = (base, r) => {
    let n = r.type === "percent"
      ? base * Number(r.value) / 100
      : Number(r.value);

    if (r.maxAmount != null && Number.isFinite(Number(r.maxAmount))) {
      n = Math.min(n, Number(r.maxAmount));
    }

    return Math.max(0, Math.round(n));
  };

  function calculate() {
    const menu = c.menus.find(
      m => m.id === document.querySelector('input[name="menu"]:checked')?.value
    ) || c.menus[0];

    const opts = (c.options || []).filter(o =>
      document.querySelector(`input[name="option"][value="${CSS.escape(o.id)}"]`)?.checked
    );

    const base = Number(menu.price || 0)
      + opts.reduce((sum, o) => sum + Number(o.price || 0), 0);

    // 割合加算：基本料金＋固定料金オプションを基準に計算
    const percentages = (c.percentageOptions || [])
      .filter(o => document.querySelector(
        `input[name="percentageOption"][value="${CSS.escape(o.id)}"]`
      )?.checked)
      .map(o => {
        const rateEl = document.querySelector(
          `.percentage-rate[data-id="${CSS.escape(o.id)}"]`
        );
        const rate = rateEl ? Number(rateEl.value) : Number(o.rate);
        return {
          rule: o,
          rate,
          amount: Math.round(base * rate)
        };
      });

    const percentageTotal = percentages.reduce((sum, p) => sum + p.amount, 0);
    const preRushTotal = base + percentageTotal;

    let lead = null;
    let error = "";
    let rush = null;
    let rushAmount = 0;
    let discounts = [];

    if (pay.value && due.value) {
      lead = daysBetween(pay.value, due.value);

      if (lead < 0) {
        error = "納品希望日は支払い予定日と同じ日、またはそれ以降を選んでください。";
      } else {
        // 特急料金は該当するルールを1つだけ適用
        const matches = (c.rushRules || [])
          .filter(r => lead <= Number(r.withinDays))
          .sort((a, b) => Number(a.withinDays) - Number(b.withinDays));

        rush = matches[0] || null;
        if (rush) rushAmount = calcRule(preRushTotal, rush);

        // 早割：日程条件を満たす場合のみ適用
        const early = (c.discounts || []).find(d => d.id === "early");
        if (early && lead >= Number(early.minLeadDays || 0)) {
          discounts.push({
            rule: early,
            amount: calcRule(preRushTotal, early)
          });
        }

        // リピ割：選択された回数の割引だけを適用
        const repeatLevel = $("repeat-level").value;
        const repeatId = repeatLevel === "2"
          ? "repeat2"
          : repeatLevel === "3" ? "repeat3" : null;

        if (repeatId) {
          const repeatRule = (c.discounts || []).find(d => d.id === repeatId);
          if (repeatRule) {
            discounts.push({
              rule: repeatRule,
              amount: calcRule(preRushTotal, repeatRule)
            });
          }
        }
      }
    }

    $("date-message").textContent = error || (
      lead === null
        ? "日程を選ぶと、納期に応じた料金・割引を計算します。"
        : `支払い予定日から納品希望日まで：${lead}日`
    );

    const rows = [
      { label: `基本料金：${menu.name}`, amount: Number(menu.price || 0) },
      ...opts.map(o => ({
        label: `オプション：${o.name}`,
        amount: Number(o.price || 0)
      })),
      ...percentages.map(p => ({
        label: `割合加算：${p.rule.name}（${p.rate * 100}%）`,
        amount: p.amount
      }))
    ];

    if (rush) {
      rows.push({
        label: `特急料金：${rush.name}`,
        amount: rushAmount,
        kind: "rush"
      });
    }

    discounts.forEach(d => rows.push({
      label: `割引：${d.rule.name}`,
      amount: -d.amount,
      kind: "discount"
    }));

    $("breakdown").innerHTML = rows.map(r => `
      <div class="line ${r.kind || ""}">
        <span>${esc(r.label)}</span>
        <strong>${r.amount < 0 ? "−" + yen(-r.amount) : yen(r.amount)}</strong>
      </div>
    `).join("");

    const discountTotal = Math.min(
      discounts.reduce((sum, d) => sum + d.amount, 0),
      preRushTotal + rushAmount
    );

    const final = error
      ? null
      : Math.max(0, preRushTotal + rushAmount - discountTotal);

    $("total").textContent = final === null ? "日程を確認" : yen(final);

    const summary = [
      "【イラスト依頼のお見積もり】",
      `メニュー：${menu.name}（${yen(menu.price)}）`,
      ...opts.map(o => `オプション：${o.name}（＋${yen(o.price)}）`),
      ...percentages.map(p =>
        `割合加算：${p.rule.name}（${p.rate * 100}%・＋${yen(p.amount)}）`
      ),
      `リピーター割引：${
        $("repeat-level").value === "2"
          ? "2回目"
          : $("repeat-level").value === "3" ? "3回目以降" : "初回（なし）"
      }`,
      `支払い予定日：${pay.value || "未指定"}`,
      `納品希望日：${due.value || "未指定"}`,
      ...(lead !== null && !error ? [`日程：${lead}日間`] : []),
      ...(rush && !error ? [`特急料金：${rush.name}（＋${yen(rushAmount)}）`] : []),
      ...discounts.map(d => `割引：${d.rule.name}（−${yen(d.amount)}）`),
      `お見積もり合計：${final === null ? "日程を確認してください" : yen(final)}`,
      "",
      ...(c.notes || [])
    ].join("\n");

    $("copy-button").dataset.summary = summary;
  }

  const today = new Date();
  const format = d =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const defaultDue = new Date(today);
  defaultDue.setDate(defaultDue.getDate() + Number(c.standardLeadDays || 30));

  pay.value = format(today);
  due.value = format(defaultDue);
  due.min = pay.value;

  pay.addEventListener("change", () => {
    due.min = pay.value;
    calculate();
  });

  due.addEventListener("change", calculate);
  $("repeat-level").addEventListener("change", calculate);

  document.querySelectorAll('input[name="menu"], input[name="option"]').forEach(el => {
    el.addEventListener("change", calculate);
  });

  $("copy-button").addEventListener("click", async () => {
    const txt = $("copy-button").dataset.summary || "";

    try {
      await navigator.clipboard.writeText(txt);
      $("copy-status").textContent = "見積もり内容をコピーしました。";
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();

      $("copy-status").textContent = ok
        ? "見積もり内容をコピーしました。"
        : "コピーできませんでした。画面の内容を手動でコピーしてください。";
    }
  });

  calculate();
})();
