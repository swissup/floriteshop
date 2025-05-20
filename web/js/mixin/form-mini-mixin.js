define([
    'jquery'
], function ($) {
    'use strict';

    return function (widget) {
        //disable standard quikSearch widget
        $.widget('mage.quickSearch', widget, {
            /** @inheritdoc */
            _create: function () {
                this.responseList = {
                    indexList: null,
                    selected: null
                };
                this.autoComplete = $(this.options.destinationSelector);
                this.searchForm = $(this.options.formSelector);
                this.submitBtn = this.searchForm.find(this.options.submitBtn)[0];
                this.searchLabel = this.searchForm.find(this.options.searchLabel);
                this.isExpandable = this.options.isExpandable;

                _.bindAll(this, '_onKeyDown', '_onPropertyChange', '_onSubmit');

                //this.submitBtn.disabled = true;

                this.element.attr('autocomplete', this.options.autocomplete);

                mediaCheck({
                    media: '(max-width: 768px)',
                    entry: function () {
                        this.isExpandable = true;
                    }.bind(this),
                    exit: function () {
                        this.isExpandable = true;
                    }.bind(this)
                });

                this.searchLabel.on('click', function (e) {
                    // allow input to lose its' focus when clicking on label
                    if (this.isExpandable && this.isActive()) {
                        e.preventDefault();
                    }
                }.bind(this));

                this.element.on('blur', $.proxy(function () {
                    if (!this.searchLabel.hasClass('active')) {
                        return;
                    }

                    setTimeout($.proxy(function () {
                        if (this.autoComplete.is(':hidden')) {
                            this.setActiveState(false);
                        } else {
                            this.element.trigger('focus');
                        }
                        this.autoComplete.hide();
                        this._updateAriaHasPopup(false);
                    }, this), 250);
                }, this));

                if (this.element.get(0) === document.activeElement) {
                    this.setActiveState(true);
                }

                this.element.on('focus', this.setActiveState.bind(this, true));
                this.element.on('keydown', this._onKeyDown);
                // Prevent spamming the server with requests by waiting till the user has stopped typing for period of time
                this.element.on('input propertychange', _.debounce(this._onPropertyChange, this.options.suggestionDelay));

                this.searchForm.on('submit', $.proxy(function (e) {
                    this._onSubmit(e);
                    this._updateAriaHasPopup(false);
                }, this));
            }
        });

        return $.mage.quickSearch;
    };
});
