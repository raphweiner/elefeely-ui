var elefeely = elefeely || {};

(function () {

  elefeely.SettingsView = Backbone.View.extend({

    template: Handlebars.compile($('#settings-template').html()),

    events: {
      'click #delete-phone': 'deletePhone',
      'click #add-phone': 'addPhone'
    },

    render: function () {
      var phone = elefeely.currentUser.get('phone');
      this.$el.html(this.template({ phone: phone }));

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
            elefeely.currentUser.fetch({
              success: function() {
                window.location.reload(true);
              },
              error: function () {
                window.location.reload(true);
              }
            });
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
          elefeely.currentUser.fetch({
            success: function() {
              window.location.reload(true);
            },
            error: function () {
              window.location.reload(true);
            }
          });
        },
        error: function (response) {
          var errors = response.responseJSON;
          console.log(['errors', errors]);
        }
      });
    }

  });
})();
