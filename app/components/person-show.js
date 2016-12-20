import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['person-item'],
  classNameBindings: ['isSelectedPerson'],
  isSelectedPerson: computed('selectedPerson', function() {
    if (get(this, 'model') == get(this, 'selectedPerson')) {
      return true;
    } else {
      return false;
    }
  }),
  isSent: computed('model.sent_status', function() {
    if (get(this, 'model.sent_status')) {
      return true;
    } else {
      return false;
    }
  }),
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
