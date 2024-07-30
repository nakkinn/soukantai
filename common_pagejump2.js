//ページ数が増えた場合、optionsの要素を追加する
const options = [
    {url:"../tetra5/index.html", title:"5つの正四面体"},
    {url:"../cube3/index.html", title:"3つの立方体"},
    {url:"../cube5/index.html", title:"5つの立方体"},
    {url:"../cube10a/index.html", title:"10個の立方体A"},
    {url:"../cube10b/index.html", title:"10個の立方体B"},
    {url:"../cube10anime/index.html", title:"10個の立方体C"},
    {url:"../oct4/index.html", title:"4つの正八面体"},
    {url:"../dod5/index.html", title:"5つの正十二面体"}
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

