const dragArea = document.querySelector(".drag-area"),
dragText = dragArea.querySelector("header"),
button = dragArea.querySelector("button"),
input = dragArea.querySelector("input");

let file; // This is a global variable and will use it inside multiple functions

button.onclick = ()=>{
    input.click(); //if user click on the button then input also clicked

}
input.addEventListener("change", function(){
    file = this.files[0] // getting user select file and select 1 one of the seleceted files
    showFile()
    dragArea.classList.add("active");
})  

//  If user drag file over dragArea
dragArea.addEventListener("dragover", (event)=>{
    event.preventDefault() // preventing from default behaviour
    dragArea.classList.add("active");
    dragText.textContent = "Release to Upload File" ;
})

//  If user leave file from dragArea
dragArea.addEventListener("dragleave", ()=>{
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File" ;
})

//  If user drop file on dragArea
dragArea.addEventListener("drop", (event)=>{
    event.preventDefault() // preventing from default behaviour
    file = event.dataTransfer.files[0] // getting user select file and [0] means if user select multiple files than it will take only first file
    showFile()
})
function showFile(){
    let fileTYpe = file.type;

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if(validExtensions.includes(fileTYpe)){
        let fileReader = new FileReader() // creating new reader object      
        fileReader.onload = ()=>{
            let fileURL  = fileReader.result; // passing url file source in FileURL variable
            let imgTag = `<img src="${fileURL}" alt="">`  // creatinf an img tag and passing user selected file source inside  src attribute
            dragArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file)
    }
    else{
        alert("This is not a image file")
        dragArea.classList.remove("active")
    }
}