<template>
  <div id="app">
    <header class="banner">
      <div class="container">
        <a class="brand" href="http://bigfarm.flowlab.studio/">goodgamestudios.com</a>
        <nav class="nav-primary"></nav>
      </div>
    </header>

    <big-farm></big-farm>

    <footer class="content-info">
      <div class="container"></div>
    </footer>
  </div>
</template>

<script>
    import BigFarm from '@/components/big-farm'

    export default {
        name: 'App',
        components: {
            BigFarm
        }
    }
</script>
