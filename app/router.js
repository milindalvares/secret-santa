import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('send');
  this.route('send-wishlist', { path: 'send-wishlist/:email'});

  this.route('select-pairs');
  this.route('success');
});

export default Router;
