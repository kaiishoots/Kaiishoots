

var arrayP=[];



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




document.getElementById("Load").onload=purchasee;

async function purchasee(){
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
    const data={Id_Client:localStorage.getItem("Id_Client")};
    arrayP= await GetMyPictures(data);
    openImageCart();
}

 function openImageCart() {

    var cart=document.getElementById("Purchases");
    
    
    cart.innerHTML="";
   

   
    
    for(var i=0 ;i<arrayP.length;i++)
    {
        arrayP[i].Photo= (arrayP[i].Photo).replace("<Image_Show>", "data:image/jpeg;base64,");
        arrayP[i].Photo= (arrayP[i].Photo).replace("</Image_Show>", "");
       
        var row=` <div class="col-12 col-md-6 col-lg-4" data-animate-effect="fadeInUp">
                  <a href="#" onclick="DownloadImage(${arrayP[i].Id_ImageD})"> <img src="${arrayP[i].Photo}" alt="" class="img-fluid"><center><h5>Download</h5></center></a>
                  </div>`;
        
        cart.innerHTML+=row;
    }
   
}

 function DownloadImage(Id)
{
    const data={Id_ImageD:Id};
    GetDownloadImage(data).then(response=>
        {
            response[0].Photo= (response[0].Photo).replace("<Image>", "data:image/jpeg;base64,");
            response[0].Photo= (response[0].Photo).replace("</Image>", "");
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.setAttribute("type", "hidden");
            link.href =  response[0].Photo;
            link.download = response[0].namefile;
            link.click();  
            document.body.removeChild(link);
        });
}


function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("type", "hidden");
    link.href = "data:text/plain;base64," + base64;
    link.download = fileName;
    link.click();  
    document.body.removeChild(link);
}

//GetData
async function GetMyPictures(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetMyPicture`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function GetDownloadImage(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/DownloadImage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}