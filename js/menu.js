

let Status=localStorage.getItem("status");


document.getElementById("Load").onload = displayHome;

function displayHome() {
   
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
   
}

