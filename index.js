async function fetchProducts() {
  try {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err, "err");
  }
}
let cartList = [];

function clearRenderList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const renderCartList = () => {
  const cart = document.querySelector(".cart");
  clearRenderList(cart);
  if (cartList.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your cart is empty!!!";
    emptyCartMessage.classList.add("emptyCartMessage");

    cart.appendChild(emptyCartMessage);
  } else {
    cartList.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      const quantity = document.createElement("div");
      quantity.innerText = `Quantity: ${product.quantity || 1}`;
      quantity.classList.add("quantity");

      const divImg = document.createElement("div");
      const productImage = document.createElement("img");
      productImage.src = product.thumbnail;

      const categoryProducts = document.createElement("p");
      categoryProducts.textContent = product.category;

      const productName = document.createElement("p");
      productName.textContent = product.title;
      productName.classList.add("productName");

      const productPrice = document.createElement("p");
      productPrice.textContent = `${product.price} $`;

      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;

      const buttonRemove = document.createElement("button");
      buttonRemove.textContent = "Remove from Cart";
      buttonRemove.classList.add("buttonClickRemove");

      const productHorizontLine = document.createElement("p");
      productHorizontLine.classList.add("productHorizontLine");

      buttonRemove.addEventListener("click", () => {
        removeFromCart(product);
      });
      cartItem.appendChild(quantity);
      divImg.appendChild(productImage);
      cartItem.appendChild(divImg);
      cartItem.appendChild(productImage);
      cartItem.appendChild(productName);
      cartItem.appendChild(categoryProducts);
      cartItem.appendChild(productPrice);
      cartItem.appendChild(productDescription);
      cartItem.appendChild(buttonRemove);
      cartItem.appendChild(productHorizontLine);
      cart.appendChild(cartItem);
    });
  }
};
const renderProducts = ({ products }) => {
  const productsContainer = document.querySelector(".products");

  clearRenderList(productsContainer);

  products.forEach((product) => {
    const productItem = document.createElement("div");

    const divImg = document.createElement("div");
    const productImage = document.createElement("img");
    productImage.src = product.thumbnail;

    const categoryProducts = document.createElement("p");
    categoryProducts.textContent = product.category;

    const productName = document.createElement("p");
    productName.textContent = product.title;
    productName.classList.add("productName");

    const productPrice = document.createElement("p");
    productPrice.textContent = `${product.price} $`;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const buttonAddToCart = document.createElement("button");
    buttonAddToCart.textContent = "Add to Cart";
    buttonAddToCart.classList.add("butttonClick");

    const productHorizontLine = document.createElement("p");
    productHorizontLine.classList.add("productHorizontLine");

    buttonAddToCart.addEventListener("click", () => {
      addToCart(product);
    });
    divImg.appendChild(productImage);
    productItem.appendChild(divImg);
    productItem.appendChild(productName);
    productItem.appendChild(categoryProducts);
    productItem.appendChild(productPrice);
    productItem.appendChild(productDescription);
    productItem.appendChild(buttonAddToCart);
    productItem.appendChild(productHorizontLine);
    productsContainer.appendChild(productItem);
  });
};

function addToCart(product) {
  const cartProduct = cartList.find((el) => el.id === product.id);
  if (cartProduct) {
    const updatedCartList = cartList.map((el) =>
      el.id === cartProduct.id ? { ...product, quantity: el.quantity + 1 } : el
    );
    cartList = updatedCartList;
  } else {
    cartList.push({ ...product, quantity: 1 });
  }
  renderCartList();
  updateCartItemCount();
}

function removeFromCart(product) {
  if (product.quantity > 1) {
    cartList = cartList.map((el) =>
      el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
    );
  } else {
    cartList = cartList.filter((item) => item.id !== product.id);
  }

  renderCartList();
  updateCartItemCount();
}

window.onload = async () => {
  console.log("page is fully loaded");
  const data = await fetchProducts();
  renderProducts(data);
};

const cartToggle = document.getElementById("cartToggle");
const cartElement = document.querySelector(".cart");

cartToggle.addEventListener("click", () => {
  if (cartElement.style.visibility === "visible") {
    cartElement.style.visibility = "hidden";
  } else {
    cartElement.style.visibility = "visible";
    scrollToTop();
  }
  renderCartList();
});
function scrollToTop() {
  window.scrollTo(0, 0);
}

const cartItemCount = document.getElementById("cartItemCount");
function updateCartItemCount() {
  cartItemCount.textContent = cartList.reduce((acc, el) => {
    return el.quantity ? acc + el.quantity : acc;
  }, 0);
}
