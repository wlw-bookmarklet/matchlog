javascript:

// インフォメーションテキスト
var alert_info = "このアラートを閉じるとデータ取得を開始します。\n　///お知らせ///\n・舞踏会履歴でも実行できます(保存は不可)\n・2/7に読み込み処理を変更した影響で動かなくなった場合は、\nお手数ですがtwitterアカウント「@wlw_honkideya」かメールフォームへご連絡お願いします。\n・最終更新日 2016/2/28";
var kousin_info = "ﾅﾝﾃﾞｯ!!\n最新の修正は2016/2/28です。\nマップ別集計実行時、オプション機能のデータ表示と、MP使用量が正しくない不具合を修正しました。\n詳しくはtwitterアカウント「@wlw_honkideya」をご覧ください。";

// 実行するURL
var starturl1 = "https://wonderland-wars.net/matchlog.html";
var starturl2 = "https://wonderland-wars.net/matchlog.html?type=all";
var ballurl1 = "https://wonderland-wars.net/matchlog.html?type=bb";

// カード名取得用URL
var cardlist_url = "/card/mycard.json?type=skill&sort=ALLO";
// カードリスト格納用配列
var skill_list = null;

// 空欄カード用URL
var nocard_img = "common/img_card_thum/deck_nocard.png";
var com_img = "582e3423a336042b335de96584d116e2.png";

// 集計表示用アイコンURL
var sum_img = "582e3423a336042b335de96584d116e2.png";

// 表示補助用
var cast_url_plus = "common/img_cast/";
var skill_url_plus = "common/img_card_thum/skill/";
var assist_url_plus = "common/img_card_thum/assist/";
var soul_url_plus = "common/img_card_thum/soul/";

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
// 舞闘会パートナー値
var ball_detail_m_with_num = /<div class="ball_detail_m_with_num".*<\/div>/;

// 試合時間秒数*10
var battle_time = 420;
var battle_per = 4.2;

// url格納用文字列
var urlstr = null;
// 対象試合数変数
var battle_cnt = 0;
// 処理スキップ試合数
var skip_battle = 0;
// キャストカウンタ
var cast_cnt = 0;
// キャスト重複チェック
var cast_chkflg = -1;
// マッチングキャスト累計
var match_cast_sum = 0;
// マッチングキャストカウンタ
var match_cast_cnt = 0;
// 舞闘会モードフラグ
var ball_flg = 0;
// 戦闘履歴詳細フラグ
var detail_flg = 0;

// 試合結果を配列で格納する(※lengthと下記battle_chkで試合数をとること)
var result_battle = [];
// result_battleが集計対象であるかを格納する配列
var battle_chk = [];
// キャストごとの結果を配列で格納する
var cast_result = [];
// マッチングしたキャストの結果を格納する
var match_cast_result = [];
// プレイヤーのスキルをセットしていた回数を格納
var cast_result_skillset = [];
// プレイヤーのキャスト画像を格納する
var player_cast_img = [];
// プレイヤーのキャストのロールを格納する
var player_cast_role = [];
// プレイヤーのロール数を格納する
var player_role_ary = [0, 0, 0, 0];
// マッチングしたキャスト画像を格納する
var match_cast_img = [];
// マッチングしたキャストのロールを格納する
var match_cast_role = [];
// マッチングしたキャストのロール数を格納する
var match_role_ary = [0, 0, 0, 0];
// マッチングしたキャスト種類をカウント
var castimg_cnt = 0;
// 非同期処理用カウンタ
var matchurl_cnt = 0;

// 表示サイズ用
var icon_width = 0;
var icon_height = 0;
var icon_margin_bot = "20px";
var frame02_margin_bot = "136px";

// 表示用
var getcast_sum = 0;
var getcast_other = 0;
var imgNode_cast = [];
var imgNode_skill = [];
var imgNode_other = [];
var innerNode = null;
var selecttest = null;
var inspos = null;
var textNode = document.createElement("h2");
var gameNode = document.createElement("h2");
var skillNode = document.createElement("h2");
var castNode = document.createElement("h2");
var optNode = null;
var optInner = null;
var dtlNode = null;
var matchdate_ary = null;
var click_mycast = sum_img;

// 表示ノード用配列
var node_ary = [];
var skill_ary = [];
var skillimg_ary = [];
var skillcnt_ary = [];
var cast_ary = [];
var castcardimg_ary = [];
var castcardcnt_ary = [];
var nodetitle_text = "試合結果(平均データ)";

// テスト処理用
var betatest_flg = 0;
var opttitle = null;
var opt_ary = [];
var clickimg_opt = 0;
var imgNode_opt = [];
var clickimg_opt_num = 5;
var imgNode_opt_num = [];
var set_level_opt = 0;
var set_cast_opt = "";
var map_list = [];

// エラー用変数
var errstr = "";
var errnum = 0;
var errmsg = [
"正常に処理されました。\n"
,"ブックマークレットが既に実行済みです。\n複数回起動した場合、読み込み処理に異常が発生します。\n再度表示したい場合は、一度ページを更新してからブックマークレットを再実行してください。\nまた、この状態で保存は行わないでください。"
,"対戦履歴の取得件数が0件でした。\n対戦履歴が存在していないか、\n対戦履歴詳細のURLが変更されて読み込めなくなった可能性があります。\nまた、サーバーメンテナンス中にも発生します。"
,"通信エラーが発生しました。\nサーバーメンテナンス中のため読み込みできません。"
,"通信エラーが発生しました。\nログインが有効ではなくなっています、トップページからログインし直してみてください。"
,"通信エラーが発生しました。\n対戦履歴詳細ページへのアクセスに失敗しました。\n回線の安定している状態で再度実行してみてください。"
,"キャストデータの初期化処理時にエラーが発生しました。\n試合結果が正常に取得できなかったか、想定外のデータになっている可能性があります。"
,"キャストデータの集計処理時にエラーが発生しました。\n試合結果が正常に取得できなかったか、想定外のデータになっている可能性があります。"
,"マッチングキャストの集計中処理時にエラーが発生しました。\n試合結果が正常に取得できなかったか、想定外のデータになっている可能性があります。"
,"表示処理中にエラーが発生しました。\n集計した試合結果が想定外のデータになっている可能性があります。"
,"取得に失敗した試合と、正常に取得できた試合があります。\n正常に取得できた試合のみでの結果を表示します。\nまた、結果の保存は行わないでください。"
]

// 本処理
// 開始URLをチェックし、対戦履歴ページなら処理を開始する
if( urlchk() ){
	// 実行前のアラート
	alert(alert_info);
	
	// エラー表示用の日付取得
	try{
		if(ball_flg == 1){
			matchdate_ary = document.getElementsByClassName("ball_date");
		} else {
			matchdate_ary = document.getElementsByClassName("match_date");
		}
	} catch(e) {
		matchdate_ary = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	}
	
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
			new_request(urlstr, matchurl_cnt);
			matchurl_cnt++;
		}
		
		if(errnum != 0){
			break;
		}
	}
	// スキルデータの習得
	getskillList();
	
	if(errnum != 0){
		end_msg();
	} else if(matchurl_cnt == 0){
		// 試合が取得できなかった場合
		errnum = 2;
		end_msg();
	}
} else if (detail_flg == 1){
	urldetail();
} else {
	alert("ﾅﾝﾃﾞｯ!!");
}

// ページ取得処理
function new_request(urlstr, ary_no){
	var request = new XMLHttpRequest();
	try{
		request.open("GET", urlstr);
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200){
				getbattle(request.responseText, ary_no);
			}
		};
		request.send(null);
	} catch(e) {
		request.abort();
		errstr = "対象ページ:\n" + urlstr + "\n\n" + e;
		errnum = 5;
	}
}

