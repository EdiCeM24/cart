document.addEventListener('DomContentLoader', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const CartItemCount = document.querySelector('.cart-icon span');
    const CartItemList = document.querySelector('.cart-items');
    const CartTotal = document.querySelector('.cart-total');
    const CartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('.sidebar');

    let CartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card', '.card-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)
                ),
                quantity: 1,
            };

           const existingItem = CartItems.find(
            (CartItem) => CartItem.name === item.name,
           );
           if (existingItem) {
            existingItem.quantity++;
           } else {
            CartItems.push(item);
           }

           totalAmount += item.price;

           updateCartUI();
        });

        function updateCartUI() {
            updateCartItemCount(CartItems.length);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count) {
            CartItemCount.textContent = count;
        }

        function updateCartItemList() {
            CartItemList.innerHTML = '';
            CartItems.forEach((item, index) => {
                const CartItem = document.createElement('div');
                CartItem.classList.add('cartItem', 'individual-cart-item');
                CartItem.innerHTML = `
                 <span>($(item.quantity)x)${item.name}</span>;
                 <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2,)}
                 <button class="remove-btn" data-index="${index}"><i class='fa-solid .fa-times'></i></button>
                 </span>;
                `;

                CartItemList.append(CartItem);
            });

            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }

        function removeItemFromCart(index) {
            const removeItem = CartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI;
        }

        function updateCartTotal() {
            CartTotal.textContent = `
             $${totalAmount.toFixed(2)}
            `;
        }

        CartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

       const closeButton = document.querySelector('.sidebar-close');
       closeButton.addEventListener('click', () => {
        sidebar.classList.remove()
       }); 
    });
});