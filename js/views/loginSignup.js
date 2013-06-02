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
            var loginSignup = this.$("#submit-login-signup").text().toLowerCase(),
                email = this.$('#email').val(),
                password = this.$('#password').val(),
                path = loginSignup === 'login' ? '/sessions' : '/users';

            this.validateInput(email, password);

            if (email && password) {
                $.ajax({
                    // http://elefeely-api.herokuapp.com
                    url: 'http://localhost:3000' + path,
                    type: 'POST',
                    dataType: 'json',
                    data: { user: { email: email, password: password } },
                    success: function (data) {
                        window.location.replace('#');
                    },
                    error: function (response) {
                        var errors = response.responseJSON;

                        if (errors.email) {
                            $('.email').addClass('error');
                            $('.email-error').html(errors.email);
                        }

                        if (errors.password) {
                            $('.password').addClass('error');
                            $('.password-error').html(errors.password);
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
