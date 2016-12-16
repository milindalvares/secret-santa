import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete(model) {
      this.get('delete-person')(model)
    },
    edit() {
      this.set('isEditing', true);
    },
    savePerson(model) {
      this.set('isEditing', false);
      this.get('save-person')(model);
    },
    selectPerson(person) {
      this.get('select-person')(person);
    },
    selectAssociate(person) {
      this.get('select-associate')(person);
    }
  }
});
