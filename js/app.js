document.getElementById("spinner").style.display = "none"
const loadProducts = () => {
document.getElementById("spinner").style.display = "block"
  
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
  };
  loadProducts();


// show all product in UI 
// const showProducts = (products) => {
//   const allProducts = products.map((pd) => pd);
//   for (const product of allProducts) {
//     const image = product.image;
//     const div = document.createElement("div");
//     div.classList.add("product");
//     div.innerHTML = `<div class="single-product">
//       <div>
//     <img class="product-image" src=${image}></img>
//       </div>
//       <h3>${product.title}</h3>
//       <p>Category: ${product.category}</p>
//       <p>Rating: ${product.rating.rate}</p> <p>${product.rating.count} person rated this product</p>
//       <h2>Price: $ ${product.price}</h2>
//       <button onclick="addToCart(${product.id},${product.price})
//       " id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
//       <button id="details-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="singleProductDtails(${product.id})" >Details</button></div>
  
//       <!-- Modal -->
//       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div id="showSingleProduckDtails" class="modal-dialog">
//           <div class="modal-content">
           
          
           
//           </div>
//         </div>
//       </div>
      
//       `;
//     document.getElementById("all-products").appendChild(div);
//   }
// };
const showProducts = (products) => {
  document.getElementById("spinner").style.display = "none"
     
  if(products.length !==0){
      const allProducts = products.map((pd) => pd);
for (const product of allProducts) {
const image = product.image;
const div = document.createElement("div");
div.classList.add("product");
div.innerHTML = `<div class="single-product">
<div>
<img class="product-image" src=${image}></img>
</div>
<h3>${product.title.slice(0,20)}</h3>
<p>Category: ${product.category}</p>
<p>Rating: ${product.rating.rate},${product.rating.count} person rated this product</p>
<h2>Price: $ ${product.price}</h2>



<div class="card-buttons"><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
<button id="details-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="singleProductDtails(${product.id})" >Details</button>


</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div id="showSingleProduckDtails" class="modal-dialog">
    <div class="modal-content">
     
    
     
    </div>
  </div>
</div>

`;
document.getElementById("all-products").appendChild(div);
}
  }else
  {
     
      const div = document.createElement("div");

div.innerHTML =     `<h3 class="text-danger text-center"> No result found</h3>`;
document.getElementById("all-products").appendChild(div);
  }

};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();

 
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


const  singleProductDtails = id => {
  document.getElementById("showSingleProduckDtails").innerHTML=''

  const url =`https://fakestoreapi.com/products/${id}`
          
  fetch(url)
    .then(res=>res.json())
    .then(data=>displaySingleData(data))

}

const displaySingleData = product =>{




const image = product.image;
const div = document.createElement("div");
div.classList.add("modal-content");
div.innerHTML = `

<div class="modal-header">
  <h5 class="modal-title" id="staticBackdropLabel">${product.title}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    <img class="product-image"width="400px" height="500px" src=${image}></img>
    <p>Category: ${product.category}</p>
    <p>Informaton : ${product.description}
<p>Rating: ${product.rating.rate} </p> <p>${product.rating.count} person rated this product</p>
<h2>Price: $ ${product.price}</h2>


  
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button onclick="addToCart(${product.id},${product.price})
" id="addToCart-btn" class="buy-now btn btn-success"  data-bs-dismiss="modal">add to cart</button>
</div>

`;

document.getElementById("showSingleProduckDtails").appendChild(div);


}


// search product 
const  searchProducts = ()=>{
  document.getElementById("all-products").innerHTML=''
  document.getElementById("spinner").style.display = "block"
  const searchInput = document.getElementById("input-field")
  const searchValue =searchInput.value


  if(searchValue){
    const url = `https://fakestoreapi.com/products/category/${searchValue}`
        console.log(url)
       

        fetch(url)
            .then(res=>res.json())
            .then(json=>showProducts(json))
 }else {
  loadProducts();
 }
  
}

{/* <button onclick="addToCart(${product.id},${product.price})
" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
<button id="details-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="singleProductDtails(${product.id})" >Details</button> */}