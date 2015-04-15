




var User = Backbone.Model.extend({});
var templates = {}
var userTypes = {
    customer: 'Покупатель',
    seller: 'Продавец'
};


$(function(){
    templates.modal_1   = $("#modal-1-template").html();
    templates.modal_2   = $("#modal-2-template").html();
    templates.modal_3   = $("#modal-3-template").html();
    templates.modal_1_template = Handlebars.compile(templates.modal_1);
    templates.modal_2_template = Handlebars.compile(templates.modal_2);
    templates.modal_3_template = Handlebars.compile(templates.modal_3);
    templates.modal_1_string = templates.modal_1_template({step: 1});
    templates.modal_2_string = templates.modal_2_template({step: 2});
    templates.modal_3_string = templates.modal_3_template({step: 3});
});



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
    var $modal = $('#modal');
    var $modal_content = $modal.find('.modal-content');

    $('#openModal').on('click', function(){

        $modal_content.html(templates.modal_1_template({step: 1}));
        $modal.modal('show');
    });





    $('body').on('click', '[data-user-type]', function(){
        u.set('type', $(this).data('userType'));
        $modal_content.html(templates.modal_2_template({
            step: 2,
            type: userTypes[u.get('type')]
        }));
    });


    $('body').on('submit', 'form', function(){
        console.log('form is submitted');
        return false;
    });

    //$('#register').on('click', function(){
    //    u.set({
    //        name: $('#nameInput').val(),
    //        email: $('#emailInput').val(),
    //        phone: $('#phoneInput').val()
    //    });
    //    console.log(u.attributes);
    //    $('.modal').modal('hide');
    //    $('.modal-3').modal('show');
    //    return false;
    //});

});


// start new single_modal branch

