<script setup>
import { useCart } from "../composables/useCart.js";

const { addToCart, removeFromCart, isInCart, toggleFavorite, isFavorite } = useCart();

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="rounded-xl p-5 hover:shadow-lg transition-shadow">
    <div class="relative">
      <img 
        :src="item.imageUrl" 
        :alt="item.title" 
        class="w-full h-48 object-contain mb-3"
      >
      <button 
        @click="toggleFavorite(item)"
        class="absolute top-0 left-0 p-2"
      >
        <img 
          :src="isFavorite(item.id) ? '/public/img/ico/favorite-online.svg' : '/public/img/ico/serdce.svg'" 
          alt="Favorite"
          class="w-10 h-10 cursor-pointer"
        >
      </button>
    </div>
    
    <h3 class="font-medium mb-2">{{ item.title }}</h3>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-gray-500">Цена:</p>
        <p class="font-bold">{{ item.price }} руб.</p>
      </div>
      <button 
        @click="isInCart(item.id) ? removeFromCart(item.id) : addToCart(item)"
        class="p-2 rounded-full"
      >
        <img 
          :src="isInCart(item.id) ? '/public/img/ico/basket-favourites .svg' : '/public/img/ico/basket-flowers.svg'" 
          alt="Add to cart"
          class="w-10 h-10 cursor-pointer"
        >
      </button>
    </div>
  </div>
</template>