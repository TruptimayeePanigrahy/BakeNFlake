let Gdata=[];
let parent=document.getElementById("card");
let button=document.getElementById("button-wrapper");
let search=document.getElementById("input");
let filt=document.getElementById("filter");
let btnp=document.getElementById("sortp");
let token=localStorage.getItem("token");
token ? token=token:token="";
let baseURL=`https://handsome-nightshirt-cow.cyclic.app/sproduct/`



fetchandrendercard(`?page=1`);
//fetchandrendercard(`?q=${search.value}`);
function fetchandrendercard(queryParamstring=null){
    fetch(`${baseURL}${queryParamstring ? queryParamstring:""}`)
    //fetch(`${baseURL}?q=cup`)
    .then((res)=>{
        // console.log(res)
        // let totalCount=res["Total"];
        // console.log("total",totalCount);
        
        return res.json()})
    .then((data)=>{
        Gdata=data.products;
        let totalCount=data["Total"];
        console.log("total",totalCount);
        showpagination(totalCount,12);
        display(data.products)
        console.log(data)
    })
}

// cart length

let c_size=document.getElementById('c-number')

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


function display(data){
    parent.innerHTML="";
    data.forEach(element => {
        let card=document.createElement('div');
        let img=document.createElement('img')
        img.src=element.image;
        card.append(img);
        child=document.createElement('div');
        let title=document.createElement('h3');
        title.innerText=element.name;
        let price=document.createElement('p');
        price.innerText=element.price;
        
        child.append(card,title,price);
        child.addEventListener("click",()=>{
            localStorage.setItem("detailPage",JSON.stringify(element));
            location.href="detail.html"
        })
        parent.append(child);
    });
}

// search functionality

search.addEventListener("keydown",(e)=>{
    if (e.key == "Enter" && search.value != "") {
        //location.href = 'pages/results/results.html';
        //searchQuery = searchBar.value;
        //console.log(searchQuery);
        e.preventDefault()
        console.log("hi");
        fetchandrendercard(`?q=${search.value}`);
    }
    
})

// filter by category

filt.addEventListener("change",()=>{
    if(filt.value==""){
    fetchandrendercard(`?_page=${1}`)
    
    }
    else{
       fetchandrendercard(`?category=${filt.value}&page=${1}`)
    }
});   

// filter by price

btnp.addEventListener("click",()=>{
    if(btnp.value=="asc"){
        Gdata.sort(function(a,b){return a.price-b.price});
        display(Gdata)
    }
    else if(btnp.value=="desc"){
        Gdata.sort(function(a,b){return b.price-a.price});
        display(Gdata)
    }
   
})

// pagination

function showpagination(totalitems,x){
    const totalpages=Math.ceil(totalitems/x);
    //console.log(totalpages)
    function renderbutton(){
        let arr=[];
        for(let i=0;i<totalpages;i++){
             arr.push(getbuttons(i+1,i+1));
             
        }
       // console.log(arr)
        return arr.join("")
    }
    button.innerHTML=`
       ${ renderbutton()}`

    let buttonpage=document.querySelectorAll(".button-data");
    
    for(let x of buttonpage){
        x.addEventListener("click",(e)=>{
            let dataid=e.target.dataset.id;
            id=dataid;
            console.log(id)
            if(filt.value==""){
            fetchandrendercard(`?page=${id}`)
            }
            else if(filt.value=="pastry"){
                fetchandrendercard(`?category=${filt.value}&page=${id}`)
            }
            else if(filt.value=="cupcake"){
                fetchandrendercard(`?category=${filt.value}&page=${id}`)
            }
            else if(filt.value=="Half Cake"){
                fetchandrendercard(`?category=${filt.value}&page=${id}`)
            }
            else if(filt.value=="Fondant Cake"){
                fetchandrendercard(`?category=${filt.value}&page=${id}`)
            }
            else if(filt.value=="Wedding Cake"){
                fetchandrendercard(`?category=${filt.value}&page=${id}`)
            }
            
 })

}
}

// create buttons
function getbuttons(id,text){
    return ` <button data-id=${id} class="button-data">${text}</button>`
}



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