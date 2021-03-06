javascript:

// 実行するURL
var starturl1 = "https://wonderland-wars.net/matchlog.html";
var starturl2 = "https://wonderland-wars.net/matchlog.html?type=all";

// 空欄カード用URL
var nocard_img = "common/img_card_thum/deck_nocard.png";
var com_img = "common/img_cast/582e3423a336042b335de96584d116e2.png";

// 集計表示用アイコンURL
var sum_img = "common/img_cast/582e3423a336042b335de96584d116e2.png";

var request= new XMLHttpRequest();

// データ取得用正規表現リスト
// 対戦時刻
var match_time = /<span class="font_small">.*<\/span>/g;
// プレーヤー名
var mp_mydata_name = /<div class="mp_mydata_name">.*<\/div>/;
// 都道府県
var mp_mydata_location = /<div class="mp_mydata_location">.*<\/div>/;
// 店舗名
var mtc_detail_store = /<div class="mtc_detail_store">.*<\/div>/;
// マップ名
var mtc_detail_map = /<div class="mtc_detail_map">.*<\/div>/;
// 使用キャスト画像URL
var mtc_detail_cast = /common\/img_cast\/.+\.png/;
// タイム
var mtc_detail_time = /<div class="mtc_detail_time">.*<\/div>/;
// 味方ゲージ
var mtc_detail_mygage = /<div class="mtc_detail_mygage">.*<\/div>/;
// 敵ゲージ
var mtc_detail_enemygage = /<div class="mtc_detail_enemygage">.*<\/div>/;
// 勝敗
var mtc_detail_result = /<div class="mtc_detail_result">.*<\/div>/;

// セットしているカードのブロック取得
var mtc_detail_cardblock = /<div class="mtc_detail_cardblock">/g;
// セットしているカードのブロック取得（マッチング相手）
var mtc_detail_m_cardblock = /<div class="mtc_detail_m_cardblock">/g;
// カードのレベル取得
var mtc_detail_cardblock_lv = /<div class="mtc_detail_cardblock_lv">.*<\/div>/;
// カードのレベルMAX時
var mtc_detail_cardblock_lv_max = /<div class="mtc_detail_cardblock_lv lv_max">.*<\/div>/;
// 使用スキル画像URL
var mtc_detail_skill = /common\/img_card_thum\/skill\/.+\.png/g;
// スキル使用回数
var mtc_detail_skill_count = /<div class="mtc_detail_skill_count">.*\s*[0-9]*/g;
// 使用アシスト画像URL
var mtc_detail_assist = /common\/img_card_thum\/assist\/.+\.png/g;
// 使用ソウル画像URL
var mtc_detail_soul = /common\/img_card_thum\/soul\/.+\.png/g;

// 自軍レベルアップ時間
var levelup_my_lv = /<div class="levelup_my_lv".*<\/div>/g;
// 敵軍レベルアップ時間
var levelup_enemy_lv = /<div class="levelup_enemy_lv".*<\/div>/g;
// 兵士撃破数
var mtc_detail_data_heishi = /<div class="mtc_detail_data_heishi".*<\/div>/;
// キャスト撃破数
var mtc_detail_data_cast = /<div class="mtc_detail_data_cast".*<\/div>/;
// 巨人撃破数
var mtc_detail_data_titan = /<div class="mtc_detail_data_titan".*<\/div>/;
// 撤退数
var mtc_detail_data_tettai = /<div class="mtc_detail_data_tettai".*<\/div>/;
// ストレートショット
var mtc_detail_data_sts = /<div class="mtc_detail_data_sts".*<\/div>/;
// ストレートショットHIT
var mtc_detail_data_stshit = /<div class="mtc_detail_data_stshit".*<\/div>/;
// ドローショット
var mtc_detail_data_drs = /<div class="mtc_detail_data_drs".*<\/div>/;
// ドローショットHIT
var mtc_detail_data_drshit = /<div class="mtc_detail_data_drshit".*<\/div>/;
// 帰城
var mtc_detail_data_backhome = /<div class="mtc_detail_data_backhome".*<\/div>/;
// ストレートショット被HIT
var mtc_detail_data_sts2hit = /<div class="mtc_detail_data_sts2hit".*<\/div>/;
// ドローショット被HIT
var mtc_detail_data_drs2hit = /<div class="mtc_detail_data_drs2hit".*<\/div>/;
// 拠点破壊数
var mtc_detail_data2_kyoten = /<div class="mtc_detail_data2_kyoten".*<\/div>/;
// 入手経験値
var mtc_detail_data2_exp = /<div class="mtc_detail_data2_exp".*<\/div>/;
// パートナー値
var mtc_detail_m_with_num = /<div class="mtc_detail_m_with_num".*<\/div>/;

// 試合時間秒数*10
var battle_time = 420;
var battle_per = 4.2;

// url格納用文字列
var urlstr = null;
// 対象試合数変数
var battle_cnt = 0;
// キャストカウンタ
var cast_cnt = 0;
// キャスト重複チェック
var cast_chkflg = -1;
// マッチングキャスト累計
match_cast_sum = 0;
// マッチングキャストカウンタ
match_cast_cnt = 0;

// 結果を配列で格納する
var result_battle = [];
// キャストごとの結果を配列で格納する
var cast_result = [];
// マッチングしたキャストの結果を格納する
var match_cast_result = [];

// 表示サイズ用
var icon_width = 0;
var icon_height = 0;
var margin_bot = 0;

// 表示用
var getcast_sum = 0;
var getcast_other = 0;
var imgNode_cast = [];
var imgNode_skill = [];
var imgNode_other = [];
var innerNode = null;
var selecttest = null;
var inspos  = null;
var textNode = document.createElement("h2");
var gameNode = document.createElement("h2");
var skillNode = document.createElement("h2");
var castNode = document.createElement("h2");
var dtlNode = null;

// 表示ノード用配列
var node_ary = [];
var skill_ary = [];
var skillimg_ary = [];
var skillcnt_ary = [];
var cast_ary = [];
var castcardimg_ary = [];
var castcardcnt_ary = [];

// テスト処理用
var betatest_flg = 0;

// エラー用変数
var errnum = 0;
var errmsg = [
"正常に処理されました。"
,"ブックマークレットが既に実行済みです。\n複数回起動した場合、読み込み処理に異常が発生します。\n再表示したい場合は、対戦履歴ページの更新を行ってから実行してください。"
,"対戦履歴の取得件数が0件でした。\n対戦履歴が存在していないか、\n対戦履歴詳細のURLが変更されて読み込めなくなった可能性があります。"
]

// 本処理
// 開始URLをチェックし、対戦履歴ページなら処理を開始する
if( urlchk() ){
	alert("このアラートを閉じるとデータ取得を開始します。\n読み込みには時間がかかりますのでしばらくお待ちください。\n一分以上経っても処理終了と表示されない場合は、\nエラーが発生した可能性があります。");
	// 対戦履歴のページ数だけ処理する
	for(var linkcnt=0; linkcnt < document.links.length; linkcnt++){
		urlstr = document.links[linkcnt].toString();
		// 起動済みでないかのチェック
		if(urlstr.match(/changesum/)){
			errnum = 1;
			break;
		}
		// 対象外のURLも含まれるので、アドレスチェックを行う
		if( urlstr.match(/matchlogdetail/i) ){
			request.open("GET", urlstr, false);
			request.onreadystatechange=sorceget;
			request.send(null);
			battle_cnt++;
		}
		
		if(errnum != 0){
			break;
		}
	}
	// 試合が取得できなかった場合
	if(battle_cnt == 0 && errnum == 0){
		errnum = 2;
	}
	
	// エラーが無ければ集計＆表示処理
	if(errnum == 0){
		// 画面サイズによってレイアウト用の値を設定
		if (window.innerWidth < 481) { 
			//表示領域が小さい時の処理
			icon_width = 30;
			icon_height = 35;
			margin_bot ="10px";
		} else {
			//表示領域が大きい時の処理
			icon_width = 60;
			icon_height = 70;
			margin_bot ="20px";
		}
		syukei();
		hyouji();
	}
	
	// 終了メッセージ
	alert("処理終了　エラー番号:" + errnum + "\n" + errmsg[errnum]);
} else {
	alert("ﾅﾝﾃﾞｯ!!");
}

