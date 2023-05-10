let parent=document.getElementById("detail");
let image=document.getElementById("img");
let name=document.getElementById("name");
let detail=document.getElementById("pdetail");
let token=localStorage.getItem("token");
let ele=JSON.parse(localStorage.getItem("detailPage"));
let c_size=document.getElementById('c-number')
const baseURL=`https://handsome-nightshirt-cow.cyclic.app/`
console.log(ele)
token ? token=token:token="";

//let token=localStorage.getItem("token")

    let username=localStorage.getItem("name")
    let welcome=document.getElementById("welcome")
    let user=document.getElementById("user")
    let btn=document.getElementById("btn")
    if(username && token){
      welcome.innerText="Welcome";
      user.innerText=username;
      btn.innerText="Logout"
      
    }

    if(btn.innerText=="Logout"){
      btn.addEventListener("click",()=>{
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
    if(btn.innerText=="Signup/Login"){
      btn.addEventListener("click",()=>{
        // localStorage.clear();
         window.location.href="../html/signup.html"
      })
    }

fetch(`https://handsome-nightshirt-cow.cyclic.apps/cart/`,{
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

let imgc=document.createElement("img");
imgc.src=ele.image
image.append(imgc);
let h1=document.createElement('h2');
h1.innerText=ele.name;
let h3=document.createElement('h3');
h3.innerText=`Rs. ${ele.price}`;
let btncart=document.createElement("button");
btncart.innerText="Add To Cart";
btncart.addEventListener('click',()=>{
    console.log("hi")
    ele.quantity=1;
    fetch(`https://handsome-nightshirt-cow.cyclic.app/cart/add`,{
        method:"POST",
        body:JSON.stringify(ele),
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        alert(res.msg);
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
    })
    
})
let btnbuy=document.createElement('button');
btnbuy.innerText="Buy Now";
btnbuy.addEventListener("click",()=>{
    ele.quantity=1;
    fetch(`https://handsome-nightshirt-cow.cyclic.app/cart/add`,{
        method:"POST",
        body:JSON.stringify(ele),
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        alert(res.msg);
        fetch(`https://handsome-nightshirt-cow.cyclic.app/cart/`,{
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        if(token){
            c_size.innerText=res.length;
            location.href="../html/cart.html"
        }
        
       // console.log(res)
    })
    })
    
})

let hp=document.createElement('h2');
hp.innerText='Products Details';
let flv=document.createElement('p');
flv.innerText=`Flavor : ${ele.description.Flavor}`;
let no=document.createElement('p');
no.innerText=`Number of item : ${ele.description["Number_of_item"]}`;
let cream=document.createElement('p');
cream.innerText=`Type Of Cream : ${ele.description["Type_of_Cream"]}`;
let bread=document.createElement('p');
bread.innerText=`Type of Bread : ${ele.description["Type_of_pastry"]}`;
name.append(h1,h3,hp,flv,no,cream,bread,btncart,btnbuy)


//detail.append(hp,flv,no,cream,bread)
