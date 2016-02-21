####Wonderland Wars 対戦履歴集計用ブックマークレット 「本気でやっつけてやるんだから！」
====
![sample5](https://cloud.githubusercontent.com/assets/16392405/11944775/d0ca1c28-a88b-11e5-83ac-691de748b479.jpg)

####できること：
　Wonderland.NETの対戦履歴ページでこのブックマークレットを実行することで、全国対戦（最大20戦）の集計処理を行います。<br>
全体もしくは使用キャストごとの、一試合あたりの平均キャスト撃破数や、平均スキル使用回数を表示できます。<br>
また、マッチングした他キャストのスキルやアシストの採用率表示もすることができます。<br>
オプション機能の保存読込機能を使用した場合、最大300件までの集計表示が可能です。<br>
対戦履歴詳細ページでの実行時、店舗名や他プレイヤー名を非表示にすることができます。<br>

####注意事項（使用前に必ずお読みください）：
　読み込み処理には1分近くかかることもあります、実行後はしばらくお待ちください。<br>
また、通常よりサーバーに負担をかける＆通信量もかかるため、1戦毎に実行する等の頻繁な使用は控えてください。<br>
セガからお叱りを受けた場合は公開を停止します。<br>
動作テストは行っていますが、古いIE等では動作しないと思われます(メインのテスト環境はPC版Google Chromeです)。

####使用方法：
　ブックマークレット登録用のアドレスは下記になります（コピー＆ペースト推奨）。<br>
<br>
↓最新版です。機能が追加される度に更新されますので、基本的にはこちらをお使いください。
```
javascript:(function(d,s){s=d.createElement('script');s.src='https://rawgit.com/wlw-bookmarklet/matchlog/master/honkide.js';d.body.appendChild(s);})(document)
```
↓最近の更新で使えなくなった場合、こちらをお試しください。また、twitterアカウント宛に連絡いただけると助かります。
```
javascript:(function(d,s){s=d.createElement('script');s.src='https://rawgit.com/wlw-bookmarklet/matchlog/master/honkide_20160207.js';d.body.appendChild(s);})(document)
```

　登録したブックマークレットを、対戦履歴ページ（画像を参照）で実行してください。（舞踏会履歴にも対応しています）
![sample9](https://cloud.githubusercontent.com/assets/16392405/11995108/3e994248-aa8e-11e5-95ee-5da5e00a8070.jpg)

　起動に成功した場合、最初にアラートが表示されます。（ブラウザによっては集計処理が実行できない場合もあります）<br>

　注意：モバイル版GoogleChromeについては、ブックマークレット登録後に対戦履歴ページを表示し、<br>
URL欄にブックマークレット登録名を入力すると、候補にこのブックマークレットが表示されるので、それを実行するという手順を踏まないと実行できないようです。

#####ブックマークレット登録方法について：
　ブックマークレットはブックマーク（お気に入り）を実行して、表示されているページ処理などを行う機能です。<br>
適当なページのブックマークを作成し、URL部分を空にしてからURL部分に上記のjavascript～の文章を貼り付けて登録しなおしてください。<br>
画像付きの登録手順が必要な場合は、お手数ですが「ブックマークレット　ブラウザ名」等で検索をお願いします。

####細かな操作や項目：
・キャストの画像をクリックorタップすることで、集計データをキャストごとに切り替える事ができます。<br>
・キャストは対戦履歴に存在するキャストのみ表示されます。必ず全キャストが表示されるわけではありません。<br>
・スキル使用回数には、対戦履歴上で一度もセットされていないスキルは表示されません。<br>
・「試合結果（平均データ）」と「スキル使用回数」は、自身のみのデータ、「マッチングキャストデータ」は、自身とCOMを除いた結果になります。<br>
・マッチングキャストのチーム構成目安は自身を含んだ結果になります。純粋なキャスト数による割合のため、COMが増えてもキャストの重みは変わりません。<br>
・フレンドマッチについては、全国対戦と区別する方法が見つかっていないため、全国対戦と同様に処理されます。保存＆読込機能の保存データに含みたくない場合は、履歴からフレンドマッチの試合が消えるまで保存＆読込機能を実行しないでください。<br>
・MP使用量は現バージョンの値を参照しているため、過去のバージョン試合を集計すると実際とは違う値が表示されます。また、スキルレベルによる消費MP減や、ドロー使用によるMPは含まれていますが、アシストによる消費MPの減少等はデータが取れないため含まれていません。

####保存＆読込機能（オプション機能）について：
　20件以上の集計データを表示することを目的とした機能です。<br>
事前に保存＆読込を実行しておき、ゲームをプレイした後に再び保存＆読込を実行すると、<br>
下記の右画像のように保存と同時に前回実行時の集計データを読み込み、合算して表示することができます。<br>
初回の起動は保存のみが行われるため、表示件数の拡張は行われません。<br>
![10](https://cloud.githubusercontent.com/assets/16392405/12037151/988d99fc-ae8f-11e5-885d-4909606329d6.jpg)
![4](https://cloud.githubusercontent.com/assets/16392405/12037201/0a71e4ba-ae90-11e5-9af8-6f78eecf2bc0.jpg)

####不具合情報：
　取得に失敗する形式の試合が存在する(COM6人戦が有力)。<br>
※そういった旨のメッセージが表示された際、下記の連絡先に試合詳細のスクリーンショットかソースコードを送っていただけると助かります。<br>

#####連絡先：
twitter：https://twitter.com/wlw_honkideya<br>
メールフォーム(サイズ上限はありますが、ファイル添付可)：http://form1.fc2.com/form/?id=cf37da25833d8e10

#####修正履歴：
2016/02/21 対戦履歴詳細ページで実行時、名前や店舗等の表示非表示を切り替えする機能を追加しました。<br>
2016/02/19 MP使用量の項目を追加しました。<br>
2016/02/16 マップ別集計機能を追加しました。<br>
2016/02/13 オプション機能の表示方式を統一しました。<br>
2016/02/09 舞踏会履歴向けに、ファイターの人数別の勝率表示機能をオプションに追加しました。<br>
2016/02/08 ログイン情報が有効でなくなっていた場合、そのエラーが拾えなくなっていた不具合を修正。<br>
2016/02/07 対戦履歴の読み込み方法を変更し、処理の高速化を試みました。<br>
2016/02/07 オプション機能の蓬莱の玉の枝の表示方法を変更しました。<br>
2016/02/01 最新日のみ集計実行時、ランキングデータが正しく表示されない不具合を修正しました。<br>
2016/01/31 最新日のみ集計実行時、チーム構成目安の値が正しくなくなる不具合を修正。<br>
2016/01/28 主にスマホ、タブレット向けにレイアウトの調整を行いました。<br>
2016/01/25 LV○時間(味/敵)のところをクリックorタップすると、対応したLV先行時勝率を表示するようにしてみました。<br>
2016/01/25 マッチングのロール比率表示に自身を含むよう統一し、実際のチーム構成に寄せた値にしました。<br>
2016/01/24 マッチングしたキャストのロール比率表示を追加。<br>
2016/01/12 マッチングしたキャストのカード未装備時に、試合の取得に失敗することがある不具合を修正。<br>
2016/01/11 蓬莱の玉の枝のオプション機能の三本時の表示を戻しました。取得に失敗した試合を表示するようにしました。<br>
2016/01/11 舞闘会履歴に対応しました、対戦履歴の舞闘会履歴から実行してください。試合数が極端に少ない時の対応を追加。<br>
2016/01/06 蓬莱の玉の枝のオプション機能の一部項目を削除し、空いたところに青い羽のイヤリングを追加しました。<br>
2016/01/05 蓬莱の玉の枝のオプション機能を追加しました。<br>
2016/01/03 エラー発生時の処理を追加しました。<br>
2016/01/01 スキル平均使用回数の計算基準を、キャスト使用回数からスキルセット回数に変更しました。桁数表示の見直しを行いました。IE向けのレイアウト崩れ対策を追加しました。<br>
2015/12/30 マッチングキャストの登場数ランキングを追加しました。<br>
2015/12/30 保存＆読込機能を追加しました。表示項目の整理を行いました。<br>
2015/12/26 オプション機能を追加。試験的な処理を入れているので、実行しても正常に動作しない可能性は高くなります。<br>
2015/12/25 キャスト選択時、キャストアイコンを半透明にするように変更。<br>
2015/12/23 マッチングしたキャストのアシストカードとソウルカードが、正しく集計されない可能性がある点を修正。


