// 料金・条件を変更するときは、このファイルだけ編集すればOKです。
// 金額は円。idは重複しない英数字にしてください。
window.ESTIMATE_CONFIG = {
  siteName: "ILLUSTRATION ORDER",
  subtitle: "かんたんお見積もり",
  menus: [
    { id: "icon", name: "アイコン", price: 5000, description: "SNSアイコンなど" },
    { id: "standing", name: "立ち絵", price: 16500, description: "キャラクター立ち絵" },
    { id: "single", name: "一枚絵", price: 12000, description: "背景付きイラストなど" }
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