import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'model.email': [
    validator('presence', true),
    validator('format', { type: 'email',description: 'Email' })
  ],
  'model.name': [
    validator('presence', true)
  ]
});
export default Ember.Component.extend(Validations,{
  classNames: ['person-form'],
  actions: {
    savePerson(person) {
      this.get('save-person')(person);
    }
  }
});
