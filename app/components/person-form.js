import Component from '@ember/component';
import EmberObject, { get, set, computed } from "@ember/object";
import { on } from "@ember/object/evented"
import { validator, buildValidations } from 'ember-cp-validations';

import { inject as service } from "@ember/service";

const Validations = buildValidations({
  'email': [
    validator('presence', true),
    validator('format', { type: 'email',description: 'Email' })
  ],
  'name': [
    validator('presence', true)
  ]
});

export default Component.extend(Validations, {
  classNames: ['person-form'],
  showSendLink: computed('modelCount', function() {
    if (get(this, 'modelCount') > 1) {
      return true;
    } else {
      return false;
    }
  }),
  name: '',
  email: '',
  actions: {
    savePerson(name, email) {
      this.attrs.savePerson(name, email).then((person) => {
        set(this, 'name', null);
        set(this, 'email', null);
      });
    }
  }
});
