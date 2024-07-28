//スライダー
const slider1 = document.getElementById('rangeslider1');
const slider2 = document.getElementById('rangeslider2');


//スライダーで調整する変数を宣言、初期値を設定
let t1 = 0.08 * Number(slider1.value);  //曲面の形状を変化させるパラメータ
let r1 = 17 * Number(slider2.value);    //カット球面の半径


//スライダー操作時に、パラメータ値を更新する
slider1.addEventListener('input',()=>{
    t1 = 0.08 * Number(slider1.value);
    updateObjectC();
});

slider2.addEventListener('input',()=>{
    r1 = 17 * Number(slider2.value);
    updateObjectC();
});


//カラーピッカー
const colorpicker1 = document.getElementById('color_picker1');

let mesh_color1 = colorpicker1.value;   //曲面の色　初期値をカラーピッカーの値とする

colorpicker1.addEventListener('input',()=>{ //カラーピッカーの色を変化させたときの処理
    mesh_color1 = colorpicker1.value;   //色の更新
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
addDirectionalLightC(0xffffff, 0.7, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる


//オブジェクトの追加
//入力要素によってユーザーが調整するオプションを'変数名'と記述する。updateObjectCを呼び出したときにオプションも更新される
addMeshC(plane_vts1, plane_index1, {meshcolor:'mesh_color1', scale:0.3, rotation:[-1.4, 0, 0.5], spherecutradius:'r1'});


//レンダリング（必須）
animateC();
