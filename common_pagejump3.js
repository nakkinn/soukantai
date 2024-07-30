//ページ数が増えた場合、optionsの要素を追加する
const options = [
    {url:"../cylinder2/index.html", title:"2本円柱交差"},
    {url:"../cylinder3/index.html", title:"3本円柱交差"},
    {url:"../cylinder4/index.html", title:"4本円柱交差"},
    {url:"../cylinder6/index.html", title:"6本円柱交差"},

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

