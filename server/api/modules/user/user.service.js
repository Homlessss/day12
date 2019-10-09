const repository = require('./user.repository');

const find = async function (query) {
  // check authentication, check authorization
  
  // validate query
  
  // do business logic

  // persist db
  const data = await repository.find(query);
  const total = await repository.count(query);
  return {
    data: data,
    total: total,
  }
}

const findById = async function (id) {
  return await repository.findById(id);
}

const create = async function (data) {
  if (!data.name || !data.email) {
    throw new Error("Missing input!");
  }
  if (!validateEmail(data.email)) {
    throw new Error("Please enter a valid email!");
  }
  return await repository.create(data);
}

const update = async function (id, data) {
  const existedDoc = await repository.findById(id);
  if (!existedDoc) {
    throw new Error("Entity not found!");
  }
  return await repository.update(id, data);
}

const deleteOne = async function (id) {
  const existedDoc = await repository.findById(id);
  if (!existedDoc) {
    throw new Error("Entity not found!");
  }

  return await repository.delete(id);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
};