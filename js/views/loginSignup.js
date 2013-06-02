var elefeely = elefeely || {};

(function () {

    elefeely.LoginSignupView = Backbone.View.extend({

        events: {
            'click #submit-login-signup': 'submitLoginSignup',
            'click .toggle-pill': 'togglePill',
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
            }
        },

        submitLoginSignup: function () {
            var intention = this.$("#submit-login-signup").text().toLowerCase(),
                email = this.$('#email').val(),
                password = this.$('#password').val(),
                path = intention === 'login' ? '/sessions' : '/users';

            if (!email) {
                this.$('.email').addClass('error');
                this.$('.email-error').html('Please enter an email');
            } else {
                this.$('.email').removeClass('error');
                this.$('.email-error').html('');
            }

            if (!password) {
                this.$('.pass').addClass('error');
                this.$('.pass-error').html('Please enter a password');
            } else {
                this.$('.pass').removeClass('error');
                this.$('.pass-error').html('');
            }

            if (email && password) {
                $.ajax({
                    // http://elefeely-api.herokuapp.com
                    url: 'http://localhost:3000' + path,
                    type: 'POST',
                    dataType: 'json',
                    data: { user: { email: email, password: password } },
                    success: function (data) {
                        console.log(["login request data", data]);

                        if (data.error) {
                            $('.alert-error').text(data.error.text).show();
                        } else {
                            window.location.replace('#');
                        }
                    }
                });
                console.log("Make post to sessions#create");
            }
        }
    });
})();
