db = db.getSiblingDB('admin');
db.createUser({
  user: 'user',
  pwd: 'mongopass',
  roles: [
    { role: 'readWrite', db: 'blog' },
    { role: 'dbAdmin', db: 'blog' }
  ]
});
