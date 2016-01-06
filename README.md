####Wonderland WarsのWonderland.NETで動作する、対戦履歴（全国対戦）の集計用ブックマークレットです。
***
![sample5](https://cloud.githubusercontent.com/assets/16392405/11944775/d0ca1c28-a88b-11e5-83ac-691de748b479.jpg)

####できること：
　Wonderland.NETの対戦履歴ページでこのブックマークレットを実行することで、全国対戦（最大20戦）の集計処理を行います。<br>
全体もしくは使用キャストごとの、一試合あたりの平均キャスト撃破数や、平均スキル使用回数を表示できます。<br>
また、マッチングした他キャストのスキルやアシストの採用率表示もすることができます。<br>

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
javascript:(function(d,s){s=d.createElement('script');s.src='https://rawgit.com/wlw-bookmarklet/matchlog/master/honkide_20151226.js';d.body.appendChild(s);})(document)
```

　登録したブックマークレットを、対戦履歴ページ（画像を参照）で実行してください。
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
・「試合結果（平均データ）」と「スキル使用回数」は、自身のみのデータ、「マッチングキャストデータ」は、自身とCOMを除いた結果になります。

####保存＆読込機能（オプション機能）について：
　20件以上の集計データを表示することを目的とした機能です。<br>
事前に保存＆読込を実行しておき、ゲームをプレイした後に再び保存＆読込を実行すると、<br>
下記の右画像のように保存と同時に前回実行時の集計データを読み込み、合算して表示することができます。<br>
初回の起動は保存のみが行われるため、表示件数の拡張は行われません。<br>
![10](https://cloud.githubusercontent.com/assets/16392405/12037151/988d99fc-ae8f-11e5-885d-4909606329d6.jpg)
![4](https://cloud.githubusercontent.com/assets/16392405/12037201/0a71e4ba-ae90-11e5-9af8-6f78eecf2bc0.jpg)

#####連絡先ツイッター：
https://twitter.com/wlw_honkideya

#####修正履歴：
2016/01/06 蓬莱の玉の枝のオプション機能の一部項目を削除し、空いたところに青い羽のイヤリングを追加しました。<br>
2016/01/05 蓬莱の玉の枝のオプション機能を追加しました。<br>
2016/01/03 エラー発生時の処理を追加しました。<br>
2016/01/01 スキル平均使用回数の計算基準を、キャスト使用回数からスキルセット回数に変更しました。桁数表示の見直しを行いました。IE向けのレイアウト崩れ対策を追加しました。<br>
2015/12/30 マッチングキャストの登場数ランキングを追加しました。<br>
2015/12/30 保存＆読込機能を追加しました。表示項目の整理を行いました。<br>
2015/12/26 オプション機能を追加。試験的な処理を入れているので、実行しても正常に動作しない可能性は高くなります。<br>
2015/12/25 キャスト選択時、キャストアイコンを半透明にするように変更。<br>
2015/12/23 マッチングしたキャストのアシストカードとソウルカードが、正しく集計されない可能性がある点を修正。


