//スライダー
const slider1 = document.getElementById('rangeslider1');    //トーラスの形状を変化させるスライダー１
const slider2 = document.getElementById('rangeslider2');    //トーラスの形状を変化させるスライダー２
const slider3 = document.getElementById('rangeslider3');    //透明度を調整するスライダー


//頂点リストに含まれるパラメータを宣言、初期値を設定
let t1 = Number(slider1.value);
let t2 = Number(slider2.value);

//曲面の透明度　3つ目のスライダーで調整する
let mesh_opacity = Number(slider3.value);


//スライダー操作時に、変数を更新する
slider1.addEventListener('input',()=>{
    t1 = Number(slider1.value);    //slider1.valueは文字列なのでNumberで数値（0～1）に変換する。
    updateObjectC();    //オブジェクトの更新
});

slider2.addEventListener('input',()=>{
    t2 = Number(slider2.value);
    updateObjectC();
});

slider3.addEventListener('input',()=>{
    mesh_opacity = Number(slider3.value);   //透明度を更新（0以上1以下）
    updateObjectC();
});


//チェックボックス（フラットシェードとスムーズシェードを切り替える）
const checkbox1 = document.getElementById('checkbox1'); 

checkbox1.checked = false;

let flat = checkbox1.checked;   //trueのときフラットシェード, falseのときスムーズシェード　初期値をチェックボックスの値とする

checkbox1.addEventListener('input',()=>{
    flat = checkbox1.checked;   //値の更新
    updateObjectC();
});


//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC();


//環境光ライト
addAmbientLightC(0xffffff, 0.4);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.7, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる


//オブジェクトの追加
//入力要素によってユーザーが調整するオプションを'変数名'と記述する。updateObjectCを呼び出したときにオプションも更新される

addMeshC(torus_vts2, torus_index2, {meshcolor:0xff5500, scale:0.6, opacity:'mesh_opacity', flatshade:'flat', side:2}); 
addMeshC(torus_vts2, torus_index2, {meshcolor:0x0044ff, scale:0.6, opacity:'mesh_opacity', flatshade:'flat', side:1});  




//レンダリング（必須）
animateC();
