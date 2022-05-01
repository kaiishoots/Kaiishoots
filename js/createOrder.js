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
  document.getElementById("Load").onload=CreateOrder;

async function CreateOrder()
{
    

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
    var arrayO=[];
    arrayO= await CategoryOrder();

    var select=document.getElementById("idCategory");
    select.innerHTML="";
    for(var i=0;i<arrayO.length;i++)
    {
        var Raw=`<option value="${arrayO[i].Id_Category}">${arrayO[i].Name_Category}</option>`;
        select.innerHTML+=Raw;
    }
}


let price=0;
document.getElementById("idprice").addEventListener("change", function () {
    var el =document.getElementsByClassName("form-control");
    price=el[0].value*10;
    el[1].value=price+"$";
    PRICEONEIMAGE=price;
 });







//GetData
async function CategoryOrder() {
    var output
        await $.get("https://kaii-shoots.herokuapp.com/GetNameCategory", await function (data) {
            output = data
        });
        return output;
}

