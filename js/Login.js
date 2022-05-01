
const Entr_PASSWORD="Please enter your name";
const  ACOUNT_INVALID="This account does not exist";

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
  
var el= document.getElementById("btn_Login")
if(el){
    el.addEventListener("click", myFunction);
}

function myFunction() {
    

  const Email = document.getElementById("Email").value;
  const Password =document.getElementById("Password").value;
  const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if (!emailRegex.test(Email)) {let msg =  document.getElementById("small"); msg.innerText = EMAIL_INVALID;}

        else
        {
           let msg =  document.getElementById("small"); msg.innerText ="";
          
           if(Password!=""){LoginData(Email,Password);let msg =  document.getElementById("Password"); msg.innerText ="";}
           else{let  msg =  document.getElementById("Password"); msg.innerText = Entr_PASSWORD;}
        }
  }



function LoginData(email,Password){
    document.getElementById('wrapper').style.display = "flex";
  
    const Email=email;
    const Pswrd=Password;
    const logindata={Email:Email,Password:Pswrd};

    loginUser(logindata).then(response=>{

  
        if(response[0]["status"]==true)
        {
          let  msg =  document.getElementById("error"); msg.innerText ="";
          
          localStorage.removeItem("status");
          localStorage.removeItem("Id_Client");
          localStorage.removeItem("UserName");
          localStorage.removeItem("Email");
          localStorage.removeItem("count_faforite");
          localStorage.removeItem("count_Image");

          localStorage.setItem("status",response[0]["status"]);
          localStorage.setItem("Id_Client",response[0]["Id_Client"]);
          localStorage.setItem("UserName",response[0]["UserName"]);
          localStorage.setItem("Email",response[0]["Email"]);
          localStorage.setItem("count_faforite",response[0]["count_faforite"]);
          localStorage.setItem("count_Image",response[0]["count_Image"]);

          window.location='index.html';
        }

        else
        {
            
         let  msg =  document.getElementById("error"); msg.innerText =ACOUNT_INVALID;
     
        }
     
        });
}

document.getElementById("loadLogin").onload = displayloginDate;
function displayloginDate() {

    document.getElementById('wrapper').style.display = "none";
   
}
    //function for send data{email and password} to server 
async function loginUser(logindata) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/Login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(logindata)
    });
    return response.json();
}
	


