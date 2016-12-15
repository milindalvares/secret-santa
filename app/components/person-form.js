import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    savePerson(person) {
      this.get('save-person')(person);
    }
  }
});
