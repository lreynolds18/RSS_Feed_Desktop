const state = {
  RSS: [
    {
      groupName: 'Data Science',
      groupOn: true,
      RSS: [
        { domain: 'reddit.com', on: true, subreddit: 'machinelearning', type: 'json', url: 'https://reddit.com/r/machinelearning.json' },
        { domain: 'reddit.com', on: true, subreddit: 'datascience', type: 'json', url: 'https://reddit.com/r/datascience.json' }
      ]
    },
    {
      groupName: 'General CS',
      groupOn: false,
      RSS: [
        { domain: 'reddit.com', on: false, subreddit: 'cscareerquestions', type: 'json', url: 'https://reddit.com/r/cscareerquestions.json' }
      ]
    }
  ]
}

const mutations = {
  addRSS (state, payload) {
    state.RSS[payload.groupIndex].RSS.push(payload.RSS)
  },
  addGroup (state, groupName) {
    state.RSS.push({
      groupName: groupName,
      groupOn: true,
      RSS: []
    })
  },
  deleteGroup (state, groupIndex) {
    state.RSS.length === 1 ? state.RSS = [] : state.RSS.splice(groupIndex, 1)
  },
  toggleGroup (state, groupIndex) {
    state.RSS[groupIndex].groupOn = !state.RSS[groupIndex].groupOn
  },
  deleteRSS (state, payload) {
    state.RSS[payload.groupIndex].RSS.length === 1
      ? state.RSS[payload.groupIndex].RSS = []
      : state.RSS[payload.groupIndex].RSS.splice(payload.rssIndex, 1)
  },
  toggleRSS (state, payload) {
    state.RSS[payload.groupIndex].RSS[payload.rssIndex].on =
      !state.RSS[payload.groupIndex].RSS[payload.rssIndex].on
  },
  moveRSS (state, payload) {
    const oldGroupIndex = state.RSS.findIndex(
      group => { return group.groupName === payload.oldGroup.groupName }
    )
    const newGroupIndex = state.RSS.findIndex(
      group => { return group.groupName === payload.newGroup.groupName }
    )
    const rssIndex = state.RSS[oldGroupIndex].RSS.findIndex(
      RSS => { return RSS.url === payload.RSS.url }
    )
    // delete RSS from old group
    state.RSS[oldGroupIndex].RSS.length === 1
      ? state.RSS[oldGroupIndex].RSS = []
      : state.RSS[oldGroupIndex].RSS.splice(rssIndex, 1)

    // move RSS to new group
    state.RSS[newGroupIndex].RSS.push(payload.RSS)
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
  },
  // REFACTOR ALL THESE INTO ONE FUNCTION
  deleteGroup ({ commit }, groupIndex) {
    commit('deleteGroup', groupIndex)
  },
  toggleGroup ({ commit }, groupIndex) {
    commit('toggleGroup', groupIndex)
  },
  deleteRSS ({ commit }, payload) {
    commit('deleteRSS', payload)
  },
  toggleRSS ({ commit }, payload) {
    commit('toggleRSS', payload)
  },
  addRSS ({ commit }, payload) {
    commit('addRSS', payload)
  },
  addGroup ({ commit }, groupName) {
    commit('addGroup', groupName)
  },
  moveRSS ({ commit }, payload) {
    commit('moveRSS', payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