// 対戦履歴詳細ページの情報を取得
function getbattle(src_txt, ary_no){
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
	
	try{
		// ログイン済みかのチェック
		if(src_txt.match("ログインフォーム")){
			errnum = 4;
			skip_battle++;
			return;
		}
		// サーバーメンテナンス中でないかのチェック
		if(src_txt.match("現在サーバーメンテナンス中です。")){
			errnum = 3;
			skip_battle++;
			return;
		}
		
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
		tmpstr = src_ary[0].match(mtc_detail_cast).toString().split("/");
		result_ary[5] = tmpstr[2];
		// タイムを取得
		tmpstr = src_ary[0].match(mtc_detail_time);
		result_ary[6] = tagsplit(tmpstr[0]);
		// 味方ゲージを取得
		result_ary[7] = parseInt( lvsplit( src_ary[0].match(mtc_detail_mygage).toString() ) );
		// 敵ゲージを取得
		result_ary[8] = parseInt( lvsplit( src_ary[0].match(mtc_detail_enemygage).toString() ) );
		// 勝敗を取得
		var win_lose = src_ary[0].match(mtc_detail_result);
		if(win_lose[0].match("icon_win.png") != null){
			result_ary[9] = "win";
		} else {
			result_ary[9] = "lose";
		}
		
		// レベルアップ時間を取得
		var lvup_ary = [];
		tmpstr = src_ary[0].match(levelup_my_lv);
		for(cnt = 0; cnt < 7; cnt++){
			if(tmpstr[cnt] == null){
				lvup_ary[cnt] = 100;
			} else {
				lvup_ary[cnt] = parseInt(lvsplit(tmpstr[cnt]));
			}
		}
		result_ary[10] = lvup_ary;
		
		var lvup_ary = [];
		tmpstr = src_ary[0].match(levelup_enemy_lv);
		for(cnt = 0; cnt < 7; cnt++){
			if(tmpstr[cnt] == null){
				lvup_ary[cnt] = 100;
			} else {
				lvup_ary[cnt] = parseInt(lvsplit(tmpstr[cnt]));
			}
		}
		result_ary[11] = lvup_ary;
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
		// スキルカードファイル名を取得
		player[0] = src_ary[0].match(mtc_detail_skill);
		if(player[0] != null){
			for(cnt = 0; cnt < player[0].length; cnt++){
				tmpstr = player[0][cnt].split("/");
				player[0][cnt] = tmpstr[3];
			}
			while(player[0].length < 4){
				player[0].push(nocard_img);
			}
		} else {
			tmpstr = [nocard_img, nocard_img, nocard_img, nocard_img];
			player[0] = tmpstr;
		}
		// スキル使用回数を取得
		card_chk = src_ary[0].match(mtc_detail_skill_count);
		// スキル使用回数特有のスペースやタブを除去
		if(card_chk != null){
			for(cnt = 0; cnt < card_chk.length; cnt++){
				card_chk[cnt] = card_chk[cnt].replace(/\s+/g, "");
				card_chk[cnt] = card_chk[cnt].replace(/<.*>/, "");
			}
			player[1] = card_chk;
			while(player[1].length < 4){
				player[1].push("0");
			}
		} else {
			card_chk = ["0", "0", "0", "0"];
			player[1] = card_chk;
		}
		// アシストカードファイル名を取得
		player[2] = src_ary[0].match(mtc_detail_assist);
		if(player[2] != null){
			for(cnt = 0; cnt < player[2].length; cnt++){
				tmpstr = player[2][cnt].split("/");
				player[2][cnt] = tmpstr[3];
			}
			while(player[2].length < 3){
				player[2].push(nocard_img);
			}
		} else {
			tmpstr = [nocard_img, nocard_img, nocard_img];
			player[2] = tmpstr;
		}
		// ソウルカードファイル名を取得
		player[3] = src_ary[0].match(mtc_detail_soul);
		if(player[3] != null){
			for(cnt = 0; cnt < player[3].length; cnt++){
				tmpstr = player[3][cnt].split("/");
				player[3][cnt] = tmpstr[3];
			}
		} else {
			tmpstr = [nocard_img];
			player[3] = tmpstr;
		}
		
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
				player_cnt++;
				// キャスト画像URL
				tmpstr = tmp_ary[player_cnt].match(mtc_detail_cast).toString().split("/");
				member_tmp[1] = tmpstr[2].toString();
				// プレイヤー名
				tmpstr = tmp_ary[player_cnt].match(mp_mydata_name);
				member_tmp[2] = tagsplit(tmpstr[0]);
				// 都道府県
				tmpstr = tmp_ary[player_cnt].match(mp_mydata_location);
				member_tmp[3] = tagsplit(tmpstr[0]);
				// 装備情報
				// スキルカード
				var eqary= [];
				tmpstr = tmp_ary[player_cnt].match(mtc_detail_skill);
				if(tmpstr != null){
					for(var eqcnt = 0; eqcnt < tmpstr.length; eqcnt++){
						var eqstr = tmpstr[eqcnt].toString().split("/");
						eqary[eqcnt] = eqstr[3].toString();
					}
					while(eqary.length < 4){
						eqary.push(nocard_img);
					}
					member_tmp[4] = eqary;
				} else {
					tmpstr = [nocard_img, nocard_img, nocard_img, nocard_img];
					member_tmp[4] = tmpstr;
				}
				// アシストカード
				var eqary= [];
				tmpstr = tmp_ary[player_cnt].match(mtc_detail_assist);
				if(tmpstr != null){
					for(var eqcnt = 0; eqcnt < tmpstr.length; eqcnt++){
						var eqstr = tmpstr[eqcnt].toString().split("/");
						eqary[eqcnt] = eqstr[3].toString();
					}
					while(eqary.length < 3){
						eqary.push(nocard_img);
					}
					member_tmp[5] = eqary;
				} else {
					tmpstr = [nocard_img, nocard_img, nocard_img];
					member_tmp[5] = tmpstr;
				}
				// ソウルカード
				var eqary= [];
				tmpstr = tmp_ary[player_cnt].match(mtc_detail_soul);
				if(tmpstr != null){
					for(var eqcnt = 0; eqcnt < tmpstr.length; eqcnt++){
						var eqstr = tmpstr[eqcnt].toString().split("/");
						eqary[eqcnt] = eqstr[3].toString();
					}
					member_tmp[6] = eqary;
				} else {
					tmpstr = [nocard_img];
					member_tmp[6] = tmpstr;
				}
				
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
				if(ball_flg == 0){
					tmpstr = tmp_ary[player_cnt].match(mtc_detail_m_with_num);
				} else {
					tmpstr = tmp_ary[player_cnt].match(ball_detail_m_with_num);
				}
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
		result_battle[ary_no] = result_ary;
		battle_cnt++;
		
	} catch(e) {
		errstr += "\n" + matchdate_ary[(battle_cnt + skip_battle)].innerHTML;
		skip_battle++;
	} finally {
		// 全件読み込みが終了したら後続処理へ
		if(matchurl_cnt == battle_cnt + skip_battle){
			// エラーチェック
			if(errnum != 0){
				end_msg();
			} else {
				compload();
			}
		}
	}
}

// 試合データ取得後処理
function compload(getstr, getmode){
	// 試合が取得できなかった場合
	if(battle_cnt == 0 && errnum == 0 && getmode == undefined){
		errnum = 2;
	}
	
	// 取得をスキップした試合がある場合
	if(skip_battle != 0){
		for(var cnt = 0; cnt < result_battle.length; cnt++){
			if(result_battle[cnt] == null){
				result_battle.splice(cnt, 1);
				cnt--;
			}
		}
	}
	battle_cnt = result_battle.length;
	
	if(errnum == 0){
		syukei(getstr, getmode);
	}
	
	// エラーが無ければ表示処理
	if(errnum == 0){
		// 画面サイズによってレイアウト用の値を設定
		if (window.innerWidth < 481) { 
			//表示領域が小さい時の処理
			icon_width = 30;
			icon_height = 35;
			card_width = 31;
			card_height = 44;
			icon_margin_bot ="10px";
			frame02_margin_bot = "68px";
			num_icon_width = "12";
			num_icon_height = "16";
			num_icon_margin = "6px";
		} else {
			//表示領域が大きい時の処理
			icon_width = 60;
			icon_height = 70;
			card_width = 62;
			card_height = 87;
			icon_margin_bot ="20px";
			frame02_margin_bot = "136px";
			num_icon_width = "24";
			num_icon_height = "32";
			num_icon_margin = "12px";
		}
		hyouji();
	}
	end_msg();
}

function end_msg(){
	// 終了メッセージ
	if(skip_battle != 0 && battle_cnt != 0 && errnum == 0){
		errnum = 10;
		alert("処理終了　エラー番号:" + errnum + "\n" + "取得試合数:" + battle_cnt + "\n" + "取得失敗試合数:" + skip_battle + "\n" + errmsg[errnum] + "\n対象試合時刻:" + errstr);
	} else if(battle_cnt != 0 && errnum == 0){
		alert("処理終了　エラー番号:" + errnum + "\n" + "取得試合数:" + battle_cnt + "\n" + errmsg[errnum]);
	} else {
		alert("処理終了　エラー番号:" + errnum + "\n" + errmsg[errnum] + "\n\n" + errstr);
	}
}

