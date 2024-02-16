const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  const cfg = require('./config.json');
  const envCfg = cfg[env];
  console.log(envCfg);

  Object.keys(envCfg).forEach(key => {
    process.env[key] = envCfg[key];
  });
}
