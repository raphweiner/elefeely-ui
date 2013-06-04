var elefeely = elefeely || {};

(function () {

  elefeely.LoginSignupView = Backbone.View.extend({

    events: {
      'click #submit-login-signup': 'submitLoginSignup',
      'click .toggle-pill': 'togglePill'
    },

    template: Handlebars.compile($('#login-signup-template').html()),

    render: function () {
      this.$el.html(this.template());

      return this;
    },

    togglePill: function (e) {
      var target = $(e.currentTarget).find('a').text();

      if (!$(e.currentTarget).hasClass('active')) {
        this.$(".toggle-pill").toggleClass("active");
        this.$("#submit-login-signup").text(target);

        this.clearError('.email');
        this.clearError('.password');

        if (target === 'Login') {
          this.$("#forgot-password").show();
        } else {
          this.$("#forgot-password").hide();
        }
      }
    },

    submitLoginSignup: function () {
      var loginSignup = this.$("#submit-login-signup").text().toLowerCase(),
          email = this.$('#email').val(),
          password = this.$('#password').val(),
          path = loginSignup === 'login' ? '/login' : '/users',
          verb = loginSignup === 'login' ? 'GET' : 'POST';

      this.validateInput(email, password);

      if (email && password) {
        $.ajax({
          url: elefeely.url + path,
          type: verb,
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
              this.$('.email').addClass('error');
              this.$('.email-error').html(errors.email);
            }

            if (errors.password) {
              this.$('.password').addClass('error');
              this.$('.password-error').html(errors.password);
            }

            // temporary hack to display 'wrong email/password combination'
            if (errors.error) {
              this.$('.password').addClass('error');
              this.$('.password-error').html(errors.error);
            }
          }
        });
      }
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
    }
  });
})();
