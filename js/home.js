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

const Id=localStorage.getItem("Id_Client");
/*var User_Name=localStorage.getItem("UserName");
var EmailA=localStorage.getItem("Email");
var Count_Favorite=localStorage.getItem("count_faforite");
var Count_Image=localStorage.getItem("count_Image");*/

var myArraycategory=[];
document.getElementById("Load").onload = displayHomeCategory;

async function displayHomeCategory() {
    
    var lu=document.getElementsByClassName("list-unstyled");
    if(Status)
    {
        var raw=` <li><a href="My-Purchases.html">My Purchases</a></li>
                 <li><a href="create-order.html">Create Order</a></li>
                 <li><a href="My_Orders.html">My Orders</a></li>
                 <li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
                 <li><a href="Login.html" onclick="logout()">Log out</a></li>`;
        lu[0].innerHTML+=raw;
        
        
 
    }
    else{
        var raw=`<li><a href="Login.html">Login</a></li>
        <li><a href="Register.html">Register</a></li>`;
        lu[0].innerHTML+=raw;
    }
    var  category= await Category();
    myArraycategory=[];
    myArraycategory=category;
    
    var lu=document.getElementById("RowCategory");
    
    var lu1=document.getElementById("RowCategory1");
    lu1.innerHTML="";
    var lu2=document.getElementById("RowCategory2");
    lu2.innerHTML="";
    var lu3=document.getElementById("RowCategory3");
    lu3.innerHTML="";
    for (var i = 0; i < myArraycategory.length; i++){
       
        myArraycategory[i].Photo= (myArraycategory[i].Photo).replace("<Photo>", "data:image/jpeg;base64,");
        myArraycategory[i].Photo= (myArraycategory[i].Photo).replace("</Photo>", "");

        var row = `
        <div class="item">
        <div class="position-re o-hidden" ><img src="${myArraycategory[i].Photo}" style=" max-width: 100%;height: 400px;"></div> 
         <div class="con"> <i class="ti-more"></i>
        <h5><a href="services-post.html" onclick="CategoryPost(${myArraycategory[i].Id_Category})">${myArraycategory[i].Name_Category}</a></h5>
        <div class="line"></div> <a href="services-post.html" onclick="CategoryPost(${myArraycategory[i].Id_Category})"><i class="ti-arrow-right"></i></a> </div>
        </div>`
       

        if(i==0)
        {
           lu.innerHTML += row;
        }
        else if(i==1){
           
            lu1.innerHTML += row;
        }
        else if(i==2){
           
            lu2.innerHTML += row;
        }
        else if(i==3){
            lu3.innerHTML += row;
        }

    }
    if(myArraycategory.length>0)
   await displayHomeGallery();
}

function CategoryPost(id)
{
    localStorage.removeItem("Id_Category");
    localStorage.setItem("Id_Category",id);
    window.location='services-post.html';
}

async function Category() {
    var output
        await $.get("https://kaii-shoots.herokuapp.com/Get4Category", await function (data) {
            output = data
        });
        return output;
}

var arryListG=[];
async function displayHomeGallery()
{
    var gallery=await Gallery();
    arryListG=gallery;
    var l=document.getElementById("RowGallery");
    var l1=document.getElementById("RowGallery1");
    var l2=document.getElementById("RowGallery2");

    for(var i = 0; i < arryListG.length; i++)
    {
        arryListG[i].Photo= (arryListG[i].Photo).replace("<Image_Show>", "data:image/jpeg;base64,");
        arryListG[i].Photo= (arryListG[i].Photo).replace("</Image_Show>", "");
        if(i==0 || i==1)
        {
            var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arryListG[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arryListG[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arryListG[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: white'></i></button></div>" href="${arryListG[i].Photo}"> <img class="img-fluid" src="${arryListG[i].Photo}" alt=""> </a>`
            l.innerHTML+=row;
        }
        else if(i==5||i==6){
            var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arryListG[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arryListG[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arryListG[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: white'></i></button></div>" href="${arryListG[i].Photo}"> <img class="img-fluid" src="${arryListG[i].Photo}" alt=""> </a>`
            l2.innerHTML+=row;
        }
        else{
            var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arryListG[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arryListG[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arryListG[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: white'></i></button></div>" href="${arryListG[i].Photo}"> <img class="img-fluid" src="${arryListG[i].Photo}" alt=""> </a>`
            l1.innerHTML+=row;
        }
    }
  functionBestimg();
}

async function functionBestimg()
{
    var b1=document.getElementById("Best1");
    var b2=document.getElementById("Best2");
    var b3=document.getElementById("Best3");

    for(var i = 0; i <arryListG.length; i++)
    {

        var rows=`<div class="blog-entry">
         <a href="Image.html" class="blog-img" onclick="pagImage(${arryListG[i].Id_ImageS})"><img src="${arryListG[i].Photo}" class="img-fluid" alt="" style="height:260px;"></a>
         <div class="desc">
            <h3><a href="Image.html" onclick="pagImage(${arryListG[i].Id_ImageS})">PRICE: $${arryListG[i].Price}</a></h3>
            <p>Title: ${arryListG[i].Title}</p>
            <a class="underline-text" href="Image.html" onclick="pagImage(${arryListG[i].Id_ImageS})">Read more <i class="ti-arrow-right"></i></a>
         </div>
         </div>`;
    if(i==0)      {b1.innerHTML+=rows;}
    else if(i==1) {b2.innerHTML+=rows;}
    else if(i==2) {b3.innerHTML+=rows;}

    }
}


















async function Gallery() {
    var output
        await $.get("https://kaii-shoots.herokuapp.com/Get7Photo", await function (data) {
            output = data
        });
        return output;
}