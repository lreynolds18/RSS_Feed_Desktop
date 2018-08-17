const axios = require('axios')
const parseString = require('xml2js').parseString

const state = {
  PostObj: {},
  Comments: []
}

const mutations = {
  setPost (state, postObj) {
    state.PostObj = postObj
  },
  setComments (state, Comments) {
    state.Comments = Comments
  }
}

const getters = {
  getPostObj (state) {
    return state.PostObj
  },
  getComments (state) {
    return state.Comments
  }
}

const actions = {
  setPost ({ dispatch, commit }, postObj) {
    commit('setPost', postObj)
    dispatch('loadComments', postObj.url)
  },
  async loadComments ({ commit }, url) {
    // commit('INCREMENT_MAIN_COUNTER')
    const type = 'json'
    const response = await axios(url + '.json', type)

    if (type === 'xml') {
      // UNTESTED
      parseString(response.data, (err, result) => {
        if (!err) {
          console.log(result.feed.entry)
          commit('setComments', result.feed.entry)
        }
      })
    } else if (type === 'json') {
      commit('setComments', response.data[1].data.children)
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
