const cartIcon=document.querySelector('.cart-icon')
const cartTab=document.querySelector('.cart-tab')
const closeBtn=document.querySelector('.close-btn')
const cardList=document.querySelector('.card-list')
const cartList=document.querySelector('.cart-list')
const cartTotal=document.querySelector('.cart-total')
const cartValue=document.querySelector('.cart-value')
const hamburger=document.querySelector('.hamburger')
const mobileMenu=document.querySelector('.mobile-menu')
const bars=document.querySelector('.fa-bars')

cartIcon.addEventListener('click',()=>{
    cartTab.classList.add('cart-tab-active')
})


closeBtn.addEventListener('click',()=>{
     cartTab.classList.remove('cart-tab-active')
})

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu-active");

    bars.classList.toggle("fa-bars");
    bars.classList.toggle("fa-xmark");
});

let productList=[];
let cartProduct=[]
const updateTotal=()=>{
    let totalPrice=0;
    let totalQuantity=0
    document.querySelectorAll(".item").forEach(item =>{
        const price= parseFloat(item.querySelector(".item-total").textContent.replace('$',''))
        const quantity=parseInt(item.querySelector('.quantity-value').textContent)
        totalPrice+=price
        totalQuantity+=quantity
    })
    cartTotal.textContent=`$${totalPrice.toFixed(2)}`
    cartValue.textContent=totalQuantity
}
const showCards=()=>{
    productList.forEach(product=>{
        const orderCart=document.createElement('div');
        orderCart.classList.add('order-card')
        orderCart.innerHTML=`
                     <div class="card-image">
                        <img src="${product.image}">
                    </div>
                    <h4>${product.name}</h4>
                    <h4 class="price">${product.price}</h4>
                    <a href="#" class="btn3">Add To Cart</a>            
        
        `
        cardList.appendChild(orderCart)
        const cardBtn=orderCart.querySelector('.btn3')
        cardBtn.addEventListener('click',(e)=>{
            e.preventDefault()
            addToCart(product)
            
        })
    })
}

const addToCart=(product)=>{

    const existingProduct=cartProduct.find(item=>item.id===product.id)
    if(existingProduct){
      
        alert('item is already added in your card')
        
        return 
    }
    cartProduct.push(product)
    let quantity=1
    const price = parseFloat(product.price.replace('$', ''));
    const cartItem=document.createElement('div')
    cartItem.classList.add('item')
    cartItem.innerHTML=`
                            <div class="img-container"> 
                            <img src="${product.image}">
                        </div>
                       <div class="cart-text">
                          <h4 class="htext">${product.name}</h4>
                          <h4 class="item-total">${product.price}</h4>
                       </div>
                     <div class="plusminus">
                      <div>
                         <a href="#" class="quality-btn" id="minus"><i class="fa-solid fa-minus"></i></a>
                       </div>
                       <h4 class="quantity-value">${quantity}</h4>
                       <div>
                         <a href="#" class="quality-btn" id="plus"><i class="fa-solid fa-plus"></i></a>
                       </div>
                     </div>

                  `
                    cartList.appendChild(cartItem)
                    updateTotal()
                    const plusBtn=cartItem.querySelector('#plus')
                    const minusBtn=cartItem.querySelector('#minus')
                    const quantityValue=cartItem.querySelector('.quantity-value')
                    const itemTotal=cartItem.querySelector('.item-total')
                    
                    plusBtn.addEventListener('click',(e)=>{
                        e.preventDefault()
                        quantity++
                        quantityValue.textContent=quantity
                        itemTotal.textContent=`$${(price * quantity).toFixed(2)}`
                        updateTotal()

                    })
                    minusBtn.addEventListener('click',(e)=>{

                        e.preventDefault()
                        if(quantity>1){
                            quantity--
                          
                        quantityValue.textContent=quantity
                        itemTotal.textContent=`$${price*quantity}`
                        updateTotal()
                        }
                        else{
                            cartList.removeChild(cartItem)
                            cartProduct=cartProduct.filter(item=> item.id!==product.id)
                           updateTotal()
                            
                        }
                    })

}


const initApp=()=>{
    fetch('products.json')
    .then(response=>response.json()).then(data=>{
        productList=data;
        showCards()
    })

}
initApp()