import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('person');
  },
  actions: {
    sendMore(model) {
      model.invoke('destroyRecord')
      this.transitionTo('index');
    }
  }
});
