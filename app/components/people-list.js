import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  savedPeople: computed('model', function() {
    return this.get('model').filterBy('name');
  }),
  actions: {
    savePerson(person) {
      if (person.get('isNew')) {
        this.store.createRecord('person');
      }
      person.save();
    },
    selectPerson(person) {
      this.set('selectedPerson', person);
      this.set('isSelectingAssociate', true);
    },
    selectAssociate(associate) {
      this.set('isSelectingAssociate', false);
      const selectedPerson = this.get('selectedPerson');

      selectedPerson.set('cantDraw', associate).save();
      associate.set('cantDraw', selectedPerson).save();
    },
    deletePerson(person) {
      person.destroyRecord();
    },
    randomize(people) {
      people.filterBy('name')
      this._randomize(people);
    },
    reset(people) {
      this._reset(people);
    },
    makeAssociation(person, associate) {
      person.set('cantDraw', associate);
      associate.set('cantDraw', person);
    }
  },
  _randomize(people) {
    this._reset(people);
    people.sortBy('sortId').forEach(person => {
      person.get('cantDraw').then(assigned => {
          let randModel = this._getRandomModel(people.filterBy('available').removeObject(person).removeObject(assigned));
          if (randModel !== undefined) {
            person.set('assigned', randModel.get('name'));
            person.save();

            randModel.set('available', false);
            randModel.save();
          } else {
            this._randomize(people);
          }
      });


    })
  },
  _getRandomModel(people) {
    let randNumber = Math.floor(Math.random() * (people.get('length') - 1));
    let randModel = people.objectAt(randNumber);
    return randModel;
  },
  _reset(people) {
    people.forEach((person, index) => {
      person.set('available', true);
      person.set('sortId', Math.floor(Math.random() * 500));
    });
  },
});
