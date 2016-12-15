import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person');
  },
  afterModel() {
    this.store.createRecord('person');
  },
  actions: {
    savePerson(person) {
      person.save();
      this.store.createRecord('person');
    }
  }
})
