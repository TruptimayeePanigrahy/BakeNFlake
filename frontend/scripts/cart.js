let baseURL = "https://handsome-nightshirt-cow.cyclic.app/"
let cartLeft = document.getElementById("cart-page-left")
let c_size=document.getElementById('c-number')
let totalPrice = document.getElementById("totalPrice")
let token = localStorage.getItem("token");
console.log(token)
fetchAndRender()

fetch(`https://handsome-nightshirt-cow.cyclic.app/cart/`,{
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        if(token){
            c_size.innerText=res.length;
        }
       
        console.log(res)
    })

function fetchAndRender(){
    fetch(`${baseURL}cart/`, {
        headers:{
            "Content-type":"application/json",
            "authorization":`Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("hi",res)
        if(res.length === 0){
            displayBlank()
        }
        else{
         // console.log("hellow")
            display(res)
            totalCartPrice(res)
        }
      })
      .catch((error) => {
        console.log(error)
      })
}

function displayBlank(){

    document.getElementById("cart-page-left").innerHTML=`<div><img src="../images/cartBlank.png" alt="Nothing added to cart"></img></div>`
}
// if request have data present in it
function display(data){

  cartLeft.innerHTML = null
  console.log(data)
  data.forEach((element,index) => {
      let card = document.createElement("div")
      card.setAttribute("id","card")
      let div1 = document.createElement("div")
      let image = document.createElement("img")
      image.src = element.image
      div1.append(image)

      let div2 = document.createElement("div")
      div2.setAttribute("id","div2")
      let title = document.createElement("h3")
      title.setAttribute("class","div2")
      title.innerText=element.name
      let price = document.createElement("p")
      price.setAttribute("class","div2")
      price.innerText=`Rs. `+ element.price

      let quantityBtnDiv = document.createElement("div")
      quantityBtnDiv.setAttribute("class","div2")
      quantityBtnDiv.setAttribute("id","quantityBtnDiv")
      let quantityBtnInc = document.createElement("button")
      quantityBtnInc.setAttribute("id","quantityBtnInc")
      quantityBtnInc.innerText = "+"
      let quantityBtnDec = document.createElement("button")
      quantityBtnDec.setAttribute("id","quantityBtnDec")
      quantityBtnDec.innerText = "-"
      let quantity = document.createElement("p")
      quantity.setAttribute("id","quantity")
      quantity.innerText = element.quantity
      quantityBtnDiv.append(quantityBtnDec,quantity,quantityBtnInc)

      let removeBtn = document.createElement("button")
      removeBtn.setAttribute("id","removeBtn")
      removeBtn.innerText = "Remove"
      div2.append(title,price,quantityBtnDiv,removeBtn)

      quantityBtnInc.addEventListener("click",() => {
          console.log(element)
          if(quantity.innerText > 0){
              quantity.innerText = parseInt(quantity.innerText) + 1
              h1.innerText = +h1.innerText + (+element.price)
              totalAll(h1.innerText)
              fetch(`${baseURL}createOrder`, {
                method: 'POST',
              })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                  payment(data)
              })
              .catch(error => {
                console.log(error);
              });
          }
          // fetch(`${baseURL}cart/update/${element._id}`, {
          //     method: "PATCH",
          //     headers: {
          //         "Content-type": "application/json"
          //     },
          //     body:JSON.stringify({quantity:quantity++})
          // })
          // .then(res => res.json())
          // .then(data => {
          //     fetchAndRender(data)
          // })
      })

      quantityBtnDec.addEventListener("click", () => {
          if (quantity.innerText > 1) {
              quantity.innerText = parseInt(quantity.innerText) - 1
            h1.innerText = +h1.innerText - (+element.price)
            // console.log(h1.innerText)
            totalAll(h1.innerText)
            fetch(`${baseURL}createOrder`, {
              method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
                payment(data)
            })
            .catch(error => {
              console.log(error);
            });
           
          }
          // fetch(`${baseURL}cart/update/${element._id}`, {
          //     method: "PATCH",
          //     headers: {
          //         "Content-type": "application/json"
          //     },
          //     body:JSON.stringify({quantity:quantity--})
          // })
          // .then(res => res.json())
          // .then(data => {
          //     fetchAndRender(data)
          // })
      })

      removeBtn.addEventListener("click",(e) => {
          h1.innerText = +h1.innerText - (+element.price) * (+element.quantity)
          // let newData = data.splice(index, 1)
          // console.log(newData,data.splice(index, 1))
          // totalAll(h1.innerText)

          // console.log(element)
          fetch(`${baseURL}cart/delete/${element._id}`, {
              method: "DELETE",
              headers: {
                  "Content-type": "application/json"
              }
              
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            fetch(`${baseURL}createOrder`, {
              method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
                payment(data)
            })
            .catch(error => {
              console.log(error);
            });
            
            fetch(`https://handsome-nightshirt-cow.cyclic.app/cart/`,{
      headers:{'content-type':'application/json',
               'Authorization':`Bearer ${token}`
  }
  })
  .then(res=>res.json())
  .then((res)=>{
      if(token){
          c_size.innerText=res.length;
      }
     
      console.log(res)
  })

              fetchAndRender(data)
          })

          
      })

      card.append(div1,div2)
      cartLeft.append(card)
  })
}



