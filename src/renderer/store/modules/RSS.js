const state = {
  RSS: [
    { domain: 'reddit.com', group: 'Data Science', groupOn: true, on: true, url: 'https://reddit.com/r/machinelearning.rss', type: 'xml' },
    { domain: 'reddit.com', group: 'Data Science', groupOn: true, on: true, url: 'https://reddit.com/r/datascience.json', type: 'json' },
    { domain: 'reddit.com', group: 'General CS', groupOn: true, on: false, url: 'https://reddit.com/r/cscareerquestions.rss', type: 'xml' }
  ]
}

const mutations = {
  add (state, RSS) {
    state.RSS.push(RSS)
  },
  delete (state, index) {
    state.RSS.length === 1 ? state.RSS = [] : state.RSS.splice(index, 1)
  },
  toggleOn (state, index) {
    state.RSS[index].on = !state.RSS[index].on
  },
  toggleGroupOn (state, group) {
    /*
    state.RSS.forEach((RSS, index) => {
        if (RSS.group == group) {
          state.RSS[index].groupOn = !state.RSS[index].groupOn;
        }
    });
    */
  }
}

const getters = {
  getRSS (state) {
    return state.RSS
  }
}

const actions = {
  async loadRSS ({ commit }) {
    // commit('INCREMENT_MAIN_COUNTER')
    console.log('In loadRSS')
  },
  async setRSS ({ commit }) {
    console.log('In setRSS')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
