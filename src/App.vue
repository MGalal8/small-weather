<template>
<div class="flex items-center justify-center bg-sky-500">
  <div class="max-w-md m-auto bg-transparent">
     <ForcastApp></ForcastApp>
  </div>
</div>
</template>

<script>
  import ForcastApp from './components/ForcastApp.vue';

  export default {
    components: { ForcastApp }
  }
</script>
