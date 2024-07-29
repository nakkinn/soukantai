/*
開発者が編集するスクリプトファイル
オブジェクトの追加・環境設定を行う

行の頭に // を付けるとコメントアウトできる。
（必須）とかかれているものはコメントアウトしたり、消したりしてはいけない。
*/


//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（どちらかは必須）
addPerspectiveCameraC();    //透視投影カメラ　第1引数：オプション（省略可）
//addOrthographicCameraC(); //平行投影カメラ　第1引数：オプション（省略可）


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);


//ポリゴンの追加
//第1引数：頂点リスト変数名, 第2引数：ポリゴンインデックスリスト変数名, 第3引数：オプション（省略可）
addMeshC(vts1, index1[0], {color:0xff7700, scale:5, flatshade:true});   //橙
addMeshC(vts1, index1[1], {color:0x77ff00, scale:5, flatshade:true});   //黄緑
addMeshC(vts1, index1[2], {color:0x0077ff, scale:5, flatshade:true});   //青
addMeshC(vts1, index1[3], {color:0xff40cc, scale:5, flatshade:true});   //ピンク
addMeshC(vts1, index1[4], {color:0xeeff00, scale:5, flatshade:true});   //黄
//頂点リストは2次元配列を文字列化したもの（''で囲ったもの）、インデックスリストは2次元配列を入れる
//index1は5色分のポリゴンインデックスリストで3次元配列である
//index1の0番から4番要素（index1[0]～index1[4]）は1色分のポリゴンインデックスリストで2次元配列である


//チューブの追加
addTubeC(vts1, edge1, 0.007, {scale:5, color:0xdddddd});    //第1引数：頂点リスト変数名, 第2引数：ポリゴンインデックスリスト変数名, 第3引数：チューブ半径, 第4引数：オプション（省略化）


//レンダリング（必須）
animateC();


/*

〇カメラ・オブジェクトのオプションにオプションについて

オプションは下記のように記述する。設定項目の順番は自由。デフォルト値が設けられているため全て設定する必要はない。
{設定項目1:設定値1, 設定項目2:設定値2, 設定項目3:設定値3,...}

【addPerspectiveCamera】
{fov:数値, near:数値, far:数値, posz:数値, zoom:数値}

()はデフォルト値
fov : 視野角(60)
near ： カメラからnearより離れている範囲を描画する(0.01)
far : カメラからfarより近い範囲を描画する(500)
posz : カメラz座標(10)
zoom　：　ズーム、この値が大きいほどオブジェクトが大きく表示される(1)


【addOrthographicCamera】
{near:（数値）, far:（数値）, posz:（数値）, zoom:（数値）, range:（数値）}

near, far, posz, zoom : addPerspectiveCameraと共通
range：キャンバス短辺に対応する投影範囲（5）


【addMeshC】
・color : 面の色　16進数コードで記述する　(0xffffff)
・scale : スケール　数値　(1)
・rotation : 初期姿勢　[数値, 数値, 数値] x-y-z系オイラー角で記述 ([0,0,0])
・opacity ：　透明度　0～1の数値　(1)
・flatshade : ポリゴンを均一な色にするか滑らかなシェーディングをするか　trueまたはfalse (false)
・wireframe : ポリゴンの縁のみを表示　trueまたはfalse (false)
・spherecutradius : 球面カット半径　値が-1のとき球面カットは行わない(-1)
・side : 描画するポリゴンの向きを指定 値は0,1,2のいずれか　0:両面, 1:表面, 2:裏面　(0)

color, opacity, flatshade, sphereradiusの値をクオーテーションで囲った変数にすることで、updateObjectCを呼び出したときその変数の値が変わっていればその変更が適用される


【addTubeC】
オプション一覧
・color
・scale
・rotation
・opacity
・flatshade
・radialsegment　n角柱（8）
*/


