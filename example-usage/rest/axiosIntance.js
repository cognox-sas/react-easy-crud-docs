import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

let users = [
  { id: 1, name: 'Miguel Cast', email: 'miguel2@outlook.com' },
  { id: 2, name: 'Juan Gonzalez', email: 'jcgonzalez@cognox.com' },
  { id: 3, name: 'Andres Restrepo', email: 'arestrepo@cognox.com' },
];

const mock = new MockAdapter(instance);

mock.onGet('/users').reply(
  200,
  users,
);

mock.onGet(/\/user\/\d+/).reply(config => {
  return [200, users[config.id - 1]]
});

mock.onPost('/user/create').reply(config => {
  const data = JSON.parse(config.data);
  users.push({ id: users.length + 1, ...data });
  return [200, { message: 'OK', result: true }]
});

mock.onPut('/user/update').reply(config => {
  const data = JSON.parse(config.data);
  users = users.map(u => {
    if (u.id.toString() === data.id.toString()) {
      return data;
    }
    return u;
  });
  return [200, { message: 'OK', result: true }]
});

mock.onDelete(/\/user\/delete\/\d+/).reply(config => {
  users = users.filter(u => u.id.toString !== config.id.toString());
  return [200, { message: 'OK', result: true }]
});

export default instance;
