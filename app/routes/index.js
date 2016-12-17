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
      person.save();
      this.store.createRecord('person');
      },

    sendMail(people) {
    var peopleData = [];
    people.forEach((item) => {
        if(!people.hasOwnProperty(item))
        {
          peopleData.push({"name" : item.get('name') , "email" : item.get('email')});
        }
    });
    $.ajax({
      type: "POST",
      url: "http://localhost:4200/mailer",
      contentType: 'application/json',
      data:JSON.stringify(peopleData)
    });
      this.transitionTo('/');
    }
}
});
