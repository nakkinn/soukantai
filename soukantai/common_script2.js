document.getElementById("mySelect").addEventListener('change',()=>{
    var selectedValue = document.getElementById("mySelect").value;
    window.location.href = selectedValue;
});