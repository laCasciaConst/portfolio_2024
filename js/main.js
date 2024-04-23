// VARIABLES GLOBALES


// DOM READY
$(document).ready(function () {
    console.log("ready");

    $('section').easyDrag({
        'handle': '.desktop-folder__title-background',
        'container': $('.main'),
        cursor: 'move', // le curseur affiché au survol, mettre '' pour pas ne y toucher
        ontop: true, // si l'élément draggé doit venir au 1er plan ou pas
        clickable: true // si l'élément doit aussi être cliquable
    });

    $('.about').on('click', function () {
        $(".computer").attr("src", "../src/img/computer_click.svg");
        $('#about').show();
        $('#about').removeClass('hidden');
        $('.abt').css({backgroundColor:"#0D0907", color:"#f5f5f5"});
    });

    $('.projects').on('click', function () {
        $('#projects').show();
        $('#projects').removeClass('hidden');
        $(".memory1").attr("src", "../src/img/memory_click.svg");
        $('.proj').css({backgroundColor:"#0D0907", color:"#f5f5f5"});
    });

    $('.posts').on('click', function () {
        $(".write").attr("src", "../src/img/write_click.svg");
        $('#posts').show();
        $('#posts').removeClass('hidden');
        $('.pst').css({backgroundColor:"#0D0907", color:"#f5f5f5"});
    });

    $('button.memory-close').on('click', function () {
        console.log('click close memory');
        // let parent = $(this).parent().parent()
        $(this).parent().parent().addClass('hidden');
        $(".memory1").attr("src", "../src/img/memory.svg");
        $('.proj').css({backgroundColor:"#f5f5f5", color:"#0D0907"}).stop();
    });

    $('button.computer-close').on('click', function () {
        console.log('click close computer');
        $(this).parent().parent().addClass('hidden');
        $(".computer").attr("src", "../src/img/computer.svg");
        $('.abt').css({backgroundColor:"#f5f5f5", color:"#0D0907"}).stop();
    });

    $('button.post-close').on('click', function () {
        console.log('click close write');
        $(this).parent().parent().addClass('hidden');
        $(".write").attr("src", "../src/img/write.svg");
        $('.pst').css({backgroundColor:"#f5f5f5", color:"#0D0907"}).stop();
    });

    $('button.close').on('click', function () {
        console.log('click close');
        $(this).parent().parent().addClass('hidden');
    });
    
    $(document).ready(function() {
        $('section').click(function () {
            $(this).css('z-index', '99');
            // 클릭된 섹션의 .solid div를 보이게 설정
            $(this).find('.solid').css('display', 'block');

            $('section').not(this).each(function() {
                $(this).css('z-index', '2');
                $(this).find('.solid').css('display', 'none');
            });
        });
    }); 
});

(function () {
    //Functions that handle the clock
    //Change date into correct apple format
    function formatDate(day, hour, min) {
        var parseHour = String(hour).padStart(2, '0'),
            parseMin = String(min).padStart(2, '0');
        return day + ' ' + parseHour + ':' + parseMin;
    }

    var timeout; // 전역 변수로 timeout 선언

    function updateTime() {
        var d = new Date(),
            days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        document.querySelector('.time').innerHTML = formatDate(days[d.getDay()], d.getHours(), d.getMinutes());
        //Check every half a second if the time has changed
        clearTimeout(timeout); // 이전 타이머 해제
        timeout = setTimeout(updateTime, 500);
    }
    updateTime();
})();

$('.header__item').mouseenter(function () {
    $(this).children('.lnb').stop().show().stop();
});
$('.header__item').mouseleave(function () {
    $(this).children('.lnb').stop().hide().stop();
});

// FUNCTIONS EXTERNES
