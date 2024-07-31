//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC({fov:40});  //投射投影カメラ
//addOrthographicCameraC();   //平行投影カメラ


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.6, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -1, 1);

//オブジェクトの追加

let sc = 1.7; //スケール

addMeshC(vts1, index1, {color:0xff7700, scale:sc, flatshade:true});  //橙
addMeshC(vts2, index1, {color:0xff40cc, scale:sc, flatshade:true});  //ピンク
addMeshC(vts3, index1, {color:0xf4ff1f, scale:sc, flatshade:true});  //黄
addMeshC(vts4, index1, {color:0x77ff00, scale:sc, flatshade:true});  //黄緑
addMeshC(vts5, index1, {color:0x0077ff, scale:sc, flatshade:true});  //水色
addMeshC(vts6, index1, {color:0x7700ff, scale:sc, flatshade:true});  //紫
addMeshC(vts7, index1, {color:0xff2200, scale:sc, flatshade:true});  //赤
addMeshC(vts8, index1, {color:0x00aa22, scale:sc, flatshade:true});  //緑
addMeshC(vts9, index1, {color:0x2200cc, scale:sc, flatshade:true});  //青
addMeshC(vts10, index1, {color:0xaaaaaa, scale:sc, flatshade:true});  //灰



//レンダリング（必須）
animateC();



