import Ember from 'ember';
import randomColor from 'npm:randomcolor';

const { computed, observer, get } = Ember;
const url = "http://128.199.218.232:89/secretsanta/";

export default Ember.Component.extend({
  mailer: Ember.inject.service('ajax-mailer'),
  classNames: ['people-list'],
  classNameBindings: ['isSelectingAssociate'],
  savedPeople: computed('model,model.@each', function() {
    return this.get('model').filterBy('name');
  }),
  isSelectingAssociate: computed('selectedPerson', function() {
    if (get(this, 'selectedPerson')) {
      return true;
    } else {
      return false;
    }
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

    },
    selectAssociate(associate) {
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
      associate.save().then(() => {
        this.set('selectedPerson', null);
      });

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
    cancelAssociation(person) {
      this.set('selectedPerson', null);
      person.get('cantDraw').then(association => {
        if (association) {
          association.set('cantDraw', null);
          association.set('color', null);
        }
        person.set('cantDraw', null);
        person.set('color', null);
      })
    }
  },
  _randomize(people) {
    this._reset(people);
    people.sortBy('sortId').forEach(person => {
      person.set('sent_status', false);
      person.get('cantDraw').then(cantDraw => {
          let randModel = this._getRandomModel(people.filterBy('available').removeObject(person).removeObject(cantDraw));
          if (randModel !== undefined) {
            randModel.set('available', false);
            person.set('assigned', randModel.get('name'));
            person.save().then(() => {
              randModel.save().then(() => {
                let data = {};
                data["name"] = person.get('name');
                data["email"] = person.get('email');
                data["assigned"] = randModel.get('name');
                let promise = this.get('mailer').sendMail(data,url);
                promise.then(function(value) {
                  console.log(value);
                }).catch(function(error) {
                  console.log(error);
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
