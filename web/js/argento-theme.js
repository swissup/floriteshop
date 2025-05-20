define([
    "jquery",
    "jquery/ui",
    "mage/collapsible",
    "Magento_Ui/js/lib/view/utils/async",
    "domReady!",
    "argentoSticky"
], function($) {
    var media = '(min-width: 768px) and (min-height: 600px)';

    $('.nav-sections').argentoSticky({
        media: media,
        parent: $('.page-wrapper'),
        inner_scrolling: false
    });

    var footerLinks = $(".footer.links .footer-links-container");
    var toggleFooterBlocks = function (mql) {
        if (mql.matches) {
            if (footerLinks.data('collapsible')) {
                footerLinks
                    .collapsible("activate")
                    .collapsible("destroy");
            }
        } else {
            footerLinks
                .collapsible({ icons: {"header": "plus", "activeHeader": "minus"}})
                .collapsible("deactivate");
        }
    };
    if (footerLinks.length) {
        var mqlFooter = matchMedia('(min-width: 768px)');
        toggleFooterBlocks(mqlFooter);
        mqlFooter.addListener(toggleFooterBlocks);
    }
    jQuery(function() {
    	jQuery(".minicart-wrapper .action.showcart .counter.qty:not(.empty)").parent().parent('').addClass('lleno');
    });

    // Smile Elasticsuite
    var searchBlock = $('.block-search.folded');
    $('.action.search', '.block-search.folded').on('click', function (e) {
        if (!searchBlock.hasClass('shown')) {
            e.preventDefault();
            searchBlock.addClass('shown');
            searchBlock.find('.input-text').focus();
        }
    });


    $('.authorization-link a:not([data-post])').data('no-popup', true);

    // Init marquee3k
    $.async('.marquee3k', (el) => {
        require(['js/lib/marquee3k'], (marquee3k) => {
            if ($('.marquee3k.is-init').length) {
                return;
            }
            marquee3k.init();
        });
    });

});
