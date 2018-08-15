<template>
  <main>
    <sui-container>
      <sui-header size="huge">Comments</sui-header>
      <sui-button secondary 
        v-on:click="travelRoute('feed')"
        content="Go back!"
      />
      <sui-container>
        <h2 is="sui-header">
          <div v-html="params.title"></div>
        </h2>
        <p>
          <div v-html="cleanRedditHTML(params.selftext_html)"></div>
        </p>

      </sui-container>

    </sui-container>
  </main>
</template>


<script>
  export default {
    name: 'feed',
    components: { },
    created () { },
    mounted () {
    },
    computed: {
      params () {
        console.log(this.$route.params)
        if (Object.keys(this.$route.params).length === 0) {
          return this.$route.params.otherProp.prop
        } else {
          return {}
        }
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
