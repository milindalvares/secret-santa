import Component from '@ember/component';
import EmberObject, { get, set } from "@ember/object";

export default Component.extend({
  classNames: ['send-wishlist'],
  actions: {
    send(message, recepient) {
      set(this, 'sending', true);
      const component = this;
      let data = {};
      data["recipient"] = atob(recepient);
      data["message"] = message;


      $.ajax({
        type: 'POST',
        data: data,
        url: "http://128.199.218.232:89/secretsanta-wishlist/",
        success: function(data) {
          set(component, 'sending', false);
          set(component, 'message', null);
        },
        error: function(data) {
          console.log(data);
        }
      });
    }
  }
});
