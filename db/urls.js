const db = require('./connection');
const Joi = require('joi');
const urls = db.get('urls');

const schema = Joi.object().keys({
  name: Joi.string().token().min(1).max(100).required(),
  url: Joi.string().uri({
    scheme: [
      /https?/
    ]
  })
}).with('name', 'url');


async function find(name) {
  return urls.findOne({
    name: name
  });
}


async function create(almostPuny) {
  const result = Joi.validate(almostPuny, schema);
  if(result.error === null) {
    const url = await urls.findOne({
      name: almostPuny.name
    });
    if(!url){
      return urls.insert(almostPuny);
    } else {
      return Promise.reject({
        isJoi: true,
        details: [{
          message: 'Short name is already in use'
        }]
      });
    }

  } else {
    return Promise.reject(result.error);
  }
};

module.exports = {
  create,
  find
};
