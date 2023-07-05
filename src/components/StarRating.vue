<template>
  <div class="star-rating">
    <span v-if="showNumber">{{ stars }}</span>
    <span v-else></span>
    <span
      v-for="index in maxStars"
      :key="index"
      class="star"
      :class="{ filled: index <= stars }"
      @click="setStars(index)"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    stars: {
      default: 0,
    },
    maxStars: {
      default: 5,
    },
    showNumber: false,
  },
  methods: {
    setStars(index) {
      this.$emit('input', index);
    },
  },
};
</script>

<style scoped>
.star-rating {
  grid-column: 1 / span 2;
  padding: 10px;
}

.star {
  display: inline-block;
  cursor: pointer;
  color: #ccc;
}

.star.filled {
  color: orange;
}

.star::before {
  content: '\2605';
  padding: 3px;
}

.star:hover::before {
  opacity: 1;
}

.star.filled::before {
  opacity: 1;
}
</style>
