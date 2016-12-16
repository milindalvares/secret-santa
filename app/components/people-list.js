import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectPerson(person) {
      this.set('selectedPerson', person);
      this.set('isSelectingAssociate', true);
    },
    selectAssociate(associate) {
      this.set('isSelectingAssociate', false);
      const selectedPerson = this.get('selectedPerson');
      this.get('make-association')(selectedPerson, associate);
    }
   }
});
