// User Schema
// email
// name
// phone
// books [id]

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
})

const UserModel = mongoose.model("User", UserSchema);

const find = async function (query) {
  const limit = Number(query.limit);
  const skip = Number(query.skip);
  delete query.skip;
  delete query.limit;
  if ( limit && skip !== undefined ) {
    return await UserModel.find(query).limit(limit).skip(skip).populate("books");
  } else {
    return await UserModel.find(query).populate("books");
  }
}

const count = async function (query) {
  return await UserModel.count(query);
}

const findById = async function (id) {
  return await UserModel.findById(id).populate("books");
}

const create = async function (data) {
  const newDoc = new UserModel(data);
  return await newDoc.save();
}

const update = async function (id, data) {
  return await UserModel.findByIdAndUpdate(id, data, {new: true});
}

const deleteOne = async function (id) {
  return await UserModel.findByIdAndDelete(id);
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
  count: count,
};