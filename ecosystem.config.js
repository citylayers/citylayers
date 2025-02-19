module.exports = {
  apps: [
    {
      name: 'citylayers',
      script: 'dist/server/app.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        DATABASE_URL: 'mongodb://localhost:27017/mydatabase'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        DATABASE_URL: 'mongodb://localhost:27017/mydatabase',
        DOMAIN: 'localhost',
        NEO4J_USER: 'neo4j',
        NEO4J_PWD: '6ty6zc9rtk5ETSjQ3TUROHNv1UzNvsBHXgW8kd7WuRw',
        NEO4J_URI: 'neo4j+s://64a663c2.databases.neo4j.io'
      }
    }
  ]
};