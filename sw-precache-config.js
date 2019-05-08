module.exports = {
    staticFileGlobs: [
      "build/static/css/**.css",
      "build/static/js/**.js",
      "build/static/media/**.svg",
      "build/index.html"
    ],
    swFilePath: "./build/service-worker.js",
    stripPrefix: "build/",
    handleFetch: false,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com/,
        handler: "networkFirst"
      },
      {
        urlPattern: /\/users\//,
        handler: "fastest",
        options: {
          cache: {
            maxEntries: 10,
            name: "articles-cache"
          }
        }
      }
    ]
  };
  