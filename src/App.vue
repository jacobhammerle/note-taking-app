<template>
  <div id="app" class="bg-gray-100 h-screen">
    <Navbar />
    <!--<router-view/>-->
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
