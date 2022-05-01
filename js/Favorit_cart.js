
async function ProcBuy(IdPhoto)
{
    const IDIMG=IdPhoto;
    if(Status)
    {
        const ProcFavorite={Id_C:localStorage.getItem("Id_Client"),Id_Show:IDIMG}
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
    else{
        pagImage(IdPhoto);
    }
}

async function FunCartPlus(ProcFavorite) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/FunctionCartPlus`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ProcFavorite)
    });
    return response.json();
}

function pagImage(IdImage)
{
    localStorage.removeItem("Id_Image_Gallery");
    localStorage.setItem("Id_Image_Gallery",IdImage);
    window.location='Image.html';
}

arryFavorit=[];

async function MyFunctionfavorites(IdImages)
{
    if(Status)
    {

    
    const Id_Image=IdImages;
    const logindata={Id_Client:localStorage.getItem("Id_Client")};
    var vrmy=await MyFavorite(logindata);
    arryFavorit=vrmy;
    var heart=document.getElementById("fa_heart");
    

    const ProcFavorite={Id_C:localStorage.getItem("Id_Client"),Id_Show:Id_Image}
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
    
   
      
    }

    else{
       alert("Login");
    }
}

async function MyFavorite(logindata) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/GetMyFavorite`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(logindata)
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