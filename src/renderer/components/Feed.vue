<template>
  <main>
    <sui-container>
      <sui-header size="huge">RSS Feed</sui-header>
      <sui-button secondary 
        v-on:click="travelRoute('settings')"
        content="Settings" 
      />

      <sui-list divided relaxed>
        <sui-list-item
          v-for="entry in getFeed"
          v-bind:data="entry"
          v-bind:key="entry.data.url"
        >
          <sui-list-content>
            <h2 is="sui-header" v-on:click="travelRouteProps('comments', entry.data)">
              <div v-html="entry.data.title"></div>
            </h2>
            <p>
              <div v-html="cleanRedditHTML(entry.data.selftext_html)"></div>
            </p>
          </sui-list-content>
        </sui-list-item>
      </sui-list>
    </sui-container>
  </main>
</template>

<script>
  export default {
    name: 'feed',
    components: { },
    created () {
      this.$store.dispatch('loadRSS')
      this.$store.dispatch('loadFeed')
    },
    mounted () {
    },
    computed: {
      getFeed () {
        console.log(this.$store.getters.getFeed)
        return this.$store.getters.getFeed
      }
    },
    methods: {
      cleanRedditHTML (html) {
        if (html) {
          html = html.substring(
            html.lastIndexOf('&lt;div class="md"&gt;') + 22,
            html.lastIndexOf('&lt;/div&gt;')
          )

          html = html.replace(/&amp;/g, '&')
          html = html.replace(/&lt;/g, '<')
          html = html.replace(/&gt;/g, '>')
          html = html.replace(/&#39;/g, '&apos;')
          html = html.replace(/&quot;/g, '"')
          return html
        }
      },
      travelRoute (name) {
        this.$router.push({ name: name })
      },
      travelRouteProps (name, postObj) {
        this.$store.dispatch('setPost', postObj)
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style>
</style>
