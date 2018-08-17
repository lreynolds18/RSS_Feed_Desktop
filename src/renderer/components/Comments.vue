<template>
  <main>
    <sui-container>
      <!-- Display Header / Back Button -->
      <sui-header size="huge">Comments</sui-header>
      <sui-button secondary 
        v-on:click="travelRoute('feed')"
        content="Go back!"
      />
      
      <!-- Display Post -->
      <sui-container v-if="getPostObj">
        <h2 is="sui-header">
          <div v-html="getPostObj.title"></div>
        </h2>
        <p>
          <div v-html="cleanRedditHTML(getPostObj.selftext_html)"></div>
        </p>
      </sui-container>

      <!-- Display Comments -->
      <sui-container v-if="getComments">
        <sui-list divided relaxed>
          <sui-list-item
            v-for="entry in getComments"
            v-bind:data="entry"
            v-bind:key="entry.data.url"
          >
            <sui-list-content>
              <p>
                <div>{{ entry.data.author }}</div>
                <div v-html="cleanRedditHTML(entry.data.body_html)"></div>
              </p>
            </sui-list-content>
          </sui-list-item>
        </sui-list>
      </sui-container>
    </sui-container>
  </main>
</template>


<script>
  export default {
    name: 'feed',
    components: { },
    created () { },
    mounted () { },
    computed: {
      getPostObj () {
        return this.$store.getters.getPostObj
      },
      getComments () {
        console.log(this.$store.getters.getComments)
        return this.$store.getters.getComments
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
      }
    }
  }
</script>

<style>
</style>
