import Ember from 'ember';

export default Ember.Service.extend({
  defaultType: 'POST',
  _sendMail(data, url, type) {
    return Ember.$.ajax({
      type: type,
      data: data,
      url:  url
    });
  },
  sendMail(data, url, type) {
      type = type || this.get('defaultType');
      return new Promise( (resolve,reject) => {
        this._sendMail(data, url, type).then(function(data){
            resolve("Success");
        },function() {
            reject(new Error("Sending failed"));
        });
      });
  }
});
