<template>
  <main>
    <sui-container>
      <sui-header size="huge" content="RSS Feed" />
      <sui-button secondary 
        @click="redirect('settings')" content="Settings" />

      <sui-list divided relaxed>
        <sui-list-item
          v-for="(entry, index) in getFeed"
          :data="entry"
          :key="index"
        >
          <sui-list-content>
            <h2 is="sui-header" @click="redirectWithProps('comments', entry.data)">
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
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;/g, '&apos;')
            .replace(/&quot;/g, '"')

          return html
        }
      },
      redirect (path) {
        this.$router.push({ name: path })
      },
      redirectWithProps (path, postObj) {
        this.$store.dispatch('setPost', postObj)
        this.redirect(path)
      }
    }
  }
</script>

<style>
</style>
