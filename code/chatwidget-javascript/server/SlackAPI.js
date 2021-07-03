import superagent from 'superagent';

export async function appsConnectionsOpen() {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${process.env.SOCKETMODE}`,
  };
  const methodUrl = 'https://slack.com/api/apps.connections.open';
  const res = await superagent.post(methodUrl).set(httpHeaders).send({});
  if (!res.body.url) {
    console.log('Error: sending request to Slack API failed:');
    console.log('=============================');
    throw res.body;
  }
  return res.body.url;
}

function sendSlackRequest(url, payload, token) {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
  };
  superagent
    .post(url)
    .set(httpHeaders)
    .send(payload)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(payload);
        console.log(res.body);
      }
    });
}

// Send a message
export function chatPostMessage(channel, message) {
  sendSlackRequest(
    'https://slack.com/api/chat.postMessage',
    {
      channel: channel,
      text: message,
    },
    process.env.BOTTOKEN
  );
}

const web = { chatPostMessage, appsConnectionsOpen };

export default web;
