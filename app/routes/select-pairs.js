import Route from '@ember/routing/route';

export default Route.extend({
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
