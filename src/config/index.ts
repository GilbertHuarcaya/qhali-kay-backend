import dotenv from 'dotenv'
dotenv.config()

const all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 8080,

  expiresIn: '24h',

  // Should we populate the DB with sample data?
  seedDB: process.env.NODE_ENV !== 'production',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET_KEY || 's3cr3t_k3y@!!'
  },

  userRoles: ['admin', 'usuario', 'personal']
}

export default all