// 集計処理
function syukei(strdata, mode){
	var skip_cnt = 0;
	var suminichk_flg = 0;
	map_list = [];
	
	// 試合数だけ集計処理を行う
	for(cnt = 0; cnt < result_battle.length; cnt++){
		// マップリストの作成
		if(map_list.length == 0){
			map_list.push(result_battle[cnt][4]);
		} else {
			var map_chk = 0;
			for(var mapcnt = 0; mapcnt < map_list.length; mapcnt++){
				if(map_list[mapcnt] == result_battle[cnt][4]){
					map_chk = 1;
					break;
				}
			}
			if(map_chk == 0){
				map_list.push(result_battle[cnt][4]);
			}
		}
		// 集計日時指定のチェック
		if(mode == 1){
			if(result_battle[cnt][0].toString().match(strdata.toString()) ){
				// 日が一致した場合の処理（今はなし）
			} else {
				battle_chk[cnt] = 0;
				skip_cnt++;
				continue;
			}
		}
		
		// マップ名指定のチェック
		if(mode == 2){
			if(result_battle[cnt][4].toString().match(strdata.toString()) ){
				// マップが一致した場合の処理（今はなし）
			} else {
				battle_chk[cnt] = 0;
				skip_cnt++;
				continue;
			}
		}
		
		// 勝敗指定のチェック
		if(mode == 3){
			if(result_battle[cnt][9].toString().match(strdata.toString())){
				// 勝敗が一致した場合の処理（今はなし）
			} else {
				battle_chk[cnt] = 0;
				skip_cnt++;
				continue;
			}
		}
		battle_chk[cnt] = 1;
		
		// 初回は使用キャスト集計データの初期化
		if(suminichk_flg == 0){
			cast_result_ini(cnt);
			suminichk_flg = 1;
		} else {
			// 集計に加算処理
			cast_result_add(0, cnt);
		}
		// エラーチェック
		if(errnum != 0){
			alert("使用キャストの集計中にエラーが発生しました。\n対象試合日時:\n" + result_battle[cnt][0]);
			break;
		}
		
		// キャストごとの重複チェック
		for(var okkiku = 0; okkiku < cast_cnt; okkiku++){
			// キャストの画像URLが一致した場合
			if(cast_url_plus + result_battle[cnt][5].toString() == cast_result[okkiku][0].toString()){
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
		// エラーチェック
		if(errnum != 0){
			alert("キャストごとの集計中にエラーが発生しました。\n対象試合日時:\n" + result_battle[cnt][0]);
			break;
		}
		
		// マッチングキャストの集計
		match_cast_add(cnt);
		
		// エラーチェック
		if(errnum != 0){
			alert("マッチングキャストの集計中にエラーが発生しました。\n対象試合日時:\n" + result_battle[cnt][0]);
			break;
		}
	}
	battle_cnt -= skip_cnt;
}

// 表示処理
function hyouji(){
	try{
		// タイトルを表示
		inspos = document.getElementById("page_title"); 
		textNode.innerHTML = "本気でやっつけてやるんだから！";
		textNode.id = "page_title";
		inspos.parentNode.insertBefore(textNode, inspos);
		
		selecttest = document.createElement("select");
		selecttest.className = "select02";
		selecttest.setAttribute("onchange", "select_fun(this.value)");
		
		// オプション項目の表示
		addopt(0, "オプション機能(テスト中の機能)");
		addopt(1, "わかったよー！(最新日のみ集計)");
		if(ball_flg == 0){
			addopt(2, "そっちね！(マップ別集計)");
		}
		//addopt(6, "やったね！(勝利試合集計)");
		//addopt(7, "かなしいよー(敗北試合集計)");
		addopt(3, "いえい！(Lv先行時勝率計算)");
		addopt(4, "月に叢雲(ファイターに蓬莱)");
		addopt(5, "ｱﾀｰｯｸ!!(ファイター数別勝率)");
		if(ball_flg == 0){
			addopt(8, "ｼｭｰﾃｨﾝ!!(対戦履歴保存&読込)");
			addopt(9, "ﾖｯｹﾛｰ!!(保存データ初期化)");
		}
		addopt(10, "ﾅﾝﾃﾞｯ!!(更新情報)");
		inspos.parentNode.insertBefore(selecttest, inspos);
		
		if(battle_cnt < 1){
			return;
		}
		
		// 試合結果表示
		gameNode = document.createElement("div");
		gameNode.className = "frame02_1";
		gameNode.id = "gameNode";
		gameNode.style.marginTop = "72px";
		gameNode.style.marginBottom = frame02_margin_bot;
		
		nodetitle1 = document.createElement("div");
		nodetitle1.className = "frame02_1_title";
		nodetitle1.innerHTML = nodetitle_text;
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
		imgNode_cast[0].style.opacity = 0.5;
		
		// インナー定義
		innerNode = document.createElement("div");
		innerNode.className = "frame_inner";
		
		addNode("対象試合数", cast_result[0][1], 0, "result");
		addNode("勝利数(合計)", cast_result[0][2], 1, "result");
		addNode("敗北数(合計)", cast_result[0][3], 2, "result");
		addNode("勝率", (cast_result[0][2]*100/battle_cnt).toFixed() + "%", 3, "result");
		addNode("兵士撃破数", Math.floor(cast_result[0][18]/battle_cnt) + "体", 16, "result");
		addNode("キャスト撃破数", (Math.floor((cast_result[0][19]/battle_cnt)*10))/10 + "体", 17, "result");
		//addNode("巨人撃破数", (Math.floor((cast_result[0][20]/battle_cnt)*10))/10 + "体", 18, "result");
		addNode("撤退数", (Math.floor((cast_result[0][21]/battle_cnt)*10))/10 + "回", 19, "result");
		
		// 0除算はいけないことなので阻止する
		if(cast_result[0][21] != 0){
			addNode("キルレ", (Math.floor((cast_result[0][19]/cast_result[0][21])*100))/100, 20, "result");
		} else {
			addNode("キルレ", "撤退数0！", 20, "result");
		}
		addNode("SS使用/HIT数", (Math.floor((cast_result[0][22]/battle_cnt)*10))/10 + "回" + "/" + (Math.floor((cast_result[0][23]/battle_cnt)*10))/10 + "回", 21, "result");
		addNode("DS使用/HIT数", (Math.floor((cast_result[0][24]/battle_cnt)*10))/10 + "回" + "/" + (Math.floor((cast_result[0][25]/battle_cnt)*10))/10 + "回", 23, "result");
		addNode("帰城数", (Math.floor((cast_result[0][26]/battle_cnt)*10))/10 + "回", 25, "result");
		addNode("SS被弾数", (Math.floor((cast_result[0][27]/battle_cnt)*10))/10 + "回", 26, "result");
		addNode("DS被弾数", (Math.floor((cast_result[0][28]/battle_cnt)*10))/10 + "回", 27, "result");
		//addNode("拠点破壊数", (Math.floor((cast_result[0][29]/battle_cnt)*10))/10 + "個", 28, "result");
		//addNode("入手経験値量", (Math.floor((cast_result[0][30]/battle_cnt)*10))/10, 29, "result");
		addNode("LV2時間(味/敵)", lvuptime(cast_result[0][4], battle_cnt) + "/" + lvuptime(cast_result[0][11], battle_cnt), 4, "result");
		addNode("LV3時間(味/敵)", lvuptime(cast_result[0][5], battle_cnt) + "/" + lvuptime(cast_result[0][12], battle_cnt), 5, "result");
		addNode("LV4時間(味/敵)", lvuptime(cast_result[0][6], battle_cnt) + "/" + lvuptime(cast_result[0][13], battle_cnt), 6, "result");
		addNode("LV5時間(味/敵)", lvuptime(cast_result[0][7], battle_cnt) + "/" + lvuptime(cast_result[0][14], battle_cnt), 7, "result");
		addNode("LV6時間(味/敵)", lvuptime(cast_result[0][8], battle_cnt) + "/" + lvuptime(cast_result[0][15], battle_cnt), 8, "result");
		addNode("LV7時間(味/敵)", lvuptime(cast_result[0][9], battle_cnt) + "/" + lvuptime(cast_result[0][16], battle_cnt), 9, "result");
		
		// スキル使用回数のタイトルを作成
		skillNode = document.createElement("div");
		skillNode.className = "frame02_1";
		skillNode.style.marginTop = "72px";
		skillNode.style.marginBottom = frame02_margin_bot;
		
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
		imgNode_skill[0].style.opacity = 0.5;
		
		addNode("対象試合数", "キャストを選択してください", 0, "skill");
		addNode("MP使用量(平均)", "", 3, "skill");
		addNode("MP使用量(最大)", "", 4, "skill");
		//addNode("使用MP(最小記録)", "", 5, "skill");
		addNode("DS使用数", "", 1, "skill");
		addNode("↓スキル使用回数", "", 2, "skill");
		
		// スキル枠初期化
		dtlNode = document.createElement("div");
		dtlNode.className = "mtc_detail_skill";
		dtlNode.style.position = "static";
		dtlNode.style.width = "100%";
		
		// 枠の確保
		addCard(nocard_img, "", 0, "skill");
		addCard(nocard_img, "", 1, "skill");
		addCard(nocard_img, "", 2, "skill");
		addCard(nocard_img, "", 3, "skill");
		addCard(nocard_img, "", 4, "skill");
		
		skillNode.appendChild(dtlNode);
		
		// マッチングキャストごと
		castNode = document.createElement("div");
		castNode.className = "frame02_1"
		castNode.style.marginTop = "72px";
		castNode.style.marginBottom = frame02_margin_bot;
		
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
		dtlNode.style.marginBottom = icon_margin_bot;
		
		addCard(nocard_img, "", 0, "cast");
		addCard(nocard_img, "", 1, "cast");
		addCard(nocard_img, "", 2, "cast");
		addCard(nocard_img, "", 3, "cast");
		addCard(nocard_img, "", 4, "cast");
		castNode.appendChild(dtlNode);
		
		addNode("↓アシスト採用率", "", 3, "cast");
		
		dtlNode = document.createElement("div");
		dtlNode.className = "mtc_detail_skill";
		dtlNode.style.position = "static";
		dtlNode.style.width = "100%";
		dtlNode.style.marginBottom = icon_margin_bot;
		
		addCard(nocard_img, "", 5, "cast");
		addCard(nocard_img, "", 6, "cast");
		addCard(nocard_img, "", 7, "cast");
		addCard(nocard_img, "", 8, "cast");
		addCard(nocard_img, "", 9, "cast");
		addCard(nocard_img, "", 10, "cast");
		addCard(nocard_img, "", 11, "cast");
		addCard(nocard_img, "", 12, "cast");
		castNode.appendChild(dtlNode);
		
		// ソウル表示
		addNode("↓ソウル採用率", "", 4, "cast");
		
		dtlNode = document.createElement("div");
		dtlNode.className = "mtc_detail_skill";
		dtlNode.style.position = "static";
		dtlNode.style.width = "100%";
		dtlNode.style.marginBottom = icon_margin_bot;
		
		addCard(nocard_img, "", 13, "cast");
		addCard(nocard_img, "", 14, "cast");
		addCard(nocard_img, "", 15, "cast");
		addCard(nocard_img, "", 16, "cast");
		addCard(nocard_img, "", 17, "cast");
		castNode.appendChild(dtlNode);
		
		// キャスト登場率ランキング
		addNode("登場数ランキング", "対象試合数:" + battle_cnt, 15, "cast");
		
		dtlNode = document.createElement("div");
		dtlNode.className = "mtc_detail_skill";
		dtlNode.style.position = "static";
		dtlNode.style.width = "100%";
		dtlNode.style.marginBottom = icon_margin_bot;
		
		var getrank_ary = [];
		getrank_ary = card_ranking( "", 5, "castapp");
		if(getrank_ary == -1){
			cast_ary[0].innerHTML = "COM戦のみ";
		} else if(match_cast_result.length < 5){
			cast_ary[15].innerHTML = "表示キャスト数不足";
		} else {
			addCard(match_cast_result[getrank_ary[0]][0], "", 50, "cast");
			castcardcnt_ary[50].innerHTML = match_cast_result[getrank_ary[0]][1] + "回";
			addCard(match_cast_result[getrank_ary[1]][0], "", 51, "cast");
			castcardcnt_ary[51].innerHTML = match_cast_result[getrank_ary[1]][1] + "回";
			addCard(match_cast_result[getrank_ary[2]][0], "", 52, "cast");
			castcardcnt_ary[52].innerHTML = match_cast_result[getrank_ary[2]][1] + "回";
			addCard(match_cast_result[getrank_ary[3]][0], "", 53, "cast");
			castcardcnt_ary[53].innerHTML = match_cast_result[getrank_ary[3]][1] + "回";
			addCard(match_cast_result[getrank_ary[4]][0], "", 54, "cast");
			castcardcnt_ary[54].innerHTML = match_cast_result[getrank_ary[4]][1] + "回";
			castNode.appendChild(dtlNode);
		}
		
		// キャストロール比率
		addNode("チーム構成目安", "", 10, "cast");
		addNode("ファイター", "", 11, "cast");
		addNode("アタッカー", "", 12, "cast");
		addNode("サポーター", "", 13, "cast");
		
		// キャストロール取得
		for(var cnt = 0; cnt < cast_cnt; cnt++){
			player_setimg(cast_result[cnt][0], cnt);
		}
		
		// ページに追加
		gameNode.appendChild(innerNode);
		inspos.parentNode.insertBefore(gameNode, inspos);
		inspos.parentNode.insertBefore(skillNode, inspos);
		inspos.parentNode.insertBefore(castNode, inspos);
	} catch(e) {
		errstr = e;
		errnum = 9;
	}
}

// 使用キャスト集計初期化処理
function cast_result_ini(ary_no){
	var setcnt = 0;
	var cast_tmp = [];
	var skillName_tmp = [];
	var skillCnt_tmp = [];
	var skillset = [];
	try{
		// 処理対象が全体の集計の場合は固定値
		if(cast_cnt == 0){
			// 集計用画像URLを格納
			cast_tmp[0] = cast_url_plus + sum_img;
		} else {
			// キャスト画像URLを格納
			cast_tmp[0] = cast_url_plus + result_battle[ary_no][5];
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
		cast_tmp[4] = result_battle[ary_no][10][0] * battle_per;
		cast_tmp[5] = result_battle[ary_no][10][1] * battle_per;
		cast_tmp[6] = result_battle[ary_no][10][2] * battle_per;
		cast_tmp[7] = result_battle[ary_no][10][3] * battle_per;
		cast_tmp[8] = result_battle[ary_no][10][4] * battle_per;
		cast_tmp[9] = result_battle[ary_no][10][5] * battle_per;
		cast_tmp[10] = result_battle[ary_no][10][6] * battle_per;
		
		// 敵レベルアップ時間
		cast_tmp[11] = result_battle[ary_no][11][0] * battle_per;
		cast_tmp[12] = result_battle[ary_no][11][1] * battle_per;
		cast_tmp[13] = result_battle[ary_no][11][2] * battle_per;
		cast_tmp[14] = result_battle[ary_no][11][3] * battle_per;
		cast_tmp[15] = result_battle[ary_no][11][4] * battle_per;
		cast_tmp[16] = result_battle[ary_no][11][5] * battle_per;
		cast_tmp[17] = result_battle[ary_no][11][6] * battle_per;
		
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
			skillset[skillcnt] = -1;
		}
		
		// 処理対象が全体の集計の場合は初期値のまま
		if(cast_cnt != 0){
		// スキル情報の格納
			for(skillcnt = 0; skillcnt < result_battle[ary_no][25][0].length; skillcnt++){
				// スキル画像が空欄カードだった場合は処理を行わない（空欄後詰め処理）
				if(result_battle[ary_no][25][0][skillcnt].toString() != nocard_img.toString()){
					// スキル名格納
					skillName_tmp[setcnt] = skill_url_plus + result_battle[ary_no][25][0][skillcnt];
					// スキル使用回数格納
					skillCnt_tmp[setcnt] = parseInt(result_battle[ary_no][25][1][skillcnt]);
					skillset[setcnt] = 1;
					setcnt++;
				}
			}
		}
		cast_result_skillset[cast_cnt] = skillset;
		
		// スキル情報をセット
		cast_tmp[31] = skillName_tmp;
		cast_tmp[32] = skillCnt_tmp;
		
		// キャスト集計結果の最初に集計を格納
		cast_result[cast_cnt] = cast_tmp;
		cast_cnt++;
	} catch(e) {
		errstr = "試合番号:" + ary_no + "\n\n" + e;
		errnum = 6;
	}
}

// 使用キャスト集計処理
function cast_result_add(cast_no, ary_no){
	var cast_tmp = [];
	
	try{
		// 使用回数を加算
		cast_result[cast_no][1]++;
		// 勝率計算
		if(result_battle[ary_no][9] == "win"){
			cast_result[cast_no][2]++;
		} else {
			cast_result[cast_no][3]++;
		}
		// 味方レベルアップ時間
		cast_result[cast_no][4] += result_battle[ary_no][10][0] * battle_per;
		cast_result[cast_no][5] += result_battle[ary_no][10][1] * battle_per;
		cast_result[cast_no][6] += result_battle[ary_no][10][2] * battle_per;
		cast_result[cast_no][7] += result_battle[ary_no][10][3] * battle_per;
		cast_result[cast_no][8] += result_battle[ary_no][10][4] * battle_per;
		cast_result[cast_no][9] += result_battle[ary_no][10][5] * battle_per;
		cast_result[cast_no][10] += result_battle[ary_no][10][6] * battle_per;
		
		// 敵レベルアップ時間
		cast_result[cast_no][11] += result_battle[ary_no][11][0] * battle_per;
		cast_result[cast_no][12] += result_battle[ary_no][11][1] * battle_per;
		cast_result[cast_no][13] += result_battle[ary_no][11][2] * battle_per;
		cast_result[cast_no][14] += result_battle[ary_no][11][3] * battle_per;
		cast_result[cast_no][15] += result_battle[ary_no][11][4] * battle_per;
		cast_result[cast_no][16] += result_battle[ary_no][11][5] * battle_per;
		cast_result[cast_no][17] += result_battle[ary_no][11][6] * battle_per;
		
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
					if(cast_result[cast_no][31][chkcnt] == skill_url_plus + result_battle[ary_no][25][0][skillcnt].toString()){
						cast_result[cast_no][32][chkcnt] += parseInt(result_battle[ary_no][25][1][skillcnt]);
						cast_result_skillset[cast_no][chkcnt]++;
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
							cast_result[cast_no][31][chkcnt] = skill_url_plus + result_battle[ary_no][25][0][skillcnt];
							cast_result[cast_no][32][chkcnt] = parseInt(result_battle[ary_no][25][1][skillcnt]);
							cast_result_skillset[cast_no][chkcnt] = 1;
							break;
						}
					}
				}
			}
		}
	} catch(e) {
		errstr = "処理番号:" + ary_no + "\n\n" + e;
		errnum = 7;
	}
}

