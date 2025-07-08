<template>
  <main v-auto-animate>
    <div class="mt-8 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold">Мои закладки</h2>
    </div>

    <div v-if="favoriteItems.length === 0" class="text-center py-10" >
        <div class="flex flex-col justify-center gap-4">
            <img class="w-20 m-auto" src="/public/img/ico/image 9.png" alt="">
            <h1 class="font-bold text-2xl">Закладок нет :C</h1>
            <p class="text-xl">Вы ничего не добавляли в закладки</p>
        </div>
 
    </div>

    <Cardlist v-else :items="favoriteItems" />
  </main>
</template>

<script setup>
import Cardlist from "../components/Cardlist.vue";
import { useCart } from "../composables/useCart.js";

const { favoriteItems } = useCart();
</script>