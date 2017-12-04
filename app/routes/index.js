import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person');
  },
  actions: {
    savePerson(name, email) {
      return this.store.createRecord('person', {
        name: name,
        email: email,
      }).save().then(person => {
        return person;
      });
    },
  },

});
