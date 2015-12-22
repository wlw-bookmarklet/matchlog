Wonderland WarsのWonderland.NETで動作する、対戦履歴（全国対戦）の集計用ブックマークレットです。

![sample5](https://cloud.githubusercontent.com/assets/16392405/11944775/d0ca1c28-a88b-11e5-83ac-691de748b479.jpg)
![sample4](https://cloud.githubusercontent.com/assets/16392405/11944774/cdfb566a-a88b-11e5-90e8-f5c704346011.jpg)

大まかな機能：<br>
Wonderland.NETの対戦履歴ページで上記ブックマークレットを実行することで、全国対戦（最大20戦）の集計処理を行います。<br>
全体もしくは使用キャストごとの、一試合あたりの平均キャスト撃破数や、スキル使用回数を表示します。<br>
また、マッチングしたキャストのスキルやアシストの採用率も表示することができます。<br>

<strong>注意事項（使用前に必ずお読みください）：<br></strong>
読み込み処理には1分近くかかることもあります、実行後はしばらくお待ちください。<br>
また、通常よりサーバーに負担をかける＆通信量もかかるため、1戦毎に実行する等の頻繁な使用は控えてください。<br>
セガからお叱りを受けた場合は公開を停止します。<br>
動作テストは行っていますが、古いIE等では動作しないと思われます。

ブックマークレット登録用のアドレスは下記になります（コピー＆ペースト推奨）。<br>
ブラウザごとの登録方法は、「ブックマークレット　ブラウザ名」等で各自検索をお願いします。

javascript:(function(d,s){s=d.createElement('script');s.src='https://rawgit.com/wlw-bookmarklet/matchlog/master/honkide.js';d.body.appendChild(s);})(document)

細かな操作や項目について：<br>
・キャストの画像をクリックorタップすることで、集計データをキャストごとに切り替える事ができます。<br>
・キャストは対戦履歴に存在するキャストのみ表示されます。必ず全キャストが表示されるわけではありません。<br>
・「試合結果（平均データ）」と「スキル使用回数」は、自身のみのデータ、<br>
「マッチングキャストデータ」は、自身とCOMを除いた結果になります。

連絡先ツイッター：<br>
https://twitter.com/wlw_honkideya
