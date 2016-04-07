var moment = require('moment')
var request = require('request')
var Firebase = require('firebase')
var hn = new Firebase('https://hacker-news.firebaseio.com')

// Load User Configuration
var conf = require('./config.json')
if (!conf.webhook) throw new Error('Please include your webhook url inside the config.json file. Eg: { "webhook": "http://hooks.slack.com/services/some/superlongid" }')

// Keep track of old top stories for a given amount of time (hours)
// So they don't get broadcasted multiple times
var OLD_TOP_STORIES = []
setInterval(function () {
  OLD_TOP_STORIES = new Array()
}, (1000 * 60 * 60) * (conf.hidePreviousStories || 6))

// New Story
hn.child('v0/topstories/0').on('value', function (snapshot) {
  var story = snapshot.val()
  if (OLD_TOP_STORIES.indexOf(story) === -1) {
    hn.child(`v0/item/${story}`).once('value', function (snapshot) {
      OLD_TOP_STORIES.push(story)
      var storyData = snapshot.val()

      var data = Object.assign({}, conf.message, {
        text: `Latest Hacker News top story: <${storyData.url}|${storyData.title}> | ${storyData.score} points by ${storyData.by}, ${moment(storyData.time * 1000).fromNow()}.`
      })

      if (process.env.NODE_ENV === 'production') {
        request.post(conf.webhook, { json: data })
      } else {
        console.log(`POST ${conf.webhook}`)
        console.log(`DATA ${JSON.stringify(data, null, 4)}`)
      }
    })
  }
})
