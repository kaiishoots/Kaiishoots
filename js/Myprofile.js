

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


  let controlPaypal;
document.getElementById("Load").onload=profileFav;


var arrayF=[];
var count=9,nbr=0;
var username=document.getElementById("UserName");
var email=document.getElementById("Email");

function logout(){

   localStorage.removeItem("UserName");
   localStorage.removeItem("Email");
   localStorage.removeItem("status");
   localStorage.removeItem("Id_Client");
   localStorage.removeItem("count_faforite");
   localStorage.removeItem("count_Image");
   localStorage.removeItem("Id_Image_Gallery");

   window.location="index.html";
}
async function profileFav()
{
   document.getElementById("Nextpage").style.display="none";
   document.getElementById("Previouspage").style.display="none";
   var lu=document.getElementsByClassName("list-unstyled");
   if(Status)
   {
       var raw=` <li><a href="My-Purchases.html">My Purchases</a></li>
                <li><a href="create-order.html">Create Order</a></li>
                <li><a href="My_Orders.html">My Orders</a></li>
                <li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
                <li><a href="My_Orders.html" onclick="logout()">Log out</a></li>`;
       lu[0].innerHTML+=raw;
       username.value=localStorage.getItem("UserName")
       email.value=localStorage.getItem("Email")
       

   }
   else{
       var raw=`<li><a href="Login.html">Login</a></li>
       <li><a href="Register.html">Register</a></li>`;
       lu[0].innerHTML+=raw;
   }

 const data={Id_Client:localStorage.getItem("Id_Client")};
 arrayF=await FavoritAPI(data);


 if(arrayF.length>=9)
 {
    document.getElementById("Nextpage").style.display="block";
    document.getElementById("Previouspage").style.display="block";
 }

 openImage(nbr,count);
 profileCartPlus();
}

var arrayCart=[];
var countC=9,nbrC=0;
async function profileCartPlus()
{
 const dataC={Id_C:localStorage.getItem("Id_Client")};
 arrayCart=await GetCartPlus(dataC);
 openImageCart(nbr,count);
}


async function openImage(nbrStart,countnbr) {
    var p=document.getElementById("ImageF1");
    var p1=document.getElementById("ImageF2");
    var p2=document.getElementById("ImageF3");
    var p3=document.getElementById("ImageF4");
    var p4=document.getElementById("ImageF5");
    var p5=document.getElementById("ImageF6");
    var p6=document.getElementById("ImageF7");
    var p7=document.getElementById("ImageF8");
    var p8=document.getElementById("ImageF9");
    p.innerHTML="";
    p1.innerHTML="";
    p2.innerHTML="";
    p3.innerHTML="";
    p4.innerHTML="";
    p5.innerHTML="";
    p6.innerHTML="";
    p7.innerHTML="";
    p8.innerHTML="";
    if(countnbr>arrayF.length)
    {
        countnbr=arrayF.length;
    }
    
    for(var i=nbrStart ;i<countnbr;i++)
    {
        arrayF[i].Photo= (arrayF[i].Photo).replace("<Image_Show>", "data:image/jpeg;base64,");
        arrayF[i].Photo= (arrayF[i].Photo).replace("</Image_Show>", "");

       
        var row=`<a  class="d-block dorothea-photo-item" data-fancybox="images" data-caption=" ${arrayF[i].Id_ImageS} <div id='caption__body'><button id='cart_plus' onclick='ProcBuy(${arrayF[i].Id_ImageS})'><i class='fa fa-cart-plus' id='IdCart_plus'></i> </button>  OR <button id='favorite' onclick='MyFunctionfavorites(${arrayF[i].Id_ImageS});'><i class='fa fa-heart' id='fa_heart' style='color: red'></i></button></div>" href="${arrayF[i].Photo}"> <img class="img-fluid" src="${arrayF[i].Photo}" style="object-fit: contain; height:260px"> </a>`;

        if(i===nbrStart){p.innerHTML=row;}
        else if(i===nbrStart+1){p1.innerHTML=row;}
        else if(i===nbrStart+2){p2.innerHTML=row;}
        else if(i===nbrStart+3){p3.innerHTML=row;}
        else if(i===nbrStart+4){p4.innerHTML=row;}
        else if(i===nbrStart+5){p5.innerHTML=row;}
        else if(i===nbrStart+6){p6.innerHTML=row;}
        else if(i===nbrStart+7){p7.innerHTML=row;}
        else if(i===nbrStart+8){p8.innerHTML=row;}
    }
}

