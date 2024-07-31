//スライダー要素の読み込み
const slider1 = document.getElementById('slider1');

//頂点リストに含まれるパラメータの定義, 初期値の設定
//スライダーの初期値を代入
let r = Number(slider1.value);

let opa = 1;

slider1.addEventListener('input',()=>{
    r = Number(slider1.value);
    if(0.6<=r && r<=0.65)   opa = 0;
    else    opa = 1;
    updateObjectC();
});



//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC({fov:40});    
//addOrthographicCameraC();


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);

//オブジェクトの追加

let sc1 = 1.7;
let rot = [-1,0,-1];

addMeshC(vts1, index1, {color:0xff7700, flatshade:true, scale:sc1, rotation:rot}); 
addMeshC(vts2, index1, {color:0x0077ff, flatshade:true, scale:sc1, rotation:rot});
addMeshC(vts3, index1, {color:0x77ff00, flatshade:true, scale:sc1, rotation:rot}); 
addMeshC(vts4, index1, {color:0xff40cc, flatshade:true, scale:sc1, rotation:rot});
addMeshC(vts5, index1, {color:0xf4ff1f, flatshade:true, scale:sc1, rotation:rot}); 
addMeshC(vts6, index1, {color:0xff2200, flatshade:true, scale:sc1, rotation:rot, opacity:'opa'});
addMeshC(vts7, index1, {color:0x2200cc, flatshade:true, scale:sc1, rotation:rot, opacity:'opa'}); 
addMeshC(vts8, index1, {color:0x00aa22, flatshade:true, scale:sc1, rotation:rot, opacity:'opa'});
addMeshC(vts9, index1, {color:0x7700ff, flatshade:true, scale:sc1, rotation:rot, opacity:'opa'}); 
addMeshC(vts10, index1, {color:0xaaaaaa, flatshade:true, scale:sc1, rotation:rot, opacity:'opa'});



//レンダリング（必須）
animateC();


