var tst=localStorage.getItem("status");

paypal.Buttons({

    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: PRICEONEIMAGE // Can reference variables or functions. Example: `value: document.getElementById('...').value`
          }
        }]
      });
    },

    // Finalize the transaction after payer approval
   
    onApprove: function(data, actions) {
      return actions.order.capture().then(async function(orderData) {
        // Successful capture! For dev/demo purposes:
            //console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            //var transaction = orderData.purchase_units[0].payments.captures[0];
            //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            
           if(tst)
           { 
               if(controlPaypal){
                const data={Id_Client:localStorage.getItem("Id_Client"),Id_ImageS:localStorage.getItem("Id_Image_Gallery")};
                await AddPurchases(data).then(response=>{
                    if(response.ok)
                    {
                     window.location='My-Purchases.html';
                    }
                });
               }
               else{
                const data={Id_Client:localStorage.getItem("Id_Client")};
                await AddAllInCart(data).then(response=>{
                    if(response.ok)
                    {
                     window.location='My-Purchases.html';
                    }
                });
               }
              
           }
           else
           { 
             console.log("B1");
            const data={Id_ImageD:localStorage.getItem("Id_Image_Gallery")};
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
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal-button-container');



  async function CreateOrder(){


    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const data={Id_Client:localStorage.getItem("Id_Client"),Id_Category:document.getElementById("idCategory").value,AppDate:utc,NumberPhotos:document.getElementById("idprice").value,Price:price,Discription:document.getElementById("message").value}
   
   await Createorder(data).then(response =>{

        if(response.ok)
        {
            window.location="My_Orders.html"
        }
    });

}


async function Createorder(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/Addorder`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

  async function GetDownloadImage(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/DownloadImage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
  async function AddPurchases(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/ADDInMYPurchases`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function AddAllInCart(data) {
    const response=await fetch(`https://kaii-shoots.herokuapp.com/AddAllImgInCart`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}