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
                CreateOrders();
           }
          
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal-button-container');



  async function CreateOrders(){


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
