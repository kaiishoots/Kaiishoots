
   
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



document.getElementById("Load").onload =functionServices;

async function functionServices() 
{ var arrayC=[];
 var p=document.getElementById("pagCategory");

 var lu=document.getElementsByClassName("list-unstyled");
    if(localStorage.getItem("status")==="true")
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

 arrayC= await AllCategory();
 for(var i=0;i<arrayC.length;i++)
 {
      arrayC[i].Photo= (arrayC[i].Photo).replace("<Photo>", "data:image/jpeg;base64,");
      arrayC[i].Photo= (arrayC[i].Photo).replace("</Photo>", "");

     var raw=`<div class="col-md-4">
     <div class="item">
         <div class="position-re o-hidden"> <img src="${arrayC[i].Photo}"  style=" max-width: 90%;height: 500px;"> </div>
         <div class="con"> <i class="ti-more"></i>
             <h5><a href="services-post.html" onclick="CategoryPost(${arrayC[i].Id_Category})">${arrayC[i].Name_Category}</a></h5>
             <div class="line"></div> <a href="services-post.html" onclick="CategoryPost(${arrayC[i].Id_Category})"><i class="ti-arrow-right"></i></a> </div>
     </div>
 </div>`;
     p.innerHTML+=raw;
 }
}
function CategoryPost(id)
{
    localStorage.removeItem("Id_Category");
    localStorage.setItem("Id_Category",id);
    window.location='services-post.html';
}

async function AllCategory() {
    var output
        await $.get("https://kaii-shoots.herokuapp.com/GetAllCategory", await function (data) {
            output = data
        });
        return output;
}