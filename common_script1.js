//このjsファイルは基本的に編集しない

const PI = Math.PI;
function sin(a1){return Math.sin(a1)};
function cos(a1){return Math.cos(a1)};
function tan(a1){return Math.tan(a1)};


//#############################################################
//three.js関連
//#############################################################


//シーン
const scene1 = new THREE.Scene();

// レンダラー
const renderer1 = new THREE.WebGLRenderer({
    canvas:document.getElementById('3d_graphic_canvas'),   //描画するキャンバスをID指定（htmlファイルで設定したID）
    antialias: true, //輪郭をスムーズにする
});


//カメラ
let camera1;    


const random_vector1 = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();


//#############################################################
//アクションの禁止
//#############################################################


//スライダー操作時、画面スクロールが起きないようにする
document.querySelectorAll('input[type="range"]').forEach(function(input) {  
    input.style.touchAction = 'none';
});


//スマホで要素を長押しした際に、右クリックメニューが出ないようにする
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('html, body').forEach((element) => {
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
    });
});


//キャンバスをタッチ時スクロールや拡大縮小が起きないようにする
document.getElementById('3d_graphic_canvas').style.touchAction = 'none';    


//スマホ操作時、左端からスワイプした際ブラウザバッグしないようにする・iphoneで長押し時拡大鏡が出ないようにする
document.getElementById('3d_graphic_canvas').addEventListener('touchmove',(event)=>{event.preventDefault();},{passive:false});    



//#############################################################
//入力や操作に関する処理
//#############################################################

let canvasover = false; //trueのときマウスホイール（2本指スライド）でグラフィックを拡大縮小、falseのときページスクロール
let twofinger = false;  //タッチパッドで2本指操作しているときtrue, そのとき回転軸を維持する
let mouseIsPressed = false; //マウスが押されている（タップ）状態か否か
let pmouseX1=-1, pmouseY1=-1, pmouseX2=-1, pmouseY2=-1; //1フレーム前のマウス（タッチ）座標　1フレーム前タッチされていなければ-1とする
let mousemovementX=0, mousemovementY=0; //マウス移動量


let angularvelocity1 = new THREE.Vector3(0, 0, 0);  //オブジェクトの回転軸　大きさが回転速度に比例する


const mycanvas = document.getElementById('3d_graphic_canvas');


//マウスホイールイベント　カメラのズーム値を変更
document.addEventListener('wheel', function(event) {

    if(canvasover){ //キャンバス操作モードのときカメラズームを調整

        //ズーム値を0.8倍または1.25倍する（0より大きい範囲で変わる）
        // if(event.deltaY > 0) camera1.zoom *= 0.8;    
        // else camera1.zoom *= 1.25;

        //ズーム値を+0.1または-0.1する（値が負になり得る。負のときオブジェクトは鏡像に見える）
        if(event.deltaY > 0) camera1.zoom -= 0.1;
        else camera1.zoom += 0.1;

        camera1.updateProjectionMatrix();
    }

});


//キャンバス上で操作しているか否かの切り替え
document.addEventListener('mousemove', (event)=>{   //第1引数　'click'：ページをクリックすると発火, 'mousemove'：異なる要素にマウスが移動すると発火
    if(event.target.tagName.toLowerCase()=='canvas'){   //クリック位置（移動先）がキャンバス要素のとき
        canvasover = true;  //キャンバス操作オン
        document.body.style.overflow = 'hidden';    //スクロールを無効にする
    }else{   //クリック位置（移動先）がキャンバス要素でないとき
        canvasover = false;  //キャンバス操作オフ
        document.body.style.overflow = '';  //スクロールを有効にする
    }
})


//マウスイベント
//マウスプレス・リリース時にmouseIsPressedを切り替え
mycanvas.addEventListener('pointerdown',()=>{mouseIsPressed = true;});
document.addEventListener('pointerup',()=>{mouseIsPressed = false;});


//マウス移動量の更新
mycanvas.addEventListener('pointermove',(event)=>{
    mousemovementX = event.movementX;
    mousemovementY = event.movementY;
});