// マッチング相手の集計処理
function match_cast_add(ary_no){
	try {
		// マッチングキャスト上限の7キャスト分ループする、COMが含まれていても7回
		for(var match_cnt = 0; match_cnt < result_battle[ary_no][26].length; match_cnt++){
			var ary_tmp = [];
			var chkcast_flg = 0;
			
			// COMチェック
			if(result_battle[ary_no][26][match_cnt][0] == 0){
				// 既に格納されている集計データの中で、既出キャストでないかのチェック。初回は0なので飛ばす
				for(var cast_chk = 0; cast_chk < match_cast_cnt; cast_chk++){
					// 既出キャストチェック
					if(cast_url_plus + result_battle[ary_no][26][match_cnt][1].toString() == match_cast_result[cast_chk][0].toString()){
						// 既出だった場合、キャスト出現数カウントを増加
						match_cast_result[cast_chk][1]++;
						
						// ワンダースキルカードチェック
						for(var card_pos = 0; card_pos < 1; card_pos++){
							var chkcard_flg = 0;
							if(result_battle[ary_no][26][match_cnt][4][card_pos].toString() == nocard_img){
								continue;
							}
							// 今のところ複数は存在しないが、念のため（増えた場合は要確認）
							for(var chkcard = 0; chkcard < match_cast_result[cast_chk][2].length; chkcard++){
								// 既存の登録済みカードに存在するかのチェック
								if(skill_url_plus + result_battle[ary_no][26][match_cnt][4][0].toString() == match_cast_result[cast_chk][2][chkcard].toString()){
									match_cast_result[cast_chk][3][chkcard]++;
									chkcard_flg = 1;
									break;
								}
							}
							// 新規ワンダースキルカードの場合は追加
							if(chkcard_flg == 0){
								match_cast_result[cast_chk][2].push(skill_url_plus + result_battle[ary_no][26][match_cnt][4][0]);
								match_cast_result[cast_chk][3].push(1);
							}
						}
						
						// スキルカード1～3チェック、0番はワンダースキルなので飛ばす
						for(var card_pos = 1; card_pos < result_battle[ary_no][26][match_cnt][4].length; card_pos++){
							var chkcard_flg = 0;
							// 装備していない場合はスキップする
							if(result_battle[ary_no][26][match_cnt][4][card_pos].toString() == nocard_img){
								continue;
							}
							// 既存の登録済みカードに存在するかのチェック
							for(var chkcard = 0; chkcard < match_cast_result[cast_chk][4].length; chkcard++){
								if(match_cast_result[cast_chk][4][chkcard].toString().match(result_battle[ary_no][26][match_cnt][4][card_pos].toString())){
									match_cast_result[cast_chk][5][chkcard]++;
									chkcard_flg = 1;
									break;
								}
							}
							// 新規スキルカードの場合は追加
							if(chkcard_flg == 0){
								match_cast_result[cast_chk][4].push(skill_url_plus + result_battle[ary_no][26][match_cnt][4][card_pos]);
								match_cast_result[cast_chk][5].push(1);
							}
						}
						
						// アシストカード1～3チェック
						for(var card_pos = 0; card_pos < result_battle[ary_no][26][match_cnt][5].length; card_pos++){
							var chkcard_flg = 0;
							// 装備していない場合はスキップする
							if(result_battle[ary_no][26][match_cnt][5][card_pos].toString() == nocard_img){
								continue;
							}
							// 既存の登録済みカードに存在するかのチェック
							for(var chkcard = 0; chkcard < match_cast_result[cast_chk][6].length; chkcard++){
								if(match_cast_result[cast_chk][6][chkcard].toString().match(result_battle[ary_no][26][match_cnt][5][card_pos].toString())){
									match_cast_result[cast_chk][7][chkcard]++;
									chkcard_flg = 1;
									break;
								}
							}
							// 新規アシストカードの場合は追加
							if(chkcard_flg == 0){
								match_cast_result[cast_chk][6].push(assist_url_plus + result_battle[ary_no][26][match_cnt][5][card_pos]);
								match_cast_result[cast_chk][7].push(1);
							}
						}
						
						// ソウルカードチェック
						for(var card_pos = 0; card_pos < result_battle[ary_no][26][match_cnt][6].length; card_pos++){
							var chkcard_flg = 0;
							// 装備していない場合はスキップする
							if(result_battle[ary_no][26][match_cnt][6][card_pos].toString() == nocard_img){
								continue;
							}
							for(var chkcard = 0; chkcard < match_cast_result[cast_chk][8].length; chkcard++){
								// 既存の登録済みカードに存在するかのチェック
								if(match_cast_result[cast_chk][8][chkcard].toString().match(result_battle[ary_no][26][match_cnt][6][card_pos].toString())){
									match_cast_result[cast_chk][9][chkcard]++;
									chkcard_flg = 1;
									break;
								}
							}
							// 新規ソウルカードの場合は追加
							if(chkcard_flg == 0){
								match_cast_result[cast_chk][8].push(soul_url_plus + result_battle[ary_no][26][match_cnt][6][card_pos]);
								match_cast_result[cast_chk][9].push(1);
							}
						}
						
						// 既出キャラであったことのフラグ
						chkcast_flg = 1;
						break;
					}
				}
				
				// まだ登録されていないキャストの場合
				if(chkcast_flg == 0){
					// キャスト画像
					ary_tmp[0] = cast_url_plus + result_battle[ary_no][26][match_cnt][1];
					// キャスト登場回数
					ary_tmp[1] = 1;
					// ワンダースキル
					ary_tmp[2] = [];
					ary_tmp[3] = [];
					if(result_battle[ary_no][26][match_cnt][4][0] != nocard_img){
						ary_tmp[2].push(skill_url_plus + result_battle[ary_no][26][match_cnt][4][0]);
						ary_tmp[3].push(1);
					}
					// スキル
					ary_tmp[4] = [];
					ary_tmp[5] = [];
					for(var cnt = 1; cnt < result_battle[ary_no][26][match_cnt][4].length; cnt++){
						if(result_battle[ary_no][26][match_cnt][4][cnt] != nocard_img){
							ary_tmp[4].push(skill_url_plus + result_battle[ary_no][26][match_cnt][4][cnt]);
							ary_tmp[5].push(1);
						}
					}
					// アシスト
					ary_tmp[6] = [];
					ary_tmp[7] = [];
					for(var cnt = 0; cnt < result_battle[ary_no][26][match_cnt][5].length; cnt++){
						if(result_battle[ary_no][26][match_cnt][5][cnt] != nocard_img){
							ary_tmp[6].push(assist_url_plus + result_battle[ary_no][26][match_cnt][5][cnt]);
							ary_tmp[7].push(1);
						}
					}
					// ソウル
					ary_tmp[8] = [];
					ary_tmp[9] = [];
					for(var cnt = 0; cnt < result_battle[ary_no][26][match_cnt][6].length; cnt++){
						if(result_battle[ary_no][26][match_cnt][6][cnt] != nocard_img){
							ary_tmp[8].push(soul_url_plus + result_battle[ary_no][26][match_cnt][6][cnt]);
							ary_tmp[9].push(1);
						}
					}
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
	} catch(e) {
		errstr = "処理番号:" + ary_no + "\n\n" + e;
		errnum = 8;
	}
}

// プレイヤーキャストのロール取得用
function player_setimg(player_casturl, player_castno){
	player_cast_img[player_castno] = new Image();
	player_cast_img[player_castno].onload = function(){
		castimg_cnt++;
		if(cast_cnt == castimg_cnt){
			// キャスト画像のロールを取得
			for(cnt = 0; cnt < cast_cnt; cnt++){
				// 全キャスト集計はスキップ
				if(cnt == 0){
					continue;
				}
				
				if(player_cast_img[cnt].complete || player_cast_img[cnt].readyState === "complete"){
					player_cast_role[cnt] = img_proc(player_cast_img[cnt], "role");
				} else {
					player_cast_role[cnt] = "unknown";
				}
				
				// ロール別のキャスト数集計
				if(player_cast_role[cnt] == "F"){
					player_role_ary[0] += cast_result[cnt][1];
				} else if(player_cast_role[cnt] == "A"){
					player_role_ary[1] += cast_result[cnt][1];
				} else if(player_cast_role[cnt] == "S"){
					player_role_ary[2] += cast_result[cnt][1];
				} else {
					player_role_ary[3] += cast_result[cnt][1];
				}
			}
			
			// 数値を初期化
			castimg_cnt = 0;
			// キャストロール取得
			for(var cnt = 0; cnt < match_cast_result.length; cnt++){
				matchcast_setimg(match_cast_result[cnt][0], cnt);
			}
		}
	}
	player_cast_img[player_castno].src = player_casturl;
}

// マッチングキャストのロール取得用
function matchcast_setimg(match_casturl, match_castno){
	match_cast_img[match_castno] = new Image();
	match_cast_img[match_castno].onload = function(){
		castimg_cnt++;
		if(match_cast_cnt == castimg_cnt){
			// キャスト画像のロールを取得
			for(cnt = 0; cnt < match_cast_img.length; cnt++){
				if(match_cast_img[cnt].complete || match_cast_img[cnt].readyState === "complete"){
					match_cast_role[cnt] = img_proc(match_cast_img[cnt], "role");
				} else {
					match_cast_role[cnt] = "unknown";
				}
			}
			// ロール別のキャスト数集計
			for(var cnt = 0; cnt < match_cast_role.length; cnt++){
				if(match_cast_role[cnt] == "F"){
					match_role_ary[0] += match_cast_result[cnt][1];
				} else if(match_cast_role[cnt] == "A") {
					match_role_ary[1] += match_cast_result[cnt][1];
				} else if(match_cast_role[cnt] == "S") {
					match_role_ary[2] += match_cast_result[cnt][1];
				} else {
					match_role_ary[3] += match_cast_result[cnt][1];
				}
			}
			
			// 舞踏会履歴でない場合は、自キャストのロール分加算する
			match_role_ary[0] += player_role_ary[0];
			match_role_ary[1] += player_role_ary[1];
			match_role_ary[2] += player_role_ary[2];
			
			// キャスト総数を計算
			var sum_castroll = match_role_ary[0] + match_role_ary[1] + match_role_ary[2];
			// ロールに表示
			cast_ary[10].innerHTML = "対象キャスト数:" + sum_castroll;
			cast_ary[11].innerHTML = Math.floor(match_role_ary[0] * 1000 / sum_castroll) / 10 + "%";
			cast_ary[12].innerHTML = Math.floor(match_role_ary[1] * 1000 / sum_castroll) / 10 + "%";
			cast_ary[13].innerHTML = Math.floor(match_role_ary[2] * 1000 / sum_castroll) / 10 + "%";
			
			// 数値を初期化
			castimg_cnt = 0;
		}
	}
	match_cast_img[match_castno].src = match_casturl;
}

// キャストをクリックした時の処理。試合結果とスキル使用回数は連動。マッチングキャストは別
function changesum(getcast){
	// クリックしたキャスト画像を格納
	click_mycast = cast_result[getcast][0];
	
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
	node_ary[4].innerHTML = lvuptime(cast_result[getcast][4], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][11], cast_result[getcast][1]);
	node_ary[5].innerHTML = lvuptime(cast_result[getcast][5], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][12], cast_result[getcast][1]);
	node_ary[6].innerHTML = lvuptime(cast_result[getcast][6], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][13], cast_result[getcast][1]);
	node_ary[7].innerHTML = lvuptime(cast_result[getcast][7], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][14], cast_result[getcast][1]);
	node_ary[8].innerHTML = lvuptime(cast_result[getcast][8], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][15], cast_result[getcast][1]);
	node_ary[9].innerHTML = lvuptime(cast_result[getcast][9], cast_result[getcast][1]) + "/" + lvuptime(cast_result[getcast][16], cast_result[getcast][1]);
	node_ary[16].innerHTML = Math.floor(cast_result[getcast][18]/cast_result[getcast][1]) + "体";
	node_ary[17].innerHTML = (Math.floor((cast_result[getcast][19]/cast_result[getcast][1])*10))/10 + "体";
	//node_ary[18].innerHTML = (Math.floor((cast_result[getcast][20]/cast_result[getcast][1])*10))/10 + "体";
	node_ary[19].innerHTML = (Math.floor((cast_result[getcast][21]/cast_result[getcast][1])*10))/10 + "回";
	// キルレのゼロ阻止
	if(cast_result[getcast][21] != 0){
		node_ary[20].innerHTML = (Math.floor((cast_result[getcast][19]/cast_result[getcast][21])*100))/100;
	} else {
		node_ary[20].innerHTML = "撤退数0！";
	}
	node_ary[21].innerHTML = (Math.floor((cast_result[getcast][22]/cast_result[getcast][1])*10))/10 + "回" + "/" + (Math.floor((cast_result[getcast][23]/cast_result[getcast][1])*10))/10 + "回";
	node_ary[23].innerHTML = (Math.floor((cast_result[getcast][24]/cast_result[getcast][1])*10))/10 + "回" + "/" + (Math.floor((cast_result[getcast][25]/cast_result[getcast][1])*10))/10 + "回";
	node_ary[25].innerHTML = (Math.floor((cast_result[getcast][26]/cast_result[getcast][1])*10))/10 + "回";
	node_ary[26].innerHTML = (Math.floor((cast_result[getcast][27]/cast_result[getcast][1])*10))/10 + "回";
	node_ary[27].innerHTML = (Math.floor((cast_result[getcast][28]/cast_result[getcast][1])*10))/10 + "回";
	//node_ary[28].innerHTML = (Math.floor((cast_result[getcast][29]/cast_result[getcast][1])*10))/10 + "個";
	//node_ary[29].innerHTML = (Math.floor((cast_result[getcast][30]/cast_result[getcast][1])*10))/10;
	
	skill_ary[0].innerHTML = cast_result[getcast][1];
	skill_ary[1].innerHTML = (Math.floor((cast_result[getcast][24]/cast_result[getcast][1])*10))/10 + "回";
	// 使用MP表示
	var getmpdata = [];
	if(getcast != 0){
		getmpdata = getbattle_mp(cast_result[getcast][0]);
	} else {
		getmpdata[0] = "err";
	}
	if(getmpdata[0] == "err"){
		skill_ary[3].innerHTML = "";
		skill_ary[4].innerHTML = "";
		//skill_ary[5].innerHTML = "";
	} else {
		skill_ary[3].innerHTML = getmpdata[0];
		skill_ary[4].innerHTML = getmpdata[1];
		//skill_ary[5].innerHTML = getmpdata[3];
	}
	skillimg_ary[0].src = cast_result[getcast][31][0];
	skillcnt_ary[0].innerHTML = (Math.floor((cast_result[getcast][32][0]/cast_result_skillset[getcast][0])*10))/10 + "回";
	skillimg_ary[1].src = cast_result[getcast][31][1];
	skillcnt_ary[1].innerHTML = (Math.floor((cast_result[getcast][32][1]/cast_result_skillset[getcast][1])*10))/10 + "回";
	skillimg_ary[2].src = cast_result[getcast][31][2];
	skillcnt_ary[2].innerHTML = (Math.floor((cast_result[getcast][32][2]/cast_result_skillset[getcast][2])*10))/10 + "回";
	skillimg_ary[3].src = cast_result[getcast][31][3];
	skillcnt_ary[3].innerHTML = (Math.floor((cast_result[getcast][32][3]/cast_result_skillset[getcast][3])*10))/10 + "回";
	skillimg_ary[4].src = cast_result[getcast][31][4];
	skillcnt_ary[4].innerHTML = (Math.floor((cast_result[getcast][32][4]/cast_result_skillset[getcast][4])*10))/10 + "回";
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
	
	// マッチングしたキャストがいない場合
	if(match_cast_result.length == 0){
		return -1;
	}
	
	// 処理対象のカード種別によって配列番号に変換する
	if(mode.toString() == "ws"){
		mode_work = 3;
	} else if(mode.toString() == "skill"){
		mode_work = 5;
	} else if(mode.toString() == "assist"){
		mode_work = 7;
	} else if(mode.toString() == "soul"){
		mode_work = 9;
	} else if(mode.toString() == "castapp"){
		mode_work = 1;
	}
	
	// 配列をソート済みとソート前でコピー、contact()は試した
	if(mode_work != 1){
		for(add_work = 0; add_work < match_cast_result[getcast][mode_work].length; add_work++){
			work_ary.push(match_cast_result[getcast][mode_work][add_work]);
			sort_ary.push(match_cast_result[getcast][mode_work][add_work]);
		}
	} else if(mode_work == 1){
		for(add_work = 0; add_work < match_cast_result.length; add_work++){
			work_ary.push(match_cast_result[add_work][mode_work]);
			sort_ary.push(match_cast_result[add_work][mode_work]);
		}
	}
	
	// 降順ソート処理
	sort_ary.sort(function sortNumber(a,b)
	{
		return b - a;
	});
	
	// 必要数まで出現位置を格納していく
	for(add_work = 0; add_work < addcnt; add_work++){
		if(sort_ary.length <= add_work){
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
	} else if(location.href.toString() == ballurl1){
		ball_flg = 1;
		return true;
	} else if(location.href.toString().match(/matchlogdetail/i)){
		detail_flg = 1;
		return false;
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
	/*
	if(mode == "result" && 4 <= node_no && node_no <= 9){
		var linkNode = document.createElement("a");
		linkNode.href = "JavaScript:level_senkou(" + (node_no - 2).toString() + ")";
		linkNode.appendChild(tmpNode1);
		fixNode.appendChild(linkNode);
	} else {
		fixNode.appendChild(tmpNode1);
	}
	*/
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
	} else if(mode == "opt"){
		opt_ary[node_no] = tmpNode2;
		optInner.appendChild(fixNode);
	}
}

