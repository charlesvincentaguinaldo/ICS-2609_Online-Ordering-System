function enableQuantity(id) {
    let x =document.getElementById(id)
    let y =x.querySelector('input.ch')
    if(y.checked == true){
        x.querySelector('input.quantity').removeAttribute("disabled");
    }else if(y.checked == false){
        x.querySelector('input.quantity').setAttribute("disabled", "disabled");
   }
}