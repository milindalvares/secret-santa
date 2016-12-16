import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  assigned: DS.attr('string'),
  available: DS.attr('boolean', { defaultValue: true }),
  cantDraw: DS.belongsTo('person')
});
