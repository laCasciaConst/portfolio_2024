// VARIABLES GLOBALES

// DOM READY
$(document).ready(function () {
  console.log("ready");

  updateElementWidth();
  $(window).on("resize", updateElementWidth);

  function updateElementWidth() {
    var windowWidth = $(window).width(); // 현재 창의 너비를 저장
    var vw = windowWidth / 120;
    var vh = $(window).height() / 100;
    var rem = parseFloat($("html").css("font-size"));
    var width = 0; // width 변수를 초기화
    var images = $("li.first-nav__icon img");

    console.log(
      "vw:",
      vw,
      "vh:",
      vh,
      "rem:",
      rem,
      "window width:",
      windowWidth
    );

    if (windowWidth >= 800 && windowWidth < 1360) {
      var width = (vw * vh * rem) / 3 / 6;
      console.log(
        "vw:",
        vw,
        "vh:",
        vh,
        "rem:",
        rem,
        "width:",
        "calculated img width:",
        width
      );

      images
        .each(function () {
          $(this).css({
            width: width + "px",
            height: "auto",
          });
        })
        .attr("src", function () {
          return $(this).attr("src");
        });
    } else if (windowWidth > 1360) {
      console.log("The window width is 1360 or more.");
      $(".first-nav__title").css("font-size", "1.5vw");
      var width = (vw * vh * rem) / 3 / 8.7;
      console.log(
        "vw:",
        vw,
        "vh:",
        vh,
        "rem:",
        rem,
        "width:",
        "calculated img width:",
        width
      );

      images.each(function () {
        $(this).css({
          width: width + "px",
          height: "auto",
        });
      });
    } else {
      console.log("The window width is less than 800.");
      var width = (vw * vh * rem) / 3 / 2;
      console.log(
        "vw:",
        vw,
        "vh:",
        vh,
        "rem:",
        rem,
        "width:",
        "calculated img width:",
        width
      );

      images.each(function () {
        $(this).css({
          width: width + "px",
          height: "auto",
        });
      });
    }
  }

  $(window).resize(function () {
    console.log("Resized");
  });

  var zIndexCounter = 5;

  $(".posts").on("click", function () {
    $(".write").attr("src", "./src/img/write_click.svg");
    $("#portfolio_intrd").css("z-index", "3");
    if ($("#posts").hasClass("hidden")) {
      $("#posts")
        .removeClass("hidden")
        .css("z-index", zIndexCounter + 9);
      zIndexCounter++;
    } else {
      var currentZIndex = parseInt($("#posts").css("z-index"), 10);
      $("#posts").css("z-index", currentZIndex + 9);
    }
    if (zIndexCounter > 97) {
      zIndexCounter = 10;
    }
    $(".desktop-folder")
      .not("#posts", "#portfolio_intrd")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });
    $(".pst").css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
  });

  $(".edit").on("click", function () {
    $("#portfolio_intrd").css("z-index", "3");
    if ($("#edit").hasClass("hidden")) {
      $("#edit")
        .removeClass("hidden")
        .css("z-index", zIndexCounter + 9);
      zIndexCounter++;
    } else {
      var currentZIndex = parseInt($("#edit").css("z-index"), 10);
      $("#edit").css("z-index", currentZIndex + 9);
    }
    $(".desktop-folder")
      .not("#edit", "#portfolio_intrd")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });
  });

  $(".portf22").on("click", function () {
    $("#portfolio_intrd").css("z-index", "3");
    $("#projects").css("z-index", "98");
    if ($("#portf22").hasClass("hidden")) {
      $("#portf22").removeClass("hidden").css("z-index", "99");

      zIndexCounter++;
    } else {
      var currentZIndex = parseInt($("#portf22").css("z-index"), 10);
      $("#portf22").css("z-index", currentZIndex + 9);
    }

    $(".desktop-folder")
      .not("#portf22", "#portfolio_intrd", "#projects")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });
  });

  $(".projects").on("click", function () {
    $(".memory1").attr("src", "./src/img/memory_click.svg");
    $("#portfolio_intrd").css("z-index", "3");
    if ($("#projects").hasClass("hidden")) {
      $("#projects")
        .removeClass("hidden")
        .css("z-index", zIndexCounter + 9);
      zIndexCounter++;
    } else {
      var currentZIndex = parseInt($("#projects").css("z-index"), 10);
      $("#projects").css("z-index", currentZIndex + 9);
    }
    if (zIndexCounter > 97) {
      zIndexCounter = 10;
    }
    $(".desktop-folder")
      .not("#projects", "#portfolio_intrd")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });
    $(".proj").css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
  });

  $(".about").on("click", function () {
    $(".computer").attr("src", "./src/img/computer_click.svg");
    $("#portfolio_intrd").css("z-index", "3");
    if ($("#about").hasClass("hidden")) {
      $("#about")
        .removeClass("hidden")
        .css("z-index", zIndexCounter + 9);
      zIndexCounter++;
    } else {
      var currentZIndex = parseInt($("#about").css("z-index"), 10);
      $("#about").css("z-index", currentZIndex + 9);
    }
    if (zIndexCounter > 95) {
      zIndexCounter = 10;
    }
    $(".desktop-folder")
      .not("#about", "#portfolio_intrd")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });
    $(".abt").css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
  });

  $("button.memory-close").on("click", function () {
    console.log("click close memory");
    // let parent = $(this).parent().parent()
    $(this).parent().parent().addClass("hidden");
    $(".memory1").attr("src", "./src/img/memory.svg");
    $(".proj").css({ backgroundColor: "#f5f5f5", color: "#0D0907" }).stop();
  });

  $("button.computer-close").on("click", function () {
    console.log("click close computer");
    $(this).parent().parent().addClass("hidden");
    $(".computer").attr("src", "./src/img/computer.svg");
    $(".abt").css({ backgroundColor: "#f5f5f5", color: "#0D0907" }).stop();
  });

  $("button.post-close").on("click", function () {
    console.log("click close write");
    $(this).parent().parent().addClass("hidden");
    $(".write").attr("src", "./src/img/write.svg");
    $(".pst").css({ backgroundColor: "#f5f5f5", color: "#0D0907" }).stop();
  });

  $("button.close").on("click", function () {
    console.log("click close");
    $(this).parent().parent().addClass("hidden");
  });

  $("section").click(function (event) {
    $(this).css("z-index", "99");
    $(this).find(".solid").css("display", "block");

    $("section")
        .not(this)
        .each(function () {
            $(this).css("z-index", "5");
            $(this).find(".solid").css("display", "none");
        });

    if ($(event.target).closest(".portf22").length > 0) {
        $("#portf22").css("z-index", "101");
    }
});

  $("section").easyDrag({
    handle: ".desktop-folder__title",
    container: $(".main"),
    cursor: "move", // le curseur affiché au survol, mettre '' pour pas ne y toucher
    ontop: true, // si l'élément draggé doit venir au 1er plan ou pas
    clickable: true, // si l'élément doit aussi être cliquable
  });
  
  $(".desktop-folder__title").on("dragstart", function (event) {
    var $parentSection = $(this).parent();
    $parentSection.data("original-zindex", $parentSection.css("z-index"));
    $parentSection.css("z-index", 999);
    event.stopPropagation();  // 중요: 이벤트 전파 중지
});

