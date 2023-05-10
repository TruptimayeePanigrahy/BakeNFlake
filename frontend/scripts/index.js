let token = localStorage.getItem("token");
token?token=token:token="";
let c_size=document.getElementById('c-number')
if(token){
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
}


// first slider
let arr=["https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001222911.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683099654921.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001250499.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001281271.jpg"
        ]

let val=0;
setInterval(()=>{
let img=document.createElement("img");
img.setAttribute("src",arr[val]);
document.getElementById("slider").innerHTML=null;
document.getElementById("slider").append(img);
val++;
if(val==arr.length) val=0;
},3000);

//small slider
let arr1=["https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/3/1680262854166.jpg",
          "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/3/1680262854166.jpg"
        ]

let val1=0;
setInterval(()=>{
let img=document.createElement("img");
img.setAttribute("src",arr1[val1]);
document.getElementById("small-slider").innerHTML=null;
document.getElementById("small-slider").append(img);

val1++;
if(val1==arr1.length) val1=0;
},3000);


// search
    let text= document.getElementById("input");
    let search=document.getElementById("search")
     search.addEventListener("click",(e)=>{
      e.preventDefault()
    let SearchInp= text.value;
     if(SearchInp=="cakes"){
        window.location.href="./cake.html"
     }
     else if(SearchInp=="gifts"){
        window.location.href="./gifts.html"
     }
     else if(SearchInp=="flowers"){
        window.location.href="./flowers.html"
     }
     
    });

    //profile name;


   // let token=localStorage.getItem("token")
    token ? token=token:token="";
    let username=localStorage.getItem("name")
    let welcome=document.getElementById("welcome")
    let user=document.getElementById("user")
    let btn=document.getElementById("btn")
    if(username && token){
      welcome.innerText="Welcome";
      user.innerText=username;
      btn.innerText="Logout"
      // btn.addEventListener("click", () => {
      //    fetch("https://handsome-nightshirt-cow.cyclic.app//users/logout")
      //      .then(res => res.json())
      //      .then(data => {
      //        alert(data.msg);
      //        localStorage.clear();
      //        window.location.href = "../html/index.html";
      //      });
      //  });
      
    }
    else {
      btn.innerText = "Signup/Login";
      btn.addEventListener("click", () => {
        window.location.href = "../html/signup.html";
      });
    }

    if(btn.innerText=="Logout"){
      
      btn.addEventListener("click",(e)=>{
        e.preventDefault()
        console.log("hi logout")
         fetch("https://handsome-nightshirt-cow.cyclic.app/users/logout")
         .then(res=>res.json())
         .then((data)=>{
          //  console.log(data)
          
            alert(data.msg)
            localStorage.clear();
            window.location.href="../html/index.html"
         })
         
        
      })
    }
    else{
      if(btn.innerText=="Signup/Login"){
         btn.addEventListener("click",()=>{
           // localStorage.clear();
            window.location.href="../html/signup.html"
         })
    }
  }
    

    
    
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
     fetch("https://handsome-nightshirt-cow.cyclic.app/users/logout")
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