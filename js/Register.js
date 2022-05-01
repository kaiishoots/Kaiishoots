
const NAME_REQUIRED = "Please enter your name";
const EMAIL_INVALID = "Please enter a correct email address format";
const PASSWORD="password does not match";
const EMAIL_EXISTS="Email already exists";


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

var el= document.getElementById("btn_Register")
if(el){
    el.addEventListener("click", myFunction);
}

function myFunction() {
    
  const UserName =  document.getElementById("UserName").value;
  const Email = document.getElementById("Email").value;
  const Password1 =document.getElementById("Password1").value;
  const Password2 =document.getElementById("Password2").value;
  const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

    if (UserName === "") {let msg =  document.getElementById("small1");msg.innerText = NAME_REQUIRED;}

    else{ 
        let msg =  document.getElementById("small1"); msg.innerText ="";

        if (!emailRegex.test(Email)) {let msg =  document.getElementById("small"); msg.innerText = EMAIL_INVALID;}

        else{
            let msg =  document.getElementById("small"); msg.innerText ="";
         if(Password1!="" && Password2!="")
         {
            if(Password1!=Password2)
            {
                let  msg =  document.getElementById("pswrd"); msg.innerText = PASSWORD;
            }
            else{RegisterData(UserName,Email,Password2)};
         }else{let  msg =  document.getElementById("pswrd"); msg.innerText = PASSWORD;}}
    }
    
  }



function RegisterData(Name,email,Password){
    document.getElementById('wrappers').style.display = "block";
    const name=Name;
    const Email=email;
    const Pswrd=Password;
    const logindata={UserName:name,Email:Email,Password:Pswrd};

    RegisterUser(logindata).then(response=>{

        if(response[0]["status"]==true)
        {
            let  msg =  document.getElementById("eml"); msg.innerText ="";
            
            if(localStorage.getItem("status")==null)
            {
                localStorage.setItem("status",response[0]["status"]);
                localStorage.setItem("Id_Client",response[0]["Id_Client"]);
                localStorage.setItem("UserName",response[0]["UserName"]);
                localStorage.setItem("Email",response[0]["Email"]);
                localStorage.setItem("count_faforite",0);
                localStorage.setItem("count_Image",0);
            }
            else{

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
                localStorage.setItem("count_faforite",0);
                localStorage.setItem("count_Image",0);
            }
           
            
          window.location='index.html';
        }

        else
        {
            
         let  msg =  document.getElementById("eml"); msg.innerText =EMAIL_EXISTS ;
     
        }
     
        });
}
document.getElementById("load").onload = displayloginDate;
function displayloginDate() {

    document.getElementById('wrappers').style.display = "none";
   
}
    //function for send data{email and password} to server 
async function RegisterUser(logindata) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/Register`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(logindata)
    });
    return response.json();
}
	


