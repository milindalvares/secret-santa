import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  assigned: DS.attr('string'),
  sortId: DS.attr('number'),
  available: DS.attr('boolean', { defaultValue: true }),
  cantDraw: DS.belongsTo('person'),
  color: DS.attr('string'),
  escapedStyle: computed('color', function() {
    const color = this.get('color');
    return Ember.String.htmlSafe("color:" + color);
  })
});
