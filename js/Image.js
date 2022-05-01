

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

document.getElementById("Load").onload = desplayPageImage;
let PRICEONEIMAGE;
async function desplayPageImage()
{
    var lu=document.getElementsByClassName("list-unstyled");
    var imgs=document.getElementById("IdImage");
    var price=document.getElementById("IdPrice");
    const IdImgG=localStorage.getItem("Id_Image_Gallery")
    const GetImage={Id_ImageS:IdImgG};

    if(Status)
    {
        var raw=`<li><a href="My-profile.html">${localStorage.getItem("UserName")}</a></li>
        <li><a href="create-order.html">Create Order</a></li>`
        lu[0].innerHTML+=raw;
        await GetOneImgOn(GetImage).then(response=>{

       
      
            response[0]["image"]=(response[0]["image"]).replace("<Image_Show>", "data:image/jpeg;base64,");
            response[0]["image"]= (response[0]["image"]).replace("</Image_Show>", "");
     
            imgs.innerHTML=`<img src="${response[0]["image"]}" class="img-fluid mb-30" alt="dorothea">`;
     
            price.innerHTML=` <span class="dorothea-heading-meta">Price: <h4 id="IDPRICE">${response[0]["Price"]}</h4></span>
                              <h2 >Title:  ${response[0]["Title"]}</h2>
                              <p>${response[0]["Discription"]}</p>
                              <img src="images/sign-gray.png" class="signature" alt="dorothea">`;
         });
         PRICEONEIMAGE=document.getElementById("IDPRICE").innerHTML;
         controlPaypal=true;
    }
    
    else{
        controlPaypal=true;
        var raw=`<li><a href="Login.html">Login</a></li>
        <li><a href="Register.html">Register</a></li>`
        lu[0].innerHTML+=raw;

        await GetOneImgOff(GetImage).then(response=>{

       
      
            response[0]["image"]=(response[0]["image"]).replace("<Image_Show>", "data:image/jpeg;base64,");
            response[0]["image"]= (response[0]["image"]).replace("</Image_Show>", "");
     
            imgs.innerHTML=`<img src="${response[0]["image"]}" class="img-fluid mb-30" alt="dorothea">`;
     
            price.innerHTML=` <span class="dorothea-heading-meta">Price: <h4 id="IDPRICE">${response[0]["Price"]}</h4></span>
                              <h2 >Title:  ${response[0]["Title"]}</h2>
                              <p>${response[0]["Discription"]}</p>
                              <img src="images/sign-gray.png" class="signature" alt="dorothea">`;
         });
         PRICEONEIMAGE=document.getElementById("IDPRICE").innerHTML;
    }

   

}


async function GetOneImgOff(GetImage) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetOneImageOffline`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(GetImage)
    });
    return response.json();
}

async function GetOneImgOn(GetImage) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetOneImageOnline`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(GetImage)
    });
    return response.json();
}