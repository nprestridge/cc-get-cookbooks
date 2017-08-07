import Config from './src/Config';
import CookbookController from './src/CookbookController';
import RecipeController from './src/RecipeController';

const config = Config.load();
const cookbook = new CookbookController(config);
const recipe = new RecipeController(config);

/**
 * A map of lambda handlers to controller methods
 * @return {Function} handler function
 */
const handlers = {
  createCookbook: function handler(event) {
    return cookbook.create(event);
  },
  deleteCookbook: function handler(event) {
    return cookbook.delete(event);
  },
  getCookbooks: function handler(event) {
    return cookbook.getAll(event);
  },
  getCookbookRecipes: function handler(event) {
    return recipe.getByCookbook(event);
  },
};

module.exports = {

  /**
   * Generic handler to execute controller methods
   * @param  {string}   handlerName   Method name
   * @param  {Object}   event         JSON event parameters
   * @param  {Object}   context       Lambda context object
   * @param  {Function} callback      Callback funcion
   * @return {Promise}
   */
  async execute(handlerName, event, context, callback) {
    try {
      const response = await handlers[handlerName](event);
      return callback(null, response);
    } catch (e) {
      console.error(`FATAL Caught: ${JSON.stringify(e)}`); // eslint-disable-line no-console
      return callback(e);
    }
  },

  async createCookbook(event, context, callback) {
    module.exports.execute('createCookbook', event, context, callback);
  },

  async deleteCookbook(event, context, callback) {
    module.exports.execute('deleteCookbook', event, context, callback);
  },

  async getCookbooks(event, context, callback) {
    module.exports.execute('getCookbooks', event, context, callback);
  },

  async getCookbookRecipes(event, context, callback) {
    module.exports.execute('getCookbookRecipes', event, context, callback);
  },

};
