import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person');
  },
  afterModel() {
    this.store.createRecord('person');
  },
  actions: {
    savePerson(person) {
      if (person.get('isNew')) {
        this.store.createRecord('person');
      }
      person.save();
    },
    deletePerson(person) {
      person.destroyRecord();
    },
    randomize(people) {
      this._reset(people);
      people.forEach((person, index) => {
        let randModel = this._getRandomModel(people.filterBy('available').removeObject(person));
        person.set('assigned', randModel.get('name'));
        person.save();

        randModel.set('available', false);
        randModel.save();
      })
    },
    reset(people) {
      this._reset(people);
    },
    makeAssociation(person, associate) {
      person.set('cantDraw', associate);
      associate.set('cantDraw', person);
    }
  },
  _getRandomModel(people) {
    let randNumber = Math.floor(Math.random() * (people.get('length') - 1));
    let randModel = people.objectAt(randNumber);
    console.log(randModel.get('name'));
    return randModel;
  },
  _reset(people) {
    people.forEach((person, index) => {
      person.set('available', true);
      person.set('assigned', null);
      person.set('cantDraw', null);
      person.save();
    });
  }
});
