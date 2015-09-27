(function ($) {
    'use strict';

    $(window).load(function(){
        var options = {
                portfolioListSelector: '.portfolio__list',
                potfolioItemSelector:  '.portfolio__item',
                portfolionavItemSelector: '.portfolioNav__item'
            },

            _$hiddenElements,
            _lastCategory,

            _$el = $(options.portfolioListSelector),

            loadMasonry = function (currentCategory) {
                if (_$el.length && $.fn.masonry) {
                    _$el.masonry({
                        itemSelector: (currentCategory? '.' + currentCategory: options.potfolioItemSelector),
                        'gutter':     10
                    });
                }
            };

        loadMasonry();

        $(options.portfolionavItemSelector).on('click', function(){
            var currentCategory = $(this).attr('data-category');

            if ((currentCategory !== _lastCategory) && currentCategory !== 'photography') {
                var $removedElements;

                _lastCategory = currentCategory;
                $removedElements = $(options.potfolioItemSelector).not('.' + currentCategory);

                if (_$hiddenElements) {
                    _$el.prepend( _$hiddenElements ).masonry( 'prepended', _$hiddenElements );
                }

                _$hiddenElements = $removedElements.clone();
                _$el.masonry( 'remove', $removedElements).masonry('layout');
            }
        })
    });
}(jQuery));
