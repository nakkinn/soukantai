const _0x7305e6=_0x3219;(function(_0x1493e0,_0x125b6d){const _0x2da82b=_0x3219,_0x242f4=_0x1493e0();while(!![]){try{const _0x3e740a=-parseInt(_0x2da82b(0x1d0))/0x1*(parseInt(_0x2da82b(0x1a9))/0x2)+-parseInt(_0x2da82b(0x1cb))/0x3+-parseInt(_0x2da82b(0x1af))/0x4*(-parseInt(_0x2da82b(0x1ba))/0x5)+-parseInt(_0x2da82b(0x1bd))/0x6*(parseInt(_0x2da82b(0x1a4))/0x7)+parseInt(_0x2da82b(0x1ca))/0x8*(-parseInt(_0x2da82b(0x1c1))/0x9)+parseInt(_0x2da82b(0x1ae))/0xa+parseInt(_0x2da82b(0x1c3))/0xb*(parseInt(_0x2da82b(0x1ce))/0xc);if(_0x3e740a===_0x125b6d)break;else _0x242f4['push'](_0x242f4['shift']());}catch(_0x324dd7){_0x242f4['push'](_0x242f4['shift']());}}}(_0x4cdd,0x66452));let canvasover=![],twofinger=![],mouseIsPressed=![],pmouseX1=-0x1,pmouseY1=-0x1,pmouseX2=-0x1,pmouseY2=-0x1,mousemovementX=0x0,mousemovementY=0x0,angularvelocity1_common=new THREE['Vector3'](0x0,0x0,0x0),dummymesh_common=new THREE[(_0x7305e6(0x1b6))]();function _0x3219(_0x204079,_0x1c1dd0){const _0x4cddc5=_0x4cdd();return _0x3219=function(_0x32195a,_0x4c8d0a){_0x32195a=_0x32195a-0x19d;let _0x584577=_0x4cddc5[_0x32195a];return _0x584577;},_0x3219(_0x204079,_0x1c1dd0);}document[_0x7305e6(0x1b4)](_0x7305e6(0x1ad))[_0x7305e6(0x1ac)](function(_0x41e8ee){const _0x1879d4=_0x7305e6;_0x41e8ee[_0x1879d4(0x1a5)][_0x1879d4(0x1c9)]=_0x1879d4(0x1bf);}),document[_0x7305e6(0x1b9)](_0x7305e6(0x1a0),function(_0x241ad4){const _0x22bc07=_0x7305e6;_0x241ad4[_0x22bc07(0x1b1)]();},{'passive':![]});const mycanvas=document[_0x7305e6(0x1cd)](_0x7305e6(0x1bb));mycanvas[_0x7305e6(0x1a5)][_0x7305e6(0x1c9)]=_0x7305e6(0x1bf),document[_0x7305e6(0x1cd)]('canvas1')[_0x7305e6(0x1b9)](_0x7305e6(0x1b8),_0x93bbbb=>{_0x93bbbb['preventDefault']();},{'passive':![]}),document['addEventListener'](_0x7305e6(0x1c4),function(_0x413ac0){const _0x3db93d=_0x7305e6;if(canvasover){if(_0x413ac0[_0x3db93d(0x1a1)]>0x0)camera1['zoom']-=0.1;else camera1['zoom']+=0.1;camera1[_0x3db93d(0x1ab)]();}}),document[_0x7305e6(0x1b9)](_0x7305e6(0x1bc),_0x44b541=>{const _0x39fa78=_0x7305e6;_0x44b541[_0x39fa78(0x1c6)]['tagName']['toLowerCase']()=='canvas'?(canvasover=!![],document[_0x39fa78(0x1c0)]['style'][_0x39fa78(0x19d)]=_0x39fa78(0x1a6)):(canvasover=![],document[_0x39fa78(0x1c0)][_0x39fa78(0x1a5)]['overflow']='');}),mycanvas[_0x7305e6(0x1b9)](_0x7305e6(0x1be),()=>{mouseIsPressed=!![];}),document['addEventListener'](_0x7305e6(0x1b3),()=>{mouseIsPressed=![];}),mycanvas['addEventListener'](_0x7305e6(0x1c8),_0x3e8282=>{const _0x42371b=_0x7305e6;mousemovementX=_0x3e8282['movementX'],mousemovementY=_0x3e8282[_0x42371b(0x1cf)];}),mycanvas[_0x7305e6(0x1b9)]('touchmove',handleTouchMove,![]),mycanvas[_0x7305e6(0x1b9)]('touchend',handleTouchEnd,![]);function handleTouchMove(_0x4e0afc){const _0xcc4af3=_0x7305e6;if(_0x4e0afc['touches'][_0xcc4af3(0x1b7)]==0x2){twofinger=!![];if(pmouseX1==-0x1||pmouseY1==-0x1||pmouseX2==-0x1||pmouseY2==-0x1)pmouseX1=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1cc)],pmouseY1=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1c2)],pmouseX2=_0x4e0afc[_0xcc4af3(0x1a2)][0x1][_0xcc4af3(0x1cc)],pmouseY2=_0x4e0afc[_0xcc4af3(0x1a2)][0x1][_0xcc4af3(0x1c2)];else{let _0xb4c2d4,_0x1ad380,_0x79e694,_0x4839e9;_0xb4c2d4=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1cc)],_0x1ad380=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1c2)],_0x79e694=_0x4e0afc[_0xcc4af3(0x1a2)][0x1][_0xcc4af3(0x1cc)],_0x4839e9=_0x4e0afc[_0xcc4af3(0x1a2)][0x1]['clientY'];let _0x4eeb0f,_0x324884;_0x4eeb0f=Math[_0xcc4af3(0x1a7)]((pmouseX1-pmouseX2)**0x2+(pmouseY1-pmouseY2)**0x2),_0x324884=Math[_0xcc4af3(0x1a7)]((_0xb4c2d4-_0x79e694)**0x2+(_0x1ad380-_0x4839e9)**0x2),camera1[_0xcc4af3(0x1a3)]+=(_0x324884/_0x4eeb0f-0x1)*0x1,camera1['updateProjectionMatrix'](),pmouseX1=_0xb4c2d4,pmouseY1=_0x1ad380,pmouseX2=_0x79e694,pmouseY2=_0x4839e9;}}else _0x4e0afc['touches']['length']==0x1&&(pmouseX1==-0x1||pmouseY1==-0x1?(pmouseX1=_0x4e0afc['touches'][0x0]['clientX'],pmouseY1=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1c2)]):(mousemovementX=_0x4e0afc[_0xcc4af3(0x1a2)][0x0][_0xcc4af3(0x1cc)]-pmouseX1,mousemovementY=_0x4e0afc['touches'][0x0]['clientY']-pmouseY1,pmouseX1=_0x4e0afc[_0xcc4af3(0x1a2)][0x0]['clientX'],pmouseY1=_0x4e0afc['touches'][0x0][_0xcc4af3(0x1c2)]));}function _0x4cdd(){const _0x1c523a=['clientX','getElementById','10471512XBJgbC','movementY','13392KzEWEk','webkitUserSelect','overflow','isMesh','rotation','dblclick','deltaY','touches','zoom','14nGwYJz','style','hidden','sqrt','traverse','88cPUhPh','parent','updateProjectionMatrix','forEach','input[type=\x22range\x22]','306290EPGKwH','8CJHRyr','rotateOnWorldAxis','preventDefault','html,\x20body','pointerup','querySelectorAll','Vector3','Mesh','length','touchmove','addEventListener','543350OKQdKe','canvas1','mousemove','1893966RJQBGz','pointerdown','none','body','18laWIqX','clientY','33XSgEUq','wheel','DOMContentLoaded','target','userSelect','pointermove','touchAction','2625416XZkIqB','1710075YGhZXi'];_0x4cdd=function(){return _0x1c523a;};return _0x4cdd();}function handleTouchEnd(){pmouseX1=-0x1,pmouseY1=-0x1,pmouseX2=-0x1,pmouseY2=-0x1,twofinger=![];}document['addEventListener'](_0x7305e6(0x1c5),()=>{const _0x15af7f=_0x7305e6;document['querySelectorAll'](_0x15af7f(0x1b2))[_0x15af7f(0x1ac)](_0x43d8f2=>{const _0x398236=_0x15af7f;_0x43d8f2[_0x398236(0x1a5)][_0x398236(0x1c7)]=_0x398236(0x1bf),_0x43d8f2[_0x398236(0x1a5)][_0x398236(0x1d1)]=_0x398236(0x1bf),_0x43d8f2[_0x398236(0x1a5)]['mozUserSelect']=_0x398236(0x1bf);});});function rotateobjects_common(_0x3867a0,_0xe2fbc4){const _0xb8f33d=_0x7305e6;if(mouseIsPressed&&!twofinger)angularvelocity1_common['lerp'](new THREE[(_0xb8f33d(0x1b5))](mousemovementY,mousemovementX,0x0),0.2);let _0x9272b8=angularvelocity1_common['clone']()['normalize'](),_0x512064=angularvelocity1_common[_0xb8f33d(0x1b7)]()*0.005;if(_0xe2fbc4[_0xb8f33d(0x1a3)]<0x0)_0x512064*=-0x1;dummymesh_common[_0xb8f33d(0x1b0)](_0x9272b8,_0x512064),_0x3867a0[_0xb8f33d(0x1a8)](_0xed1501=>{const _0x28a9b4=_0xb8f33d;_0xed1501[_0x28a9b4(0x1aa)]===_0x3867a0&&(_0xed1501[_0x28a9b4(0x19e)]||_0xed1501['isGroup'])&&_0xed1501['rotation']['copy'](dummymesh_common[_0x28a9b4(0x19f)]);}),mousemovementX=0x0,mousemovementY=0x0;}