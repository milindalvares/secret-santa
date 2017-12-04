import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('send-wishlist', 'Integration | Component | send wishlist', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{send-wishlist}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#send-wishlist}}
      template block text
    {{/send-wishlist}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
