//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC();
//addOrthographicCameraC();


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);


//オブジェクトの追加
addMeshC(vts1, index1, {color:0xff6600, flatshade:true});   //橙
addMeshC(vts2, index1, {color:0x0044ff, flatshade:true});   //青
addMeshC(vts3, index1, {color:0xff2200, flatshade:true});   //赤
addMeshC(vts4, index1, {color:0x44dd00, flatshade:true});   //黄緑
addMeshC(vts5, index1, {color:0xffff00, flatshade:true});   //黄

addTubeC(vtsall, edge1, 0.1, {color:0x7ad3ff}); //辺チューブ



//レンダリング（必須）
animateC();