// スキル表示枠初期化
function addCard(imgurl, usecnt, node_no, mode){
	var fixNode = document.createElement("div");
	fixNode.className = "mtc_detail_cardblock";
	
	var tmpImg1 = document.createElement("img");
	tmpImg1.src = imgurl;
	
	if(imgurl.match(cast_url_plus)){
		tmpImg1.setAttribute("width", icon_width);
		tmpImg1.setAttribute("height", icon_height);
	} else {
		tmpImg1.setAttribute("width", card_width);
		tmpImg1.setAttribute("height", card_height);
	}
	
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

// 画像処理用関数
function img_proc(getimg, mode){
	var rtn = "";
	// キャストのロール判定
	if(mode == "role"){
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		width = getimg.naturalWidth;
		height = getimg.naturalHeight;
		canvas.width = width;
		canvas.height = height;
		context.drawImage(getimg, 0, 0);
		
		var imgdata = context.getImageData(0, 0, 70, 65);
		var idx1 = (18 + 30 * imgdata.width) * 4;
		var idx2 = (19 + 30 * imgdata.width) * 4;
		var idx3 = (20 + 30 * imgdata.width) * 4;
		var cast_pix1 = imgdata.data[idx1];
		var cast_pix2 = imgdata.data[idx2];
		var cast_pix3 = imgdata.data[idx3];
		
		if(cast_pix1 > 100 && cast_pix2 < 100 && cast_pix3 < 100){
			rtn = "F";
		} else if(cast_pix1 < 100 && cast_pix2 < 100 && cast_pix3 < 100) {
			rtn = "A";
		} else if(cast_pix1 < 100 && cast_pix2 < 100 && cast_pix3 > 100) {
			rtn = "S";
		} else {
			rtn = "unknown";
		}
	} else {
		rtn = "";
	}
	return rtn;
}

// テスト版機能のメニュー
function select_fun(getno){
	// ローカルストレージに保存する処理
	var lsold_name = "honkide_old";
	var lsnew_name = "honkide_new";
	var lscnt_name = "honkide_cnt";
	var lsidx_name = "honkide_idx";
	var lsmap_name = "honkide_map";
	var lsdata_name = "honkide_data";
	
	// オプション表示があったら削除
	try{
		inspos.parentNode.removeChild(optNode);
	} catch(e) {
		
	}
	
	if(getno == 0){
		// 何もしない
	} else if(getno == 1){
		if(errnum != 0){
			alert("実行時にエラーが発生しています。\nエラー発生時にこの機能は使用できません。\nエラーメッセージ:\n" + errmsg[errnum]);
			return;
		}
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\n最新の入国した日を対象に集計処理します。\n一日に20戦以上した場合は変わりません。")){
			// 集計処理のリセット
			syukei_reset("試合結果(最新日)");
			
			// 最新日付の取得
			var get_date = result_battle[0][0].toString().split(" ");
			compload(get_date[0], 1);
		} else {
			return;
		}
	} else if(getno == 2){
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\nマップを指定して集計処理を行います。\n保存＆読込機能との併用向け機能です。")){
			var optpos = document.getElementById("gameNode");
			
			optNode = document.createElement("div");
			optNode.className = "frame02_1";
			optNode.style.marginTop = "72px";
			optNode.style.marginBottom = frame02_margin_bot;
			
			optInner = document.createElement("div");
			optInner.className = "frame_inner";
			
			opttitle = document.createElement("div");
			opttitle.className = "frame02_1_title";
			opttitle.innerHTML = "マップ別集計";
			optNode.appendChild(opttitle);
			
			var selectmap = document.createElement("select");
			selectmap.className = "select02";
			selectmap.setAttribute("onchange", "map_search(this.value)");
			
			var option_map = document.createElement("option");
			option_map.value = "";
			option_map.innerHTML = "マップを選択してください。";
			selectmap.appendChild(option_map);
			
			for(var mapcnt = 0; mapcnt < map_list.length; mapcnt++){
				var option_map = document.createElement("option");
				option_map.value = map_list[mapcnt];
				option_map.innerHTML = map_list[mapcnt];
				selectmap.appendChild(option_map);
			}
			var option_map = document.createElement("option");
			option_map.value = "全マップ";
			option_map.innerHTML = "すべてのマップ";
			selectmap.appendChild(option_map);
			
			optInner.appendChild(selectmap);
			optNode.appendChild(optInner);
			optpos.parentNode.insertBefore(optNode, optpos);
		} else {
			return;
		}
	} else if(getno == 3){
		level_senkou_hyouji();
	} else if(getno == 4){
		var asi_name1 = "40fccec8d9cb07df38aa92bff5cc286f.png";
		var asi_name2 = "a011a3e3393e878c050ff2cda3562bc7.png";
		var asi_name3 = "6378a4b29ccd6056d243c8befb88b357.png";
		
		alert("注意：テスト機能のため、結果や動作のチェックが甘いです。\n\n 蓬莱の玉の枝等の数による、\nLv5時平均残り時間比較です。\n味方や敵を区別しないチーム単位での平均値です。\n特殊効果発動ロールが装備しているのかは考慮していません。");
		var asi_ary1 = team_result(asi_name1, 1);
		var asi_ary2 = team_result(asi_name2, 1);
		var asi_ary3 = team_result(asi_name3, 1);
		
		if(asi_ary1 != false && asi_ary2 != false && asi_ary3 != false){
			// 結果表示
			var optpos = document.getElementById("gameNode");
			
			optNode = document.createElement("div");
			optNode.className = "frame02_1";
			optNode.style.marginTop = "72px";
			optNode.style.marginBottom = frame02_margin_bot;
			
			optInner = document.createElement("div");
			optInner.className = "frame_inner";
			
			opttitle = document.createElement("div");
			opttitle.className = "frame02_1_title";
			opttitle.innerHTML = "アシスト別Lv5時間";
			optNode.appendChild(opttitle);
			
			addNode("蓬莱の玉の枝","Lv5残時間/チーム数", 0, "opt");
			addNode("0本", asi_ary1[1][0] + "/" + asi_ary1[0][0] + "チーム", 1, "opt");
			addNode("1本", asi_ary1[1][1] + "/" + asi_ary1[0][1] + "チーム", 2, "opt");
			addNode("2本", asi_ary1[1][2] + "/" + asi_ary1[0][2] + "チーム", 3, "opt");
			addNode("3本", asi_ary1[1][3] + "/" + asi_ary1[0][3] + "チーム", 4, "opt");
			addNode("4本", asi_ary1[1][4] + "/" + asi_ary1[0][4] + "チーム", 5, "opt");
			
			addNode("青い羽のイヤリング","", 10, "opt");
			addNode("0個", asi_ary2[1][0] + "/" + asi_ary2[0][0] + "チーム", 11, "opt");
			addNode("1個", asi_ary2[1][1] + "/" + asi_ary2[0][1] + "チーム", 12, "opt");
			addNode("2個", asi_ary2[1][2] + "/" + asi_ary2[0][2] + "チーム", 13, "opt");
			addNode("3個", asi_ary2[1][3] + "/" + asi_ary2[0][3] + "チーム", 14, "opt");
			addNode("4個", asi_ary2[1][4] + "/" + asi_ary2[0][4] + "チーム", 15, "opt");
			
			addNode("誠実な王の服","", 20, "opt");
			addNode("0着", asi_ary3[1][0] + "/" + asi_ary3[0][0] + "チーム", 21, "opt");
			addNode("1着", asi_ary3[1][1] + "/" + asi_ary3[0][1] + "チーム", 22, "opt");
			addNode("2着", asi_ary3[1][2] + "/" + asi_ary3[0][2] + "チーム", 23, "opt");
			addNode("3着", asi_ary3[1][3] + "/" + asi_ary3[0][3] + "チーム", 24, "opt");
			addNode("4着", asi_ary3[1][4] + "/" + asi_ary3[0][4] + "チーム", 25, "opt");
			
			optNode.appendChild(optInner);
			optpos.parentNode.insertBefore(optNode, optpos);
		} else {
			alert("取得に失敗しました。");
		}
	} else if(getno == 5){
		role_win("F");
	} else if(getno == 6){
		syukei_reset("試合結果(勝利時)");
		compload("win", 3);
	} else if(getno == 7){
		syukei_reset("試合結果(敗北時)");
		compload("lose", 3);
	} else if(getno == 8){
		// 絞った状態で保存は止める
		if(betatest_flg != 0){
			alert("一部のオプション機能実行後に、続けて保存することはできません。\n保存＆読込処理を行いたい場合は最初に行ってください。");
			return;
		}
		if(errnum != 0){
			alert("実行時にエラーが発生しています。\nエラー発生時にこの機能は使用できません。\nエラーメッセージ:\n" + errmsg[errnum]);
			return;
		}
		// ローカルストレージに保存する処理
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\n\n-----使用前に必ずお読みください-----\n・対戦履歴データを「ブラウザ」に保存すると同時に、保存済みデータを読み込み、20件以上の集計データを表示するための機能です。\n・集計データに異常が見られた場合や、リセットを行いたい場合は保存データ初期化を実行してください。\n・.NETのレイアウト変更による取得失敗がいつ起こるかわからないため、バージョン毎リセットのカジュアルな使い方をおすすめします。\n・複数のAimeやブラウザを切り替えての保存には対応していません。"))
		{
			var lsdata_getcnt = null;
			var lsdata_getidx = null;
			var lsdata_getold = null;
			var lsdata_getnew = null;
			var lsadd_cnt = 0;
			var lschk_new = result_battle.length;
			var map_ary = [];
			var data_max = 300;
			var maxchk_flg = 0;
			var mapadd_flg = 1;
			
			// ローカルストレージ機能のチェック
			if(("localStorage" in window) && window["localStorage"] != null){
				// ローカルストレージ内にデータが格納済みかどうかのチェック
				if(localStorage.getItem(lscnt_name) != null){
					lsdata_getcnt = parseInt(localStorage.getItem(lscnt_name));
					lsdata_getidx = parseInt(localStorage.getItem(lsidx_name));
					lsdata_getold = localStorage.getItem(lsold_name);
					lsdata_getnew = localStorage.getItem(lsnew_name);
					if( JSON.parse( localStorage.getItem(lsmap_name) ) != null ){
						map_ary = JSON.parse( localStorage.getItem(lsmap_name) );
					}
				} else {
					// 無かったら0で
					lsdata_getcnt = 0;
					lsdata_getidx = 0;
					lsdata_getnew = "0";
				}
				// データの追加
				for(var cnt = 0; cnt < result_battle.length; cnt++){
					for(var mapcnt = 0; mapcnt < map_ary.length; mapcnt++){
						if( map_ary[mapcnt].toString() == result_battle[cnt][4].toString() ){
							mapadd_flg = 0;
							break;
						}
					}
					if(mapadd_flg == 1){
						map_ary.push(result_battle[cnt][4].toString());
					}
					mapadd_flg = 1;
					// 最新日時の一致する場所を探す
					if(lsdata_getnew == result_battle[cnt][0].toString()){
						lschk_new = cnt;
					}
				}
				// マップ一覧の更新処理
				localStorage.setItem(lsmap_name, JSON.stringify(map_ary));
				
				// 削除の都合上古い順からどうしても入れたい
				for(cnt = 0; cnt < lschk_new; cnt++){
					var ary_no = lschk_new - 1 - cnt;
					// データ上限チェック
					if(lsdata_getidx == data_max){
						maxchk_flg = 1;
						lsdata_getidx = 0;
					}
					localStorage.setItem(lsdata_name + lsdata_getidx, JSON.stringify(result_battle[ary_no]) );
					
					lsadd_cnt++;
					lsdata_getidx++;
				}
				
				// 最新データ日時の保存
				lsdata_getnew = result_battle[0][0].toString();
				localStorage.setItem(lsnew_name, lsdata_getnew);
				
				// 最古データ日時の保存
				if(lsdata_getold == null){
					lsdata_getold = result_battle[battle_cnt - 1][0].toString();
					localStorage.setItem(lsold_name, lsdata_getold);
				}
				// 古いデータが上書きされた場合は更新する
				if(maxchk_flg == 1){
					var getold_ary  = JSON.parse(localStorage.getItem(lsdata_name + lsdata_getidx));
					localStorage.setItem(lsold_name, getold_ary[0].toString());
				}
				
				// データの先頭位置更新
				localStorage.setItem(lsidx_name, lsdata_getidx);
				
				// 保存件数を更新
				lsdata_getcnt += lsadd_cnt;
				if(lsdata_getcnt > data_max){
					lsdata_getcnt = data_max;
				}
				localStorage.setItem(lscnt_name, lsdata_getcnt);
				
				// リセット処理
				syukei_reset("試合結果(平均データ)");
				
				// データの再構成、同じ形にするために最新データから入れる
				battle_cnt = lsdata_getcnt;
				for(cnt = 0; cnt < battle_cnt; cnt++){
					result_battle[battle_cnt - cnt - 1] = JSON.parse(localStorage.getItem(lsdata_name + cnt));
				}
				syukei();
				hyouji();
				
				alert(lsadd_cnt + "件のデータを保存しました。\n" + battle_cnt + "件のデータの集計データを表示しています。\n\n" + "New:" + lsdata_getnew + "\nOld:" + lsdata_getold + "\n保存件数上限：" + data_max);
			} else {
				alert("ブラウザのローカルストレージ機能が使えないため、保存が行えません。");
				return;
			}
		}
	} else if(getno == 9){
		if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\n保存した対戦履歴データを削除してリセットを行います。\nデータがおかしくなった場合や、ゲームのバランス調整が行われた際に使用してください。")){
			var lsdata_getcnt = parseInt(localStorage.getItem(lscnt_name));
			if(isNaN(lsdata_getcnt)){
				alert("削除するデータが存在しません。");
				return;
			}
			for(var cnt = 0; cnt <= lsdata_getcnt; cnt++){
				localStorage.removeItem(lsdata_name + cnt);
			}
			localStorage.removeItem(lsold_name);
			localStorage.removeItem(lsnew_name);
			localStorage.removeItem(lsidx_name);
			localStorage.removeItem(lscnt_name);
			localStorage.removeItem(lsmap_name);
			
			alert(lsdata_getcnt + "件のデータを削除しました。");
		}
	} else if(getno == 10){
		alert(kousin_info);
	}
}

