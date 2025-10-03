function cartproduct() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let Total = 0;

    let print = document.querySelector('#row');
    let str = '';

    if (cart.length === 0) {
        str = `<div class="text-center text-muted my-5 col-12">
                  <h3 class="m-0">Your cart is empty</h3>
               </div>`;
    } else {
        cart.forEach(item => {
            Total += item.price * item.qty
            str += `
            <tr class="text-center align-middle">
                        <td class="">
                            <img src="${item.thumbnail}" width="100" alt="Product Image">
                        </td>
                        <td class="">
                            <h3 class="card-title text-black">${item.title}</h3>
                        </td>
                        <td>                        
                        <button class="btn badge bg-dark text-white" onclick="return decqty(${item.id})">-</button>
                        <span class="badge bg-dark text-white">${item.qty}</span>
                        <button class="btn badge bg-dark text-white" onclick="return addqty(${item.id})">+</button>
                        </td>
                        <td>
                        <p class="m-0">₹${(item.price * item.qty).toFixed(2)}</p>
                        </td>
                        <td>
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remove</button>
                        </td>
                    </tr>`;
        });
    }
    print.innerHTML = str;
    if (cart.length == 0) {
        document.getElementById('bill').style.display = "none";
        document.getElementById('header').style.display = "none";
    } else {
        document.getElementById('bill').style.display = "block";

        document.getElementById('carditemtotal').innerHTML = `₹${Total.toFixed(2)}`

        if (Total > 500 && Total < 1000) {
            let Discountpercentage = 5;
            let DiscountAmount = (Total * Discountpercentage) / 100;

            document.getElementById('discountamount').innerHTML = `-${Discountpercentage}% (₹${DiscountAmount.toFixed(2)})`;

            document.getElementById('discounttotal').innerHTML = `₹${(Total - DiscountAmount).toFixed(2)}`;
        } 
        else if (Total > 1000 && Total < 2000) 
        {
            let Discountpercentage = 10;
            let DiscountAmount = (Total * Discountpercentage) / 100;

            document.getElementById('discountamount').innerHTML = `-${Discountpercentage}% (₹${DiscountAmount.toFixed(2)})`;

            document.getElementById('discounttotal').innerHTML = `₹${(Total - DiscountAmount).toFixed(2)}`;
        }
        else if (Total > 2000) 
        {
            let Discountpercentage = 20;
            let DiscountAmount = (Total * Discountpercentage) / 100;

            document.getElementById('discountamount').innerHTML = `-${Discountpercentage}% (₹${DiscountAmount.toFixed(2)})`;

            document.getElementById('discounttotal').innerHTML = `₹${(Total - DiscountAmount).toFixed(2)}`;
        }
        else 
        {
            document.getElementById('discountamount').innerHTML = `0% (₹0.00)`;
            document.getElementById('discounttotal').innerHTML = `₹${Total.toFixed(2)}`;
        }
    }
}

function addqty(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(ele => {
        if (ele.id == id) {
            ele.qty = ele.qty + 1;
        }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
    cartproduct();
}
function decqty(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(ele => {
        if (ele.id == id && ele.qty > 1) {
            ele.qty = ele.qty - 1;
        }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
    cartproduct();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartproduct();
}

cartproduct();
