<script setup>

import { onMounted, ref, computed } from "vue";
import axios from "axios";

import Header from "./components/Header.vue";
import Home from "./pages/Home.vue";

const items = ref([]);
const isLoading = ref(true);
const error = ref(null);
const sortOption = ref("default");
const searchQuery = ref(""); 

const filteredAndSortedItems = computed(() => {
  let result = [...items.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      item.title.toLowerCase().includes(query)
    );
  }
  
  switch (sortOption.value) {
    case "price_cheap":
      return result.sort((a, b) => a.price - b.price);
    case "price_expensive":
      return result.sort((a, b) => b.price - a.price);
    case "title":
      return result.sort((a, b) => 
        a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' })
      );
    case "default":
    default:
      return result;
  }
});

onMounted(async () => {
  try {
    const response = await axios.get("https://8b5e3ba06486309b.mokky.dev/items");
    items.value = response.data;
  } catch (err) {
    error.value = "Не удалось загрузить данные.";
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <div>

    <Header />

    <div class="container mx-auto px-4">
    <RouterView />
    </div>
  </div>
</template>

<style scoped>

select:focus, input:focus {
  border-color: #A5D364;
  box-shadow: 0 0 0 3px rgba(165, 211, 100, 0.2);
}


button {
  background-color: #A5D364;
}
button:hover {
  background-color: #8fb955;
}


@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>