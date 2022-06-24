import { create } from '../models/users.js';

create({
  email: 'a@b.com',
  password: '123',
  name: 'A',
  role: 'user',
});
create({
  email: 'b@b.com',
  password: '123',
  name: 'B',
  role: 'user',
});
create({
  email: 'manager@b.com',
  password: '123',
  name: 'Manager',
  role: 'manager',
});
create({
  email: 'admin@b.com',
  password: '123',
  name: 'Admin',
  role: 'admin',
});
