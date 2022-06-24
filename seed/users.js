import { create } from '../models/users.js';

create({
  email: 'a@b.com',
  password: '123',
  name: 'A',
  role: 'user',
  id: '1',
});
create({
  email: 'b@b.com',
  password: '123',
  name: 'B',
  role: 'user',
  id: '2',
});
create({
  email: 'manager@b.com',
  password: '123',
  name: 'Manager',
  role: 'manager',
  id: 'manager',
});
create({
  email: 'admin@b.com',
  password: '123',
  name: 'Admin',
  role: 'admin',
  id: 'admin',
});
