let cart = {};
let total = 0;


function addToCart(name, price) {
   if (cart[name]) {
       cart[name].qty += 1;
   } else {
       cart[name] = { price: price, qty: 1 };
   }
   total += price;
   updateCartDisplay();
}


function removeFromOne(name) {
   if (cart[name]) {
       total -= cart[name].price;
       cart[name].qty -= 1;
       if (cart[name].qty <= 0) delete cart[name];
       if (total < 0) total = 0;
       updateCartDisplay();
   }
}


function clearCart() {
   if (confirm("Clear your entire donut box?")) {
       cart = {};
       total = 0;
       updateCartDisplay();
   }
}


function updateCartDisplay() {
   const cartList = document.getElementById('cart-items');
   const totalDisplay = document.getElementById('total');
   const countDisplay = document.getElementById('item-count');
   const dozenMsg = document.getElementById('dozen-tracker');
  
   cartList.innerHTML = "";
   let totalQty = 0;
   const items = Object.keys(cart);


   if (items.length === 0) {
       cartList.innerHTML = '<li style="text-align:center; padding:10px; color:#888;">Empty...</li>';
       totalDisplay.textContent = "0.00";
       countDisplay.textContent = "0";
       dozenMsg.textContent = "";
       return;
   }


   items.forEach(name => {
       const item = cart[name];
       totalQty += item.qty;
       const li = document.createElement('li');
       li.className = "cart-item-row";
       li.innerHTML = `
           <div class="cart-info">
               <strong>${name}</strong> x ${item.qty}
               <span class="cart-price">$${(item.price * item.qty).toFixed(2)}</span>
           </div>
           <button class="remove-btn" onclick="removeFromOne('${name}')">Remove 1</button>
       `;
       cartList.appendChild(li);
   });


   // Dozen Logic
   const remaining = 12 - (totalQty % 12);
   dozenMsg.textContent = (totalQty % 12 === 0 && totalQty > 0)
       ? "🍩 Perfect Dozen!"
       : `Add ${remaining} more for a full dozen!`;


   countDisplay.textContent = totalQty;
   totalDisplay.textContent = total.toFixed(2);
}


function checkout() {
   if (Object.keys(cart).length === 0) return alert("Your box is empty!");
   const time = document.getElementById('pickup-time').value;
   if (!time) return alert("Please select a pickup time!");
  
   alert(`Order Placed!\nTotal: $${total.toFixed(2)}\nPickup: ${time}\nLocation: 5613 Bardstown Rd.`);
   cart = {}; total = 0; updateCartDisplay();
}



