import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('person');
  },
  actions: {
    transitionToSuccess() {
      this.transitionTo('success');
    }
  }
});
