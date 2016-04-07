# Latest Top Hacker News

###### Listens for changes in the top-rated Hacker News story and sends an informative message to a given Slack channel on each change.

### How to use it!
  1. Setup a new [Incoming Webhook](https://meetup-berlin.slack.com/apps/build/custom-integration) for your Slack Organisation
  2. Clone this repo and `cd` into it.
  3. Create a `config.json` file based on `example.config.json`
    - The `message` object consists of overrides for settings you choose when you setup the incoming webhook, therefore it is not required.
  4. Run the app! `NODE_ENV=production node server.js`
    - Running the app without NODE_ENV set to production will just `console.log` the output instead of posting a message to Slack.

### Have suggestions? Made improvements?
Create either a new Issue or Pull Request and I'll get to it as quickly as possible.