$(".desktop-folder__title").on("dragend", function (event) {
    var $parentSection = $(this).parent();
    $parentSection.css("z-index", $parentSection.data("original-zindex"));
    event.stopPropagation();  // 중요: 이벤트 전파 중지
});

  $("[data-tip]")
    .mouseenter(function (e) {
      $("#tooltip")
        .text($(this).attr("data-tip"))
        .css({
          position: "absolute",
          display: "block",
          left: e.pageX + 10 + "px", 
          top: e.pageY + 10 + "px", 
        });
    })
    .mousemove(function (e) {
      $("#tooltip").css({
        left: e.pageX + 10 + "px",
        top: e.pageY + 10 + "px",
      });
    })
    .mouseout(function () {
      $("#tooltip").hide(); 
    });
});

(function () {
  //Functions that handle the clock
  //Change date into correct apple format
  function formatDate(day, hour, min) {
    var parseHour = String(hour).padStart(2, "0"),
      parseMin = String(min).padStart(2, "0");
    return day + " " + parseHour + ":" + parseMin;
  }

  var timeout; // 전역 변수로 timeout 선언

  function updateTime() {
    var d = new Date(),
      days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    document.querySelector(".time").innerHTML = formatDate(
      days[d.getDay()],
      d.getHours(),
      d.getMinutes()
    );
    //Check every half a second if the time has changed
    clearTimeout(timeout); // 이전 타이머 해제
    timeout = setTimeout(updateTime, 500);
  }
  updateTime();
})();

$(".header__item").mouseenter(function () {
  $(this).children(".lnb").stop().show().stop();
});
$(".header__item").mouseleave(function () {
  $(this).children(".lnb").stop().hide().stop();
});

// FUNCTIONS EXTERNES