// アシストカードのレベルアップ時間をチーム単位で計算
function team_result(asiurl, mode){
	var asicnt_ary = [0,0,0,0,0];
	var asitime_ary = [0,0,0,0,0];
	var asitime_result = [];
	asi_cnt = 0;
	
	try{
		for(var cnt = 0; cnt < result_battle.length; cnt++){
			if(battle_chk[cnt] == 0){
				continue;
			}
			// プレイヤーを集計
			for(var card_pos = 0; card_pos < 3; card_pos++){
				if(result_battle[cnt][25][2][card_pos].toString().match(asiurl)){
					asi_cnt++;
				}
			}
			// 味方チームを集計
			for(var mc_cnt = 0; mc_cnt < 3; mc_cnt++){
				for(var card_pos = 0; card_pos < 3; card_pos++){
					if(result_battle[cnt][26][mc_cnt][0] == 1){
						break;
					}
					if(result_battle[cnt][26][mc_cnt][5][card_pos].toString().match(asiurl)){
						asi_cnt++;
					}
				}
			}
			asicnt_ary[asi_cnt]++;
			asitime_ary[asi_cnt] += result_battle[cnt][10][3] * battle_per;
			asi_cnt = 0;
			// 敵チーム集計
			for(var mc_cnt = 3; mc_cnt < 7; mc_cnt++){
				for(var card_pos = 0; card_pos < 3; card_pos++){
					if(result_battle[cnt][26][mc_cnt][0] == 1){
						break;
					}
					if(result_battle[cnt][26][mc_cnt][5][card_pos].toString().match(asiurl)){
						asi_cnt++;
					}
				}
			}
			asicnt_ary[asi_cnt]++;
			asitime_ary[asi_cnt] += result_battle[cnt][11][3] * battle_per;
			asi_cnt = 0;
		}
		// 結果を時刻に
		for(cnt = 0; cnt < asicnt_ary.length; cnt++){
			if(asicnt_ary[cnt] != 0){
				asitime_ary[cnt] = lvuptime(asitime_ary[cnt], asicnt_ary[cnt]);
			} else {
				asitime_ary[cnt] = "";
			}
		}
		
		asitime_result[0] = asicnt_ary;
		asitime_result[1] = asitime_ary;
		
		return asitime_result;
	} catch(e) {
		alert("処理中にエラーが発生したため終了します。\n\n" + e);
		return false;
	}
}

