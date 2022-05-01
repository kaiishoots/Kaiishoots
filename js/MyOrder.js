

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


document.getElementById("Load").onload=myfunctionorder;

async function myfunctionorder()
{ 
   
    var lu=document.getElementsByClassName("list-unstyled");
    if(localStorage.getItem("status"))
    {
        var raw=` <li><a href="My-Purchases.html">My Purchases</a></li>
                 <li><a href="create-order.html">Create Order</a></li>
                 <li><a href="My_Orders.html">My Orders</a></li>
                 <li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
                 <li class="active"><a href="My_Orders.html" onclick="logout()">Log out</a></li>`;
        lu[0].innerHTML+=raw;
        
        
 
    }
    else{
        var raw=`<li><a href="Login.html">Login</a></li>
        <li><a href="Register.html">Register</a></li>`;
        lu[0].innerHTML+=raw;
    }

    var listOrder=[];
    const data={Id_Client:localStorage.getItem("Id_Client")}
    listOrder=await GetOrders(data);
    var le=document.getElementById("Orders");
    le.innerHTML="";
    
    for(var i=0 ;i<listOrder.length;i++)
    {
       
        if(listOrder[i].Status==true)
        {
            var rows=` 
                      <div class="col-12 col-md-6 col-lg-4" data-animate-effect="fadeInUp" style="border-style: solid; border-color: White;">
                          <a class="d-block dorothea-photo-item">
                             <h5>Category: ${listOrder[i].Name_Category}</h5>
                             <h5> Date create Order:${listOrder[i].AppDate}</h5>
                             <h5>Date finish: ${listOrder[i].DeliveryDate}</h5>
                             <h5>Price: ${listOrder[i].Price} $</h5>
                             <h5>Number photo: ${listOrder[i].NumberPhotos}</h5>
                             <center><a href="#" onclick="MyDownload(${listOrder[i].Id_order})"><h4 style="color: #2e9745;border-style: solid; border-color:gree;">Download</h4></a></center>
                          </a>
                      </div>`;
                      le.innerHTML+=rows;
        }
        else{
            var rows=` <div class="col-12 col-md-6 col-lg-4" data-animate-effect="fadeInUp" style="border-style: solid; border-color: White;">
            <a class="d-block dorothea-photo-item">
                <h5>Category: ${listOrder[i].Name_Category}</h5>
                <h5> Date create Order:${listOrder[i].AppDate}</h5>
                <h5>Date finish: ${listOrder[i].DeliveryDate}</h5>
                <h5>Price: ${listOrder[i].Price} $</h5>
                <h5>Number photo: ${listOrder[i].NumberPhotos}</h5>
                <center><a><h4 style="color: #e13b2b;border-style: solid; border-color: red;">Process</h4></a></center>
            </a>
        </div>`;
        le.innerHTML+=rows;
        }
    }
}

async function MyDownload(Id){
   
    const dat={Id_order:Id};
    
    await Downloadzip(dat).then(response =>{

        response[0]["data"]= (response[0]["data"]).replace("<fileZip>", "");
        response[0]["data"]= (response[0]["data"]).replace("</fileZip>", "");
       
        var nameFile = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        downloadZIP(nameFile,response[0]["data"]);

    });

}
function downloadZIP(nameFile,fileZip) 
{
    const linkSource = `data:application/zip;base64,${fileZip}`;
    const downloadLink = document.createElement("a");
    const fileName = `A${nameFile}.zip`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}


//GetOrders
async function GetOrders(data)
{
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetMyOrder`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function Downloadzip(data)
{
    const response=await fetch(`https://kaii-shoots.herokuapp.com/DownloadFileZip`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}