//タッチイベント（スマホ画面やタッチパッドの操作）
mycanvas.addEventListener('touchmove', handleTouchMoveC, false); //タッチデバイスをなぞったときhandleTouchMoveを発火
mycanvas.addEventListener('touchend', handleTouchEndC, false);   //タッチデバイスから指を離したときhandleTouchEndを発火


//タッチデバイスを指でなぞったときの処理
function handleTouchMoveC(event){

    if(event.touches.length==2){    //指2本で触れている

        twofinger = true;

        if(pmouseX1==-1 || pmouseY1==-1 || pmouseX2==-1 || pmouseY2==-1){   //1フレーム前は2本指でないとき、1フレーム前の2点の座標を更新

            pmouseX1 = event.touches[0].clientX;
            pmouseY1 = event.touches[0].clientY;
            pmouseX2 = event.touches[1].clientX;
            pmouseY2 = event.touches[1].clientY;

        }else{  //1フレーム前も2本指のとき、1フレーム前と現在の2点分のタッチ座標を使ってズーム値を変更し、1フレーム前の座標を更新

            let mx1, my1, mx2, my2;
            mx1 = event.touches[0].clientX;
            my1 = event.touches[0].clientY;
            mx2 = event.touches[1].clientX;
            my2 = event.touches[1].clientY;

            let d1, d2; 
            d1 = Math.sqrt((pmouseX1-pmouseX2)**2+(pmouseY1-pmouseY2)**2);  //1フレーム前の2つのタップ箇所の距離
            d2 = Math.sqrt((mx1-mx2)**2+(my1-my2)**2);  //現在の2つのタップ箇所の距離

            camera1.zoom += ( d2 / d1 - 1) * 1; //最後の定数を大きくすると変化が大きくなる
            
            camera1.updateProjectionMatrix();

            pmouseX1 = mx1;
            pmouseY1 = my1;
            pmouseX2 = mx2;
            pmouseY2 = my2;

        }

    }else if(event.touches.length==1){  //指1本で触れている、1フレーム前の座標を1点分のみ更新

        if(pmouseX1==-1 || pmouseY1==-1){
            pmouseX1 = event.touches[0].clientX;
            pmouseY1 = event.touches[0].clientY;
        }else{
            mousemovementX = event.touches[0].clientX - pmouseX1;
            mousemovementY = event.touches[0].clientY - pmouseY1;
            pmouseX1 = event.touches[0].clientX;
            pmouseY1 = event.touches[0].clientY;
        }

    }
}


//タッチデバイスから指を離したときの処理
function handleTouchEndC(){
    pmouseX1 = -1;
    pmouseY1 = -1;
    pmouseX2 = -1;
    pmouseY2 = -1;
    twofinger = false;
}



//#############################################################
//自作関数
//#############################################################


//背景色を設定する
function setBackgroundColorC(arg){
    renderer1.setClearColor(arg);
}


//回転ベクトルを設定する
function setAngularVelocityC(arg1, arg2, arg3){
    angularvelocity1.set(arg1, arg2, arg3);
}


//環境光ライトを追加する
function addAmbientLightC(color, power){
    scene1.add(new THREE.AmbientLight(color, power));
}


//指向性ライトを追加する
function addDirectionalLightC(color, power, posx, posy, posz){
    let light1 = new THREE.DirectionalLight(color, power);
    light1.position.set(posx, posy, posz);
    scene1.add(light1);
}


//透視投影カメラを追加する
function addPerspectiveCameraC(optiona){
    const defaultoption = {fov:60, near:0.01, far:500, posz:10, zoom:1};
    optiona = {...defaultoption, ...optiona};
    camera1 = new THREE.PerspectiveCamera(optiona.fov, mycanvas.width/mycanvas.height, optiona.near, optiona.far);
    camera1.position.set(0, 0, optiona.posz);
    camera1.zoom = optiona.zoom;
    camera1.updateProjectionMatrix();
}


