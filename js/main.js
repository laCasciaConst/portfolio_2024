// VARIABLES GLOBALES

// DOM READY
$(document).ready(function () {
  console.log("ready");

  updateElementWidth();
  $(window).on("resize", updateElementWidth);

  function updateElementWidth() {
    var windowWidth = $(window).width(); // 너비 저장
    var vw = windowWidth / 120;
    var vh = $(window).height() / 100;
    var rem = parseFloat($("html").css("font-size"));
    var width = 0; // 초기화
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

  $(".posts, .draft").on("click", function () {
    const isPosts = $(this).hasClass("posts");
    const imgSelector = isPosts ? ".write" : ".draft_folder";
    const folderSelector = isPosts ? "#posts" : "#drafts";
    const bgColorClass = isPosts ? ".pst" : ".dft";
    const folderImageClicked = isPosts
      ? "./src/img/write_click.svg"
      : "./src/img/draft_folder_click.svg";

    $(imgSelector).attr("src", folderImageClicked);

    $("#portfolio_intrd").css("z-index", "3");

    if ($(folderSelector).hasClass("hidden")) {
      $(folderSelector)
        .removeClass("hidden")
        .css("z-index", zIndexCounter + 9);
      zIndexCounter++;
    } else {
      const currentZIndex = parseInt($(folderSelector).css("z-index"), 10);
      $(folderSelector).css("z-index", currentZIndex + 9);
    }

    if (zIndexCounter > 97) {
      zIndexCounter = 10;
    }

    $(".desktop-folder")
      .not(folderSelector)
      .not("#portfolio_intrd")
      .each(function () {
        if (!$(this).hasClass("hidden")) {
          $(this).css("z-index", zIndexCounter++);
        }
      });

    $(".pst, .dft").css({ backgroundColor: "", color: "" });
    $(bgColorClass).css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
  });

  var zIndexCounter = 5;

  function handleFolderClick(selector, imgSelector, imgClickedSrc, colorClass) {
    $(selector).on("click", function () {
      if (imgSelector && imgClickedSrc) {
        $(imgSelector).attr("src", imgClickedSrc);
      }

      $("#portfolio_intrd").css("z-index", "3");

      if ($(selector).hasClass("hidden")) {
        $(selector)
          .removeClass("hidden")
          .css("z-index", zIndexCounter + 9);
        zIndexCounter++;
      } else {
        var currentZIndex = parseInt($(selector).css("z-index"), 10);
        $(selector).css("z-index", currentZIndex + 9);
      }

      if (zIndexCounter > 97) {
        zIndexCounter = 10;
      }

      $(".desktop-folder")
        .not(selector, "#portfolio_intrd")
        .each(function () {
          if (!$(this).hasClass("hidden")) {
            $(this).css("z-index", zIndexCounter++);
          }
        });

      if (colorClass) {
        $(".pst, .dft, .proj, .abt").css({ backgroundColor: "", color: "" }); // 초기화
        $(colorClass).css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
      }
    });
  }

  handleFolderClick("#posts", ".write", "./src/img/write_click.svg", ".pst");
  handleFolderClick("#edit", null, null, null);
  handleFolderClick("#portf22", null, null, null);
  handleFolderClick(
    "#projects",
    ".memory1",
    "./src/img/memory_click.svg",
    ".proj"
  );
  handleFolderClick(
    "#about",
    ".computer",
    "./src/img/computer_click.svg",
    ".abt"
  );

  function handleCloseButton(buttonSelector, imgSelector, imgSrc, colorClass) {
    $(buttonSelector).on("click", function () {
      console.log(`click close ${buttonSelector}`);
      $(this).closest(".desktop-folder").addClass("hidden");

      if (imgSelector && imgSrc) {
        $(imgSelector).attr("src", imgSrc);
      }

      if (colorClass) {
        $(colorClass)
          .css({ backgroundColor: "#f5f5f5", color: "#0D0907" })
          .stop();
      }
    });
  }

  handleCloseButton(
    "button.memory-close",
    ".memory1",
    "./src/img/memory.svg",
    ".proj"
  );
  handleCloseButton(
    "button.computer-close",
    ".computer",
    "./src/img/computer.svg",
    ".abt"
  );
  handleCloseButton(
    "button.post-close",
    ".write",
    "./src/img/write.svg",
    ".pst"
  );
  handleCloseButton(
    "button.draft-close",
    ".draft_folder",
    "./src/img/draft_folder.svg",
    ".dft"
  );

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
    event.stopPropagation(); // 중요: 이벤트 전파 중지
  });

  $(".desktop-folder__title").on("dragend", function (event) {
    var $parentSection = $(this).parent();
    $parentSection.css("z-index", $parentSection.data("original-zindex"));
    event.stopPropagation(); // 중요: 이벤트 전파 중지
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
