import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions: {
    newPerson() {
      let model = this.get('store').createRecord('person');
      this.set('model', model);
      this.set('addingPerson', true);
    },
    savePerson(person) {
      console.log('inovked');
      this.get('add-person')(person)
    }
  }
});
