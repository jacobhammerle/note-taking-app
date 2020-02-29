<template>
  <div id="app" class="bg-gray-100 h-screen">
    <Navbar />
    <div class="max-w-4xl mx-auto pt-20">
      <router-view />
    </div>
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
#app{
  font-family: 'lato-regular', sans-serif;
}
.router-link-exact-active{
  background-color: #38B2AC;
  color: #ffffff;
}
.lato-bold{
  font-family: 'lato-bold', sans-serif;
}
.lato-regular{
  font-family: 'lato-regular', sans-serif;
}
.lato-light{
  font-family: 'lato-light', sans-serif;
}
</style>