// レベル先行勝率表示
function level_senkou_hyouji(){
	if(window.confirm("注意：テスト機能のため、結果や動作のチェックが甘いです。\nLv先行有利を確認するための機能です。\nデータの都合上、レベルアップ時間は最大8秒ほどの誤差がありえます")){
		clickimg_opt = 0;
		clickimg_opt_num = 5;
		set_level_opt = 5;
		set_cast_opt = sum_img;
		imgNode_opt = [];
		var level_result = [];
		
		level_result = level_senkou(set_level_opt, set_cast_opt);
		
		// 結果表示
		var optpos = document.getElementById("gameNode");
		
		optNode = document.createElement("div");
		optNode.className = "frame02_1";
		optNode.style.marginTop = "72px";
		optNode.style.marginBottom = frame02_margin_bot;
		
		optInner = document.createElement("div");
		optInner.className = "frame_inner";
		
		opttitle = document.createElement("div");
		opttitle.className = "frame02_1_title";
		opttitle.innerHTML = "レベル" + set_level_opt + "先行時勝率";
		optNode.appendChild(opttitle);
		
		// 使用キャスト画像を表示
		for(var cnt=0; cnt < cast_cnt; cnt++){
			imgNode_opt[cnt] = document.createElement("img");
			imgNode_opt[cnt].src = cast_result[cnt][0];
			imgNode_opt[cnt].width = icon_width;
			imgNode_opt[cnt].height = icon_height;
			
			var linkNode = document.createElement("a");
			linkNode.href = "JavaScript:setcast(" + cnt.toString() + ")";
			linkNode.appendChild(imgNode_opt[cnt]);
			optNode.appendChild(linkNode);
		}
		imgNode_opt[0].style.opacity = 0.5;
		
		var tmpNode = document.createElement("br");
		optNode.appendChild(tmpNode);
		
		for(var cnt=2; cnt < 8; cnt++){
			imgNode_opt_num[cnt] = document.createElement("img");
			imgNode_opt_num[cnt].src = "common/images/icon_lv" + cnt + "_p.png";
			imgNode_opt_num[cnt].width = num_icon_width;
			imgNode_opt_num[cnt].height = num_icon_height;
			imgNode_opt_num[cnt].style.marginRight = num_icon_margin;
			imgNode_opt_num[cnt].style.marginLeft = num_icon_margin;
			
			var linkNode = document.createElement("a");
			linkNode.href = "JavaScript:setlevel(" + cnt + ")";
			linkNode.appendChild(imgNode_opt_num[cnt]);
			optNode.appendChild(linkNode);
		}
		imgNode_opt_num[5].style.opacity = 0.5;
		
		addNode("対象試合数", level_result[7], 0, "opt");
		addNode("自軍Lv先行時", level_result[5] + "%(" + level_result[0] + "勝/" + level_result[1] + "敗)", 10, "opt");
		addNode("敵軍Lv先行時", level_result[6] + "%(" + level_result[2] + "勝/" + level_result[3] + "敗)", 11, "opt");
		addNode("Lvアップ僅差", level_result[4] + "試合", 12, "opt");
		
		optNode.appendChild(optInner);
		optpos.parentNode.insertBefore(optNode, optpos);
	} else {
		return;
	}
}

// キャスト別のレベル先行勝率集計
function setcast(get_cast){
	var level_result = [];
	
	imgNode_opt[clickimg_opt].style.opacity = 1;
	clickimg_opt = get_cast;
	imgNode_opt[get_cast].style.opacity = 0.5;
	
	set_cast_opt = cast_result[get_cast][0];
	level_result = level_senkou(set_level_opt, set_cast_opt);
	
	opt_ary[0].innerHTML = level_result[7];
	opt_ary[10].innerHTML = level_result[5] + "%(" + level_result[0] + "勝/" + level_result[1] + "敗)";
	opt_ary[11].innerHTML = level_result[6] + "%(" + level_result[2] + "勝/" + level_result[3] + "敗)";
	opt_ary[12].innerHTML = level_result[4] + "試合";
}

// レベル別のレベル先行勝率集計
function setlevel(get_level){
	var level_result = [];
	
	imgNode_opt_num[clickimg_opt_num].style.opacity = 1;
	clickimg_opt_num = get_level;
	imgNode_opt_num[get_level].style.opacity = 0.5;
	
	set_level_opt = get_level;
	level_result = level_senkou(set_level_opt, set_cast_opt);
	
	opt_ary[0].innerHTML = level_result[7];
	opt_ary[10].innerHTML = level_result[5] + "%(" + level_result[0] + "勝/" + level_result[1] + "敗)";
	opt_ary[11].innerHTML = level_result[6] + "%(" + level_result[2] + "勝/" + level_result[3] + "敗)";
	opt_ary[12].innerHTML = level_result[4] + "試合";
	opttitle.innerHTML = "レベル" + set_level_opt + "先行時勝率";
}

