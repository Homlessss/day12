const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  author: String,
});

const BookModel = mongoose.model('Book', BookSchema);

const find = async function (query) {
  const limit = Number(query.limit);
  const skip = Number(query.skip);
  delete query.skip;
  delete query.limit;
  if ( limit && skip !== undefined ) {
    return await UserModel.find(query).limit(limit).skip(skip);
  } else {
    return await UserModel.find(query);
  }
}

const findById = async function (id) {
  return await BookModel.findById(id);
}

const create = async function (data) {
  const newDocument = new BookModel(data);
  return await newDocument.save();
}

const update = async function (id , data) {
  return await BookModel.findByIdAndUpdate(id, {$set: data}, {new: true});
}

const deleteOne = async function (id) {
  return await BookModel.findByIdAndDelete(id);
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
};


