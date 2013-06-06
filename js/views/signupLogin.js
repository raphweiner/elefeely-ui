var elefeely = elefeely || {};

(function () {

  elefeely.SignupLoginView = Backbone.View.extend({

    events: {
      'click #submit-signup-login': 'submitSignupLogin',
      'click .toggle-pill': 'togglePill'
    },

    template: Handlebars.compile($('#signup-login-template').html()),

    render: function () {
      this.$el.html(this.template());

      return this;
    },

    togglePill: function (evt) {
      evt.preventDefault();

      var $currentTarget = $(evt.currentTarget),
          intent = $currentTarget.find('a').text();

      if (!$currentTarget.hasClass('active')) {
        this.$(".toggle-pill").toggleClass("active");
        this.$("#submit-signup-login").text(intent);

        this.clearError('.email');
        this.clearError('.password');

        this.$('#forgot-password').toggle(intent === 'Login');
      }
    },

    submitSignupLogin: function (evt) {
      evt.preventDefault();

      var intent = this.$("#submit-signup-login").text().toLowerCase(),
          email = this.$('#email').val(),
          password = this.$('#password').val(),
          requestUrl = this.requestUrl(intent),
          requestVerb = this.requestVerb(intent);

      this.$("#submit-signup-login").addClass('disabled');
      this.validateInput(email, password);

      if (email && password) {
        $.ajax({
          url: requestUrl,
          type: requestVerb,
          dataType: 'json',
          data: { user: { email: email, password: password } },
          success: function (data) {
            elefeely.setCurrentUser(data);
            Backbone.history.navigate('personal', { trigger: true });
          },
          error: function (response) {
            var errors = response.responseJSON;

            console.log(errors);

            if (errors.email) {
              $('.email').addClass('error');
              $('.email-error').html(errors.email);
            }

            if (errors.password) {
              $('.password').addClass('error');
              $('.password-error').html(errors.password);
            }

            // temporary hack to display 'wrong email/password combination'
            if (errors.error) {
              $('.password').addClass('error');
              $('.password-error').html(errors.error);
            }
          }
        });
      }

      this.$("#submit-signup-login").removeClass('disabled')
    },

    validateInput: function (email, password) {
      if (!email) {
        this.inputError('.email', 'Please enter an email');
      } else {
        this.clearError('.email');
      }

      if (!password) {
        this.inputError('.password', 'Please enter a password');
      } else {
        this.clearError('.password');
      }
    },

    inputError: function (field, text) {
      this.$(field).addClass('error');
      this.$(field + '-error').html(text);
    },

    clearError: function (field) {
      this.$(field).removeClass('error');
      this.$(field + '-error').html('');
    },

    requestUrl: function (intent) {
      if ( intent === 'login' ) {
        return elefeely.apiDirectory.login_url
      } else if (intent === 'signup' ) {
        return elefeely.apiDirectory.users_url
      }
    },

    requestVerb: function (intent) {
      if ( intent === 'login' ) {
        return 'GET'
      } else if (intent === 'signup' ) {
        return 'POST'
      }
    }
  });
})();
