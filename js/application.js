

// что-то типа доморощенного "Model" и глобальных переменных ---------------------------------------------

var User = Backbone.Model.extend({});                                   // создаю класс модели
var templates = {};                                                     // шаблоны сохранять там буду
var userTypes = {                                                       // хэш типов юзеров
    customer: 'Покупатель',
    seller: 'Продавец'
};

// что-то типа доморощенного "View" ----------------------------------------------------------------------
$(function(){
    templates.modal_1 = Handlebars.compile($("#modal-1-template").html());      // шаблон 1-й мод. формы
    templates.modal_2 = Handlebars.compile($("#modal-2-template").html());      // -- 2 --
    templates.modal_3 = Handlebars.compile($("#modal-3-template").html());      // -- 3 --
});

// что-то типа доморощенного "Controller" ----------------------------------------------------------------

$(function(){
    window.u = new User();                                              // создаю экз. модели
    var $modal = $('#modal');                                           // сохраняю диву мод. окошка, в который шабл. буду помещать
    var $modal_content = $modal.find('.modal-content');                 // дива контента шаблона там будет
    var $body = $('body');                                              // сохр. селектор body-tag

    $body.on('click', '#openFirstModal, #form2-a', function(){
        $modal_content.html(templates.modal_1({step: 1}));              // вызов 1-го мод. элем. без всякого роута 1-й шаб.
        $modal.modal('show');
    });



    $body.on('submit', '.form-1', function(){                           // определяю тип юзера
        var formData = $(this).serializeArray();                        // одной из 2-х форм из 1-го модального окна
        var data = {};
        $.each(formData, function(){
            data[this.name] = this.value;
        });
        u.set(data);                                                    // сохраняю тип юзера в экз. модели данных
        $modal_content.html(templates.modal_2({                         // активизирую 2-е мод. окно на основе
            step: 2,                                                    // контента 2-го шаблона и парам-ов step,type
            type: userTypes[u.get('type')]                              // извлекемых из экз. модели даннх u
        }));
        return false;                                                   // чтобы по submit не улетала на 404
    });

    $body.on('submit', '#form-2', function(){                           // собираю данные из 2-го активированного
        var formData = $(this).serializeArray();                        // мод. окна
        var data = {};
        var noerr = true;                                               // флаг валидности поля(-ей)
        $.each(formData, function(){
            data[this.name] = this.value;
            if(data[this.name]=='name'){                                // проверка фио на соответствие шаблону
                this.value.replace(/.*(?=#[^\s]*$)/, '');               // /^[a-zA-Z0-9а-яА-Я]/
                if(this.value.length == 0) noerr = false;
//                console.log('имени: '+this.name+'   '+this.value);
            }
            if(data[this.name]=='email'){                               // проверка email на заполненность: val().length !=0
                if(length(this.value) == 0) noerr = false;
                console.log('для email: '+this.name+'   '+this.value);
            }
            if(data[this.name]=='phone'){                               // проверка телефона на соответствие шаблону
                if(length(this.value) == 0) noerr = false;
//                console.log('для тел.: '+this.name+'   '+this.value);
            }
        });
        if(noerr) u.set(data);                                          // помещаю их в экз. модели данных
        $modal_content.html(templates.modal_3({                         // активизирую 3-е мод. окно на основе
            step: 3                                                     // контента 3-го шаблона и парам-а step
        }));
        return false;                                                   // чтобы по submit не улетала на 404
    });

        $body.on('click', '.close-modal', function(){                   // по любой из ссылок 3-го мод. окна
        $('#modal').modal('hide');                                      // гашу его
    });

});

