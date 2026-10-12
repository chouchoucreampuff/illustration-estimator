// 料金・条件を変更するときは、このファイルだけ編集すればOKです。
// 金額は円。idは重複しない英数字にしてください。
window.ESTIMATE_CONFIG = {
  siteName: "ILLUSTRATION ORDER",
  subtitle: "かんたんお見積もり",
menus: [
  // 【イラスト】
  { id: "icon", name: "アイコン", price: 6000, description: "SNSアイコンなど" },
  { id: "bust", name: "胸上", price: 7000, description: "胸上イラスト" },
  { id: "waist", name: "腰上", price: 8000, description: "腰上イラスト" },
  { id: "standing_a", name: "全身A（立ち絵・左右対称）", price: 9000, description: "左右対称の立ち絵" },
  { id: "standing_b", name: "全身B（立ち絵・軽いポーズ）", price: 9500, description: "軽いポーズの立ち絵" },
  { id: "standing_c", name: "全身C（大きな動きのある構図）", price: 10000, description: "大きな動きのある構図" },
  { id: "mini", name: "通常ミニキャラ", price: 5000, description: "通常のデフォルメイラスト" },
  { id: "mini_simple", name: "簡易ミニキャラ", price: 2000, description: "簡易デフォルメイラスト" },
  { id: "single_bust", name: "一枚絵（胸上）", price: 8000, description: "胸上の一枚絵" },
  { id: "single_waist", name: "一枚絵（腰上）", price: 9000, description: "腰上の一枚絵" },
  { id: "single_full", name: "一枚絵（全身）", price: 10000, description: "全身の一枚絵" },

  // 【デザイン】
  { id: "three_view_flat", name: "三面図（ベタ塗り仕上げ）", price: 10000, description: "三面図・ベタ塗り仕上げ" },
  { id: "three_view_full", name: "三面図（しっかり仕上げ）", price: 15000, description: "三面図・しっかり仕上げ" },
  { id: "two_view_flat", name: "二面図（ベタ塗り仕上げ）", price: 7000, description: "二面図・ベタ塗り仕上げ" },
  { id: "two_view_full", name: "二面図（しっかり仕上げ）", price: 10000, description: "二面図・しっかり仕上げ" },
  { id: "standing_image", name: "立ち絵公開画像", price: 2000, description: "立ち絵公開用の画像デザイン" },
  { id: "icon_ring", name: "アイコンリング", price: 2000, description: "アイコンリングのデザイン" },
  { id: "header", name: "ヘッダー", price: 2000, description: "ヘッダー画像のデザイン" },
  { id: "thumbnail", name: "サムネイル", price: 3000, description: "サムネイル画像のデザイン" },
  { id: "schedule", name: "スケジュール表", price: 3000, description: "スケジュール表のデザイン" },
  { id: "logo", name: "ロゴ", price: 3000, description: "ロゴデザイン" }
],

  options: [
    { id: "expression", name: "表情差分", price: 2000, description: "表情を追加" },
    { id: "item", name: "小物追加", price: 1500, description: "小物・装飾など" },
    { id: "commercial", name: "商用利用", price: 3000, description: "商用利用ライセンス" },
    { id: "copyright", name: "著作権譲渡", price: 10000, description: "事前相談が必要です" }
  ],
  // 納品希望日 - 支払い予定日 の日数がwithinDays以下なら適用。
  // type="percent"は基本料金+オプション小計に対する割合、"fixed"は定額加算。
  // 複数該当時は、最も短い日数の特急ルール1つだけ適用。
  rushRules: [
    { id: "rush7", name: "7日以内の特急", withinDays: 7, type: "percent", value: 50 },
    { id: "rush14", name: "14日以内の特急", withinDays: 14, type: "percent", value: 30 }
  ],
  // 割引は条件に該当するものを併用。minLeadDaysは支払い日から納品日までの日数。
  // type="percent"は小計の割合、"fixed"は定額値引き。maxAmountは任意の割引上限。
  discounts: [
    { id: "early", name: "余裕納期割引", minLeadDays: 30, type: "percent", value: 5, maxAmount: 5000 },
    { id: "thanks", name: "ご利用感謝割引", minLeadDays: 45, type: "fixed", value: 500 }
  ],
  standardLeadDays: 30,
  notes: [
    "こちらは自動計算による概算見積もりです。",
    "内容・作業量によって料金が変動する場合があります。",
    "正式な金額はご依頼内容を確認後に確定します。"
  ]
};