async function openImageCart(nbrStart,countnbr) {
    controlPaypal=false;
    var cart=document.getElementById("cartXXX");
    
    
    cart.innerHTML="";
   

    if(countnbr>arrayCart.length)
    {
        countnbr=arrayCart.length;
    }
    
    for(var i=nbrStart ;i<countnbr;i++)
    {
        arrayCart[i].Photo= (arrayCart[i].Photo).replace("<Image_Show>", "data:image/jpeg;base64,");
        arrayCart[i].Photo= (arrayCart[i].Photo).replace("</Image_Show>", "");
       
        var row=` <div class="col-12 col-md-6 col-lg-4" data-animate-effect="fadeInUp">
                  <a href="#" onclick="pagImage(${arrayCart[i].Id_ImageS})"> <img src="${arrayCart[i].Photo}" alt="" class="img-fluid"></a>
                  </div>`;
        
        cart.innerHTML+=row;
    }
    let total=arrayCart[0].Total.toFixed(1);
    document.getElementById("Total").innerHTML=`TOTAL: ${total}$`;
    PRICEONEIMAGE=total;
}

function pagImage(IdImage)
{
    localStorage.removeItem("Id_Image_Gallery");
    localStorage.setItem("Id_Image_Gallery",IdImage);
    window.location='Image.html';
}

async function MyFunctionfavorites(IdImages)
{
    if(Status)
    {

    var heart=document.getElementById("fa_heart");
    
    const ProcFavorite={Id_C:localStorage.getItem("Id_Client"),Id_Show:IdImages}
    FunFavorite(ProcFavorite).then(response=>{
       
        if(response[0]["Status"]==true){
            heart.style.color="red";
            console.log("Add in my Favorite");
        }
        else{
            heart.style.color="white";
            console.log("Delete from My Favorite");
        }
     });

        for(var i=0;i<arrayF.length;i++)
           {
              if(arrayF[i].Id_ImageS==IdImages)
                {
                    arrayF.splice(i,1);
                }
            }
        openImage(nbr,(count-1));
   
      
    }

    else{alert("Login");}
}



async function ProcBuy(IdPhoto)
{
    if(Status)
    {
        const ProcFavorite={Id_C:localStorage.getItem("Id_Client"),Id_Show:IdPhoto}
        FunCartPlus(ProcFavorite).then(response=>
        {
           
            if(response[0]["Status"]==true){
               
               
                alert("Add in my Cart");
            }
            else{
               
                alert("Delete from My Cart");
            }
        });
    }
 return;
}

var pswrd=document.getElementById("Password");
var Save =document.getElementById("save");
if(Save){
    Save.addEventListener("click",changeDateUnse);
}
async function changeDateUnse(){ 

    if(username.value!="" && email.value!="" && pswrd.value!="")
    {
        const data={id_c:localStorage.getItem("Id_Client"),UserName:username.value,Email:email.value,Password:pswrd.value};
       await  UpdateDataUser(data).then(response =>{
         if(response.ok){

            localStorage.removeItem("UserName");
            localStorage.removeItem("Email");
    
            localStorage.setItem("UserName",username.value);
            localStorage.setItem("Email",email.value);
    
            email.value="";
            username.value="";
            pswrd.value="";
         }
        });
      
    }
    else{
        if(username.value==""){username.style.backgroundColor="red";}
        if(email.value=="")   {email.style.backgroundColor="red";}
        if(pswrd.value=="")   {pswrd.style.backgroundColor="red";}
    }

}

//Get Data
async function FavoritAPI(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetAllFavorit`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function FunFavorite(ProcFavorite) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/FunctionFavorite`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ProcFavorite)
    });
    return response.json();
}
async function FunCartPlus(ProcFavorite) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/FunctionCartPlus`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ProcFavorite)
    });
    return response.json();
}
async function GetCartPlus(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetCartPlus`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function UpdateDataUser(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/updateDataUser`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}