module.exports = {
  apps: [
    {
      name: "fp-back",
      script: "dist/main.js",
      cwd: "./apps/server",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "fp-front",
      script: "serve -s . -l 8080",
      cwd: "./apps/web/dist",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
