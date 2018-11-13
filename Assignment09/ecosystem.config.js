module.exports = {
  apps : [{
    name: 'API',
    script: 'week9.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    // env: {
    //   NODE_ENV: 'development'
    // },
    env: {
      NODE_ENV: 'development',
      AWSRDS_EP: 'yufu.cbyumywtsktv.us-east-2.rds.amazonaws.com',
      AWSRDS_PW: 'FIsh04329',
      PHOTON_ID: '300042000947373034353237',
      PHOTON_TOKEN: '77d870d9a8e370250a99a18eb2db0c9626fcba77'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
