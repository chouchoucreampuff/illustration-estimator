# イラスト依頼・自動見積もりサイト

## ファイル
- `index.html`：画面の構造
- `style.css`：ピンク・白のデザイン
- `config.js`：メニュー、オプション、特急料金、割引の設定
- `app.js`：自動計算とコピー機能

## 料金を変更する
`config.js` を編集してください。金額は円です。

### メニューを追加
`menus` 配列の中に、次のような項目を追加します。
```js
{ id: "bustup", name: "バストアップ", price: 9000, description: "胸上イラスト" }
```
`id` は重複しない英数字にしてください。オプションも同じ形式で `options` に追加できます。

### 特急料金を設定
```js
{ id: "rush3", name: "3日以内の特急", withinDays: 3, type: "fixed", value: 5000 }
```
`withinDays` は支払い予定日から納品希望日までの日数です。`type: "percent"` は小計の割合（value 30なら30%）、`type: "fixed"` は定額です。複数条件に該当するときは、最も短い日数のルール1つだけが適用されます。

### 割引を設定
```js
{ id: "longlead", name: "ゆとり納期割引", minLeadDays: 60, type: "percent", value: 10, maxAmount: 5000 }
```
`minLeadDays` 日以上なら適用されます。`type` は特急料金と同じです。`maxAmount` は任意の割引上限。該当する割引は併用されます。

## GitHub Pagesで公開
1. GitHubで新しいリポジトリを作成（例：`illustration-estimator`）。
2. この4ファイル（READMEを含めるなら5ファイル）をリポジトリの一番上の階層にアップロード。
3. リポジトリの **Settings → Pages** を開く。
4. **Build and deployment** の **Deploy from a branch** を選択。
5. Branchを `main`、フォルダを `/(root)` にして **Save**。
6. Pages画面に表示されるURLを開く。公開まで数分かかる場合があります。

GitHub Freeで利用する場合、通常は公開リポジトリが必要です。公開サイトやリポジトリには個人情報・非公開情報を置かないでください。

## 注意
- このサイトは概算金額を表示するだけで、決済や依頼受付を自動処理しません。
- サンプル料金・割引は必ず正式な料金表に変更してから公開してください。
- 割引は基本料金＋オプションの小計を基準に計算し、割引合計が小計＋特急料金を超えないようにしています。
- 入力情報はサーバーへ保存しません。
