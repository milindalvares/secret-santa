import Component from '@ember/component';
import EmberObject, { computed, observer, get, set } from "@ember/object";

export default Component.extend({
  classNames: ['sending-form'],
  actions: {
    randomize(people, allowWishlisting, message) {
      set(this, 'isSending', true);
      this._randomize(people, allowWishlisting, message);
    },
    reset(people) {
      this._reset(people);
    },
  },
  _randomize(people, allowWishlisting, message) {
    this._reset(people);
    const component = this;
    let payload = [];
    const peopleLength = people.get('length');
    people.sortBy('sortId').forEach((person, index) => {
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
                data["message"] = message;
                if (allowWishlisting) {
                  data["recepient_hash"] = btoa(randModel.get('email'))
                }
                payload.pushObject(data);
                if (index + 1 === peopleLength) {
                  $.ajax({
                  	type: 'POST',
                  	data: {payload: payload},
                  	url: "http://128.199.218.232:89/secretsanta/",
                  	success: function(response) {
                      set(component, 'isSending', false);
                      component.attrs.success;
                  	},
                  	error: function(error) {
                      console.log(error, 'error');
                  	}
                  });
                }
              });
            });

          } else {
            this._randomize(people);
          }
      });
    });
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