//平行投影カメラを追加する
function addOrthographicCameraC(optiona){
    const defaultoption = {near:0.01, far:500, posz:10, zoom:1, range:5};
    optiona = {...defaultoption, ...optiona};
    camera1 = new THREE.OrthographicCamera(-1, 1, 1, -1, optiona.near, optiona.far);
    let aspectratio = mycanvas.width / mycanvas.height;
    if(mycanvas.width > mycanvas.height){
        camera1.left = - optiona.range * aspectratio;
        camera1.right = optiona.range * aspectratio;
        camera1.top = optiona.range;
        camera1.bottom = -optiona.range;
    }else{
        camera1.left = - optiona.range;
        camera1.right = optiona.range;
        camera1.top = optiona.range / aspectratio;
        camera1.bottom = - optiona.range / aspectratio;
    }
    camera1.position.set(0, 0, optiona.posz);
    camera1.zoom = optiona.zoom;
    camera1.updateProjectionMatrix();
}


//文字列にした変数を翻訳し、現在のその変数の値を取得する
function getvalueC(arg){
    if(typeof(arg)==='string'){
        if(arg.charAt(0)=='#')  return arg;
        return eval(arg);
    }
    return arg;
}


//レンダリングを繰り返す
function animateC(){

    requestAnimationFrame(animateC); //この関数自身を呼び出すことで関数内の処理が繰り返される

    if(mouseIsPressed)  angularvelocity1.lerp(new THREE.Vector3(mousemovementY,mousemovementX, 0),0.2);
    let axis = angularvelocity1.clone().normalize();
    let rad = angularvelocity1.length()*0.007;

    if(camera1.zoom < 0)    rad *= -1;

    mousemovementX = 0;
    mousemovementY = 0;

    scene1.traverse((object)=>{
        if(object.isMesh){
            object.rotateOnWorldAxis(axis, rad);
        }
    });


    renderer1.render(scene1, camera1);  //レンダリング
}


//シーンにオブジェクトを追加する    引数：シーン, 頂点リスト, ポリゴンインデックスリスト, オプション
function addMeshC(vtsa, indexa, optiona){

    const defaultoption = {meshcolor:0xffffff, scale:1, rotation:[0,0,0], opacity:1, flatshade:false, wireframe:false, spherecutradius:-1, side:0}; //デフォルトのオプション
    optiona = {...defaultoption, ...optiona};   //デフォルトオプションと引数で渡されたオプションのマージ（引数のオプションを優先）

    let geometry1 = new THREE.BufferGeometry(); //ジオメトリの生成

    if(getvalueC(optiona.spherecutradius)!=-1){ //球面カットを行う場合
        let vts_original = eval(vtsa).flat();
        let tmp = spherecutC(vts_original, tripolyC(indexa), getvalueC(optiona.spherecutradius));   //球面カット後のgraphic complexを算出
        geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vts_original.length * 2), 3));    //頂点数の2倍のサイズの配列を仮に頂点リストとして設定（後に頂点数が増えたときのために使用メモリに余裕を持たせる）
        geometry1.setIndex(new THREE.BufferAttribute(new Uint16Array(tmp[1]), 1));  //ポリゴンインデックスリストを設定
        geometry1.computeVertexNormals();   //頂点の法線ベクトル設定
        geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(tmp[0]), 3));  //頂点座標の設定
        geometry1.computeVertexNormals();   //頂点の法線ベクトル設定
        
    }else{  //球面カットを行わない場合
        geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(eval(vtsa).flat()), 3));  //頂点座標の設定
        geometry1.setIndex(new THREE.BufferAttribute(new Uint16Array(tripolyC(indexa)),1)); //ポリゴンインデックスの設定
        geometry1.computeVertexNormals();   //頂点の法線ベクトル設定
    }


    let material1 = new THREE.MeshStandardMaterial({    //マテリアルの設定
        flatShading:getvalueC(optiona.flatshade),   //フラットシェード
        color: getvalueC(optiona.meshcolor),    //色
        side:THREE.DoubleSide,
        wireframe:optiona.wireframe,    //ワイヤーフレーム
        transparent:true,   //透過モード
        opacity:getvalueC(optiona.opacity),  //透明度
    });

    if(optiona.side==0) material1.side = THREE.DoubleSide;
    if(optiona.side==1) material1.side = THREE.FrontSide;
    if(optiona.side==2) material1.side = THREE.BackSide;

    let mesh1 = new THREE.Mesh(geometry1, material1);   //メッシュ（ジオメトリ＋マテリアル）の生成
    mesh1.scale.set(optiona.scale, optiona.scale, optiona.scale);   //スケールの設定
    mesh1.rotation.set(optiona.rotation[0], optiona.rotation[1], optiona.rotation[2]);  //姿勢の設定

    //メッシュに頂点リスト・ポリゴンインデックスリスト・オプション情報を付与（メッシュを後で更新するのに使用）
    mesh1.vtsstring = vtsa;
    mesh1.originalindex = indexa;
    mesh1.originalOption = optiona;
    mesh1.className = 'meshC';
    
    scene1.add(mesh1);  //シーンにメッシュを追加する

}


