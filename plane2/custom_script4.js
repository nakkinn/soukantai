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

//addMeshC(vts4, index4, {meshcolor:0xff5500, scale:2, opacity:0.8});

// addMeshC(vts5, index5, {meshcolor:0xff5500, scale:2, opacity:0.8, side:0});
// addMeshC(vts6, index5, {meshcolor:0x0044ff, scale:2, opacity:0.8, side:0});
// addMeshC(vts7, index5, {meshcolor:0xff5500, scale:2, opacity:0.8, side:0});



//レンダリング（必須）
animateC();


//[[1.0835,0.0012,-0.8501],[1.0265,0.173,-0.7941],[0.9441,0.3174,-0.7333],[0.8445,0.4328,-0.6707],[0.7349,0.5195,-0.6084],[0.6213,0.5795,-0.5483],[0.5083,0.6157,-0.4911],[0.3992,0.6313,-0.4377],[0.2963,0.6295,-0.388],[0.2011,0.6132,-0.3421],[0.1143,0.585,-0.2998],[0.0364,0.5471,-0.2607],[-0.0326,0.5015,-0.2246],[-0.0927,0.4497,-0.1911],[-0.1441,0.3929,-0.1598],[-0.1871,0.3324,-0.1304],[-0.2218,0.269,-0.1025],[-0.2486,0.2034,-0.0758],[-0.2675,0.1363,-0.05],[-0.2788,0.0681,-0.0248],[-0.2826,-0.0004,0.0002],[-0.2787,-0.069,0.0251],[-0.2674,-0.1371,0.0503],[-0.2483,-0.2042,0.0762],[-0.2214,-0.2698,0.1029],[-0.1866,-0.3332,0.1308],[-0.1435,-0.3937,0.1602],[-0.092,-0.4503,0.1915],[-0.0318,-0.5021,0.2251],[0.0373,-0.5477,0.2612],[0.1153,-0.5854,0.3003],[0.2022,-0.6135,0.3426],[0.2976,-0.6296,0.3886],[0.4006,-0.6312,0.4383],[0.5097,-0.6154,0.4919],[0.6228,-0.5789,0.549],[0.7364,-0.5185,0.6092],[0.8459,-0.4315,0.6715],[0.9453,-0.3158,0.7341],[1.0274,-0.1709,0.7949],[1.084,0.0012,0.8508]]
let plist = [[1,0,0],[0,0,0.4],[0,1,0],[4,1,1]];
//plist = [[1.0835,0.0012,-0.8501],[1.0265,0.173,-0.7941],[0.9441,0.3174,-0.7333],[0.8445,0.4328,-0.6707],[0.7349,0.5195,-0.6084],[0.6213,0.5795,-0.5483],[0.5083,0.6157,-0.4911],[0.3992,0.6313,-0.4377],[0.2963,0.6295,-0.388],[0.2011,0.6132,-0.3421],[0.1143,0.585,-0.2998],[0.0364,0.5471,-0.2607],[-0.0326,0.5015,-0.2246],[-0.0927,0.4497,-0.1911],[-0.1441,0.3929,-0.1598],[-0.1871,0.3324,-0.1304],[-0.2218,0.269,-0.1025],[-0.2486,0.2034,-0.0758],[-0.2675,0.1363,-0.05],[-0.2788,0.0681,-0.0248],[-0.2826,-0.0004,0.0002],[-0.2787,-0.069,0.0251],[-0.2674,-0.1371,0.0503],[-0.2483,-0.2042,0.0762],[-0.2214,-0.2698,0.1029],[-0.1866,-0.3332,0.1308],[-0.1435,-0.3937,0.1602],[-0.092,-0.4503,0.1915],[-0.0318,-0.5021,0.2251],[0.0373,-0.5477,0.2612],[0.1153,-0.5854,0.3003],[0.2022,-0.6135,0.3426],[0.2976,-0.6296,0.3886],[0.4006,-0.6312,0.4383],[0.5097,-0.6154,0.4919],[0.6228,-0.5789,0.549],[0.7364,-0.5185,0.6092],[0.8459,-0.4315,0.6715],[0.9453,-0.3158,0.7341],[1.0274,-0.1709,0.7949],[1.084,0.0012,0.8508]];






for(let i=0; i<plist.length; i++)   for(let j=0; j<3; j++)  plist[i][j]*=5;


scene1.add(makeTube2(plist, 0.5, 8));



