// Данная функция будет вызвана один раз после полной загрузки страницы.
// Символ "$" используется чтобы показать, что вызывается JQuery функция
$(function() {

    //! Fixed header (Фиксированный хэдер)
    
    // Сохраняем в переменную элемент с ID "header"
    var header = $("header");

    // Получаем высоту элемента с ID "intro"
    var introH = $("#intro").innerHeight();

    // Создаём переменную для хранения проскроленного расстояния
    var scrollOffset = $(window).scrollTop();

    // Вызываем функцию, показывающую фиксированный хэдер при достаточном расстоянии прокрутки
    checkScroll(scrollOffset)

    // Привязываем к объекту window обработчик событий, который при каждом скроле страницы будет вызывать заданную функцию
    $(window).on("scroll", function() {

        // Обновляем расстояние прокрутки, извлекая из объекта window (this) значение текущего верха страницы на экране
        scrollOffset = $(this).scrollTop();

        // Вызываем функцию, показывающую фиксированный хэдер при достаточном расстоянии прокрутки
        checkScroll(scrollOffset);
    })

    // Функция, показывающая фиксированный хэдер при достаточном расстоянии прокрутки
    function checkScroll(scrollOffset) {

        // Если расстояние прокрутки больше или равно высоте блока intro
        if (scrollOffset + 100 >= introH) {

            // Устанавливаем для header класс "fixed"
            header.addClass("fixed");
        }

        // Иначе
        else {

            // Удаляем у header класс "fixed"
            header.removeClass("fixed");
        }
    }

    //! Smooth scroll (Плавная прокрутка)

    // Наблюдаем на атрибутом data-scroll у элементов и при клике на элемент с таким аттрибутом вызываем функцию,
    // передавая ей объект события event
    $("[data-scroll]").on("click", function(event) {

        // Отменяем стандартное действие по-умолчанию при нажатии на ссылку
        event.preventDefault();

        // Получаем значение, записанное в атрибут data-scroll у данного элемента
        var blockId = $(this).data("scroll");

        // Получаем расстояние от верха страницы для элемента с полученным выше ID (цель назначения для прокрутки)
        var blockOffset = $(blockId).offset().top;

        // Удаляем у всех ссылок с ID nav класс active
        $("#nav a").removeClass("active");

        // Добавляем к нажатому элементу класс active
        $(this).addClass("active");

        // Создаём анимацию плавного скроллинга до заданной позиции blockOffset
        // (Плавно меняем значение scrollTop для html и body)
        // (Время прокрутки - 500 мс)
        $("html, body").animate({
            scrollTop: blockOffset - 50
        }, 500);

        // Скрываем бургер-меню (т.к. целевой блок уже выбран)
        $("#nav").removeClass("active");
        $("#nav_toggle").removeClass("active");
    })

    //! Menu nav toggle (Бургер-меню)

    // Отслеживаем клики на кнопку с ID nav_toggle и при нажатии на неё выполняем функцию, передавая ей объект события event
    $("#nav_toggle").on("click", function(event) {

        // Отменяем стандартное действие по-умолчанию при нажатии на кнопку
        event.preventDefault();

        // Добавляем или убираем к данному элементу класс active
        $(this).toggleClass("active");

        // Добавляем или убираем к блоку с ID nav класс active
        $("#nav").toggleClass("active");
    });

    //! Collapse (Раскрытие строк в блоке с описанием деятельности)

    // При нажатии на элемент с атрибутом data-collapse выполняем функцию, передавая ей объект события event
    $("[data-collapse]").on("click", function(event) {

        // Отменяем стандартное действие по-умолчанию при нажатии на элемент
        event.preventDefault();

        // Получаем ссылку на родительский элемент данного элемента
        var parentElement = $(this).parent()

        // Добавляем или удаляем у родительского элемента класс active
        $(parentElement).toggleClass("active");
    });

    //! Slider (Слайдер)

    // Привязываем к элементу с атрибутом data-slider слайдер Slick с некоторыми опциями
    $("[data-slider]").slick({

        // Делаем слайдер бесконечным
        infinity: true,

        // Показываем по одному отзыву
        slidesToShow: 1,

        // Скролим по одному слайду
        slideToScroll: 1
    });
});





