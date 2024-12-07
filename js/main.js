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
    if (iconSelector) {
      const $icon = $(iconSelector);
      const currentSrc = $icon.attr("src");
      $icon.attr(
        "src",
        currentSrc.includes("_click")
          ? currentSrc
          : currentSrc.replace(".svg", "_click.svg")
      );
    }

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
      $(".proj, .abt, .pst, .dft").css({
        backgroundColor: "#f5f5f5",
        color: "#0D0907",
      });

      $(activeClass).css({
        backgroundColor: "#0D0907",
        color: "#f5f5f5",
      });
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
    { 
      selector: ".portf22", 
      target: "#portf22",
      icon: null, 
      activeClass: null 
    },
    {
      selector: ".3dworkshop",
      target: "#3dWorkshop",
      icon: null,
      activeClass: null,
    },
    {
      selector: ".3dlogo",
      target: "#3dLogo",
      icon: null,
      activeClass: null,
    },
  ];

  windowBindings.forEach(({ selector, target, icon, activeClass }) => {
    $(selector).on("click", function () {
      handleWindowInteraction($(target), icon, activeClass);
    });
  });

  $(
    "button.close, button.portf-close, button.memory-close, button.computer-close, button.post-close, button.draft-close"
  ).on("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation();

    const $parent = $(this).closest('.desktop-folder');
    $parent.addClass("hidden");

    const closeBtnClass = $(this).attr("class");
    const iconResetMap = {
      "memory-close": ".memory1",
      "computer-close": ".computer",
      "post-close": ".write",
      "draft-close": ".draft_folder",
      "portf-close": null,
      "close" : null
    };

    const iconSelector = iconResetMap[closeBtnClass];
    if (iconSelector) {
      const $icon = $(iconSelector);
      const currentSrc = $icon.attr("src");
      $icon.attr("src", currentSrc.replace("_click.svg", ".svg"));
    }

    const activeClassMap = {
      "memory-close": ".proj",
      "computer-close": ".abt",
      "post-close": ".pst",
      "draft-close": ".dft",
      "portf-close": null,
      "close" : null
    };

    const activeClass = activeClassMap[closeBtnClass];
    if (activeClass) {
      $(activeClass).css({
        backgroundColor: "#f5f5f5",
        color: "#0D0907",
      });
    }
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
