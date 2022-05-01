
 document.onkeydown = function(e) {
        if(event.keyCode == 123) {
           return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
           return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
           return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
           return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
           return false;
        }
      }

document.getElementById("Load").onload =displayImageCategory;
var arrayC=[];
var count,nbr;
const Id_Category=localStorage.getItem("Id_Category");
async function displayImageCategory() {

    var lu=document.getElementsByClassName("list-unstyled");
    if(Status)
    {
        var raw=`<li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
        <li><a href="create-order.html">Create Order</a></li>`;
        lu[0].innerHTML+=raw;

    }
    else{
        var raw=`<li><a href="Login.html">Login</a></li>
        <li><a href="Register.html">Register</a></li>`;
        lu[0].innerHTML+=raw;
    }
    
   
    const CDateUpload=`'2022-01-01 15:20:44.473'`;
    var data={Id_Category:Id_Category,DateUpload:CDateUpload};
    arrayC=[];
    arrayC=await PhotoByCategory(data);
    count=9;
    nbr=0;
   await openImage(nbr,count)
   
}

 async function openImage(nbrStart,countnbr) {
    var p=document.getElementById("ImageCatigory1");
    var p1=document.getElementById("ImageCatigory2");
    var p2=document.getElementById("ImageCatigory3");
    var p3=document.getElementById("ImageCatigory4");
    var p4=document.getElementById("ImageCatigory5");
    var p5=document.getElementById("ImageCatigory6");
    var p6=document.getElementById("ImageCatigory7");
    var p7=document.getElementById("ImageCatigory8");
    var p8=document.getElementById("ImageCatigory9");
    p.innerHTML="";
    p1.innerHTML="";
    p2.innerHTML="";
    p3.innerHTML="";
    p4.innerHTML="";
    p5.innerHTML="";
    p6.innerHTML="";
    p7.innerHTML="";
    p8.innerHTML="";
    if(countnbr>arrayC.length)
    {
        countnbr=arrayC.length;
    }
    for(var i=nbrStart ;i<countnbr;i++)
    {
        arrayC[i].Photo= (arrayC[i].Photo).replace("<Image_Show>", "data:image/jpeg;base64,");
        arrayC[i].Photo= (arrayC[i].Photo).replace("</Image_Show>", "");

       
        var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arrayC[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arrayC[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arrayC[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: white'></i></button></div>" href="${arrayC[i].Photo}"> <img class="img-fluid" src="${arrayC[i].Photo}" style="object-fit: contain; height:260px"> </a>`;

        if(i===nbrStart)
        {
           
            p.innerHTML=row;
        }
       
        else if(i===nbrStart+1)
       { p1.innerHTML=row;}
        else if(i===nbrStart+2)
        {  p2.innerHTML=row;}
        else if(i===nbrStart+3)
        { p3.innerHTML=row;}
        else if(i===nbrStart+4)
        {  p4.innerHTML=row;}
        else if(i===nbrStart+5)
        {  p5.innerHTML=row;}
        else if(i===nbrStart+6)
        {  p6.innerHTML=row;}
        else if(i===nbrStart+7)
        { p7.innerHTML=row;}
        else if(i===nbrStart+8)
        { p8.innerHTML=row;}
    }
}

var nxt= document.getElementById("NextImage");
if(nxt){
    nxt.addEventListener("click", nextData);
}
function nextData(){
     if(count==arrayC.length)
    {
        

        var CDateUpload=`'${arrayC[arrayC.length-1].DateUpload}'`;
        const data={Id_Category:Id_Category,DateUpload:CDateUpload};
        
        
        var objservices= PhotoByCategory(data);
        for(var i in objservices)
        {
            arrayC.push(objservices[i]);
        }

     if(count<arrayC.length){
        nbr=count;
        count=count+9;
        openImage(nbr,count);
     }
       
    }
    else if(count<arrayC.length)
    {
        nbr=count;
        count=count+9; 
        openImage(nbr,count);  
    }
}

var Previous =document.getElementById("Previous");
if(Previous){
    Previous.addEventListener("click", PreviousData);
}

function PreviousData(){
    if(count>9 && nbr>0)
   {
       nbr=nbr-9;
       count=count-9;

       openImage(nbr,count);
   }
  
}

async function PhotoByCategory(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetPhotoByCategory`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}