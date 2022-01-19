# OpenAI Node.js Library

The OpenAI Node.js library provides convenient access to the OpenAI API from Node.js applications. Most of the code in this library is generated from our [OpenAPI specification](https://github.com/openai/openai-openapi).

**Important note: this library is meant for server-side usage only, as using it in client-side browser code will expose your secret API key. [See here](https://beta.openai.com/docs/api-reference/authentication) for more details.**

## Installation

```bash
$ npm install openai
```

## Usage

The library needs to be configured with your account's secret key, which is available on the [website](https://beta.openai.com/account/api-keys). We recommend setting it as an environment variable. Here's an example of initializing the library with the API key loaded from an environment variable and creating a completion:

```javascript
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion("davinci", {
  prompt: "Hello world",
});
console.log(completion.data.choices[0].text);
```

Check out the [full API documentation](https://beta.openai.com/docs/api-reference?lang=javascript) for examples of all the available functions.

### Request options

All of the available API request functions additionally contain an optional final parameter where you can pass custom [axios request options](https://axios-http.com/docs/req_config), for example:


```javascript
const completion = await openai.createCompletion(
  "davinci",
  {
    prompt: "Once upon a time",
    max_tokens: 5,
  },
  {
    timeout: 1000,
    headers: {
      "Example-Header": "example",
    },
  }
);
```

## Thanks

Thank you to [ceifa](https://github.com/ceifa) for creating and maintaining the original unofficial `openai` npm package before we released this official library!
