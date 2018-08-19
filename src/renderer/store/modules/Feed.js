const axios = require('axios')
const parseString = require('xml2js').parseString

const state = {
  Entries: []
}

const mutations = {
  add (state, entries) {
    state.Entries.push(...entries)
  }
}

const getters = {
  getFeed (state) {
    return state.Entries
  }
}

const actions = {
  async loadFeed ({ dispatch, commit, rootGetters }) {
    rootGetters.getRSS.forEach(async group => {
      if (group.groupOn === true) {
        group.RSS.forEach(async RSS => {
          if (RSS.on === true) {
            const response = await axios(RSS.url, RSS.type)
            if (RSS.type === 'xml') {
              parseString(response.data, (err, result) => {
                if (!err) {
                  console.log(result.feed.entry)
                  commit('add', result.feed.entry)
                }
              })
            } else if (RSS.type === 'json') {
              // honestly just best to handle all calls with json if we can
              commit('add', response.data.data.children)
            }
          }
        })
      }
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
