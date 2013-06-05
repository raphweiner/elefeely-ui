var elefeely = elefeely || {};

(function () {

  elefeely.SettingsView = Backbone.View.extend({

    template: Handlebars.compile($('#settings-template').html()),

    events: {
      'click #delete-phone': 'deletePhone',
      'click #add-phone': 'addPhone',
      'click #update-email': 'updateEmail'
    },

    render: function () {
      var phone = elefeely.currentUser.get('phone'),
          email = elefeely.currentUser.get('email');
      this.$el.html(this.template({ phone: phone, email: email }));

      return this;
    },

    addPhone: function () {
      var number = this.$('#number').val();

      if ( number.length !== 10 ) {
        this.$('.phone').addClass('error');
        this.$('.phone-error').html('Please enter a 10 digit number');
      } else {
        this.$('.phone').removeClass('error');
        this.$('.phone-error').html('');

        $.ajax({
          url: elefeely.url + '/phones' + '?token=' + $.cookie('token'),
          type: 'POST',
          dataType: 'json',
          data: { number: number },
          success: function (data) {
            window.location.reload(true);
          },
          error: function (response) {
            var errors = response.responseJSON;

            if (errors.number) {
              $('.phone').addClass('error');
              $('.phone-error').html(errors.number);
            }
          }
        });
      }
    },

    deletePhone: function () {
      $.ajax({
        url: elefeely.url + '/phones/me' + '?token=' + $.cookie('token'),
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
          window.location.reload(true);
        },
        error: function (response) {
          window.location.reload(true);
        }
      });
    },

    updateEmail: function () {
      var email = this.$('#email').val();
      $('.email-error').html('');

      $.ajax({
        url: elefeely.url + '/users' + '?token=' + $.cookie('token'),
        type: 'PUT',
        dataType: 'json',
        data: { user: { email: email } },
        success: function (data) {
          $('.email-error').html('<small class="text-success">updated!</small>');
        },
        error: function (response) {
          var errors = response.responseJSON;

          if (errors.email) {
            $('.email').addClass('error');
            $('.email-error').html(errors.email);
          }
        }
      });
    }

  });
})();
