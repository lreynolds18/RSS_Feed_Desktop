<template>
  <main>
    <sui-container>
      <sui-header size="huge" content="Settings" />
      <sui-button secondary @click="travelRoute('feed')" content="Go back!" />
    </sui-container>

    <sui-container v-if="getRSS">
      <sui-list>
        <sui-list-item 
          v-for="(group, groupIndex) in getRSS" :key="groupIndex" :data="group"
        >
          <drop @drop="handleDrop(group, ...arguments)">
            <sui-header 
              size="medium" 
              :style="group.groupOn ? {} : {textDecorationLine: 'line-through'}"
              :content="group.groupName"
            />

            <sui-button secondary
              @click="mutateRSS({mutation: 'toggleGroup', groupIndex: groupIndex})"
            >
              <div v-if="group.groupOn">Turn Off</div>
              <div v-else>Turn On</div>
            </sui-button>

            <sui-button secondary
              @click="mutateRSS({mutation: 'deleteGroup', groupIndex: groupIndex})"
            >
              Delete
            </sui-button>

            <sui-list>
              <sui-list-item 
                v-for="(RSS, rssIndex) in group.RSS" :key="rssIndex" :data="RSS"
              >
                <drag :transfer-data="{ RSS: RSS, group: group }">
                  <p :style="(group.groupOn && RSS.on)
                            ? {}
                            : {textDecorationLine: 'line-through'}"
                  >
                    {{ RSS.url }}
                  </p>

                  <sui-button secondary
                    @click="mutateRSS({mutation: 'toggleRSS', rssIndex: rssIndex, groupIndex: groupIndex})"
                    :disabled="!group.groupOn"
                  >
                    <div v-if="RSS.on">Turn Off</div>
                    <div v-else>Turn On</div>
                  </sui-button>

                  <sui-button secondary 
                    @click="mutateRSS({mutation: 'deleteRSS', rssIndex: rssIndex, groupIndex: groupIndex})"
                    :disabled="!group.groupOn"
                  >
                    Delete
                  </sui-button>
                </drag>
              </sui-list-item>
            </sui-list>

            <sui-label>
              Add RSS:
              <sui-input
                v-model="RSS_input_fields[groupIndex]"
                placeholder="Enter RSS URL"
                :disabled="!group.groupOn"
              />
              <sui-button
                icon="plus"
                @click="addRSS(groupIndex)"
                :disabled="!group.groupOn"
              />
            </sui-label>
          </drop>
        </sui-list-item>
      </sui-list>
    </sui-container>

    <sui-container>
      <form id="add">   
        <sui-label>
          Add Group: 
          <sui-input
            v-model="group_input_field"
            placeholder="Enter Group Name"
          />

          <sui-button icon="plus" @click="addGroup" />
        </sui-label>
      </form>
    </sui-container>
  </main>
</template>

<script>
  import { Drag, Drop } from 'vue-drag-drop'

  export default {
    name: 'feed',
    data: function () {
      return {
        RSS_input_fields: [],
        group_input_field: ''
      }
    },
    components: { Drag, Drop },
    created () {
    },
    mounted () {
    },
    computed: {
      getRSS () {
        let RSS = this.$store.getters.getRSS
        this.RSS_input_fields = Array(RSS.length).fill('')
        return RSS
      }
    },
    methods: {
      travelRoute (name) {
        this.$router.push({ name: name })
      },
      handleDrop (group, args) {
        const payload = {
          mutation: 'moveRSS',
          newGroup: group,
          oldGroup: args.group,
          RSS: args.RSS
        }

        // verify RSS is going to a new group
        if (payload.newGroup.groupName !== payload.oldGroup.groupName) {
          // verify RSS not alreay in new group
          const repeats = payload.newGroup.RSS.filter(
            newRSS => { return newRSS.url === payload.RSS.url }
          )
          if (repeats.length === 0) {
            this.mutateRSS(payload)
          }
        }
      },
      addRSS (index) {
        // from https://gist.github.com/jlong/2428561
        let parser = document.createElement('a')
        parser.href = this.RSS_input_fields[index].trim()

        if (parser.protocol === 'https:' && parser.hostname !== 'localhost') {
          const repeats = this.$store.getters.getRSS[index].RSS.filter(
            RSS => { return RSS.url === parser.href }
          )

          if (repeats.length === 0) {
            this.mutateRSS({
              mutation: 'addRSS',
              groupIndex: index,
              RSS: {
                domain: parser.domain,
                on: true,
                subreddit: parser.pathname,
                type: 'json',
                url: parser.href
              }
            })
            this.RSS_input_fields[index] = ''
          }
        }
      },
      addGroup () {
        const input = this.group_input_field.trim()
        if (input !== '') {
          const repeats = this.$store.getters.getRSS.filter(
            group => { return group.groupName === input }
          )
          if (repeats.length === 0) {
            this.mutateRSS({mutation: 'addGroup', groupName: input})
            this.group_input_field = ''
          }
        }
      },
      mutateRSS (payload) {
        this.$store.dispatch('mutateRSS', payload)
      }
    }
  }
</script>

<style>
</style>
