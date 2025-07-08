<script setup>
import { ref, computed, watch } from "vue";
import { useCart } from "../composables/useCart";

const {
  cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  isInCart,
  favoriteItems,
  toggleFavorite,
  isFavorite,
  totalPrice,
  totalItems,
} = useCart();

const isCartOpen = ref(false);
const isMobileMenuOpen = ref(false);
const localCartItems = ref([]);

watch(
  cartItems,
  (newVal) => {
    localCartItems.value = [...newVal];
  },
  { deep: true }
);

const openCart = () => {
  isCartOpen.value = true;
  document.body.style.overflow = "hidden";
  localCartItems.value = [...cartItems.value];
};

const closeCart = () => {
  isCartOpen.value = false;
  document.body.style.overflow = "";
};

const updateItemQuantity = (item, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(item.id);
    return;
  }
  updateQuantity(item.id, newQuantity);
};

const checkout = () => {
  if (cartItems.value.length === 0) return;
  alert(`Заказ оформлен! Сумма: ${totalPrice.value} руб.`);
  cartItems.value = [];
  closeCart();
};

const openMobileMenu = () => {
  isMobileMenuOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<template>


  <nav class="bg-white relative">

    <!-- Мобильное меню СТАРТ -->
    <div
      v-show="isMobileMenuOpen"
      class="fixed inset-0 z-30 bg-opacity-50 md:hidden"
      @click="closeMobileMenu"
    ></div>

    <div
      class="fixed bottom-0 left-0 right-0 z-40 p-4 overflow-y-auto bg-white rounded-t-2xl shadow-xl transition-transform duration-300"
      :class="isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'"
    >
     <RouterLink to="/">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <img
            src="/public/img/ico/ico.jpg"
            class="h-8 w-8 rounded-full"
            alt="Logo"
          />
          <div class="ml-3">
            <h1 class="text-lg font-bold">VUE SNEAKERS</h1>
            <p class="text-xs text-gray-500">Магазин лучших кроссовок</p>
          </div>
        </div>
        <button
          @click="closeMobileMenu"
          class="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>
      </RouterLink>

      <div class="space-y-4 mt-8">
        <Router-link
          to="/favorites"
          class="flex items-center py-2 px-4 hover:bg-gray-100 rounded text-black"
          @click="closeMobileMenu"
        >
          <img class="mr-3" src="/public/img/ico/favorite-outline.svg" alt="" />
          Закладки
          <span
            v-if="favoriteItems.length > 0"
            class="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ favoriteItems.length }}
          </span>
        </Router-link>

        <a
          href="#"
          class="flex items-center py-2 px-4 hover:bg-gray-100 rounded text-black"
        >
          <img class="mr-3" src="/public/img/ico/user.svg" alt="" />
          Профиль
        </a>

        <button
          @click="openCart"
          class="w-full flex items-center py-2 px-4 hover:bg-gray-100 rounded text-black text-left cursor-pointer"
        >
          <img
            class="mr-3 cursor-pointer"
            src="/public/img/ico/cart.svg"
            alt=""
          />
          Корзина
          <span
            v-if="totalItems > 0"
            class="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            {{ totalItems }}
          </span>
        </button>
      </div>
    </div>
    <!-- Мобильное меню КОНЕЦ -->

    <!-- Drawer корзины СТАРТ -->
    <div
      id="cart-drawer"
      class="fixed top-0 right-0 z-40 h-screen p-4 sm:p-6 overflow-y-auto bg-white w-full sm:w-96 transition-all duration-300 ease-in-out"
      :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold">Корзина</h2>
        <button @click="closeCart" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="space-y-4 mb-6 max-h-[60vh] overflow-y-auto" v-auto-animate>
        <div
          v-for="item in localCartItems"
          :key="item.id"
          class="flex items-start border-b pb-4"
        >
          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="w-16 h-16 sm:w-20 sm:h-20 object-contain mr-3"
          />
          <div class="flex-1">
            <h3 class="font-medium text-sm sm:text-base">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm">
              {{ item.price }} руб. × {{ item.quantity }} =
              {{ item.price * item.quantity }} руб.
            </p>
            <div class="flex items-center mt-2">
              <button
                @click="updateItemQuantity(item, item.quantity - 1)"
                class="w-6 h-6 sm:w-8 sm:h-8 border rounded flex items-center justify-center text-sm"
                :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
              >
                -
              </button>
              <span class="mx-2 text-sm sm:text-base">{{ item.quantity }}</span>
              <button
                @click="updateItemQuantity(item, item.quantity + 1)"
                class="w-6 h-6 sm:w-8 sm:h-8 border rounded flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>
          <button
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:text-red-700 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="localCartItems.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <img class="m-auto w-20 h-20" src="/public/img/ico/box.png" alt="" />
          <h1 class="text-xl text-black mt-4">Корзина пуста</h1>
          <p class="mt-2">
            Добавьте хотя бы одну пару<br />кроссовок, чтобы сделать заказ.
          </p>
        </div>
      </div>

      <div class="border-t pt-4 mb-6">
        <div class="flex justify-between text-lg font-bold">
          <span>Итого:</span>
          <span>{{ totalPrice }} руб.</span>
        </div>
        <div class="flex justify-between text-sm text-gray-500 mt-1">
          <span>Товаров: {{ totalItems }}</span>
          <span>{{ cartItems.length }} позиций</span>
        </div>
      </div>

      <button
        @click="checkout"
        :disabled="cartItems.length === 0"
        class="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Оформить заказ
      </button>
    </div>
    <!-- Drawer корзины КОНЕЦ -->

    <!-- Шапка СТАРТ -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/">
          <div class="flex items-center">
            <img
              src="/public/img/ico/ico.jpg"
              class="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              alt="Logo"
            />
            <div class="ml-2 sm:ml-3">
              <h1 class="text-lg sm:text-xl font-bold">VUE SNEAKERS</h1>
              <p class="text-xs text-gray-500 hidden sm:block">
                Магазин лучших кроссовок
              </p>
            </div>
          </div>
        </RouterLink>

        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            <button
              @click="openCart"
              class="flex items-center text-gray-700 hover:text-black relative cursor-pointer"
            >
              <img class="mr-3" src="/public/img/ico/cart.svg" alt="" />
              <span class="ml-1">Корзина</span>
              <span
                v-if="totalItems > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ totalItems }}
              </span>
            </button>

            <Router-link
              to="/favorites"
              class="flex items-center text-gray-700 hover:text-black relative"
            >
              <img
                class="mr-3"
                src="/public/img/ico/favorite-outline.svg"
                alt=""
              />
              <span class="ml-1">Закладки</span>
              <span
                v-if="favoriteItems.length > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ favoriteItems.length }}
              </span>
            </router-link>

            <a
              href="#"
              class="flex items-center text-gray-700 hover:text-black"
            >
              <img class="mr-3" src="/public/img/ico/user.svg" alt="" />
              <span class="ml-1">Профиль</span>
            </a>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="openMobileMenu"
            class="text-gray-500 hover:text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Шапка КОНЕЦ -->

  </nav>


</template>

<style scoped>
.transition-all {
  transition-property: all;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-in-out {
  transition-timing-function: ease-in-out;
}

.animate-bounce {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.fixed.bottom-0 {
  max-height: 80vh;
  overflow-y: auto;
}
.rounded-t-2xl {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.translate-y-full {
  transform: translateY(100%);
}
.translate-y-0 {
  transform: translateY(0);
}
</style>
