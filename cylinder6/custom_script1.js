
//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
//addPerspectiveCameraC({fov:40});  //投射投影カメラ
addOrthographicCameraC();   //平行投影カメラ


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.7, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -2, 1);



//オブジェクトの追加
let sc1 = 2;
let rt1 = [0.7, 0.2, 0]



addMeshC(vts1, index1[0], {scale:sc1, color:0xff0077, flatshade:true, rotation:rt1});
addMeshC(vts1, index1[1], {scale:sc1, color:0xff7700, flatshade:true, rotation:rt1});
addMeshC(vts1, index1[2], {scale:sc1, color:0x00ff77, flatshade:true, rotation:rt1});
addMeshC(vts1, index1[3], {scale:sc1, color:0xaaff00, flatshade:true, rotation:rt1});
addMeshC(vts1, index1[4], {scale:sc1, color:0x0077ff, flatshade:true, rotation:rt1});
addMeshC(vts1, index1[5], {scale:sc1, color:0x7700ff, flatshade:true, rotation:rt1});

addMeshC(vts2, index2[0], {scale:sc1, color:0xff0077, flatshade:true, rotation:rt1, opacity:0.1});
addMeshC(vts2, index2[1], {scale:sc1, color:0xff7700, flatshade:true, rotation:rt1, opacity:0.1});
addMeshC(vts2, index2[2], {scale:sc1, color:0x00ff77, flatshade:true, rotation:rt1, opacity:0.1});
addMeshC(vts2, index2[3], {scale:sc1, color:0xaaff00, flatshade:true, rotation:rt1, opacity:0.1});
addMeshC(vts2, index2[4], {scale:sc1, color:0x0077ff, flatshade:true, rotation:rt1, opacity:0.1});
addMeshC(vts2, index2[5], {scale:sc1, color:0x7700ff, flatshade:true, rotation:rt1, opacity:0.1});

//レンダリング（必須）
animateC();
