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


let sc = 0.8;

//オブジェクトの追加
addMeshC(vts1, index1, {scale:sc, color:0xff7700, flatshade:true});  
addMeshC(vts2, index1, {scale:sc, color:0x0077ff, flatshade:true});   
addMeshC(vts3, index1, {scale:sc, color:0x77ff00, flatshade:true});   
addMeshC(vts4, index1, {scale:sc, color:0xff40cc, flatshade:true});
addMeshC(vts5, index1, {scale:sc, color:0xf4ff1f, flatshade:true});

addTubeC(vts1, edge2, 0.03, {scale:sc, color:0xdddddd});
addTubeC(vts2, edge2, 0.03, {scale:sc, color:0xdddddd});
addTubeC(vts3, edge2, 0.03, {scale:sc, color:0xdddddd});
addTubeC(vts4, edge2, 0.03, {scale:sc, color:0xdddddd});
addTubeC(vts5, edge2, 0.03, {scale:sc, color:0xdddddd});


//レンダリング（必須）
animateC();


