module.exports = {
  apps: [{
    name: "cst-app",
    script: "npm",
    args: "start", // This will run "next start"
    instances: 1, // Next.js works better with a single instance
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};

