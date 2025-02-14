<template>
  <div v-show="open" class="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Banner',
  props: ['open'],
  setup() {
    const open = ref(true)
    return {
      open,
    }
  }
}
</script>