function addTubeC(vtsa, indexa, radius, optiona){


    const defaultoption = {color:0xffffff, scale:1, rotation:[0,0,0], opacity:1, flatshade:false, wireframe:false, spherecutradius:-1, side:0, radialsegment:8}; //デフォルトのオプション
    optiona = {...defaultoption, ...optiona};   //デフォルトオプションと引数で渡されたオプションのマージ（引数のオプションを優先）


    let vts_str = vtsa;
    vts_str = vts_str.split("[").join("");
    vts_str = vts_str.split("]").join("");
    vts_str = vts_str.split(',');


    let vts1 = eval(vtsa);
    let vts2 = [];

    for(let i=0; i<indexa.length; i++){
        let tmp = [];
        for(let j=0; j<indexa[i].length; j++){
            tmp.push(vts1[indexa[i][j]]);
        }
        vts2.push(tmp);
    }

    let material1 = new THREE.MeshStandardMaterial({    //マテリアルの設定
        flatShading:getvalueC(optiona.flatshade),   //フラットシェード
        color: getvalueC(optiona.color),    //色
        side:THREE.DoubleSide,
        wireframe:optiona.wireframe,    //ワイヤーフレーム
        transparent:true,   //透過モード
        opacity:getvalueC(optiona.opacity),  //透明度
    });

    for(let i=0; i<vts2.length; i++){
        let geometry1 = makeTubeC(vts2[i], radius, optiona.radialsegment);
        let mesh1 = new THREE.Mesh(geometry1, material1);

        mesh1.scale.set(optiona.scale, optiona.scale, optiona.scale);   //スケールの設定
        mesh1.rotation.set(optiona.rotation[0], optiona.rotation[1], optiona.rotation[2]);  //姿勢の設定

        let x1, y1, z1, x2, y2, z2;
        x1 = vts2[i][0][0];
        y1 = vts2[i][0][1];
        z1 = vts2[i][0][2];
        x2 = vts2[i][vts2[i].length-1][0];
        y2 = vts2[i][vts2[i].length-1][1];
        z2 = vts2[i][vts2[i].length-1][2];

        let vtsstring_tmp = "[";
        for(let j=0; j<indexa[i].length; j++){
            vtsstring_tmp += "[" + vts_str[indexa[i][j]*3] + "," + vts_str[indexa[i][j]*3+1] + "," + vts_str[indexa[i][j]*3+2] + "],";
        }
        vtsstring_tmp = vtsstring_tmp.slice(0,-1) + "]";
        mesh1.vtsstring = vtsstring_tmp;
        mesh1.radius = radius;
        mesh1.originalOption = optiona;
        mesh1.className = "tubeC";

        let geometry2 = new THREE.SphereGeometry(radius, 16, 16);
        for(let j=0; j<geometry2.attributes.position.array.length; j++){
            if(j%3==0)  geometry2.attributes.position.array[j] += x1;
            if(j%3==1)  geometry2.attributes.position.array[j] += y1;
            if(j%3==2)  geometry2.attributes.position.array[j] += z1;
        }
        let mesh2 = new THREE.Mesh(geometry2, material1);
        mesh2.scale.set(optiona.scale, optiona.scale, optiona.scale);   //スケールの設定
        mesh2.rotation.set(optiona.rotation[0], optiona.rotation[1], optiona.rotation[2]);  //姿勢の設定
        mesh2.className = 'ballC';
        mesh2.center_pos = [x1, y1, z1];
        mesh2.vtsstring = "[" + vts_str[indexa[i][0]*3] + "," + vts_str[indexa[i][0]*3+1] + "," + vts_str[indexa[i][0]*3+2] +  "]";

        let geometry3 = new THREE.SphereGeometry(radius, 16, 16);
        for(let j=0; j<geometry3.attributes.position.array.length; j++){
            if(j%3==0)  geometry3.attributes.position.array[j] += x2;
            if(j%3==1)  geometry3.attributes.position.array[j] += y2;
            if(j%3==2)  geometry3.attributes.position.array[j] += z2;
        }
        let mesh3 = new THREE.Mesh(geometry3, material1);
        mesh3.scale.set(optiona.scale, optiona.scale, optiona.scale);   //スケールの設定
        mesh3.rotation.set(optiona.rotation[0], optiona.rotation[1], optiona.rotation[2]);  //姿勢の設定
        mesh3.className = 'ballC';
        mesh3.center_pos = [x2, y2, z2];
        mesh3.vtsstring = "[" + vts_str[indexa[i][indexa[i].length-1]*3] + "," + vts_str[indexa[i][indexa[i].length-1]*3+1] + "," + vts_str[indexa[i][indexa[i].length-1]*3+2] +  "]";

        scene1.add( mesh1 );
        scene1.add( mesh2 );
        scene1.add( mesh3 );
    }


}