// レベル先行勝率
function level_senkou(get_level, get_cast){
	var saki_win = 0;
	var saki_lose = 0;
	var ato_win = 0;
	var ato_lose = 0;
	var draw_cnt = 0;
	var saki_per = 0;
	var ato_per = 0;
	var hyouji_cast = "";
	var hyouji_battle = 0;
	
	if(get_cast != null){
		hyouji_cast = get_cast;
	} else {
		hyouji_cast = click_mycast;
	}
	// レベルチェック
	if(get_level < 2 || 8 < get_level){
		alert("範囲外のレベルが指定されました。\n処理対象レベル:" + get_level);
		return;
	}
	// レベルを配列の位置に合わせる
	var level_num = get_level - 2;
	for(var cnt = 0; cnt < result_battle.length; cnt++){
		if(battle_chk[cnt] == 0){
			continue;
		}
		if(hyouji_cast.match(sum_img) || hyouji_cast.match(result_battle[cnt][5])){
			if(result_battle[cnt][10][level_num] == result_battle[cnt][11][level_num]){
				draw_cnt++;
			} else if(result_battle[cnt][10][level_num] < result_battle[cnt][11][level_num]){
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
			hyouji_battle++;
		}
	}
	if(saki_win + saki_lose != 0){
		saki_per = Math.round((saki_win / (saki_win + saki_lose))*100);
	} else {
		saki_per = 0;
	}
	
	if(ato_win + ato_lose != 0){
		ato_per = Math.round((ato_win / (ato_win + ato_lose))*100);
	} else {
		ato_per = 0;
	}
	//alert("対象試合数：" + hyouji_battle + "\n自軍Lv" + get_level + "先行時\n勝率：" + saki_per + "%　勝利数：" + saki_win + "　敗北数：" + saki_lose + "\n敵軍Lv" + get_level + "先行時\n勝率：" + ato_per + "%　勝利数：" + ato_win + "　敗北数：" + ato_lose + "\nレベルアップ（ほぼ）同時試合数：" + draw_cnt);
	return [saki_win, saki_lose, ato_win, ato_lose, draw_cnt, saki_per, ato_per, hyouji_battle];
}

// ファイターの人数による勝率
function role_win(select_role){
	var role_result_win = [0, 0, 0, 0, 0];
	var role_result_lose = [0, 0, 0, 0, 0];
	var role_result_hyouji = ["", "", "", "", ""];
	var role_name = "";
	
	// ロール名変換
	if(select_role == "F"){
		role_name = "ファイター";
	} else if(select_role == "A") {
		role_name = "アタッカー";
	} else if(select_role == "S") {
		role_name = "サポーター";
	} else {
		alert("取得できないロールが指定されました。");
		return;
	}
	alert("注意：テスト機能のため、結果や動作のチェックが甘いです。\n" + role_name + "の人数別勝率を表示します。\n舞闘会履歴向けの機能です。");
	
	for(var cnt = 0; cnt < result_battle.length; cnt++){
		if(battle_chk[cnt] == 0){
			continue;
		}
		var role_cnt_team = 0;
		var role_cnt_enemy = 0;
		// プレイヤーを集計
		for(var cast_chk = 0; cast_chk < player_cast_img.length; cast_chk++){
			if(player_cast_img[cast_chk].src.match(result_battle[cnt][5])){
				if(player_cast_role[cast_chk] == select_role){
					role_cnt_team++;
				}
				break;
			}
		}
		
		// マッチングしたキャストを集計
		// 味方チームを集計
		for(var cast_pos = 0; cast_pos < 3; cast_pos++){
			// COMを除外
			if(result_battle[cnt][26][cast_pos][0] == 1){
				break;
			}
			for(var cast_chk = 0; cast_chk < match_cast_img.length; cast_chk++){
				if(match_cast_img[cast_chk].src.match(result_battle[cnt][26][cast_pos][1])){
					if(match_cast_role[cast_chk] == select_role){
						role_cnt_team++;
					}
					break;
				}
			}
		}
		
		// 敵チーム集計
		for(var cast_pos = 3; cast_pos < 7; cast_pos++){
			if(result_battle[cnt][26][cast_pos][0] == 1){
				break;
			}
			for(var cast_chk = 0; cast_chk < match_cast_img.length; cast_chk++){
				if(match_cast_img[cast_chk].src.match(result_battle[cnt][26][cast_pos][1])){
					if(match_cast_role[cast_chk] == select_role){
						role_cnt_enemy++;
					}
					break;
				}
			}
		}
		
		// 勝敗取得
		if(result_battle[cnt][9] == "win"){
			role_result_win[role_cnt_team]++;
			role_result_lose[role_cnt_enemy]++;
		} else {
			role_result_win[role_cnt_enemy]++;
			role_result_lose[role_cnt_team]++;
		}
	}
	// 表示用集計
	for(var cnt = 0; cnt < role_result_hyouji.length; cnt++){
		if(role_result_win[cnt] + role_result_lose[cnt] != 0){
			role_result_hyouji[cnt] = Math.round((role_result_win[cnt] / (role_result_win[cnt] + role_result_lose[cnt]))*100) + "%(" + (role_result_win[cnt] + role_result_lose[cnt]) + "チーム)";
		} else {
			role_result_hyouji[cnt] = "対象チームなし";
		}
	}
	
	// 結果表示
	var optpos = document.getElementById("gameNode");
	
	optNode = document.createElement("div");
	optNode.className = "frame02_1";
	optNode.style.marginTop = "72px";
	optNode.style.marginBottom = frame02_margin_bot;
	
	optInner = document.createElement("div");
	optInner.className = "frame_inner";
	
	opttitle = document.createElement("div");
	opttitle.className = "frame02_1_title";
	opttitle.innerHTML = role_name + "人数別勝率";
	optNode.appendChild(opttitle);
	
	addNode("ファイター人数", "勝率(対象チーム数)", 0, "opt");
	addNode("0人", role_result_hyouji[0], 1, "opt");
	addNode("1人", role_result_hyouji[1], 2, "opt");
	addNode("2人", role_result_hyouji[2], 3, "opt");
	addNode("3人", role_result_hyouji[3], 4, "opt");
	addNode("4人", role_result_hyouji[4], 5, "opt");
	
	optNode.appendChild(optInner);
	optpos.parentNode.insertBefore(optNode, optpos);
}

// マップ選択集計関数
function map_search(get_map){
	if(get_map == ""){
		return;
	}
	
	// オプション表示があったら削除
	try{
		inspos.parentNode.removeChild(optNode);
	} catch(e) {
		
	}
	syukei_reset( "試合結果(" + get_map + ")" );
	if(get_map == "全マップ"){
		compload();
	} else {
		compload(get_map, 2);
	}
}

// 結果を再集計する時に使用する
function syukei_reset(gettext){
	// 表示の削除処理
	try{
		inspos.parentNode.removeChild(textNode);
		inspos.parentNode.removeChild(selecttest);
		inspos.parentNode.removeChild(gameNode);
		inspos.parentNode.removeChild(skillNode);
		inspos.parentNode.removeChild(castNode);
	} catch(e) {
		
	}
	
	// 数値の初期化
	cast_cnt = 0;
	match_cast_cnt = 0;
	match_cast_sum = 0;
	castimg_cnt = 0;
	player_role_ary = [0, 0, 0, 0];
	match_role_ary = [0, 0, 0, 0];
	getcast_sum = 0;
	getcast_other = 0;
	click_mycast = sum_img;
	cast_result = [];
	cast_result_skillset = [];
	player_cast_role = [];
	player_cast_img = [];
	match_cast_result = [];
	match_cast_role = [];
	match_cast_img = [];
	battle_chk = [];
	nodetitle_text = gettext;
	
	betatest_flg = 1;
}

// スキルカードリストの取得
function getskillList(){
	$.ajax({
		type: "GET",
		url: cardlist_url,
		async: false,
		success: function(data){
			skill_list = data;
		},
		error: function() {
			skill_list = "err";
		}
	});
}

// 使用MPの計算
function getbattle_mp(getcast){
	try{
		var usemp = [0, "MAX", "", "MIN", ""];
		var getcnt = 0;
		for(var cnt=0; cnt < result_battle.length; cnt++){
			if(battle_chk[cnt] == 0){
				continue;
			}
			var mpary = [];
			var battle_usemp = 0;
			// 指定キャストの場合のみ取得する。
			if(getcast.match(result_battle[cnt][5])){
				// 消費MPを取得
				for(var arycnt=0; arycnt < result_battle[cnt][25][0].length; arycnt++){
					var mp_keisu = 0.01;
					var mp_hosei = 0;
					
					mpary[arycnt] = getskilldata(result_battle[cnt][25][0][arycnt], "MP");
					
					// レベルによる減少値を計算
					if(result_battle[cnt][25][4][arycnt] == "MAX"){
						mp_hosei = 1 - 10 * mp_keisu;
					} else {
						mp_hosei = 1 - parseInt(result_battle[cnt][25][4][arycnt]) * mp_keisu;
					}
					battle_usemp += Math.floor(mpary[arycnt] * mp_hosei * 100) / 100 * result_battle[cnt][25][1][arycnt];
				}
				// ドローショット加算
				battle_usemp += parseInt(result_battle[cnt][18]) * 10;
				usemp[0] += battle_usemp;
				getcnt++;
				// 最高値更新
				if(usemp[1] == "MAX" || usemp[1] < battle_usemp){
					usemp[1] = battle_usemp;
					usemp[2] = result_battle[cnt][0];
				}
				
				// 最低値更新
				if(usemp[3] == "MIN" || usemp[3] > battle_usemp){
					usemp[3] = battle_usemp;
					usemp[4] = result_battle[cnt][0];
				}
			}
		}
		usemp[0] = Math.floor(usemp[0] / getcnt * 10) / 10;
		usemp[1] = Math.floor(usemp[1] * 10) / 10;
		usemp[3] = Math.floor(usemp[3] * 10) / 10;
		return usemp;
	} catch(e) {
		return ["err"];
	}
}

// スキルのデータ取得
function getskilldata(getimg, mode){
	var rtn = 0;
	try{
		if(getimg == nocard_img){
			return 0;
		}
		for(var cnt=0; cnt < skill_list.card.length; cnt++){
			if(skill_list.card[cnt].cardimg.match(getimg)){
				rtn = parseInt(skill_list.card[cnt].usemp);
				break;
			}
		}
		return rtn;
	}catch(e){
		return 0;
	}
}

// 戦闘履歴詳細での実行
function urldetail(){
	alert("対戦履歴詳細の以下のデータを隠します。\n・プレイヤーの店舗名と都道府県\n・マッチングプレイヤーの名前と都道府県\nプレイヤー名と一部の隠されたデータは、クリックorタップで表示切り替えできます。\n\n集計処理を行いたい場合は詳細ページではなく、対戦履歴ページで実行してください。");
	try{
		var mtc_member_ary = document.getElementsByClassName("mtc_detail_member_name");
		var mp_location_ary = document.getElementsByClassName("mp_mydata_location");
		var mtc_store_ary = document.getElementsByClassName("mtc_detail_store");
		var mp_name_ary = document.getElementsByClassName("mp_mydata_name");
		
		mtc_store_ary[0].style.opacity = 0;
		mtc_store_ary[0].setAttribute("onclick", "detailclick(" + 0 + ", \"store\")");
		
		for(var cnt=0; cnt < mtc_member_ary.length; cnt++){
			mtc_member_ary[cnt].style.opacity = 0;
			//mtc_member_ary[cnt].setAttribute("onclick", "detailclick(" + cnt + ", \"member\")");
		}
		for(var cnt=0; cnt < mp_name_ary.length; cnt++){
			mp_name_ary[cnt].setAttribute("onclick", "detailclick(" + cnt + ", \"name\")");
			if(cnt == 0){
				mp_name_ary[cnt].style.opacity = 1;
				continue;
			}
			mp_name_ary[cnt].style.opacity = 0;
		}
		for(var cnt=0; cnt < mp_location_ary.length; cnt++){
			mp_location_ary[cnt].setAttribute("onclick", "detailclick(" + cnt + ", \"location\")");
			mp_location_ary[cnt].style.opacity = 0;
		}
	} catch(e) {
		alert("非表示処理に失敗しました。");
	}
}

function detailclick(getno, cate){
	try{
		if(cate == "store"){
			var mtc_store_ary = document.getElementsByClassName("mtc_detail_store");
			if(mtc_store_ary[getno].style.opacity == 0){
				mtc_store_ary[getno].style.opacity = 1;
			} else {
				mtc_store_ary[getno].style.opacity = 0;
			}
		} else if(cate == "member"){
			var mtc_member_ary = document.getElementsByClassName("mtc_detail_member_name");
			if(mtc_member_ary[getno].style.opacity == 0){
				mtc_member_ary[getno].style.opacity = 1;
			} else {
				mtc_member_ary[getno].style.opacity = 0;
			}
			
		} else if(cate == "name"){
			var mp_name_ary = document.getElementsByClassName("mp_mydata_name");
			if(mp_name_ary[getno].style.opacity == 0){
				mp_name_ary[getno].style.opacity = 1;
			} else {
				mp_name_ary[getno].style.opacity = 0;
			}
			
		} else if(cate == "location"){
			var mp_location_ary = document.getElementsByClassName("mp_mydata_location");
			if(mp_location_ary[getno].style.opacity == 0){
				mp_location_ary[getno].style.opacity = 1;
			} else {
				mp_location_ary[getno].style.opacity = 0;
			}
		}
	} catch(e) {
		alert("切り替え処理に失敗しました。");
	}
}

function addopt(getno, getstr){
	var option_def = document.createElement("option");
	option_def.value = getno;
	option_def.innerHTML = getstr;
	selecttest.appendChild(option_def);
}