function totalAll(total){
    console.log(total)
    localStorage.setItem("total",JSON.stringify(total))
  }

function totalCartPrice(data){
    let total = 0
    for(let i=0;i<data.length;i++){
        total = total + data[i].quantity * data[i].price
    }
    h1.innerText = +total
    localStorage.setItem("total",JSON.stringify(total))
}



/*****************Razorpay*****************************/

    
    fetch(`${baseURL}createOrder`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
        payment(data)
    })
    .catch(error => {
      console.log(error);
    });
    

    function payment(data){
        let x = JSON.parse(localStorage.getItem("total"))
        console.log(x)
        const options = {
        "key": "rzp_test_FkLG5L2aUSSixd",
        "amount": x*100,
        "currency": "INR",
        "name": "Bake N Flake",
        "order_id": data.orderId,
        "handler": function (response){
            console.log(response)
            alert("This step of Payment Succeeded");
            window.location.href = "./success.html";

        },
        "prefill": {
            //Here we are prefilling random contact
            "contact":"9075537652",
            //name and email id, so while checkout
            "name": "Darshan Bhandwalkar",
            "email": "bhandwalkardarshan@gmail.com" 
        },
        "theme": {
            "color": "#2300a3"
        }
      };
    
        var razorpayObject = new Razorpay(options);
        console.log(razorpayObject);
    
        razorpayObject.on('payment.failed', function (response){
            console.log(response);
            alert("This step of Payment Failed");
        });
    
        document.getElementById('pay-button').onclick = function(e){
       
        e.preventDefault();
        
        razorpayObject.open();
        }
       
    }
        
    



  /*********************************** */
//   let token=localStorage.getItem("token")

  let username=localStorage.getItem("name")
  let welcome=document.getElementById("welcome")
  let user=document.getElementById("user")
  let btn=document.getElementById("btn")
  if(username && token){
    welcome.innerText="Welcome";
    user.innerText=username;
    btn.innerText="Logout"
    btn.addEventListener("click", () => {
       fetch("https://handsome-nightshirt-cow.cyclic.app/users/logout")
         .then(res => res.json())
         .then(data => {
           alert(data.msg);
           localStorage.clear();
           window.location.href = "../html/index.html";
         });
     });
    
  }
  else {
    btn.innerText = "Signup/Login";
    btn.addEventListener("click", () => {
      window.location.href = "../html/signup.html";
    });
  }

 //  if(btn.innerText=="Logout"){
 //    btn.addEventListener("click",()=>{
 //       fetch("http://localhost:8080/users/logout")
 //       .then(res=>res.json())
 //       .then((data)=>{
 //        //  console.log(data)
 //          alert(data.msg)
 //          localStorage.clear();
 //          window.location.href="../html/index.html"
 //       })
       
      
 //    })
 //  }
 //  else{
 //    if(btn.innerText=="Signup/Login"){
 //       btn.addEventListener("click",()=>{
 //         // localStorage.clear();
 //          window.location.href="../html/signup.html"
 //       })
 //  }
    
  

  
  
  // OAuth handling
const urlParams = new URLSearchParams(window.location.search);
const googleName = urlParams.get("name");
const googleId = urlParams.get("userid");


if (googleName && googleId) {
 localStorage.setItem("googlename", JSON.stringify(googleName));
 localStorage.setItem("googleid", JSON.stringify(googleId));
 user.innerText = googleName;
 btn.innerText = "Logout";

 btn.addEventListener("click", () => {
   fetch("https://handsome-nightshirt-cow.cyclic.app/susers/logout")
     .then(res => res.json())
     .then(data => {
       alert(data.msg);
       localStorage.clear();
       window.location.href = "../html/index.html";
     });
 });
}



 let cake=document.getElementById("cake")
 cake.addEventListener("click",()=>{
    window.location.href="./cake.html"
 })
 /********************************************* */
      
  