<script setup>
import Card from "./Card.vue";

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-20 lg:px-40 xl:px-80" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>