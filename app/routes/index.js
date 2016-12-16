import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      people: this.store.findAll('person'),
      newPerson: this.store.createRecord('person')
    });

  },
  afterModel() {
    this.store.createRecord('person');
  },
  actions: {
    savePerson(person) {
      if (person.get('isNew')) {
        this.store.createRecord('person');
      }
      person.save();
    },
  },

});
