var elefeely = elefeely || {};

(function () {

  elefeely.LoginSignupView = Backbone.View.extend({

    events: {
      'click #create-session': 'createSession'
    },

    template: Handlebars.compile($('#login-signup-template').html()),

    render: function () {
      this.$el.html(this.template());

      return this;
    },

    createSession: function () {
      var email = this.$('#email').val(),
          pass = this.$('#password').val();

      if (!email) {
        this.$('.email').addClass('error');
        this.$('.email-error').html('Please enter an email');
      } else {
        this.$('.email').removeClass('error');
        this.$('.email-error').html('');
      }

      if (!pass) {
        this.$('.pass').addClass('error');
        this.$('.pass-error').html('Please enter a password');
      } else {
        this.$('.pass').removeClass('error');
        this.$('.pass-error').html('');
      }

      if (email && pass) {
        console.log("Make post to sessions#create");
      }

    }
  });
})();