//scene1に含まれるオブジェクトの形状を更新する
function updateObjectC(){
    scene1.traverse((object)=>{

        if(object.className == 'meshC'){

            //ジオメトリの更新
            if(getvalueC(object.originalOption.spherecutradius)!=-1 && object.originOption.spherecutradius!=undefined){   //球面カットを行う場合
                let tmp = spherecutC(eval(object.vtsstring).flat(), object.originalindex.flat(), getvalueC(object.originalOption.spherecutradius)); //球面カット後の頂点リスト、ポリゴンインデックスリストを求める
                object.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(tmp[0]), 3));   //頂点座標の更新
                object.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(tmp[1]), 1));    //ポリゴンインデックスリストの更新
            }else{  //球面カットを行わない場合
                object.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(eval(object.vtsstring).flat()), 3));    //頂点座標の更新
            }

            //マテリアルの更新
            object.material.color.set(getvalueC(object.originalOption.meshcolor));  //色の更新
            object.material.opacity = getvalueC(object.originalOption.opacity); //透明度の更新
            object.material.flatShading = getvalueC(object.originalOption.flatshade);   //フラットシェードの設定

            object.material.needsUpdate = true;

            object.geometry.getAttribute('position').needsUpdate = true;
            object.geometry.computeVertexNormals(); //頂点の法線ベクトルの更新

        }

        if(object.className == 'ballC'){
            let tmp = eval(object.vtsstring);
            let x1 = tmp[0];
            let y1 = tmp[1];
            let z1 = tmp[2];

            for(let i=0; i<object.geometry.attributes.position.array.length; i++){
                if(i%3==0)  object.geometry.attributes.position.array[i] += -object.center_pos[0] + x1;
                if(i%3==1)  object.geometry.attributes.position.array[i] += -object.center_pos[1] + y1;
                if(i%3==2)  object.geometry.attributes.position.array[i] += -object.center_pos[2] + z1;
            }

            object.center_pos = [x1, y1, z1];

            object.geometry.getAttribute('position').needsUpdate = true;
            object.geometry.computeVertexNormals(); //頂点の法線ベクトルの更新
        }


        if(object.className == "tubeC"){
            let plist = eval(object.vtsstring);
            let vts = makeTubeC(plist, object.radius, object.originalOption.radialsegment, true);
            object.geometry.attributes.position.array = new Float32Array(vts);
            object.geometry.getAttribute('position').needsUpdate = true;
            object.geometry.computeVertexNormals(); //頂点の法線ベクトルの更新
        }


    });
}


