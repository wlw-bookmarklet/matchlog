####Wonderland WarsのWonderland.NETで動作する、対戦履歴（全国対戦）の集計用ブックマークレットです。
***
![sample5](https://cloud.githubusercontent.com/assets/16392405/11944775/d0ca1c28-a88b-11e5-83ac-691de748b479.jpg)

#####できること
Wonderland.NETの対戦履歴ページでこのブックマークレットを実行することで、全国対戦（最大20戦）の集計処理を行います。<br>
全体もしくは使用キャストごとの、一試合あたりの平均キャスト撃破数や、平均スキル使用回数を表示できます。<br>
また、マッチングした他キャストのスキルやアシストの採用率表示もすることができます。<br>

####注意事項（使用前に必ずお読みください）
読み込み処理には1分近くかかることもあります、実行後はしばらくお待ちください。<br>
また、通常よりサーバーに負担をかける＆通信量もかかるため、1戦毎に実行する等の頻繁な使用は控えてください。<br>
セガからお叱りを受けた場合は公開を停止します。<br>
動作テストは行っていますが、古いIE等では動作しないと思われます。

#####使用方法
ブックマークレット登録用のアドレスは下記になります（コピー＆ペースト推奨）。<br>
```
javascript:(function(d,s){s=d.createElement('script');s.src='https://rawgit.com/wlw-bookmarklet/matchlog/master/honkide.js';d.body.appendChild(s);})(document)
```

登録したブックマークレットを、対戦履歴ページ（画像を参照）で実行してください。
![sample9](https://cloud.githubusercontent.com/assets/16392405/11995108/3e994248-aa8e-11e5-95ee-5da5e00a8070.jpg)

起動に成功した場合、最初にアラートが表示されます。（ブラウザによっては集計処理が実行できない場合もあります）<br>
注意：モバイル版GoogleChromeについては、ブックマークレット登録後に対戦履歴ページを表示し、<br>
URL欄にブックマークレット登録名を入力すると、候補にこのブックマークレットが表示されるので、それを実行するという手順を踏まないと実行できないようです。

#####ブックマークレット登録方法について
ブックマークレットはブックマーク（お気に入り）を実行して、表示されているページ処理などを行う機能です。<br>
適当なページのブックマークを作成し、URL部分を空にしてからURL部分に上記のjavascript～の文章を貼り付けて登録しなおしてください。
画像付きの登録手順が必要な場合は、お手数ですが「ブックマークレット　ブラウザ名」等で検索をお願いします。

#####細かな操作や項目
・キャストの画像をクリックorタップすることで、集計データをキャストごとに切り替える事ができます。<br>
・キャストは対戦履歴に存在するキャストのみ表示されます。必ず全キャストが表示されるわけではありません。<br>
・スキル使用回数には、対戦履歴上で一度もセットされていないスキルは表示されません。<br>
・「試合結果（平均データ）」と「スキル使用回数」は、自身のみのデータ、「マッチングキャストデータ」は、自身とCOMを除いた結果になります。

#####連絡先ツイッター：<br>
https://twitter.com/wlw_honkideya

#####修正履歴：<br>
2015/12/23 マッチングしたキャストのアシストカードとソウルカードが、正しく集計されない可能性がある点を修正。


