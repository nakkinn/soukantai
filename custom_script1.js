//スライダー
const slider1 = document.getElementById('rangeslider1');
const slider2 = document.getElementById('rangeslider2');


//頂点リストに含まれるパラメータを宣言、初期値を設定
let t1 = 10 * Number(slider1.value);
let t2 = 5 * Number(slider2.value);;


//スライダー操作時に、パラメータ値を更新する
slider1.addEventListener('input',()=>{
    t1 = 10 * Number(slider1.value);    //0<=t1<=10, slider1.valueは文字列なのでNumberで数値（0～1）に変換する。
    updateObjectC();    //オブジェクトの形状を更新する
});

slider2.addEventListener('input',()=>{
    t2 = 5 * Number(slider2.value); //0<=t2<=5
    updateObjectC();
});


//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC({fov:50});
//addOrthographicCameraC();

/*
addPerspectiveCameraに次のオプションを引数として入れることができる。
オプションの順番は自由で、全て設定する必要はない
{fov:数値, near:数値, far:数値, posz:数値, zoom:数値}

()はデフォルト値
fov : 視野角(60)
near　：　描画されるカメラからの最小距離(0.01)
far : 描画されるカメラからの最大距離(500)
posz : カメラz座標(10)
zoom　：　ズーム、この値が大きいほどオブジェクトが大きく表示される(1)


addOrthographicCameraは次のオプションを設定できる
{near:（数値）, far:（数値）, posz:（数値）, zoom:（数値）, range:（数値）}
range：キャンバス短辺に対応する投影範囲（5）
*/


//環境光ライト
addAmbientLightC(0xffffff, 0.4);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.7, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる


//オブジェクトの追加
addMeshC(torus_vts1, torus_index1, {meshcolor:0x0044ff, scale:0.5, spherecutradius:10});
addMeshC(cube_vts1, cube_index1, {meshcolor:0xff4400, flatshade:true, scale:0.6, rotation:[0.5, 0.6, 0]});

/* 
第1引数：頂点リスト変数名, 第2引数：ポリゴンインデックスリスト変数名, 第3引数：オプション（省略化）

オプション一覧
・meshcolor : 面の色　16進数コードで記述する　(0xffffff)
・scale : スケール　数値　(1)
・rotation : 初期姿勢　[数値, 数値, 数値] x-y-z系オイラー角で記述 ([0,0,0])
・opacity ：　透明度　0～1の数値　(1)
・flatshade : ポリゴンを均一な色にするか滑らかなシェーディングをするか　trueまたはfalse (false)
・wireframe : ポリゴンの縁のみを表示　trueまたはfalse (false)
・spherecutradius : 球面カット半径　値が-1のとき球面カットは行わない(-1)
・side : 描画するポリゴンの向きを指定 値は0,1,2のいずれか　0:両面, 1:表面, 2:裏面　(0)

meshcolor, opacity, flatshade, sphereradiusの値をクオーテーションで囲った変数にすることで、updateObjectCを呼び出したときその変数の値が変わっていればその変更が適用される

*/


//レンダリング（必須）
animateC();