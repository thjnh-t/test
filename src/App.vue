<template>
  <router-view />
</template>

<script>
import './charts/ChartjsConfig';
</script>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.926);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.7);
}

.scrollable-element {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.7) transparent;
}

a {
  cursor: pointer;
  text-decoration: none;
}
</style>