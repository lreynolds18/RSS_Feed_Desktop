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
    rootGetters.getRSS.forEach(async RSS => {
      if (RSS.on === true && RSS.groupOn === true) {
        const response = await axios(RSS.url, RSS.type)
        if (RSS.type === 'xml') {
          parseString(response.data, (err, result) => {
            if (!err) {
              commit('add', result.feed.entry)
            } else {
              console.warn(err)
            }
          })
        } else if (RSS.type === 'json') {
          console.log(response.data.data.children)
          commit('add', response.data.data.children)
        }
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