function makeTubeC(plist, radius, n){

    let vts = [];
    let index = [];

    let ring = new Array(n);

    let x1 = plist[0][0];
    let y1 = plist[0][1];
    let z1 = plist[0][2];
    let x2 = plist[1][0];
    let y2 = plist[1][1];
    let z2 = plist[1][2];

    let vr = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
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
        console.log(angle);
        
        for(let i=0; i<ring.length; i++){
            ring[i].applyAxisAngle(vc, -angle/2);
            vts.push(ring[i].x+x2, ring[i].y+y2, ring[i].z+z2);
            ring[i].applyAxisAngle(vc, -angle/2);
        }
    }

    for(let i=0; i<ring.length; i++){
        vts.push(ring[i].x+plist[plist.length-1][0], ring[i].y+plist[plist.length-1][1], ring[i].z+plist[plist.length-1][2]);
    }


    for(let i=0; i<plist.length-1; i++) for(let j=0; j<n; j++){
        index.push(n*i+j, n*i+(j+1)%n, n*(i+1)+j, n*(i+1)+(j+1)%n, n*(i+1)+j, n*i+(j+1)%n);
    }

    console.log(index);

    let geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vts),3));
    geometry1.computeVertexNormals();
    geometry1.setIndex(new THREE.BufferAttribute(new Uint16Array(index),1));
    geometry1.computeVertexNormals();

    let material1 = new THREE.MeshNormalMaterial({side:THREE.DoubleSide, flatShading:true});

    let mesh1 = new THREE.Mesh(geometry1, material1);

    return mesh1;

}



function makeTube2(plist, radius, radialSegment){

    let vts2 = [];
    let index2 = [];

    for(let k=0; k<plist.length-1; k++){

        let vts=[], index=[];

        let x1 = plist[k][0];
        let y1 = plist[k][1];
        let z1 = plist[k][2];
        let x2 = plist[k+1][0];
        let y2 = plist[k+1][1];
        let z2 = plist[k+1][2];

        let vr = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
        let v1 = new THREE.Vector3(x2-x1, y2-y1, z2-z1);
        let v2 = v1.clone().cross(vr).normalize().multiplyScalar(radius);

        for(let i=0; i<radialSegment; i++){
            let v3 = v2.clone().applyAxisAngle(v1.clone().normalize(), 2*Math.PI/radialSegment*i);
            vts.push(x1+v3.x, y1+v3.y, z1+v3.z, (x1+x2)/2+v3.x, (y1+y2)/2+v3.y, (z1+z2)/2+v3.z, x2+v3.x, y2+v3.y, z2+v3.z);
        }

        for(let i=0; i<radialSegment; i++){
            index.push(i*3, i*3+1, ((i+1)%radialSegment)*3, ((i+1)%radialSegment)*3+1, ((i+1)%radialSegment)*3, i*3+1, i*3+1, i*3+2, ((i+1)%radialSegment)*3+1, ((i+1)%radialSegment)*3+2, ((i+1)%radialSegment)*3+1, i*3+2);
        }

        for(let i=0; i<index.length; i++){
            index[i] += k * radialSegment * 3;
        }

        vts2 = vts2.concat(vts);
        index2 = index2.concat(index);

    }


    let geometry2 = new THREE.SphereGeometry(radius, radialSegment, radialSegment);
    let vtstmp = Array.from( geometry2.attributes.position.array );
    for(let i=0; i<vtstmp.length; i++){
        if(i%3==0)  vtstmp[i] += plist[1][0];
        if(i%3==1)  vtstmp[i] += plist[1][1];
        if(i%3==2)  vtstmp[i] += plist[1][2];
    }
    let indextmp = Array.from( geometry2.index.array);
    for(let i=0; i<indextmp.length; i++)    indextmp[i] += vts2.length/3;


    vts2 = vts2.concat(vtstmp);
    index2 = index2.concat(indextmp);

    console.log(vts2);
    console.log(index2);
    


    let geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vts2),3));
    geometry1.computeVertexNormals();
    geometry1.setIndex(new THREE.BufferAttribute(new Uint16Array(index2),1));
    geometry1.computeVertexNormals();

    

    let material1 = new THREE.MeshStandardMaterial({side:THREE.DoubleSide, flatShading:false, color:0xff5500});

    let mesh1 = new THREE.Mesh(geometry1, material1);




    return mesh1

}