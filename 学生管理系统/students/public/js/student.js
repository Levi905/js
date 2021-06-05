$('.col-2').on('click','.card-body',function(e){
    let arr = $('.tab');
    for(var i =0;i<arr.length;i++){
        if(e.target.innerText == arr[i].querySelector('h3').innerText){

            arr[i].style.display = 'block';
        }else{
            arr[i].style.display = 'none';
        }
        
    }
});