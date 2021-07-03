<template>
  <div id="app">
    <div id="chat">
      <h2>Chat with Richard</h2>
      <div v-for="item in messages" :key="item.message">
        <div class="message" v-if="item.client === true">
          <div class="client-message">
            {{ item.message }}
          </div>
        </div>

        <div class="message" v-if="item.client === false">
          <div class="server-message">
            {{ item.message }}
          </div>
        </div>
      </div>
      <div id="input">
        <input
          type="string"
          v-model="value"
          v-on:keyup.enter="sendMessage(value)"
        />
        <button v-on:click="sendMessage(value)">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      connection: null,
      value: '',
      messages: [
        {
          client: false,
          message: "Hi there! I'll be right with you!",
        },
      ],
    };
  },
  created: function() {
    console.log('Starting connection to WebSocket Server');
    this.connection = new WebSocket('ws://localhost:3000', 'echo-protocol');
    const messages = this.messages;

    this.connection.onmessage = function(event) {
      messages.push({ client: false, message: event.data });
    };

    this.connection.onopen = function(event) {
      console.log(event);
      console.log('Successfully connected to the echo websocket server...');
    };
  },
  updated: function() {
    const messageInput = document.getElementById('input');
    if (messageInput) {
      messageInput.scrollIntoView();
    }
  },
  methods: {
    sendMessage: function(message) {
      this.connection.send(message);
      this.value = '';
      this.messages.push({ client: true, message: message });
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h2 {
  text-align: center;
}
#chat {
  max-height: 400px;
  width: 400px;
  overflow: hidden;
  overflow-y: scroll;
  border: solid;
}

#input {
  text-align: right;
}

.message {
  margin-bottom: 10px;
}
.client-message {
  padding: 5px;
  margin-left: 100px;
  border: solid;
  border-right: 0;
  background-color: lightsteelblue;
}

.server-message {
  padding: 5px;
  margin-right: 100px;
  border: solid;
  border-left: 0;
  background-color: blanchedalmond;
}
</style>
