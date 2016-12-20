import Ember from 'ember';
import randomColor from 'npm:randomcolor';

const { computed, observer } = Ember;

export default Ember.Component.extend({
  classNames: ['people-list'],
  classNameBindings: ['isSelectingAssociate'],
  savedPeople: computed('model,model.@each', function() {
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
      const color = randomColor();

      selectedPerson.setProperties({
          cantDraw: associate,
          color: color
      });
      selectedPerson.save();
      associate.setProperties({
        cantDraw: selectedPerson,
        color: color
      });
      associate.save();
    },
    deletePerson(person) {
      person.destroyRecord();
    },
    randomize(people) {
      this._randomize(people);
    },
    reset(people) {
      this._reset(people);
    },
  },
  _randomize(people) {
    this._reset(people);
    people.sortBy('sortId').forEach(person => {
      person.get('cantDraw').then(cantDraw => {
          let randModel = this._getRandomModel(people.filterBy('available').removeObject(person).removeObject(cantDraw));
          if (randModel !== undefined) {
            person.set('assigned', randModel.get('name'));
            person.save().then(() => {
              randModel.set('available', false);
              randModel.save().then(() => {
                let data = {};

                data["email"] = person.get('email');
                data["assigned"] = randModel.get('name');

                Ember.$.ajax({
          				type: 'POST',
          				data: data,
          				url: "http://128.199.218.232:89/secretsanta/",
          				success: function(data) {
          					person.set('sent_status', true);
          				},
          				error: function(data) {
          					console.log(data);
          				}
          			});
              });
            });

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
