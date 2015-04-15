



var User = Backbone.Model.extend({});
var templates = {}
var userTypes = {
    customer: 'Покупатель',
    seller: 'Продавец'
};


$(function(){
    templates.modal_1 = Handlebars.compile($("#modal-1-template").html());
    templates.modal_2 = Handlebars.compile($("#modal-2-template").html());
    templates.modal_3 = Handlebars.compile($("#modal-3-template").html());
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
    window.u = new User();
    var $modal = $('#modal');
    var $modal_content = $modal.find('.modal-content');
    var $body = $('body');

    $('#openModal').on('click', function(){

        $modal_content.html(templates.modal_1({step: 1}));
        $modal.modal('show');
    });



    $body.on('submit', '.form-1', function(e){
        var formData = $(this).serializeArray();
        var data = {};
        $.each(formData, function(){
            data[this.name] = this.value
        });
        u.set(data);
        $modal_content.html(templates.modal_2({
            step: 2,
            type: userTypes[u.get('type')]
        }));
        return false;

    });

    $body.on('submit', '#form-2', function(){
        var formData = $(this).serializeArray();
        var data = {};
        $.each(formData, function(){
            data[this.name] = this.value
        });
        u.set(data);
        $modal_content.html(templates.modal_3({
            step: 3
        }));
        return false;
    });


});

