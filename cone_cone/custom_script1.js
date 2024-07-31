const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");

let sv1 = Number(slider1.value);

slider1.addEventListener("input",()=>{
    mesh2.rotation.z += 3 * (Number(slider1.value) - sv1 );
    sv1 = Number(slider1.value);
});

slider2.addEventListener("input",()=>{
    mesh2.scale.x =  1.2 * Number(slider2.value);
    mesh2.scale.z =  1.2 * Number(slider2.value);
});


//オブジェクトの回転ベクトルを設定（ベクトルの向き：回転軸, ベクトルの大きさ：回転速度に比例）
setAngularVelocityC(0, 0, 0);     


//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（必須）
addPerspectiveCameraC({fov:40, zoom:1.3});  //投射投影カメラ
//addOrthographicCameraC();   //平行投影カメラ


//環境光ライト
addAmbientLightC(0xffffff, 0.5);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.7, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.3, -1, -2, 1);


const geometry1 = new THREE.CylinderGeometry(0, 1.5, 4, 48);
const geometry2 = new THREE.CylinderGeometry(0, 1.5, 5, 48);


const material1 = new THREE.MeshStandardMaterial({color:0x00ff77, transparent:true, opacity:0.7});
const material2 = new THREE.MeshStandardMaterial({color:0x7700ff});

const mesh1 = new THREE.Mesh(geometry1, material1);
const mesh2 = new THREE.Mesh(geometry2, material2);

mesh2.rotation.set(0, 0, Math.PI / 2 * Number(slider1.value));
mesh2.scale.x = 1.2 *  Number(slider2.value);
mesh2.scale.z = 1.2 *  Number(slider2.value);

scene1.add(mesh1);
scene1.add(mesh2);

//レンダリング（必須）
animateC();
