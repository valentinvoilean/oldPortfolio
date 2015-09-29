var UTIL = (function (parent, $) {
    'use strict';

    parent.portfolio = (function () {
        var _options = {
                galleryListSelector: '.portfolio__list',
                galleryItemSelector: '.portfolio__item',
                navItemSelector:     '.portfolioNav__item',
                navListSelector:     '.portfolioNav__list',
                loadingSelector:     '.portfolio__loading',
                isActiveClass:       'is-active'
            },

            _$hiddenElements,
            _$galleryList,
            _$galleryItems,
            _$navList,
            _$navTab,
            _lastCategory,
            _$loadingContainer,

            _updateElements = function () {
                _$navList = $(_options.navListSelector);
                _$navTab = _$navList.find(_options.navItemSelector);
                _$galleryList = $(_options.galleryListSelector);
                _$galleryItems = _$galleryList.find(_options.galleryItemSelector);
                _$loadingContainer = $(_options.loadingSelector);
            },

            _loadMasonry = function (currentCategory) {
                if (_$galleryList.length && $.fn.masonry) {
                    _$galleryList.masonry({
                        itemSelector: (currentCategory? '.' + currentCategory: _options.galleryItemSelector),
                        'gutter':     10
                    });
                }
            },

            _switchCategory = function () {
                var currentCategory = $(this).attr('data-category');

                if ((currentCategory !== _lastCategory) && currentCategory !== 'photography') {
                    var $removedElements;

                    _$navTab.removeClass(_options.isActiveClass);
                    $(this).addClass(_options.isActiveClass);

                    _lastCategory = currentCategory;
                    _updateElements();
                    $removedElements = _$galleryItems.not('.' + currentCategory);

                    if (_$hiddenElements) {
                        _$galleryList.prepend( _$hiddenElements ).masonry( 'prepended', _$hiddenElements );
                    }

                    if (currentCategory !== 'all') {
                        _$hiddenElements = $removedElements.clone();
                        _$galleryList.masonry( 'remove', $removedElements).masonry('layout');
                    }
                    else {
                        _$hiddenElements = null;
                    }
                }
            },

            _removeEvents = function () {
                _$navTab.off('click', _switchCategory);
            },

            _addEvents = function () {
                _$navTab.on('click', _switchCategory);
            };

        return {
            init: function () {
                _updateElements();
                _addEvents();
                _$loadingContainer.hide();
                _$galleryList.show();
                _loadMasonry();
            },

            destroy: function () {
                _removeEvents();
                _$galleryList.masonry('destroy');
                _$galleryList.hide();
                _$loadingContainer.show();
                _$navList = _$navTab = _$galleryList = _$galleryItems = null;
            }
        };
    }());

	return parent;
}(UTIL || {}, jQuery));
