db = db.getSiblingDB('admin');
db.createUser({
  user: 'user',
  pwd: 'mN5!hG8@pL3#mR6$vK9&wQ2^xJ4',
  roles: [
    { role: 'readWrite', db: 'blog' },
    { role: 'dbAdmin', db: 'blog' }
  ]
});
