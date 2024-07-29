//スライダー要素の読み込み
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');

//頂点リストに含まれるパラメータの定義, 初期値の設定
let r = Number(slider1.value);  //スライダーの初期値を代入
let t = Number(slider2.value);

//スライダーを操作したときの処理
slider1.addEventListener('input',()=>{
    r = Number(slider1.value);  //パラメータの更新
    updateObjectC();    //オブジェクトの更新
});

slider2.addEventListener('input',()=>{
    t = Number(slider2.value);
    updateObjectC();
});



//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC();    
//addOrthographicCameraC();


//環境光ライト
addAmbientLightC(0xffffff, 0.4);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);

//オブジェクトの追加

addMeshC(vts1, index_red, {color:0xff0000, flatshade:true, scale:1.5}); //赤い面
addMeshC(vts1, index_blue, {color:0x0000ff, flatshade:true, scale:1.5});    //青の面
addMeshC(vts1, index_green, {color:0x00ff00, flatshade:true, scale:1.5});   //緑の面

addTubeC(vts1, edge1, 0.04, {scale:1.5});   //辺チューブ


//レンダリング（必須）
animateC();


