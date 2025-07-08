import { ref, computed } from "vue";

const cartItems = ref([]);
const favoriteItems = ref([]);

try {
  const savedCart = localStorage.getItem("cart");
  cartItems.value = savedCart ? JSON.parse(savedCart) : [];
  
  const savedFavorites = localStorage.getItem("favorites");
  favoriteItems.value = savedFavorites ? JSON.parse(savedFavorites) : [];
} catch {
  cartItems.value = [];
  favoriteItems.value = [];
}

export function useCart() {
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  };

  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favoriteItems.value));
  };

  const addToCart = (item) => {
    const existingIndex = cartItems.value.findIndex((i) => i.id === item.id);

    if (existingIndex >= 0) {
      cartItems.value[existingIndex].quantity += 1;
    } else {
      cartItems.value.push({ ...item, quantity: 1 });
    }
    saveCart();
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    saveCart();
  };

  const updateQuantity = (id, newQuantity) => {
    const itemIndex = cartItems.value.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const quantity = Math.max(1, newQuantity);
      const newItems = [...cartItems.value];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity: quantity,
      };
      cartItems.value = newItems;
      saveCart();
    }
  };

  const isInCart = (id) => {
    return cartItems.value.some((item) => item.id === id);
  };

  const toggleFavorite = (item) => {
    const index = favoriteItems.value.findIndex(i => i.id === item.id);
    if (index >= 0) {
      favoriteItems.value.splice(index, 1);
    } else {
      favoriteItems.value.push(item);
    }
    saveFavorites();
  };

  const isFavorite = (id) => {
    return favoriteItems.value.some(item => item.id === id);
  };

  const totalPrice = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cartItems: computed(() => cartItems.value),
    favoriteItems: computed(() => favoriteItems.value),
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    toggleFavorite,
    isFavorite,
    totalPrice,
    totalItems,
  };
}