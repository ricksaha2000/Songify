// Generated by CoffeeScript 1.8.0
(function() {
    "use strict";
    var MusicTheme;

    MusicTheme = (function() {
      function MusicTheme() {
        this.initLandingPage();
        this.initSelect();
        this.addResizeActions();
        this.initResizeActions();
        this.initSearchNavigation();
        this.initSearch();
        this.initMobileMenu();
        this.initFooterHeights();
        this.initArtistContainers();
        this.initSliders();
        this.initProductHover();
        this.initSmoothNavigation();
        this.initAlbumContainers();
        this.initRatingInput();
        this.initProductCountForm();
        this.initProductInfo();
        this.initPlaylist();
        this.initModals();
        this.initSvgs();
      }

      MusicTheme.prototype.initSvgs = function() {
        var cart, wishlist;
        wishlist = $('.add-to-wishlist-button');
        wishlist.click(function() {
          var action, item;
          item = $(this);
          if (item.hasClass("added")) {
            item.find('.added-animate-first').each(function() {
              return this.beginElement();
            });
            return item.removeClass("added");
          } else {
            item.find('.animate-first').each(function() {
              return this.beginElement();
            });
            action = function() {
              return item.find('.animate-second').each(function() {
                return this.beginElement();
              });
            };
            setTimeout(action, 200);
            return item.addClass("added");
          }
        });
        cart = $('.add-to-cart-button');
        return cart.click(function() {
          var action2, action4, action5, item;
          item = $(this);
          if (item.hasClass("added")) {
            item.find('.added-animate-first').each(function() {
              return this.beginElement();
            });
            action2 = function() {
              return item.find('.added-animate-second').each(function() {
                return this.beginElement();
              });
            };
            setTimeout(action2, 200);
            return item.removeClass("added");
          } else {
            item.find('.animate-first').each(function() {
              return this.beginElement();
            });
            action4 = function() {
              return item.find('.animate-second').each(function() {
                return this.beginElement();
              });
            };
            setTimeout(action4, 200);
            action5 = function() {
              return item.find('.animate-third').each(function() {
                return this.beginElement();
              });
            };
            setTimeout(action5, 400);
            return item.addClass("added");
          }
        });
      };

      MusicTheme.prototype.initModals = function() {
        $('header').find('.modal').find('.register').click(function() {
          $('#login-modal').modal('hide');
          return $('#register-modal').modal('show');
        })
          .end()
          .find('.log-in').click(function() {
            $('#register-modal').modal('hide');
            return $('#login-modal').modal('show');
          })
          .end()
          .find('.forgot').click(function() {
            $('#login-modal').modal('hide');
            return $('#forgot-modal').modal('show');
          });

        $('.modal').on('show.bs.modal', function() {
          var dialog, item, offset;
          item = $(this);
          item.css('display', 'block');
          dialog = item.find(".modal-dialog");
          offset = ($(window).height() - item.find(".modal-content").height()) / 2;
          return dialog.css("margin-top", offset);
        });
        return $('#view-review-modal').on('show.bs.modal', function() {
          return $('.review-slider').flexslider({
            animation: "slide",
            controlNav: true,
            directionNav: false,
            animationLoop: true,
            slideshow: false
          });
        });
      };

      MusicTheme.prototype.initPlaylist = function() {
        return $.ajax({
          type: 'GET',
          url: "../music/media/songs.json",
          success: (function(_this) {
            return function(data) {
              return _this.getPlaylist(data.playlist);
            };
          })(this),
          error: function(xhr, status, error) {
            console.log(error);
          }
        });
      };

      MusicTheme.prototype.getPlaylist = function(playlist) {
        var myPlaylist, player, songs;
        $('.audio-player').css("top", $(window).height() - 70 + "px");
        player = $("#jpId").jPlayer({
          supplied: "mp3",
          swfPath: "/js",
          verticalVolume: "true",
          cssSelector: {
            play: ".audio-play",
            pause: ".audio-pause",
            stop: ".audio-stop",
            mute: ".audio-mute",
            unmute: ".audio-unmute",
            currentTime: ".currentTime",
            duration: ".duration",
            title: ".song-title"
          }
        });
        songs = playlist;
        myPlaylist = new jPlayerPlaylist({
          jPlayer: "#jpId",
          cssSelectorAncestor: ".audio-player"
        }, songs, {
          playlistOptions: {
            enableRemoveControls: false
          },
          swfPath: "/plugins/jplayer",
          supplied: "mp3",
          smoothPlayBar: true,
          keyEnabled: true,
          audioFullScreen: true
        });
        $('.replay').click(function() {
          var item;
          item = $(this);
          if (item.hasClass('off')) {
            $('#jpId').bind($.jPlayer.event.ended, function() {
              return player.jPlayer("play");
            });
            item.removeClass('off');
            item.addClass('on');
          } else {
            $('#jpId').unbind($.jPlayer.event.ended);
            item.removeClass('on');
            item.addClass('off');
          }
          return false;
        });
        $("#jpId").bind($.jPlayer.event.play, function() {
          var price, thumb, song_id;
          price = myPlaylist.playlist[myPlaylist.current].price;
          thumb = myPlaylist.playlist[myPlaylist.current].thumbnail;
          song_id = myPlaylist.playlist[myPlaylist.current].song_id;
          $('.audio-player .song .price').text(price);
          $('.audio-player .song-image').attr('src', thumb);
          //sets an attribute data-id with the id of the song(to know which song is added in the footer player - this is for devs that want to convert it to a dynamic app)
          $('.audio-player .add-to-cart-button, .audio-player .add-to-wishlist-button').data('id', song_id);
        });
        $('.play-song').click(function() {
          var index;
          index = $(this).data("play");
          myPlaylist.play(index - 1);
          return false;
        });
        $('.song').find('.pause-song').click(function() {
          var item;
          item = $(this).closest('.song');
          item.find('.play-song-individual').css('display', 'block');
          item.find('.pause-song').css('display', 'none');
          myPlaylist.pause();
          return false;
        });
        return $('.song').find('.play-song-individual').click(function() {
          var index, item;
          item = $(this).closest('.song');
          $('.play-song-individual').css('display', 'block');
          $('.pause-song').css('display', 'none');
          item.find('.play-song-individual').css('display', 'none');
          item.find('.pause-song').css('display', 'block');
          index = $(this).data("play");
          myPlaylist.play(index - 1);
          return false;
        });
      };

      MusicTheme.prototype.initProductInfo = function() {
        return $('.product-info').each(function() {
          var item;
          item = $(this);
          item.find('.close').click(function(event) {
            event.preventDefault();
            item.removeClass('info-shown');
            return item.addClass('info-hidden');
          });
          return item.find('.more').click(function(event) {
            event.preventDefault();
            item.addClass('info-shown');
            return item.removeClass('info-hidden');
          });
        });
      };

      MusicTheme.prototype.initProductCountForm = function() {
        var countInput;
        countInput = $('.product-add').find('.count');
        $('.product-add').find('.minus').click(function(event) {
          var countInputValue;
          event.preventDefault();
          countInputValue = countInput.attr("value");
          if (parseInt(countInputValue, 10) - 1 > 1) {
            return countInput.attr("value", parseInt(countInputValue, 10) - 1);
          } else {
            return countInput.attr("value", 1);
          }
        });
        return $('.product-add').find('.plus').click(function(event) {
          var countInputValue;
          event.preventDefault();
          countInputValue = countInput.attr("value");
          return countInput.attr("value", parseInt(countInputValue, 10) + 1);
        });
      };

      MusicTheme.prototype.initLandingPage = function() {
        var windowHeight, windowWidth;
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        $('body.full-background').css("width", windowWidth + "px");
        return $('body.full-background').css("height", windowHeight + "px");
      };

      MusicTheme.prototype.initRatingInput = function() {
        var rating_input = $('.rating-input');
        rating_input.find('.stars').find('li').mouseenter(function() {
          var index, item;
          rating_input.find('.stars').find('li').removeClass("checked");
          item = $(this);
          index = item.index();
          rating_input.find('.stars').find('li:lt(' + index + ')').addClass('checked');
          return item.addClass('checked');
        });
        rating_input.find('.stars').find('li').mouseleave(function(index) {
          var item;
          item = $(this);
          index = item.index();
          rating_input.find('.stars').find('li:lt(' + index + ')').removeClass('checked');
          item.removeClass('checked');
          return rating_input.find('.stars').find('li:lt(' + $('#rating').attr("value") + ')').addClass('checked');
        });
        return rating_input.find('.stars').find('li').click(function(e) {
          var index, item;
          rating_input.find('.stars').find('li').removeClass("checked");
          item = $(this);
          index = item.index();
          $('#rating').attr("value", index + 1);
          return e.preventDefault();
        });
      };

      MusicTheme.prototype.initSmoothNavigation = function() {
        return $('.more-with-navigation').click(function(event) {
          var dest;
          event.preventDefault();
          dest = 0;
          if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
          } else {
            dest = $(this.hash).offset().top;
          }
          return $('html,body').animate({
            scrollTop: dest
          }, 1000, 'swing');
        });
      };

      MusicTheme.prototype.initProductHover = function() {
        $('.product .with-title-effect').mouseenter(function() {
          var item;
          item = $(this);
          return item.closest('.product').find('.name').css("left", "20px");
        });
        return $('.product .with-title-effect').mouseleave(function() {
          var item;
          item = $(this);
          return item.closest('.product').find('.name').css("left", "0");
        });
      };

      MusicTheme.prototype.initSliders = function() {
        var noOfItems, priceSlider, thumbSlider;
        $('.introductory-slider').flexslider({
          animation: "slide",
          controlNav: true,
          directionNav: false,
          animationLoop: true,
          slideshow: false
        });
        thumbSlider = $('.thumb-slider');
        thumbSlider.flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: true,
          slideshow: false,
          itemWidth: 100,
          itemMargin: 0,
          asNavFor: '.main-slider'
        });
        $('.main-slider').flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: true,
          slideshow: false,
          sync: ".thumb-slider"
        });
        noOfItems = thumbSlider.find('.slides').find('li').length;
        thumbSlider.css('margin-left', -(noOfItems * 50) + "px");
        priceSlider = $("#price").slider({});
        if ($('#price').length) {
          return priceSlider.on('slide', function() {
            var inputSlider,
              formbox = $('.form-box');
            inputSlider = formbox.find('#price').attr("value").split(',');
            formbox.find('.min').text("$" + inputSlider[0]);
            return formbox.find('.max').text("$" + inputSlider[1]);
          });
        }
      };

      MusicTheme.prototype.initFooterHeights = function() {
        var minHeight, windowWidth;
        windowWidth = $(window).width();
        if (windowWidth > 767) {
          minHeight = 0;
          $('.footer-widget').each(function() {
            var itemHeight;
            itemHeight = $(this).height();
            if (minHeight < itemHeight) {
              return minHeight = itemHeight;
            }
          });
          return $('.footer-widget').css("height", minHeight + 40 + "px");
        }
      };

      MusicTheme.prototype.initSelect = function() {
        $('select').selectric({
          maxHeight: 250
        });
        $('.form-select').find('select').on('selectric-open', function() {
          $(this).closest('.form-box').addClass('no-border');
          return $('.selectricItems').each(function() {
            var item, itemWidth;
            item = $(this);
            itemWidth = Math.round(item.prev('.selectric').width());
            return item.css("width", itemWidth + 4 + "px");
          });
        });
        return $('.form-select').find('select').on('selectric-close', function() {
          return $(this).closest('.form-box').removeClass('no-border');
        });
      };

      MusicTheme.prototype.initSearchNavigation = function() {
        $('.navbar-nav>li').each(function() {
          var item;
          item = $(this);
          if (item.find('>ul').length > 0) {
            return item.find('.show-more').css("display", "block");
          }
        });
        return $('.navbar-nav>li>a ').click(function(event) {
          event.preventDefault();
          var item;
          item = $(this).closest('li');
          if (item.find('>ul').length > 0) {
            item.find('>ul').slideToggle();
            item.find('.show-more').toggle();
            item.find('.show-less').toggle();
            return event.preventDefault;
          }
        });
      };

      MusicTheme.prototype.initResizeActions = function() {
        return $(window).resize(this.addResizeActions);
      };

      MusicTheme.prototype.initArtistContainers = function() {
        var action, windowWidth;
        windowWidth = $(window).width();
        if (windowWidth > 750) {
          action = function() {
            if ($('.artist-main-container').length && $('.artist-second-container').length) {
              $('.artist-second-container').css("height", $('.artist-main-container').outerHeight() + "px");
            }
            if ($('.artist-songs-container').length && $('.artist-about-container').length) {
              return $('.artist-about-container').css("height", $('.artist-songs-container').outerHeight() + "px");
            }
          };
          return setTimeout(action, 100);
        } else {
          $('.artist-second-container').css("height", "350px");
          return $('.artist-about-container').css("height", "auto");
        }
      };

      MusicTheme.prototype.initAlbumContainers = function() {
        var action, windowWidth;
        windowWidth = $(window).width();
        if (windowWidth > 750) {
          action = function() {
            if ($('.album-main-container').length && $('.album-second-container').length) {
              return $('.album-second-container').not('.full-width').css("height", $('.album-main-container').outerHeight() + "px");
            }
          };
          return setTimeout(action, 100);
        }
      };

      MusicTheme.prototype.addResizeActions = function() {
        var documentHeight, itemWidth, minFooterWidgetHeight, noOfItems, numberOfColumns, rightContainerHeight, rightSidebarLinks, searchNavHeight, thumbSlider, windowHeight, windowWidth;
        windowHeight = $(window).height();
        windowWidth = $(window).width();
        documentHeight = $(document).height();
        $('.simple-sidebar').css("height", windowHeight - 94 + "px");
        $('.right-sidebar').css("height", windowHeight - 94 + "px");
        rightSidebarLinks = $('.right-sidebar-links');
        rightSidebarLinks.css("width", windowHeight - 94 + "px");
        rightSidebarLinks.css("top", rightSidebarLinks.width() / 2 - 50 + "px");
        rightSidebarLinks.css("right", -rightSidebarLinks.width() / 2 + 45 + "px");
        $('.links-wrapper').css("height", windowHeight - 94 + "px");
        if ($('.search-navigation').length) {
          $('.search-navigation').removeAttr("style");
          searchNavHeight = $('.search-navigation').height();
          rightContainerHeight = $('.right-container').height();
          if (windowWidth > 691) {
            if (searchNavHeight < rightContainerHeight) {
              $('.search-navigation').css("height", rightContainerHeight + 1 + "px");
            } else {
              $('.search-navigation').css("height", searchNavHeight + 1 + "px");
            }
          }
        }
        if (windowWidth > 767) {
          numberOfColumns = $('.song-list-container').find('table').find('th').length;
          $('.hover-row').attr("colspan", numberOfColumns);
        } else {
          $('.hover-row').attr("colspan", "2");
        }
        if (windowWidth < 768) {
          $('.simple-header .navbar-collapse').css("width", windowWidth + "px");
          $('.image-header .navbar-collapse').css("width", windowWidth + "px");
        } else {
          $('.simple-header .navbar-collapse').css("width", "auto");
          $('.image-header .navbar-collapse').css("width", "auto");
        }
        $('.footer-widget').removeAttr("style");
        if (windowWidth > 767) {
          minFooterWidgetHeight = 0;
          $('.footer-widget').each(function() {
            var itemHeight;
            itemHeight = $(this).height();
            if (minFooterWidgetHeight < itemHeight) {
              return minFooterWidgetHeight = itemHeight;
            }
          });
          $('.footer-widget').css("height", minFooterWidgetHeight + 40 + "px");
        }

        var artist_main_container = $('.artist-main-container'),
            artist_second_container = $('.artist-second-container'),
            artist_songs_container = $('.artist-songs-container'),
            artist_about_container = $('.artist-about-container'),
            album_main_container = $('.album-main-container'),
            album_second_container = $('.album-second-container');

        if (windowWidth > 767) {
          if (artist_main_container.length && artist_second_container.length) {
            artist_second_container.css("height", artist_main_container.outerHeight() + "px");
          }
          if (artist_songs_container.length && artist_about_container.length) {
            artist_about_container.css("height", artist_songs_container.outerHeight() + "px");
          }

          if (album_main_container.length && album_second_container.length) {
            album_second_container.not('.full-width').css("height", album_main_container.outerHeight() + "px");
          }

        } else {
          artist_second_container.css("height", "350px");
          artist_about_container.css("height", "auto");

          if (album_main_container.length && album_second_container.length) {
            album_second_container.not('.full-width').css("height", "auto");
          }
        }

        if (windowWidth < 768) {
          $('.search-header').find('.form-control').removeAttr("placeholder");
        }

        $('.full-background').css("width", windowWidth + "px");
        $('.full-background').css("height", windowHeight + "px");
        thumbSlider = $('.thumb-slider');
        noOfItems = thumbSlider.find('.slides').find('li').length;
        itemWidth = thumbSlider.find('.slides').find('li').first().width();
        thumbSlider.css('margin-left', -(noOfItems * itemWidth / 2) + "px");
        return $('.audio-player').css("top", $(window).height() - 70 + "px");
      };

      MusicTheme.prototype.initSearch = function() {
        var windowWidth;
        windowWidth = $(window).width();
        if (windowWidth < 768) {
          $('.search-header').find('.form-control').removeAttr("placeholder");
        }
        $('header').find('.search-button').click(function() {
          return $('.search-box').addClass('shown');
        });
        $('.search-box').find('.close-search').click(function() {
          return $('.search-box').removeClass('shown');
        });
        $('.simple-header .search-group').find('.btn').click(function(event) {
          var searchGroup;
          event.preventDefault();
          searchGroup = $('.simple-header .search-group');
          if (searchGroup.hasClass('open')) {
            return searchGroup.removeClass('open');
          } else {
            searchGroup.addClass('open');
            return searchGroup.find('.form-control').focus();
          }
        });
        return $('.image-header .search-group').find('.btn').click(function(event) {
          var searchGroup;
          event.preventDefault();
          searchGroup = $('.image-header .search-group');
          if (searchGroup.hasClass('open')) {
            return searchGroup.removeClass('open');
          } else {
            searchGroup.addClass('open');
            return searchGroup.find('.form-control').focus();
          }
        });
      };

      MusicTheme.prototype.initMobileMenu = function() {
        return $('.navbar-nav >li').each(function() {
          var button, el;
          el = $(this);
          button = $('<button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>');
          if (el.find('>ul').length) {
            el.append(button);
            return button.click(function() {
              var submenu;
              submenu = $(this).parent().find(">ul");
              if (submenu.is(':visible')) {
                submenu.slideUp(300);
                return $(this).html('<i class="fa fa-angle-down"></i>');
              } else {
                submenu.slideDown(300);
                return $(this).html('<i class="fa fa-angle-up"></i>');
              }
            });
          }
        });
      };

      return MusicTheme;

    })();

    $(document).ready(function() {
      var musictheme;
      return musictheme = new MusicTheme();
    });

  }).call(this);


  //# sourceMappingURL=main.js.map