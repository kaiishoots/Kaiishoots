
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


document.getElementById("Load").onload=Gallerys;

var arryGallery=[];
var w=false;
var idImg;
async function Gallerys()
{
    var lu=document.getElementsByClassName("list-unstyled");
    if(Status)
    {
        var raw=` <li><a href="My-Purchases.html">My Purchases</a></li>
                 <li><a href="create-order.html">Create Order</a></li>
                 <li><a href="My_Orders.html">My Orders</a></li>
                 <li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
                 <li><a href="My_Orders.html" onclick="logout()">Log out</a></li>`;
        lu[0].innerHTML+=raw;
      
        
 
    }
    else{
        var raw=`<li><a href="Login.html">Login</a></li>
        <li><a href="Register.html">Register</a></li>`;
        lu[0].innerHTML+=raw;
    }
    
 await IdImage().then(response=>{

    if(response[0]["Id_ImageS"]!=null)
    {
        w=true;
        idImg=response[0]["Id_ImageS"];
    }
   
 });
if(w===true)
{
    const data={Id_ImageS:idImg};
    arryGallery=[];
    arryGallery= await GalleryAPI(data);
    var x=arryGallery.length;
    
    openImage(nbr,count);
}

}
count=9;
    nbr=0;
async function openImage(nbrStart,countnbr) {
    var p=document.getElementById("ImageGallery1");
    var p1=document.getElementById("ImageGallery2");
    var p2=document.getElementById("ImageGallery3");
    var p3=document.getElementById("ImageGallery4");
    var p4=document.getElementById("ImageGallery5");
    var p5=document.getElementById("ImageGallery6");
    var p6=document.getElementById("ImageGallery7");
    var p7=document.getElementById("ImageGallery8");
    var p8=document.getElementById("ImageGallery9");
    p.innerHTML="";
    p1.innerHTML="";
    p2.innerHTML="";
    p3.innerHTML="";
    p4.innerHTML="";
    p5.innerHTML="";
    p6.innerHTML="";
    p7.innerHTML="";
    p8.innerHTML="";
    if(countnbr>arryGallery.length)
    {
        countnbr=arryGallery.length;
    }
    
    for(var i=nbrStart ;i<countnbr;i++)
    {
        arryGallery[i].image= (arryGallery[i].image).replace("<Image_Show>", "data:image/jpeg;base64,");
        arryGallery[i].image= (arryGallery[i].image).replace("</Image_Show>", "");

       
        var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arryGallery[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arryGallery[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arryGallery[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: white'></i></button></div>" href="${arryGallery[i].image}"> <img class="img-fluid" src="${arryGallery[i].image}" style="object-fit: contain; height:260px"> </a>`;

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

var nxt= document.getElementById("Nextpage");
if(nxt){
    nxt.addEventListener("click", nextData);
}
async function nextData(){
     if(count==arryGallery.length)
    {
        

      
        const data={Id_ImageS:arryGallery[arryGallery.length-1].Id_ImageS};
        
        var objGallery= await GalleryAPI(data);
        for(var i in objGallery)
        {
            arryGallery.push(objGallery[i]);
        }
        
   
     if(count<arryGallery.length){
        nbr=count;
        count=count+9;
        openImage(nbr,count);
     }
       
    }
    else if(count<arryGallery.length)
    {
        nbr=count;
        count=count+9; 
        openImage(nbr,count);  
    }
}


var Previous =document.getElementById("Previouspage");
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














//GET DATA FROM DATABASE IN SERVER

async function IdImage() {
    var output
        await $.get("https://kaii-shoots.herokuapp.com/GetIdPhoto", await function (data) {
            output = data
        });
        return output;
}


async function GalleryAPI(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetallPhoto`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