// 対戦履歴詳細ページの情報を取得
function sorceget(){
	if (request.readyState == 4 && request.status == 200){
		var src_txt = null;
		var tmpstr = null;
		var card_chk = null;
		var chkreg = null;
		var cnt = 0;
		
		var src_ary = [];
		var result_ary = [];
		var player = [];
		var other_member = [];
		var tmp_ary = [];
		var comchk = [];
		
		// ソースをテキストに
		src_txt = request.responseText;
		
		// ソースを2分割
		src_ary = src_txt.split("mtc_detail_member clearfix");
		
		// 試合時刻を取得
		tmpstr = src_ary[0].match(match_time);
		result_ary[0] = tagsplit(tmpstr[0]);
		// プレーヤー名を取得
		tmpstr = src_ary[0].match(mp_mydata_name);
		result_ary[1] = tagsplit(tmpstr[0]);
		// 都道府県を取得
		tmpstr = src_ary[0].match(mp_mydata_location);
		result_ary[2] = tagsplit(tmpstr[0]);
		// 店舗名を取得
		tmpstr = src_ary[0].match(mtc_detail_store);
		result_ary[3] = tagsplit(tmpstr[0]);
		// マップ名を取得
		tmpstr = src_ary[0].match(mtc_detail_map);
		var tmpstr1 = tmpstr[0].split("<p>");
		tmpstr = tmpstr1[1].split("<");
		result_ary[4] = tmpstr[0];
		
		// プレイヤー画像を取得
		result_ary[5] = src_ary[0].match(mtc_detail_cast);
		// タイムを取得
		tmpstr = src_ary[0].match(mtc_detail_time);
		result_ary[6] = tagsplit(tmpstr[0]);
		// 味方ゲージを取得
		result_ary[7] = src_ary[0].match(mtc_detail_mygage);
		// 敵ゲージを取得
		result_ary[8] = src_ary[0].match(mtc_detail_enemygage);
		// 勝敗を取得
		var win_lose = src_ary[0].match(mtc_detail_result);
		if(win_lose[0].match("icon_win.png") != null){
			result_ary[9] = "win";
		} else {
			result_ary[9] = "lose";
		}
		
		// レベルアップ時間を取得
		tmpstr = src_ary[0].match(levelup_my_lv);
		result_ary[10] = tmpstr;
		tmpstr = src_ary[0].match(levelup_enemy_lv);
		result_ary[11] = tmpstr;
		// 兵士撃破数を取得
		tmpstr = src_ary[0].match(mtc_detail_data_heishi);
		result_ary[12] = tagsplit(tmpstr[0]);
		// キャスト撃破数
		tmpstr = src_ary[0].match(mtc_detail_data_cast);
		result_ary[13] = tagsplit(tmpstr[0]);
		// 巨人撃破数
		tmpstr = src_ary[0].match(mtc_detail_data_titan);
		result_ary[14] = tagsplit(tmpstr[0]);
		// 撤退数
		tmpstr = src_ary[0].match(mtc_detail_data_tettai);
		result_ary[15] = tagsplit(tmpstr[0]);
		// ストレートショット
		tmpstr = src_ary[0].match(mtc_detail_data_sts);
		result_ary[16] = tagsplit(tmpstr[0]);
		// ストレートショットHIT
		tmpstr = src_ary[0].match(mtc_detail_data_stshit);
		result_ary[17] = tagsplit(tmpstr[0]);
		// ドローショット
		tmpstr = src_ary[0].match(mtc_detail_data_drs);
		result_ary[18] = tagsplit(tmpstr[0]);
		// ドローショットHIT
		tmpstr = src_ary[0].match(mtc_detail_data_drshit);
		result_ary[19] = tagsplit(tmpstr[0]);
		// 帰城
		tmpstr = src_ary[0].match(mtc_detail_data_backhome);
		result_ary[20] = tagsplit(tmpstr[0]);
		// ストレートショット被HIT
		tmpstr = src_ary[0].match(mtc_detail_data_sts2hit);
		result_ary[21] = tagsplit(tmpstr[0]);
		// ドローショット被HIT
		tmpstr = src_ary[0].match(mtc_detail_data_drs2hit);
		result_ary[22] = tagsplit(tmpstr[0]);
		// 拠点破壊数
		tmpstr = src_ary[0].match(mtc_detail_data2_kyoten);
		result_ary[23] = tagsplit(tmpstr[0]);
		// 入手経験値
		tmpstr = src_ary[0].match(mtc_detail_data2_exp);
		result_ary[24] = tagsplit(tmpstr[0]);
		
		// 自プレイヤースキルアシスト情報を取得
		player[0] = src_ary[0].match(mtc_detail_skill);
		// スキル使用回数を取得
		card_chk = src_ary[0].match(mtc_detail_skill_count);
		// スキル使用回数特有のスペースやタブを除去
		for(cnt = 0; cnt < card_chk.length; cnt++){
			card_chk[cnt] = card_chk[cnt].replace(/\s+/g, "");
			card_chk[cnt] = card_chk[cnt].replace(/<.*>/, "");
		}
		player[1] = card_chk;
		player[2] = src_ary[0].match(mtc_detail_assist);
		player[3] = src_ary[0].match(mtc_detail_soul);
		
		// カードのレベルを取得
		card_chk = [];
		tmpstr = src_ary[0].split(mtc_detail_cardblock);
		for(cnt = 0; cnt < 8; cnt++){
			// LV MAXチェック
			var chkstr = tmpstr[cnt+1].match(mtc_detail_cardblock_lv_max);
			if(chkstr != null){
				card_chk[cnt] = "MAX";
			} else {
				chkstr = tmpstr[cnt+1].match(mtc_detail_cardblock_lv);
				if(chkstr != null){
					card_chk[cnt] = tagsplit(chkstr[0]);
				} else {
					card_chk[cnt] = "0";
				}
			}
		}
		player[4] = card_chk;
		
		// プレイヤーカード情報を格納
		result_ary[25] = player;
		
		// COMプレイヤーと使用キャストの確認
		for(cnt = 0; cnt < 7; cnt++){
			if(cnt < 3){
				chkreg = new RegExp("id=\"friend_" + cnt + "\"\\s*com=\"false\"");
			} else {
				var enemy_cnt = cnt - 3
				chkreg = new RegExp("id=\"enemy_" + enemy_cnt + "\"\\s*com=\"false\"");
			}
			if(src_ary[1].match(chkreg) == null){
				comchk[cnt] = 1;
			} else {
				comchk[cnt] = 0;
			}
		}
		
		// 他プレイヤーのための分割
		tmp_ary = src_ary[1].split("match_detail_member_pop");
		var player_cnt = 0;
		
		// 他プレイヤーのデータを取得
		for(cnt = 0; cnt < 7; cnt++){
			var member_tmp = [];
			
			// COMフラグの挿入
			member_tmp[0] = comchk[cnt];
			// COMでないなら取得を行う
			if(member_tmp[0] == 0){
				// tmpstr = tmp_ary[player_cnt].split(mtc_detail_cardblock);
				player_cnt++;
				member_tmp[1] = tmp_ary[player_cnt].match(mtc_detail_cast);
				tmpstr = tmp_ary[player_cnt].match(mp_mydata_name);
				member_tmp[2] = tagsplit(tmpstr[0]);
				tmpstr = tmp_ary[player_cnt].match(mp_mydata_location);
				member_tmp[3] = tagsplit(tmpstr[0]);
				member_tmp[4] = tmp_ary[player_cnt].match(mtc_detail_skill);
				member_tmp[5] = tmp_ary[player_cnt].match(mtc_detail_assist);
				member_tmp[6] = tmp_ary[player_cnt].match(mtc_detail_soul);
				// カードのレベルを取得
				card_chk = [];
				tmpstr = tmp_ary[player_cnt].split(mtc_detail_m_cardblock);
				for(var lvcnt = 0; lvcnt < 8; lvcnt++){
					var chkstr = tmpstr[lvcnt+1].match(mtc_detail_cardblock_lv_max);
					if(chkstr != null){
						card_chk[lvcnt] = "MAX";
					} else {
						var chkstr = tmpstr[lvcnt+1].match(mtc_detail_cardblock_lv);
						if(chkstr != null){
							card_chk[lvcnt] = tagsplit(chkstr[0]);
						} else {
							card_chk[lvcnt] = "0";
						}
					}
				}
				member_tmp[7] = card_chk;
				
				// パートナー値の取得
				tmpstr = tmp_ary[player_cnt].match(mtc_detail_m_with_num);
				if(tmpstr == null){
					// 敵チームは空欄
					member_tmp[8] = "";
					member_tmp[9] = "";
				} else {
					tmpstr = tmpstr[0].toString().replace(/.*\(/, "").replace(/\).*/, "").replace(/\"/g, "").split(",");
					member_tmp[8] = tmpstr[0];
					member_tmp[9] = tmpstr[1];
				}
				
			} else {
				// COMのとき
				member_tmp[1] = com_img;
				member_tmp[2] = "COM";
			}
			other_member[cnt] = member_tmp;
		}
		result_ary[26] = other_member;
		// 結果を格納
		result_battle[battle_cnt] = result_ary;
	}
}

// 集計処理
function syukei(syukei_date){
	var skip_cnt = 0;
	var suminichk_flg = 0;
	
	// 試合数だけ集計処理を行う
	for(cnt = 0; cnt < battle_cnt; cnt++){
		// 集計日時指定のチェック
		if(syukei_date != null){
			if(result_battle[cnt][0].toString().match(syukei_date.toString()) ){
				
			} else {
				skip_cnt++;
				continue;
			}
		}
		
		// 初回は集計データの初期化
		if(suminichk_flg == 0){
			cast_result_ini(cnt);
			suminichk_flg = 1;
		} else {
			// 集計に加算処理
			cast_result_add(0, cnt);
		}
		
		// キャストごとの重複チェック
		for(var okkiku = 0; okkiku < cast_cnt; okkiku++){
			// キャストの画像URLが一致した場合
			if(result_battle[cnt][5].toString() == cast_result[okkiku][0].toString()){
				cast_chkflg = okkiku;
				break;
			}
		}
		// キャストごとの集計
		if(cast_chkflg == -1){
			// 新たに見つかったキャストの場合
			cast_result_ini(cnt);
		} else {
			// 既に配列に存在しているキャストの場合
			cast_result_add(cast_chkflg, cnt);
			// フラグ初期化
			cast_chkflg = -1;
		}
		
		// マッチングキャストの集計
		match_cast_add(cnt);
	}
	battle_cnt -= skip_cnt;
}

// 表示処理
function hyouji(){
	inspos = document.getElementById("page_title");
	
	// タイトルを表示
	textNode.innerHTML = "本気でやっつけてやるんだから！"
	textNode.id = "page_title";
	inspos.parentNode.insertBefore(textNode, inspos);
	
	selecttest = document.createElement("select");
	selecttest.className = "select02";
	selecttest.setAttribute("onchange", "select_fun(this.value)");
	
	var option_def = document.createElement("option");
	option_def.value = 0;
	option_def.innerHTML = "オプション機能（テスト中の機能）";
	selecttest.appendChild(option_def);
	
	var option_now = document.createElement("option");
	option_now.value = 1;
	option_now.innerHTML = "今日は一緒に行けるの？（最新日のみ集計）";
	selecttest.appendChild(option_now);
	
	var option_lv5 = document.createElement("option");
	option_lv5.value = 2;
	option_lv5.innerHTML = "おおきくなるよ！（LV5先行時勝率計算）";
	selecttest.appendChild(option_lv5);
	
	var option_nan = document.createElement("option");
	option_nan.value = 10;
	option_nan.innerHTML = "ﾅﾝﾃﾞｯ!!（更新情報）";
	selecttest.appendChild(option_nan);
	
	inspos.parentNode.insertBefore(selecttest, inspos);
	
	// 試合結果表示
	gameNode = document.createElement("div");
	gameNode.className = "frame02_1";
	gameNode.style.marginTop = "72px";
	gameNode.style.marginBottom = "136px";
	
	nodetitle1 = document.createElement("div");
	nodetitle1.className = "frame02_1_title";
	nodetitle1.innerHTML = "試合結果（平均データ）";
	gameNode.appendChild(nodetitle1);
	
	// 使用キャスト画像を表示
	for(var cnt=0; cnt < cast_cnt; cnt++){
		imgNode_cast[cnt] = document.createElement("img");
		imgNode_cast[cnt].src = cast_result[cnt][0];
		imgNode_cast[cnt].width = icon_width;
		imgNode_cast[cnt].height = icon_height;
		
		var linkNode = document.createElement("a");
		linkNode.href = "JavaScript:changesum(" + cnt.toString() + ")";
		linkNode.appendChild(imgNode_cast[cnt]);
		gameNode.appendChild(linkNode);
	}
	
	// インナー定義
	innerNode = document.createElement("div");
	innerNode.className = "frame_inner";
	
	addNode("対象試合数", cast_result[0][1], 0, "result");
	addNode("勝利数(合計)", cast_result[0][2], 1, "result");
	addNode("敗北数(合計)", cast_result[0][3], 2, "result");
	addNode("勝率", (cast_result[0][2]*100/battle_cnt).toFixed() + "%", 3, "result");
	addNode("兵士撃破数", Math.floor(cast_result[0][18]/battle_cnt) + "体", 16, "result");
	addNode("キャスト撃破数", (Math.floor((cast_result[0][19]/battle_cnt)*100))/100 + "体", 17, "result");
	addNode("巨人撃破数", (Math.floor((cast_result[0][20]/battle_cnt)*100))/100 + "体", 18, "result");
	addNode("撤退数", (Math.floor((cast_result[0][21]/battle_cnt)*100))/100 + "回", 19, "result");
	
	// 0除算はいけないことなので阻止する
	if(cast_result[0][21] != 0){
		addNode("キルレ", (Math.floor((cast_result[0][19]/cast_result[0][21])*100))/100, 20, "result");
	} else {
		addNode("キルレ", "撤退数0！", 20, "result");
	}
	
	addNode("SS使用回数", (Math.floor((cast_result[0][22]/battle_cnt)*100))/100 + "回", 21, "result");
	addNode("SSヒット数", (Math.floor((cast_result[0][23]/battle_cnt)*100))/100 + "回", 22, "result");
	addNode("DS使用数", (Math.floor((cast_result[0][24]/battle_cnt)*100))/100 + "回", 23, "result");
	addNode("DSヒット数", (Math.floor((cast_result[0][25]/battle_cnt)*100))/100 + "回", 24, "result");
	addNode("帰城数", (Math.floor((cast_result[0][26]/battle_cnt)*100))/100 + "回", 25, "result");
	addNode("SS被弾数", (Math.floor((cast_result[0][27]/battle_cnt)*100))/100 + "回", 26, "result");
	addNode("DS被弾数", (Math.floor((cast_result[0][28]/battle_cnt)*100))/100 + "回", 27, "result");
	addNode("拠点破壊数", (Math.floor((cast_result[0][29]/battle_cnt)*100))/100 + "個", 28, "result");
	addNode("入手経験値量", (Math.floor((cast_result[0][30]/battle_cnt)*100))/100, 29, "result");
	addNode("味方LV2残時間", lvuptime(cast_result[0][4], battle_cnt), 4, "result");
	addNode("味方LV3残時間", lvuptime(cast_result[0][5], battle_cnt), 5, "result");
	addNode("味方LV4残時間", lvuptime(cast_result[0][6], battle_cnt), 6, "result");
	addNode("味方LV5残時間", lvuptime(cast_result[0][7], battle_cnt), 7, "result");
	addNode("味方LV6残時間", lvuptime(cast_result[0][8], battle_cnt), 8, "result");
	addNode("味方LV7残時間", lvuptime(cast_result[0][9], battle_cnt), 9, "result");
	addNode("敵LV2残時間", lvuptime(cast_result[0][11], battle_cnt), 10, "result");
	addNode("敵LV3残時間", lvuptime(cast_result[0][12], battle_cnt), 11, "result");
	addNode("敵LV4残時間", lvuptime(cast_result[0][13], battle_cnt), 12, "result");
	addNode("敵LV5残時間", lvuptime(cast_result[0][14], battle_cnt), 13, "result");
	addNode("敵LV6残時間", lvuptime(cast_result[0][15], battle_cnt), 14, "result");
	addNode("敵LV7残時間", lvuptime(cast_result[0][16], battle_cnt), 15, "result");
	
	// スキル使用回数のタイトルを作成
	skillNode = document.createElement("div");
	skillNode.className = "frame02_1";
	skillNode.style.marginTop = "72px";
	skillNode.style.marginBottom = "136px";
	
	nodetitle2 = document.createElement("div");
	nodetitle2.className = "frame02_1_title";
	nodetitle2.innerHTML = "スキル使用回数";
	skillNode.appendChild(nodetitle2);
	
	// 使用キャスト画像を表示
	for(var cnt=0; cnt < cast_cnt; cnt++){
		imgNode_skill[cnt] = document.createElement("img");
		imgNode_skill[cnt].src = cast_result[cnt][0];
		
		imgNode_skill[cnt].width = icon_width;
		imgNode_skill[cnt].height = icon_height;
		
		var linkNode = document.createElement("a");
		linkNode.href = "JavaScript:changesum(" + cnt.toString() + ")";
		linkNode.appendChild(imgNode_skill[cnt]);
		skillNode.appendChild(linkNode);
	}
	
	addNode("対象試合数", "キャストを選択してください", 0, "skill");
	addNode("DS使用数（平均）", "", 1, "skill");
	addNode("↓スキル使用回数", "", 2, "skill");
	
	// スキル枠初期化
	dtlNode = document.createElement("div");
	dtlNode.className = "mtc_detail_skill";
	dtlNode.style.position = "static";
	dtlNode.style.width = "100%";
	
	// 枠の確保
	addCard("common/img_card_thum/deck_nocard.png", "", 0, "skill");
	addCard("common/img_card_thum/deck_nocard.png", "", 1, "skill");
	addCard("common/img_card_thum/deck_nocard.png", "", 2, "skill");
	addCard("common/img_card_thum/deck_nocard.png", "", 3, "skill");
	addCard("common/img_card_thum/deck_nocard.png", "", 4, "skill");
	
	skillNode.appendChild(dtlNode);
	
	// マッチングキャストごと
	castNode = document.createElement("div");
	castNode.className = "frame02_1"
	castNode.style.marginTop = "72px";
	castNode.style.marginBottom = "136px";
	
	nodetitle3 = document.createElement("div");
	nodetitle3.className = "frame02_1_title";
	nodetitle3.innerHTML = "マッチングキャストデータ";
	castNode.appendChild(nodetitle3);
	
	// 使用キャスト画像を表示
	for(var cnt=0; cnt < match_cast_cnt; cnt++){
		imgNode_other[cnt] = document.createElement("img");
		imgNode_other[cnt].src = match_cast_result[cnt][0];
		imgNode_other[cnt].width = icon_width;
		imgNode_other[cnt].height = icon_height;
		
		var linkNode = document.createElement("a");
		linkNode.href = "JavaScript:changeother(" + cnt.toString() + ")";
		linkNode.appendChild(imgNode_other[cnt]);
		castNode.appendChild(linkNode);
	}
	
	// 項目情報
	addNode("マッチング回数", "0" + "回", 0, "cast");
	addNode("登場率", "0" + "%", 1, "cast");
	addNode("↓スキル採用率", "", 2, "cast");
	
	// スキル枠確保
	dtlNode = document.createElement("div");
	dtlNode.className = "mtc_detail_skill";
	dtlNode.style.position = "static";
	dtlNode.style.width = "100%";
	dtlNode.style.marginBottom = margin_bot;
	
	addCard("common/img_card_thum/deck_nocard.png", "", 0, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 1, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 2, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 3, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 4, "cast");
	castNode.appendChild(dtlNode);
	
	addNode("↓アシスト採用率", "", 3, "cast");
	
	dtlNode = document.createElement("div");
	dtlNode.className = "mtc_detail_skill";
	dtlNode.style.position = "static";
	dtlNode.style.width = "100%";
	dtlNode.style.marginBottom = margin_bot;
	
	addCard("common/img_card_thum/deck_nocard.png", "", 5, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 6, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 7, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 8, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 9, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 10, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 11, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 12, "cast");
	castNode.appendChild(dtlNode);
	
	// ソウル表示
	addNode("↓ソウル採用率", "", 4, "cast");
	
	dtlNode = document.createElement("div");
	dtlNode.className = "mtc_detail_skill";
	dtlNode.style.position = "static";
	dtlNode.style.width = "100%";
	dtlNode.style.marginBottom = margin_bot;
	
	addCard("common/img_card_thum/deck_nocard.png", "", 13, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 14, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 15, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 16, "cast");
	addCard("common/img_card_thum/deck_nocard.png", "", 17, "cast");
	castNode.appendChild(dtlNode);
	
	// ページに追加
	gameNode.appendChild(innerNode);
	inspos.parentNode.insertBefore(gameNode, inspos);
	inspos.parentNode.insertBefore(skillNode, inspos);
	inspos.parentNode.insertBefore(castNode, inspos);
}

// 使用キャスト集計初期化処理
function cast_result_ini(ary_no){
	var setcnt = 0;
	var cast_tmp = [];
	var skillName_tmp = [];
	var skillCnt_tmp = [];
	
	// 処理対象が全体の集計の場合は固定値
	if(cast_cnt == 0){
		// 集計用画像URLを格納
		cast_tmp[0] = sum_img;
	} else {
		// キャスト画像URLを格納
		cast_tmp[0] = result_battle[ary_no][5];
	}
	
	// 使用回数カウントを初期化
	cast_tmp[1] = 1;
	
	// 勝率計算
	if(result_battle[ary_no][9] == "win"){
		cast_tmp[2] = 1;
		cast_tmp[3] = 0;
	} else {
		cast_tmp[2] = 0;
		cast_tmp[3] = 1;
	}
	
	// 味方レベルアップ時間
	cast_tmp[4] = parseInt(lvsplit(result_battle[ary_no][10][0])) * battle_per;
	cast_tmp[5] = parseInt(lvsplit(result_battle[ary_no][10][1])) * battle_per;
	cast_tmp[6] = parseInt(lvsplit(result_battle[ary_no][10][2])) * battle_per;
	cast_tmp[7] = parseInt(lvsplit(result_battle[ary_no][10][3])) * battle_per;
	cast_tmp[8] = parseInt(lvsplit(result_battle[ary_no][10][4])) * battle_per;
	cast_tmp[9] = parseInt(lvsplit(result_battle[ary_no][10][5])) * battle_per;
	cast_tmp[10] = parseInt(lvsplit(result_battle[ary_no][10][6])) * battle_per;
	
	// 敵レベルアップ時間
	cast_tmp[11] = parseInt(lvsplit(result_battle[ary_no][11][0])) * battle_per;
	cast_tmp[12] = parseInt(lvsplit(result_battle[ary_no][11][1])) * battle_per;
	cast_tmp[13] = parseInt(lvsplit(result_battle[ary_no][11][2])) * battle_per;
	cast_tmp[14] = parseInt(lvsplit(result_battle[ary_no][11][3])) * battle_per;
	cast_tmp[15] = parseInt(lvsplit(result_battle[ary_no][11][4])) * battle_per;
	cast_tmp[16] = parseInt(lvsplit(result_battle[ary_no][11][5])) * battle_per;
	cast_tmp[17] = parseInt(lvsplit(result_battle[ary_no][11][6])) * battle_per;
	
	// 兵士撃破数
	cast_tmp[18] = parseInt(result_battle[ary_no][12]);
	// キャスト撃破数
	cast_tmp[19] = parseInt(result_battle[ary_no][13]);
	// 巨人撃破数
	cast_tmp[20] = parseInt(result_battle[ary_no][14]);
	// 撤退数
	cast_tmp[21] = parseInt(result_battle[ary_no][15]);
	// ストレートショット数
	cast_tmp[22] = parseInt(result_battle[ary_no][16]);
	// ストレートショットHIT数
	cast_tmp[23] = parseInt(result_battle[ary_no][17]);
	// ドローショット数
	cast_tmp[24] = parseInt(result_battle[ary_no][18]);
	// ドローショットHIT数
	cast_tmp[25] = parseInt(result_battle[ary_no][19]);
	// 帰城数
	cast_tmp[26] = parseInt(result_battle[ary_no][20]);
	// ストレートショット被HIT数
	cast_tmp[27] = parseInt(result_battle[ary_no][21]);
	// ドローショット被HIT数
	cast_tmp[28] = parseInt(result_battle[ary_no][22]);
	// 拠点破壊数
	cast_tmp[29] = parseInt(result_battle[ary_no][23]);
	// 入手経験値
	cast_tmp[30] = parseInt(result_battle[ary_no][24]);
	
	// スキルカード情報の初期化
	for(var skillcnt = 0; skillcnt < 5; skillcnt++){
		skillName_tmp[skillcnt] = nocard_img;
		skillCnt_tmp[skillcnt] = 0;
	}
	
	// 処理対象が全体の集計の場合は初期値のまま
	if(cast_cnt != 0){
	// スキル情報の格納
		for(skillcnt = 0; skillcnt < result_battle[ary_no][25][0].length; skillcnt++){
			// スキル画像が空欄カードだった場合は処理を行わない（空欄後詰め処理）
			if(result_battle[ary_no][25][0][skillcnt].toString() != nocard_img.toString()){
				// スキル名格納
				skillName_tmp[setcnt] = result_battle[ary_no][25][0][skillcnt];
				// スキル使用回数格納
				skillCnt_tmp[setcnt] = parseInt(result_battle[ary_no][25][1][skillcnt]);
				setcnt++;
			}
		}
	}
	// スキル情報をセット
	cast_tmp[31] = skillName_tmp;
	cast_tmp[32] = skillCnt_tmp;
	
	// キャスト集計結果の最初に集計を格納
	cast_result[cast_cnt] = cast_tmp;
	cast_cnt++;
}

// 使用キャスト集計処理
function cast_result_add(cast_no, ary_no){
	var cast_tmp = [];
	
	// 使用回数を加算
	cast_result[cast_no][1]++;
	// 勝率計算
	if(result_battle[ary_no][9] == "win"){
		cast_result[cast_no][2]++;
	} else {
		cast_result[cast_no][3]++;
	}
	// 味方レベルアップ時間
	cast_result[cast_no][4] += parseInt(lvsplit(result_battle[ary_no][10][0])) * battle_per;
	cast_result[cast_no][5] += parseInt(lvsplit(result_battle[ary_no][10][1])) * battle_per;
	cast_result[cast_no][6] += parseInt(lvsplit(result_battle[ary_no][10][2])) * battle_per;
	cast_result[cast_no][7] += parseInt(lvsplit(result_battle[ary_no][10][3])) * battle_per;
	cast_result[cast_no][8] += parseInt(lvsplit(result_battle[ary_no][10][4])) * battle_per;
	cast_result[cast_no][9] += parseInt(lvsplit(result_battle[ary_no][10][5])) * battle_per;
	cast_result[cast_no][10] += parseInt(lvsplit(result_battle[ary_no][10][6])) * battle_per;
	
	// 敵レベルアップ時間
	cast_result[cast_no][11] += parseInt(lvsplit(result_battle[ary_no][11][0])) * battle_per;
	cast_result[cast_no][12] += parseInt(lvsplit(result_battle[ary_no][11][1])) * battle_per;
	cast_result[cast_no][13] += parseInt(lvsplit(result_battle[ary_no][11][2])) * battle_per;
	cast_result[cast_no][14] += parseInt(lvsplit(result_battle[ary_no][11][3])) * battle_per;
	cast_result[cast_no][15] += parseInt(lvsplit(result_battle[ary_no][11][4])) * battle_per;
	cast_result[cast_no][16] += parseInt(lvsplit(result_battle[ary_no][11][5])) * battle_per;
	cast_result[cast_no][17] += parseInt(lvsplit(result_battle[ary_no][11][6])) * battle_per;
	
	// 兵士撃破数
	cast_result[cast_no][18] += parseInt(result_battle[ary_no][12]);
	// キャスト撃破数
	cast_result[cast_no][19] += parseInt(result_battle[ary_no][13]);
	// 巨人撃破数
	cast_result[cast_no][20] += parseInt(result_battle[ary_no][14]);
	// 撤退数
	cast_result[cast_no][21] += parseInt(result_battle[ary_no][15]);
	// ストレートショット数
	cast_result[cast_no][22] += parseInt(result_battle[ary_no][16]);
	// ストレートショットHIT数
	cast_result[cast_no][23] += parseInt(result_battle[ary_no][17]);
	// ドローショット数
	cast_result[cast_no][24] += parseInt(result_battle[ary_no][18]);
	// ドローショットHIT数
	cast_result[cast_no][25] += parseInt(result_battle[ary_no][19]);
	// 帰城数
	cast_result[cast_no][26] += parseInt(result_battle[ary_no][20]);
	// ストレートショット被HIT数
	cast_result[cast_no][27] += parseInt(result_battle[ary_no][21]);
	// ドローショット被HIT数
	cast_result[cast_no][28] += parseInt(result_battle[ary_no][22]);
	// 拠点破壊数
	cast_result[cast_no][29] += parseInt(result_battle[ary_no][23]);
	// 入手経験値
	cast_result[cast_no][30] += parseInt(result_battle[ary_no][24]);
	
	// 全体の集計の場合はここで終了
	if(cast_no == 0){
		return;
	}
	
	// スキル使用回数集計
	for(var skillcnt = 0; skillcnt < result_battle[ary_no][25][0].length; skillcnt++){
		// これまでに出現していないスキルカードの場合は0のまま
		var chkcard_flg = 0;
		
		// スキル画像が空欄カードだった場合は加算処理を行わない
		if(result_battle[ary_no][25][0][skillcnt].toString() != nocard_img.toString()){
			// 同名カードのチェック
			for(var chkcnt = 0; chkcnt < cast_result[cast_no][31].length; chkcnt++){
				// 同名カードがあった場合は加算処理
				if(cast_result[cast_no][31][chkcnt] == result_battle[ary_no][25][0][skillcnt].toString()){
					cast_result[cast_no][32][chkcnt] += parseInt(result_battle[ary_no][25][1][skillcnt]);
					chkcard_flg = 1;
					break;
				}
			}
			
			// まだ集計していないカードの場合
			if(chkcard_flg == 0){
				// 新カードURLと使用回数を格納する
				for(chkcnt = 0; chkcnt < cast_result[cast_no][31].length; chkcnt++){
					// まだカード情報が初期化されたままの最初の箇所に置き換える
					if(cast_result[cast_no][31][chkcnt].toString() == nocard_img.toString()){
						cast_result[cast_no][31][chkcnt] = result_battle[ary_no][25][0][skillcnt];
						cast_result[cast_no][32][chkcnt] = parseInt(result_battle[ary_no][25][1][skillcnt]);
						break;
					}
				}
			}
		}
	}
}

// マッチング相手の集計処理
function match_cast_add(ary_no){
	// マッチングキャスト上限の7キャスト分ループする、COMが含まれていても7回
	for(var match_cnt = 0; match_cnt < result_battle[ary_no][26].length; match_cnt++){
		var ary_tmp = [];
		var chkcast_flg = 0;
		
		// COMチェック
		if(result_battle[ary_no][26][match_cnt][0] == 0){
			// 既に格納されている集計データの中で、既出キャストでないかのチェック。初回は0なので飛ばす
			for(var cast_chk = 0; cast_chk < match_cast_cnt; cast_chk++){
				// 既出キャストチェック
				if(result_battle[ary_no][26][match_cnt][1].toString() == match_cast_result[cast_chk][0].toString()){
					// 既出だった場合、キャスト出現数カウントを増加
					match_cast_result[cast_chk][1]++;
					
					// ワンダースキルカードチェック
					var chkcard_flg = 0;
					// 今のところ複数は存在しないが、念のため（増えた場合は要確認）
					for(var chkcard = 0; chkcard < match_cast_result[cast_chk][2].length; chkcard++){
						// 既存の登録済みカードに存在するかのチェック
						if(result_battle[ary_no][26][match_cnt][4][0].toString() == match_cast_result[cast_chk][2][chkcard].toString()){
							match_cast_result[cast_chk][3][chkcard]++;
							chkcard_flg = 1;
							break;
						}
					}
					// 新規ワンダースキルカードの場合は追加
					if(chkcard_flg == 0){
						match_cast_result[cast_chk][2].push(result_battle[ary_no][26][match_cnt][4][0]);
						match_cast_result[cast_chk][3].push(1);
					}
					
					// スキルカード1～3チェック、0番はワンダースキルなので飛ばす
					for(var card_pos = 1; card_pos < 4; card_pos++){
						var chkcard_flg = 0;
						// 既存の登録済みカードに存在するかのチェック
						for(var chkcard = 0; chkcard < match_cast_result[cast_chk][4].length; chkcard++){
							if(result_battle[ary_no][26][match_cnt][4][card_pos].toString() == match_cast_result[cast_chk][4][chkcard].toString()){
								match_cast_result[cast_chk][5][chkcard]++;
								chkcard_flg = 1;
								break;
							}
						}
						// 新規スキルカードの場合は追加
						if(chkcard_flg == 0){
							match_cast_result[cast_chk][4].push(result_battle[ary_no][26][match_cnt][4][card_pos]);
							match_cast_result[cast_chk][5].push(1);
						}
					}
					
					// アシストカード1～3チェック
					for(var card_pos = 0; card_pos < 3; card_pos++){
						var chkcard_flg = 0;
						// 既存の登録済みカードに存在するかのチェック
						for(var chkcard = 0; chkcard < match_cast_result[cast_chk][6].length; chkcard++){
							if(result_battle[ary_no][26][match_cnt][5][card_pos].toString() == match_cast_result[cast_chk][6][chkcard].toString()){
								match_cast_result[cast_chk][7][chkcard]++;
								chkcard_flg = 1;
								break;
							}
						}
						// 新規アシストカードの場合は追加
						if(chkcard_flg == 0){
							match_cast_result[cast_chk][6].push(result_battle[ary_no][26][match_cnt][5][card_pos]);
							match_cast_result[cast_chk][7].push(1);
						}
					}
					
					// ソウルカードチェック
					var chkcard_flg = 0;
					for(var chkcard = 0; chkcard < match_cast_result[cast_chk][8].length; chkcard++){
						// 既存の登録済みカードに存在するかのチェック
						if(result_battle[ary_no][26][match_cnt][6][0].toString() == match_cast_result[cast_chk][8][chkcard].toString()){
							match_cast_result[cast_chk][9][chkcard]++;
							chkcard_flg = 1;
							break;
						}
					}
					// 新規ソウルカードの場合は追加
					if(chkcard_flg == 0){
						match_cast_result[cast_chk][8].push(result_battle[ary_no][26][match_cnt][6][0]);
						match_cast_result[cast_chk][9].push(1);
					}
					
					// 既出キャラであったことのフラグ
					chkcast_flg = 1;
					break;
				}
			}
			
			// まだ登録されていないキャストの場合
			if(chkcast_flg == 0){
				// キャスト画像
				ary_tmp[0] = result_battle[ary_no][26][match_cnt][1];
				// キャスト登場回数
				ary_tmp[1] = 1;
				// ワンダースキル
				ary_tmp[2] = [result_battle[ary_no][26][match_cnt][4][0]];
				ary_tmp[3] = [1];
				// スキル
				ary_tmp[4] = [result_battle[ary_no][26][match_cnt][4][1], result_battle[ary_no][26][match_cnt][4][2], result_battle[ary_no][26][match_cnt][4][3]]
				ary_tmp[5] = [1, 1, 1];
				// アシスト
				ary_tmp[6] = [result_battle[ary_no][26][match_cnt][5][0], result_battle[ary_no][26][match_cnt][5][1], result_battle[ary_no][26][match_cnt][5][2]];
				ary_tmp[7] = [1, 1, 1];
				// ソウル
				ary_tmp[8] = [result_battle[ary_no][26][match_cnt][6][0]];
				ary_tmp[9] = [1];
				match_cast_result[match_cast_cnt] = ary_tmp;
				// キャストの登録番号を進める
				match_cast_cnt++;
			}
			// COMはマッチングキャスト数に数えない（キャスト出現率の処理の都合上）
			match_cast_sum++;
		} else {
			// COMの場合 COMとのマッチング時に何か欲しい時に
		}
	}
}

// キャストをクリックした時の処理。試合結果とスキル使用回数は連動。マッチングキャストは別
function changesum(getcast){
	// クリック時透過処理、前回の透過アイコンも元に戻す
	imgNode_cast[getcast_sum].style.opacity = 1;
	imgNode_skill[getcast_sum].style.opacity = 1;
	getcast_sum = getcast;
	imgNode_cast[getcast].style.opacity = 0.5;
	imgNode_skill[getcast].style.opacity = 0.5;
	
	node_ary[0].innerHTML = cast_result[getcast][1];
	node_ary[1].innerHTML = cast_result[getcast][2];
	node_ary[2].innerHTML = cast_result[getcast][3];
	node_ary[3].innerHTML = (cast_result[getcast][2]*100/cast_result[getcast][1]).toFixed() + "%";
	node_ary[4].innerHTML = lvuptime(cast_result[getcast][4], cast_result[getcast][1]);
	node_ary[5].innerHTML = lvuptime(cast_result[getcast][5], cast_result[getcast][1]);
	node_ary[6].innerHTML = lvuptime(cast_result[getcast][6], cast_result[getcast][1]);
	node_ary[7].innerHTML = lvuptime(cast_result[getcast][7], cast_result[getcast][1]);
	node_ary[8].innerHTML = lvuptime(cast_result[getcast][8], cast_result[getcast][1]);
	node_ary[9].innerHTML = lvuptime(cast_result[getcast][9], cast_result[getcast][1]);
	node_ary[10].innerHTML = lvuptime(cast_result[getcast][11], cast_result[getcast][1]);
	node_ary[11].innerHTML = lvuptime(cast_result[getcast][12], cast_result[getcast][1]);
	node_ary[12].innerHTML = lvuptime(cast_result[getcast][13], cast_result[getcast][1]);
	node_ary[13].innerHTML = lvuptime(cast_result[getcast][14], cast_result[getcast][1]);
	node_ary[14].innerHTML = lvuptime(cast_result[getcast][15], cast_result[getcast][1]);
	node_ary[15].innerHTML = lvuptime(cast_result[getcast][16], cast_result[getcast][1]);
	node_ary[16].innerHTML = Math.floor(cast_result[getcast][18]/cast_result[getcast][1]) + "体";
	node_ary[17].innerHTML = (Math.floor((cast_result[getcast][19]/cast_result[getcast][1])*100))/100 + "体";
	node_ary[18].innerHTML = (Math.floor((cast_result[getcast][20]/cast_result[getcast][1])*100))/100 + "体";
	node_ary[19].innerHTML = (Math.floor((cast_result[getcast][21]/cast_result[getcast][1])*100))/100 + "回";
	// キルレのゼロ阻止
	if(cast_result[getcast][21] != 0){
		node_ary[20].innerHTML = (Math.floor((cast_result[getcast][19]/cast_result[getcast][21])*100))/100;
	} else {
		node_ary[20].innerHTML = "撤退数0！";
	}
	node_ary[21].innerHTML = (Math.floor((cast_result[getcast][22]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[22].innerHTML = (Math.floor((cast_result[getcast][23]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[23].innerHTML = (Math.floor((cast_result[getcast][24]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[24].innerHTML = (Math.floor((cast_result[getcast][25]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[25].innerHTML = (Math.floor((cast_result[getcast][26]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[26].innerHTML = (Math.floor((cast_result[getcast][27]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[27].innerHTML = (Math.floor((cast_result[getcast][28]/cast_result[getcast][1])*100))/100 + "回";
	node_ary[28].innerHTML = (Math.floor((cast_result[getcast][29]/cast_result[getcast][1])*100))/100 + "個";
	node_ary[29].innerHTML = (Math.floor((cast_result[getcast][30]/cast_result[getcast][1])*100))/100;
	
	skill_ary[0].innerHTML = cast_result[getcast][1];
	skill_ary[1].innerHTML = node_ary[23].innerHTML;
	skillimg_ary[0].src = cast_result[getcast][31][0];
	skillcnt_ary[0].innerHTML = (Math.floor((cast_result[getcast][32][0]/cast_result[getcast][1])*10))/10 + "回";
	skillimg_ary[1].src = cast_result[getcast][31][1];
	skillcnt_ary[1].innerHTML = (Math.floor((cast_result[getcast][32][1]/cast_result[getcast][1])*10))/10 + "回";
	skillimg_ary[2].src = cast_result[getcast][31][2];
	skillcnt_ary[2].innerHTML = (Math.floor((cast_result[getcast][32][2]/cast_result[getcast][1])*10))/10 + "回";
	skillimg_ary[3].src = cast_result[getcast][31][3];
	skillcnt_ary[3].innerHTML = (Math.floor((cast_result[getcast][32][3]/cast_result[getcast][1])*10))/10 + "回";
	skillimg_ary[4].src = cast_result[getcast][31][4];
	skillcnt_ary[4].innerHTML = (Math.floor((cast_result[getcast][32][4]/cast_result[getcast][1])*10))/10 + "回";
}

// マッチングキャスト表示
function changeother(getcast){
	// ソートの受け皿
	var getrank_ary = [];
	
	// クリック時透過処理、前回の透過アイコンも元に戻す
	imgNode_other[getcast_other].style.opacity = 1;
	getcast_other = getcast;
	imgNode_other[getcast].style.opacity = 0.5;
	
	cast_ary[0].innerHTML = match_cast_result[getcast][1] + "回";
	cast_ary[1].innerHTML = (Math.floor(match_cast_result[getcast][1]*10000/match_cast_sum))/100 + "%";
	
	// カード表示処理、配列には先頭から使用回数が多い順に配列番号が格納されている
	otheradd(getcast, 0, 0, "ws");
	
	// ワンダースキルが複数になったらこちらを使う（要確認）
	// getrank_ary = card_ranking(getcast, 1, "skill");
	// otheradd(getcast, 0, getrank_ary[0], "ws");
	
	getrank_ary = card_ranking(getcast, 4, "skill");
	otheradd(getcast, 1, getrank_ary[0], "skill");
	otheradd(getcast, 2, getrank_ary[1], "skill");
	otheradd(getcast, 3, getrank_ary[2], "skill");
	otheradd(getcast, 4, getrank_ary[3], "skill");
	
	getrank_ary = card_ranking(getcast, 8, "assist");
	otheradd(getcast, 5, getrank_ary[0], "assist");
	otheradd(getcast, 6, getrank_ary[1], "assist");
	otheradd(getcast, 7, getrank_ary[2], "assist");
	otheradd(getcast, 8, getrank_ary[3], "assist");
	otheradd(getcast, 9, getrank_ary[4], "assist");
	otheradd(getcast, 10, getrank_ary[5], "assist");
	otheradd(getcast, 11, getrank_ary[6], "assist");
	otheradd(getcast, 12, getrank_ary[7], "assist");
	
	getrank_ary = card_ranking(getcast, 5, "soul");
	otheradd(getcast, 13, getrank_ary[0], "soul");
	otheradd(getcast, 14, getrank_ary[1], "soul");
	otheradd(getcast, 15, getrank_ary[2], "soul");
	otheradd(getcast, 16, getrank_ary[3], "soul");
	otheradd(getcast, 17, getrank_ary[4], "soul");
}

// カードの登場回数順にソートして表示する処理
function card_ranking(getcast, addcnt, mode){
	// 登録回数の大きい順に配列番号を格納していく、引数はキャスト番号、返す長さ、処理カード種別
	work_ary = [];
	sort_ary = [];
	rank_ary = [];
	add_work = 0;
	mode_work = 0;
	over_cnt = 0;
	
	// 処理対象のカード種別によって配列番号に変換する
	if(mode.toString() == "ws"){
		mode_work = 3;
	} else if(mode.toString() == "skill"){
		mode_work = 5;
	} else if(mode.toString() == "assist"){
		mode_work = 7;
	} else if(mode.toString() == "soul"){
		mode_work = 9;
	}
	
	// 配列をソート済みとソート前でコピー、contact()は試した
	for(add_work = 0; add_work < match_cast_result[getcast][mode_work].length; add_work++){
		work_ary.push(match_cast_result[getcast][mode_work][add_work]);
		sort_ary.push(match_cast_result[getcast][mode_work][add_work]);
	}
	
	// 降順ソート処理
	sort_ary.sort(function sortNumber(a,b)
	{
		return b - a;
	});
	
	// 必要数まで出現位置を格納していく
	for(add_work = 0; add_work < addcnt; add_work++){
		if(sort_ary.length < add_work){
			// 表示したい数より登録されているカードが少ない場合は、それを超えた配列番号を参照するように返す（表示処理でブランクにしている）
			rank_ary[add_work] = add_work;
		} else {
			for(var item_cnt = 0; item_cnt < sort_ary.length; item_cnt++){
				// ソート済みの配列とソート前の配列を比較し、最大値と一致する値を見つける
				if(sort_ary[add_work] == work_ary[item_cnt]){
					// 配列番号を格納
					rank_ary[add_work] = item_cnt;
					// ソート前の配列の値を処理済みとしてマイナスに置き換え、同回数のカードの邪魔をしないようにする
					work_ary[item_cnt] = -1;
					break;
				}
			}
		}
	}
	
	return rank_ary;
}

// マッチングキャストの集計表示処理
function otheradd(getcast, aryno, itemno, mode){
	// モードによって追加処理を変える
	if(mode.toString() == "ws"){
		// カードデータが格納されているかチェック
		if(match_cast_result[getcast][2][itemno] != null){
			castcardimg_ary[aryno].src = match_cast_result[getcast][2][itemno];
			castcardcnt_ary[aryno].innerHTML = (Math.floor(match_cast_result[getcast][3][itemno]*1000/match_cast_result[getcast][1]))/10 + "%";
		} else {
			// カードが格納されていない場所が呼び出されたら空白を入れる
			castcardimg_ary[aryno].src = nocard_img;
			castcardcnt_ary[aryno].innerHTML = "";
		}
	} else if(mode.toString() == "skill"){
		if(match_cast_result[getcast][4][itemno] != null){
			castcardimg_ary[aryno].src = match_cast_result[getcast][4][itemno];
			castcardcnt_ary[aryno].innerHTML = (Math.floor(match_cast_result[getcast][5][itemno]*1000/match_cast_result[getcast][1]))/10 + "%";
		} else {
			castcardimg_ary[aryno].src = nocard_img;
			castcardcnt_ary[aryno].innerHTML = "";
		}
	} else if(mode.toString() == "assist"){
		if(match_cast_result[getcast][6][itemno] != null){
			castcardimg_ary[aryno].src = match_cast_result[getcast][6][itemno];
			castcardcnt_ary[aryno].innerHTML = (Math.floor(match_cast_result[getcast][7][itemno]*1000/match_cast_result[getcast][1]))/10 + "%";
		} else {
			castcardimg_ary[aryno].src = nocard_img;
			castcardcnt_ary[aryno].innerHTML = "";
		}
	} else if(mode.toString() == "soul"){
		if(match_cast_result[getcast][8][itemno] != null){
			castcardimg_ary[aryno].src = match_cast_result[getcast][8][itemno];
			castcardcnt_ary[aryno].innerHTML = (Math.floor(match_cast_result[getcast][9][itemno]*1000/match_cast_result[getcast][1]))/10 + "%";
		} else {
			castcardimg_ary[aryno].src = nocard_img;
			castcardcnt_ary[aryno].innerHTML = "";
		}
	}
}

// 文字列からタグを除去
function tagsplit(getstr){
	var strtmp = null;
	var rtstr = null;
	
	strtmp = getstr.split(">");
	rtstr = strtmp[1].split("<");
	return rtstr[0];
}

// レベルアップ時間を取得
function lvsplit(lvstr){
	var strtmp = null;
	
	// そのレベルに到達していない場合はundefinedが入るので、100（0:00）として扱う
	if(lvstr == undefined){
		return 100;
	}
	strtmp = lvstr.split("width:");
	return strtmp[1]
}

// レベルアップ時間を処理
function lvuptime(lvsec, batcnt){
	var lvup_tmp;
	var lvup_min;
	var lvup_sec;
	
	lvup_tmp = Math.floor(battle_time - lvsec / batcnt);
	lvup_min = Math.floor(lvup_tmp / 60);
	lvup_sec = lvup_tmp - lvup_min * 60;
	
	// 一桁秒は0をくっつける（3分5秒→3:5になるので3:05にする）
	if(lvup_sec < 10){
		return lvup_min + ":0" + lvup_sec;
	} else {
		return lvup_min + ":" + lvup_sec;
	}
}

// URLが対戦履歴ページ以外の場合はメッセージを表示する
function urlchk(){
	if(location.href.toString() == starturl1 || location.href.toString() == starturl2){
		return true;
	} else {
		alert("実行するページのアドレスが一致しません。\n【WLW】対戦履歴(全国対戦):Wonder.NET ワンダーランドウォーズ\n「https://wonderland-wars.net/matchlog.html」\n上記のページで実行してください。");
		return false;
	}
}

// ノードの追加
function addNode(titlestr, datastr, node_no, mode){
	var fixNode = document.createElement("div");
	fixNode.className = "block_playdata_01 clearfix";
	
	var tmpNode1 = document.createElement("div");
	tmpNode1.className = "block_playdata_01_title";
	tmpNode1.innerHTML = titlestr;
	
	var tmpNode2 = document.createElement("div");
	tmpNode2.className = "block_playdata_01_text";
	tmpNode2.innerHTML = datastr;
	
	fixNode.appendChild(tmpNode1);
	fixNode.appendChild(tmpNode2);
	
	if(mode.toString() == "result"){
		node_ary[node_no] = tmpNode2;
		innerNode.appendChild(fixNode);
	} else if(mode == "skill"){
		skill_ary[node_no] = tmpNode2;
		skillNode.appendChild(fixNode);
	} else if(mode == "cast"){
		cast_ary[node_no] = tmpNode2;
		castNode.appendChild(fixNode);
	}
}

// スキル表示枠初期化
function addCard(imgurl, usecnt, node_no, mode){
	var fixNode = document.createElement("div");
	fixNode.className = "mtc_detail_cardblock";
	
	var tmpImg1 = document.createElement("img");
	tmpImg1.src = imgurl;
	
	//tmpImg1.width = 60;
	//tmpImg1.height = 84;
	
	var tmpNode1 = document.createElement("div");
	tmpNode1.className = "mtc_detail_skill_count";
	tmpNode1.innerHTML = usecnt;
	
	fixNode.appendChild(tmpImg1);
	fixNode.appendChild(tmpNode1);
	
	if(mode == "skill"){
		skillimg_ary[node_no] = tmpImg1;
		skillcnt_ary[node_no] = tmpNode1;
		dtlNode.appendChild(fixNode);
	} else if(mode == "cast"){
		castcardimg_ary[node_no] = tmpImg1;
		castcardcnt_ary[node_no] = tmpNode1;
		dtlNode.appendChild(fixNode);
	}
}

// テスト版機能のメニュー
function select_fun(getno){
	
	if(betatest_flg != 0){
		alert("一部のオプション機能実行後には、続けてオプション機能は行えません。\n");
		return;
	}
	
	if(getno == 0){
		// 何もしない
	} else if(getno == 1){
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\n最新の入国した日を対象に集計処理します。\n一日に20戦以上した場合は変わりません。")){
			// 表示の削除処理
			inspos.parentNode.removeChild(textNode);
			inspos.parentNode.removeChild(gameNode);
			inspos.parentNode.removeChild(skillNode);
			inspos.parentNode.removeChild(castNode);
			inspos.parentNode.removeChild(selecttest);
			cast_cnt = 0;
			match_cast_cnt = 0;
			match_cast_sum = 0;
			var get_date = result_battle[0][0].toString().split(" ");
			syukei(get_date[0]);
			hyouji();
			alert(get_date[0] + "の試合は" + battle_cnt + "件です。");
			betatest_flg = 1;
		} else {
			return;
		}
	} else if(getno == 2){
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\nLv5先行有利を確認するための機能です。\nデータの都合上、レベルアップ時間は最大8秒ほどの誤差がありえます")){
			var saki_win = 0;
			var saki_lose = 0;
			var ato_win = 0;
			var ato_lose = 0;
			var draw_cnt = 0;
			
			for(var cnt = 0; cnt < battle_cnt; cnt++){
				if( parseInt(lvsplit(result_battle[cnt][10][3])) == parseInt(lvsplit(result_battle[cnt][11][3])) ){
					draw_cnt++;
				} else if( parseInt(lvsplit(result_battle[cnt][10][3])) < parseInt(lvsplit(result_battle[cnt][11][3])) ){
					if(result_battle[cnt][9].toString() == "win"){
						saki_win++;
					} else {
						saki_lose++;
					}
				} else {
					if(result_battle[cnt][9].toString() == "win"){
						ato_win++;
					} else {
						ato_lose++;
					}
				}
			}
			alert("対象試合数：" + battle_cnt + "\n自軍Lv5先行時\n勝率：" + Math.round((saki_win / (saki_win + saki_lose))*100) + "%　勝利数：" + saki_win + "　敗北数：" + saki_lose + "\n敵軍Lv5先行時\n勝率：" + Math.round((ato_win / (ato_win + ato_lose))*100) + "%　勝利数：" + ato_win + "　敗北数：" + ato_lose + "\nレベルアップ（ほぼ）同時試合数：" + draw_cnt);
		} else {
			return;
		}
	} else if(getno == 10){
		alert("ﾅﾝﾃﾞｯ!!\n最新の修正は2015/12/26です。\nオプション機能が追加されました。\nこの項目は試験的に作ったものであり、動作確認や結果のチェックが甘いです。");
	}
}
