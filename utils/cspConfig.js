// Content security policy

const cspConfig = {
  directives: {
    'default-src': ['self', 'blob:'],
    'style-src': ['self', 'unsafe-inline', 'https:'],
    'font-src': ['self', 'https://fonts.gstatic.com'],
    'script-src': [
      'self',
      'unsafe-inline',
      'data',
      'blob:',
      'https://*.cloudflare.com/',
      'https://bundle.js:8828',
      'ws://localhost:56558/',
    ],
    'frame-src': [
      'self',
      'unsafe-inline',
      'data:',
      'blob:',
      'https://*.cloudflare.com/',
      'https://bundle.js:*',
      'ws://localhost:*/',
    ],
    'img-src': [
      'self',
      'unsafe-inline',
      'data:',
      'blob:',
      'https://*.cloudflare.com/',
      'https://bundle.js:*',
      'ws://localhost:*/',
    ],
    'connect-src': [
      'self',
      'unsafe-inline',
      'data:',
      'blob:',
      `wss://saras-todo-rest-api.herokuapp.com:${process.env.PORT}/`,
      'https://*.cloudflare.com/',
      'https://bundle.js:*',
      'ws://localhost:*/',
    ],
    'load-src': ['blob:'],
  },
};

module.exports = cspConfig;