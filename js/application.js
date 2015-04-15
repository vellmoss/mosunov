




var User = Backbone.Model.extend({});

var userTypes = {
    customer: 'Покупатель',
    seller: 'Продавец'
};



var Workspace = Backbone.Router.extend({

    routes: {
        "help": "help",
        "search/:a/:b": "search"
    },

    help: function() {
        console.log('Вызвана функция help');
    },

    search: function(a, b) {
        console.log('Вызвана функция с аргументами '+a+' '+b);
    }

});

$(function(){
    router = new Workspace();
    Backbone.history.start();
});


$(function(){
    var u = new User();
    $('[data-user-type]').on('click', function(){
        u.set('type', $(this).data('userType'));
        $('.modal').modal('hide');
        $('.modal-2 .user-type').html(userTypes[u.get('type')]);
        $('.modal-2').modal('show');
        console.log(u.attributes);
    });

    $('#register').on('click', function(){
        u.set({
            name: $('#nameInput').val(),
            email: $('#emailInput').val(),
            phone: $('#phoneInput').val()
        });
        console.log(u.attributes);
        $('.modal').modal('hide');
        $('.modal-3').modal('show');
        return false;
    });

});


// start new single_modal branch