//頂点リストとポリゴンインデックスリスト、カットする球面の半径を入力、カット後のオブジェクトの頂点リスト、ポリゴンインデックスリストを出力する
function spherecutC(vtsa, indexa, r1){

    let vtsr = vtsa.concat();
    let indexr = [];

    let lista = [];

    for(let i=0; i<indexa.length; i+=3){

        let x1, x2, x3, y1, y2, y3, z1, z2, z3;
    
        x1 = vtsa[indexa[i]*3];
        y1 = vtsa[indexa[i]*3+1];
        z1 = vtsa[indexa[i]*3+2];
        x2 = vtsa[indexa[i+1]*3];
        y2 = vtsa[indexa[i+1]*3+1];
        z2 = vtsa[indexa[i+1]*3+2];
        x3 = vtsa[indexa[i+2]*3];
        y3 = vtsa[indexa[i+2]*3+1];
        z3 = vtsa[indexa[i+2]*3+2];
    
        let flag1 = x1*x1 + y1*y1 + z1*z1 <= r1*r1;
        let flag2 = x2*x2 + y2*y2 + z2*z2 <= r1*r1;
        let flag3 = x3*x3 + y3*y3 + z3*z3 <= r1*r1;

        if(((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2 < r1*r1) && ((x2-x3)**2 + (y2-y3)**2 + (z2-z3)**2 < r1*r1) && ((x3-x1)**2 + (y3-y1)**2 + (z3-z1)**2 < r1*r1)){


            if( (flag1&&!flag2&&!flag3) || (!flag1&&flag2&&flag3)){
        
                let ta = f1(x1, y1, z1, x2, y2, z2, r1);
                let tb = f1(x1, y1, z1, x3, y3, z3, r1);
        
                let m1=-1, m2=-1;
        
                for(let j=0; j<lista.length; j++){
                    if( (lista[j][0]==indexa[i]&&lista[j][1]==indexa[i+1]) || (lista[j][0]==indexa[i+1]&&lista[j][1]==indexa[i])){
                        m1 = lista[j][2];
                    }
                    if( (lista[j][0]==indexa[i]&&lista[j][1]==indexa[i+2]) || (lista[j][0]==indexa[i+2]&&lista[j][1]==indexa[i]) ){
                        m2 = lista[j][2];
                    }
                }

                if(m1==-1){
                    m1 = vtsr.length/3;
                    vtsr.push(x1*ta+x2*(1-ta), y1*ta+y2*(1-ta), z1*ta+z2*(1-ta));
                    lista.push([indexa[i], indexa[i+1], m1]);
                }
                if(m2==-1){
                    m2 = vtsr.length/3;
                    vtsr.push(x1*tb+x3*(1-tb), y1*tb+y3*(1-tb), z1*tb+z3*(1-tb));
                    lista.push([indexa[i], indexa[i+2], m2]);
                }
                
                if(flag1)   indexr.push(indexa[i], m1, m2);
                else    indexr.push(m1, indexa[i+1], indexa[i+2], m2, m1, indexa[i+2]);
            }
        
            if( (!flag1&&flag2&&!flag3) || (flag1&&!flag2&&flag3) ){
        
                let ta = f1(x2, y2, z2, x1, y1, z1, r1);
                let tb = f1(x2, y2, z2, x3, y3, z3, r1);
        
                let m1 = -1, m2 = -1;
        
                for(let j=0; j<lista.length; j++){
                    if( (lista[j][0]==indexa[i]&&lista[j][1]==indexa[i+1]) || (lista[j][0]==indexa[i+1]&&lista[j][1]==indexa[i]) ){
                        m1 = lista[j][2];
                    }
                    if( (lista[j][0]==indexa[i+1]&&lista[j][1]==indexa[i+2]) || (lista[j][0]==indexa[i+2]&&lista[j][1]==indexa[i+1])){
                        m2 = lista[j][2];
                    }
                }
        
                if(m1==-1){
                    m1 = vtsr.length/3;
                    vtsr.push(x2*ta+x1*(1-ta), y2*ta+y1*(1-ta), z2*ta+z1*(1-ta));
                    lista.push([indexa[i], indexa[i+1], m1]);
                }
                if(m2==-1){
                    m2 = vtsr.length/3;
                    vtsr.push(x2*tb+x3*(1-tb), y2*tb+y3*(1-tb), z2*tb+z3*(1-tb));
                    lista.push([indexa[i+1], indexa[i+2], m2]);
                }
                
                if(flag2)   indexr.push(m1, indexa[i+1], m2);
                else    indexr.push(indexa[i], m1, indexa[i+2], m1, m2, indexa[i+2]);
            }
        
            if( (!flag1&&!flag2&&flag3) || (flag1&&flag2&&!flag3) ){
                let ta = f1(x3, y3, z3, x1, y1, z1, r1);
                let tb = f1(x3, y3, z3, x2, y2, z2, r1);

                let m1 = -1, m2 = -1;
        
                for(let j=0; j<lista.length; j++){
                    if( (lista[j][0]==indexa[i]&&lista[j][1]==indexa[i+2]) || (lista[j][0]==indexa[i+2]&&lista[j][1]==indexa[i])){
                        m1 = lista[j][2];
                    }
                    if( (lista[j][0]==indexa[i+1]&&lista[j][1]==indexa[i+2]) || (lista[j][0]==indexa[i+2]&&lista[j][1]==indexa[i+1])){
                        m2 = lista[j][2];
                    }
                }
        
                if(m1==-1){
                    m1 = vtsr.length/3;
                    vtsr.push(x3*ta+x1*(1-ta), y3*ta+y1*(1-ta), z3*ta+z1*(1-ta));
                    lista.push([indexa[i], indexa[i+2], m1]);
                }
                if(m2==-1){
                    m2 = vtsr.length/3;
                    vtsr.push(x3*tb+x2*(1-tb), y3*tb+y2*(1-tb), z3*tb+z2*(1-tb));
                    lista.push([indexa[i+1], indexa[i+2], m2]);
                }
                
                if(flag3)   indexr.push(m1, m2, indexa[i+2]);
                else   indexr.push(indexa[i], indexa[i+1], m1, m2, m1, indexa[i+1])
            }
        
            if(flag1 && flag2 && flag3){        
                indexr.push(indexa[i], indexa[i+1], indexa[i+2]);
            }

        }
    
    }

    
    //A(x1,y1,z1)とB(x2,y2,z2)を結ぶ線分と原点中心半径r1の円の交点Ｐ, 線分ＡＢにおける点Ｐの内分比を返す
    function f1(x1, y1, z1, x2, y2, z2, r1){

        let t1, t2; //2次方程式の解2つ

        t1 = (-(x1*x2) + x2**2 - y1*y2 + y2**2 - z1*z2 + z2**2 - Math.sqrt(-4*(- (r1**2) + x2**2 + y2**2 + z2**2)*(x1**2 - 2*x1*x2 + x2**2 + y1**2 - 2*y1*y2 + y2**2 + z1**2 - 2*z1*z2 + z2**2) + 4*(-(x1*x2) + x2**2 - y1*y2 + y2**2 - z1*z2 + z2**2)**2)/2)/
        (x1**2 - 2*x1*x2 + x2**2 + y1**2 - 2*y1*y2 + y2**2 + z1**2 - 2*z1*z2 + z2**2);

        t2 = (-(x1*x2) + x2**2 - y1*y2 + y2**2 - z1*z2 + z2**2 + Math.sqrt(-4*(- (r1**2) + x2**2 + y2**2 + z2**2)*(x1**2 - 2*x1*x2 + x2**2 + y1**2 - 2*y1*y2 + y2**2 + z1**2 - 2*z1*z2 + z2**2) + 4*(-(x1*x2) + x2**2 - y1*y2 + y2**2 - z1*z2 + z2**2)**2)/2)/
        (x1**2 - 2*x1*x2 + x2**2 + y1**2 - 2*y1*y2 + y2**2 + z1**2 - 2*z1*z2 + z2**2);
        
        if(x1*x1+y1*y1+z1*z1==r1*r1){
            return 1;
        }
        if(x2*x2+y2*y2+z2*z2==r1*r1){
            return 0;
        }

        //t1,t2のうち0～1の範囲にある方の値を返す　（0.5との差が小さい方）
        if(Math.abs(t1-0.5)<Math.abs(t2-0.5))   return t1;  
        else    return t2;
    }

    return [vtsr, indexr];
}


//多角形ポリゴンのポリゴンインデックスを三角形ポリゴンに変換してフラット
function tripolyC(list){
    let result = [];
    for(let i=0; i<list.length; i++){ //三角ポリゴンに変換
        for(let j=0; j<list[i].length-2; j++){
            result.push(list[i][0], list[i][1+j], list[i][2+j]);
        }
    }
    return result;
}



//ポイントリストからチューブのジオメトリを生成
function makeTubeC(plist, radius, n, option=false){

    let vts = [];
    let index = [];

    let ring = new Array(n);

    let x1 = plist[0][0];
    let y1 = plist[0][1];
    let z1 = plist[0][2];
    let x2 = plist[1][0];
    let y2 = plist[1][1];
    let z2 = plist[1][2];

    let vr = random_vector1;
    let v1 = new THREE.Vector3(x2-x1, y2-y1, z2-z1);
    let v2 = v1.clone().cross(vr).normalize().multiplyScalar(radius);

    for(let i=0; i<n; i++){
        let v3 = v2.clone().applyAxisAngle(v1.clone().normalize(), 2*Math.PI/n*i);
        ring[i] = new THREE.Vector3(v3.x, v3.y, v3.z);
    }


    for(let i=0; i<ring.length; i++){
        vts.push(ring[i].x+x1, ring[i].y+y1, ring[i].z+z1);
    }


    for(let k=0; k<plist.length-2; k++){

        let x1 = plist[k][0];
        let y1 = plist[k][1];
        let z1 = plist[k][2];
        let x2 = plist[k+1][0];
        let y2 = plist[k+1][1];
        let z2 = plist[k+1][2];
        let x3 = plist[k+2][0];
        let y3 = plist[k+2][1];
        let z3 = plist[k+2][2];


        let v12 = new THREE.Vector3(x1-x2, y1-y2, z1-z2);
        let v32 = new THREE.Vector3(x3-x2, y3-y2, z3-z2);
        let vc = v12.clone().cross(v32).normalize();

        let angle = v12.angleTo(v32);
        if(angle>Math.PI/2)   angle = Math.PI - angle;
        
        for(let i=0; i<ring.length; i++){
            ring[i].applyAxisAngle(vc, -angle/2);
            vts.push(ring[i].x+x2, ring[i].y+y2, ring[i].z+z2);
            ring[i].applyAxisAngle(vc, -angle/2);
        }
    }

    for(let i=0; i<ring.length; i++){
        vts.push(ring[i].x+plist[plist.length-1][0], ring[i].y+plist[plist.length-1][1], ring[i].z+plist[plist.length-1][2]);
    }

    if(option)  return vts;


    for(let i=0; i<plist.length-1; i++) for(let j=0; j<n; j++){
        index.push(n*i+j, n*i+(j+1)%n, n*(i+1)+j, n*(i+1)+(j+1)%n, n*(i+1)+j, n*i+(j+1)%n);
    }

    let geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vts),3));
    geometry1.computeVertexNormals();
    geometry1.setIndex(new THREE.BufferAttribute(new Uint16Array(index),1));
    geometry1.computeVertexNormals();

    //let material1 = new THREE.MeshNormalMaterial({side:THREE.DoubleSide, flatShading:false});

    //let mesh1 = new THREE.Mesh(geometry1, material1);

    return geometry1;

}
