$(document).ready(function () {
  const $windows = $(".desktop-folder");
  let zIndexCounter = 5;

  function updateElementWidth() {
    const windowWidth = $(window).width();
    const vw = windowWidth / 120;
    const vh = $(window).height() / 100;
    const rem = parseFloat($("html").css("font-size"));
    const images = $("li.first-nav__icon img");

    const calculateWidth = () => {
      if (windowWidth >= 800 && windowWidth < 1360)
        return (vw * vh * rem) / 3 / 6;
      if (windowWidth > 1360) {
        $(".first-nav__title").css("font-size", "1.5vw");
        return (vw * vh * rem) / 3 / 8.7;
      }
      return (vw * vh * rem) / 3 / 2;
    };

    const width = calculateWidth();
    images.css({ width: `${width}px`, height: "auto" });
  }

  updateElementWidth();
  $(window).on("resize", updateElementWidth);

  function handleWindowInteraction($target, iconSelector, activeClass) {
    $(".write, .memory1, .computer, .draft_folder").attr("src", function () {
      return $(this).attr("src").replace("_click", "");
    });

    if ($target.hasClass("hidden")) {
      $target.removeClass("hidden");
    }

    $target.css("z-index", zIndexCounter + 9);
    zIndexCounter = zIndexCounter > 95 ? 10 : zIndexCounter + 1;

    $windows.not($target).each(function () {
      if (!$(this).hasClass("hidden")) {
        $(this).css("z-index", zIndexCounter++);
      }
    });

    if (activeClass) {
      $(activeClass).css({ backgroundColor: "#0D0907", color: "#f5f5f5" });
    }
  }

  const windowBindings = [
    {
      selector: ".posts",
      target: "#posts",
      icon: ".write",
      activeClass: ".pst",
    },
    { selector: ".edit", target: "#edit" },
    { selector: ".portf22", target: "#portf22" },
    {
      selector: ".projects",
      target: "#projects",
      icon: ".memory1",
      activeClass: ".proj",
    },
    {
      selector: ".about",
      target: "#about",
      icon: ".computer",
      activeClass: ".abt",
    },
    {
      selector: ".draft",
      target: "#drafts",
      icon: ".draft_folder",
      activeClass: ".dft",
    },
  ];

  windowBindings.forEach(({ selector, target, icon, activeClass }) => {
    $(selector).on("click", function () {
      handleWindowInteraction($(target), icon, activeClass);
    });
  });

  $(
    "button.close, button.memory-close, button.computer-close, button.post-close, button.drafts-close"
  ).on("click", function () {
    const $parent = $(this).parent().parent();
    $parent.addClass("hidden");

    const resetIcons = {
      ".memory-close": () => {
        $(".memory1").attr("src", "./src/img/memory.svg");
        $(".proj").css({ backgroundColor: "#f5f5f5", color: "#0D0907" });
      },
      ".computer-close": () => {
        $(".computer").attr("src", "./src/img/computer.svg");
        $(".abt").css({ backgroundColor: "#f5f5f5", color: "#0D0907" });
      },
      ".post-close": () => {
        $(".write").attr("src", "./src/img/write.svg");
        $(".pst").css({ backgroundColor: "#f5f5f5", color: "#0D0907" });
      },
      ".drafts-close": () => {
        $(".draft_folder").attr("src", "./src/img/draft_folder.svg");
        $(".dft").css({ backgroundColor: "#f5f5f5", color: "#0D0907" });
      },
    };

    const resetIcon = resetIcons[$(this).attr("class")];
    if (resetIcon) resetIcon();
  });

  $("section").on("click", function (event) {
    const $this = $(this);
    $this.css("z-index", "99").find(".solid").show();
    $("section").not(this).css("z-index", "5").find(".solid").hide();

    if ($(event.target).closest(".portf22").length) {
      $("#portf22").css("z-index", "101");
    }
  });

  // Easy drag
  $("section").easyDrag({
    handle: ".desktop-folder__title",
    container: $(".main"),
    cursor: "move",
    ontop: true,
    clickable: true,
  });

  $(".desktop-folder__title")
    .on("dragstart", function (event) {
      const $parentSection = $(this).parent();
      $parentSection
        .data("original-zindex", $parentSection.css("z-index"))
        .css("z-index", 999);
      event.stopPropagation();
    })
    .on("dragend", function (event) {
      const $parentSection = $(this).parent();
      $parentSection.css("z-index", $parentSection.data("original-zindex"));
      event.stopPropagation();
    });

  $("[data-tip]").on({
    mouseenter: function (e) {
      $("#tooltip")
        .text($(this).attr("data-tip"))
        .css({
          position: "absolute",
          display: "block",
          left: e.pageX + 10 + "px",
          top: e.pageY + 10 + "px",
        });
    },
    mousemove: function (e) {
      $("#tooltip").css({
        left: e.pageX + 10 + "px",
        top: e.pageY + 10 + "px",
      });
    },
    mouseout: function () {
      $("#tooltip").hide();
    },
  });

  (function updateClock() {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const formatDate = (day, hour, min) =>
      `${day} ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;

    const updateTime = () => {
      const now = new Date();
      $(".time").text(
        formatDate(days[now.getDay()], now.getHours(), now.getMinutes())
      );
      setTimeout(updateTime, 500);
    };

    updateTime();
  })();

  $(".header__item").hover(
    function () {
      $(this).children(".lnb").stop(true, true).show();
    },
    function () {
      $(this).children(".lnb").stop(true, true).hide();
    }
  );
});
