import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

let users = [
  { id: 1, name: 'Miguel Cast', email: 'miguel2@outlook.com', introductionMd: 'Miguel **Cast**', introductionHtml: '' },
  { id: 2, name: 'Juan Gonzalez', email: 'jcgonzalez@cognox.com', introductionMd: '', introductionHtml: '<h1>Juan Carlos Gonzalez</h1>'},
  { id: 3, name: 'Andres Restrepo', email: 'arestrepo@cognox.com', introductionMd: '## Andres', introductionHtml: '<h2>Andres</h2>' },
];

const mock = new MockAdapter(instance);

mock.onGet('/users').reply(
  200,
  users,
);

mock.onGet(/\/user\/\d+/).reply(config => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([200, users[config.id - 1]]);
    }, 1000);
  });
});

mock.onPost('/user/create').reply(config => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      const data = JSON.parse(config.data);
      users.push({ id: users.length + 1, ...data });
      resolve([200, { message: 'OK', result: true }]);
    }, 1000);
  });
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
