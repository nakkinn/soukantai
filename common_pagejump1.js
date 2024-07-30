//ページ数が増えた場合、optionsの要素を追加する
const options = [
    {url:"../dod/index.html", title:"正十二面体"},
    {url:"../ico/index.html", title:"正二十面体"},
    {url:"../soccer_ball/index.html", title:"切頂二十面体"},
    {url:"../snub_cube/index.html", title:"ひねり立方体"},
];


const selectElement = document.createElement('select');
selectElement.style.fontSize = 25;  //セレクトボックスのサイズ

let optionElement;
optionElement = document.createElement('option');
optionElement.value = "null";
optionElement.textContent = "ページを選択";
selectElement.appendChild(optionElement);

for(let i=0; i<options.length; i++){
    optionElement = document.createElement('option');
    optionElement.value = options[i].url;
    optionElement.textContent = options[i].title;
    selectElement.appendChild(optionElement);
}

document.body.appendChild(selectElement);


selectElement.addEventListener('change',()=>{
    if(selectElement.value!='null') window.location.href = selectElement.value;
});

