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
  // 背景
  { id: "bg1", name: "背景Lv1（色・柄など）", price: 500, description: "単色・簡単な柄など" },
  { id: "bg2", name: "背景Lv2（空・海など）", price: 1000, description: "空や海などの背景" },
  { id: "bg3", name: "背景Lv3（家具・小物など）", price: 2000, description: "家具や小物を含む背景" },

  // 一枚絵用背景
  { id: "single_bg1", name: "一枚絵用背景Lv1（空・海など）", price: 0, description: "追加料金なし" },
  { id: "single_bg2", name: "一枚絵用背景Lv2（家具・小物など）", price: 1000, description: "家具や小物を含む背景" },
  { id: "single_bg3", name: "一枚絵用背景Lv3（複雑な景色など）", price: 2000, description: "複雑な景色など" },

  // 表情差分
  { id: "expression", name: "表情差分（1点）", price: 1000, description: "1点あたりの料金。複数追加可能" },

  // 服装差分
  { id: "hair", name: "服装差分：髪型", price: 1000, description: "髪型の差分" },
  { id: "top", name: "服装差分：トップス", price: 1000, description: "トップスの差分" },
  { id: "bottom", name: "服装差分：ボトムス", price: 1000, description: "ボトムスの差分" },
  { id: "shoes", name: "服装差分：靴", price: 1000, description: "靴の差分" },
  { id: "accessory", name: "服装差分：小物", price: 1000, description: "小物の差分" },
  { id: "full_outfit", name: "服装差分：全身", price: 5000, description: "全身の服装差分" },

  // 装飾
  { id: "decoration1", name: "装飾少なめ", price: 0, description: "追加料金なし" },
  { id: "decoration2", name: "装飾普通", price: 1000, description: "通常程度の装飾" },
  { id: "decoration3", name: "装飾多め", price: 2000, description: "多めの装飾" },
  { id: "decoration4", name: "装飾かなり多め", price: 3000, description: "複雑な装飾" }
],
  
percentageOptions: [
  {
    id: "simple_parts",
    name: "簡易パーツ分け",
    rate: 0.2,
    description: "顔・髪型・服装・素体"
  },
  {
    id: "parts",
    name: "パーツ分け（30パーツ〜）",
    rate: 0.5,
    description: "基本料金の＋50%〜。内容により変動"
  },
  {
    id: "commercial",
    name: "商用利用",
    rate: 0.2,
    description: "収益化済みチャンネル・アカウントでの利用、グッズ制作、ギフトへの返礼品など"
  },
  {
    id: "private",
    name: "実績非公開",
    rate: 0.5,
    description: "基本料金の＋50%"
  },
  {
    id: "copyright",
    name: "著作権譲渡",
    rate: 1.0,
    maxRate: 5.0,
    description: "基本料金の＋100〜500%。案件の規模により変動"
  }
],

  // 特急料金
  // 支払い予定日から納品希望日までの日数で判定。
  // 1〜7日後：超特急（50%から5%ずつ減少）
  // 8〜14日後：特急（18%から2%ずつ減少）
  // 該当するルールを1つだけ適用。
  rushRules: [
    { id: "super1", name: "超特急（1日後）", withinDays: 1, minDays: 1, type: "percent", value: 50 },
    { id: "super2", name: "超特急（2日後）", withinDays: 2, minDays: 2, type: "percent", value: 45 },
    { id: "super3", name: "超特急（3日後）", withinDays: 3, minDays: 3, type: "percent", value: 40 },
    { id: "super4", name: "超特急（4日後）", withinDays: 4, minDays: 4, type: "percent", value: 35 },
    { id: "super5", name: "超特急（5日後）", withinDays: 5, minDays: 5, type: "percent", value: 30 },
    { id: "super6", name: "超特急（6日後）", withinDays: 6, minDays: 6, type: "percent", value: 25 },
    { id: "super7", name: "超特急（7日後）", withinDays: 7, minDays: 7, type: "percent", value: 20 },

    { id: "rush8", name: "特急（8日後）", withinDays: 8, minDays: 8, type: "percent", value: 18 },
    { id: "rush9", name: "特急（9日後）", withinDays: 9, minDays: 9, type: "percent", value: 16 },
    { id: "rush10", name: "特急（10日後）", withinDays: 10, minDays: 10, type: "percent", value: 14 },
    { id: "rush11", name: "特急（11日後）", withinDays: 11, minDays: 11, type: "percent", value: 12 },
    { id: "rush12", name: "特急（12日後）", withinDays: 12, minDays: 12, type: "percent", value: 10 },
    { id: "rush13", name: "特急（13日後）", withinDays: 13, minDays: 13, type: "percent", value: 8 },
    { id: "rush14", name: "特急（14日後）", withinDays: 14, minDays: 14, type: "percent", value: 6 }
  ],

  // 割引
  // 早割とリピ割は条件に該当する場合に適用。
  // 割引率は、基本料金＋固定料金オプション＋割合加算後の料金に対して適用。
  discounts: [
    {
      id: "early",
      name: "早割（納品30日以上前の支払い）",
      minLeadDays: 30,
      type: "percent",
      value: 10
    },
    {
      id: "repeat2",
      name: "リピ割（2回目の依頼）",
      type: "percent",
      value: 5
    },
    {
      id: "repeat3",
      name: "リピ割（3回目以降）",
      type: "percent",
      value: 10
    }
  ],

  standardLeadDays: 30,
  notes: [
    "こちらは自動計算による概算見積もりです。",
    "内容・作業量によって料金が変動する場合があります。",
    "正式な金額はご依頼内容を確認後に確定します。"
  ]
};
