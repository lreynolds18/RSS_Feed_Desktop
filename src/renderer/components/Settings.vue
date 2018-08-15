<template>
  <main>
    <sui-container>
      <sui-header size="huge">Settings</sui-header>
      <sui-button secondary 
        v-on:click="travelRoute('feed')"
        content="Go back!" 
      />
    </sui-container>
  </main>
</template>


<script>
  export default {
    name: 'feed',
    components: { },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      travelRoute (name) {
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style>
</style>
