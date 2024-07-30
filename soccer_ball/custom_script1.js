//スライダー要素の読み込み
const slider1 = document.getElementById('slider1');

//頂点リストに含まれるパラメータの定義, 初期値の設定
//スライダーの初期値を代入
let t = Number(slider1.value)*0.5;

slider1.addEventListener('input',()=>{
    t = Number(slider1.value)*0.5;
    updateObjectC();
});



//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC({fov:40, near:0.01});    
//addOrthographicCameraC();


//環境光ライト
addAmbientLightC(0xffffff, 0.4);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);

//オブジェクトの追加

let sc1 = 0.7;
let rot = [-1,0,-1];

addMeshC(vts1, index1, {color:0x77ff00, flatshade:true, scale:sc1, rotation:rot}); 
addMeshC(vts1, index2, {color:0x0077ff, flatshade:true, scale:sc1, rotation:rot} )

addTubeC(vts1, edge1, 0.04, {scale:sc1, rotation:rot, color:0xffffff});   //辺チューブ


//レンダリング（必須）
animateC();
