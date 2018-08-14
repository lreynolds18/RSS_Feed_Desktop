<template>
  <div id="wrapper">
    <main>
      <h1>Hello world</h1>
      <router-link :to="{ name: 'comments', params: { commentsID: 123 }}">Comments</router-link>
      <router-link :to="{ name: 'settings'}">Settings</router-link>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'feed',
    components: { },
    created () {
      this.$store.dispatch('loadRSS')
      this.$store.dispatch('loadFeed')
      console.log(this.$store.getters.getFeed)
    },
    mounted () {
      console.log(this.$store.getters.getFeed)
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }
</style>
