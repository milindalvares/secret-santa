import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['person-form'],
  actions: {
    savePerson(person) {
      this.get('save-person')(person);
    }
  }
});
