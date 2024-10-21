module.exports = {
  apps: [
    {
      script: "npm start",
    },
  ],

  deploy: {
    production: {
      key: "testkey.pem",
      user: "ubuntu",
      host: "bgwebsite",
      ref: "origin/main",
      repo: "git@github.com:parosh-mahmud/bgwebsite.git",
      path: "/bgwebsite",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};