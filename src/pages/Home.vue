<script setup>
import Slider from "../components/Slider.vue";
import Cardlist from "../components/Cardlist.vue";

import { onMounted, ref, computed } from "vue";
import { initFlowbite } from "flowbite";
import axios from "axios";

const items = ref([]);
const isLoading = ref(true);
const error = ref(null);
const sortOption = ref("default");
const searchQuery = ref("");

const filteredAndSortedItems = computed(() => {
  let result = [...items.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((item) => item.title.toLowerCase().includes(query));
  }

  switch (sortOption.value) {
    case "price_cheap":
      return result.sort((a, b) => a.price - b.price);
    case "price_expensive":
      return result.sort((a, b) => b.price - a.price);
    case "title":
      return result.sort((a, b) =>
        a.title.localeCompare(b.title, "ru", { sensitivity: "base" })
      );
    case "default":
    default:
      return result;
  }
});

onMounted(async () => {
  initFlowbite();

  try {
    const response = await axios.get(
      "https://8b5e3ba06486309b.mokky.dev/items"
    );
    items.value = response.data;
  } catch (err) {
    error.value = "Не удалось загрузить данные.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
    <main v-auto-animate>


  <Slider />

  <div class="mt-8 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <h2 class="text-2xl font-bold">Все кроссовки</h2>

    <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div class="relative w-full sm:w-64">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по названию..."
          class="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-[#A5D364] focus:border-[#A5D364]"
        />
      </div>

      <div class="w-full sm:w-48">
        <select
          v-model="sortOption"
          class="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D364] focus:border-[#A5D364] cursor-pointer"
        >
          <option value="default">По обычному</option>
          <option value="price_cheap">Дешево (по цене)</option>
          <option value="price_expensive">Дорого (по цене)</option>
          <option value="title">По названию</option>
        </select>
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="text-center py-10">
    <div
      class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A5D364] mb-4"
    ></div>
    <p>Загружаем кроссовки...</p>
  </div>

  <div
    v-else-if="error"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">Внимание! </strong>
    <span class="block sm:inline">{{ error }}</span>
  </div>

  <div
    v-else-if="filteredAndSortedItems.length === 0"
    class="text-center py-10"
  >
    <p class="text-lg">Ничего не найдено по запросу "{{ searchQuery }}"</p>
    <button
      @click="searchQuery = ''"
      class="mt-3 px-4 py-2 bg-[#A5D364] text-white rounded-md transition cursor-pointer"
    >
      Сбросить поиск
    </button>
  </div>

  <Cardlist v-else :items="filteredAndSortedItems" />


    </main>
</template>
