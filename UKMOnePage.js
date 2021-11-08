/* Abstract class */
class UKMOnePage {

    /**
     * Represents the UKMOnePage functionality.
     * @constructor
     * @param {string} ajaxUrl - ajax main url e.g api here -> ...ukm.no/api/getSomething...
     * @param {EventElement []} eventElements - Event elements that contains information about the event and steps to be taken afterwards
     */
    constructor(ajaxUrl, eventElements) {
        // Denne klassen kan ikke konstrueres fordi denne klassen er abstrakt klasse
        if (this.constructor === UKMOnePage) {
            throw new TypeError('Abstract class "UKMOnePage" cannot be instantiated directly.'); 
        }

        this.ajaxUrl = ajaxUrl;
        this.eventElements = eventElements;

        this._eventListener();
    }

    /**
     * Add event elements 
     * @constructor
     * @param {EventElement []} eventElements - Event elements that contains information about the event and steps to be taken afterwards
     */
    addEventElements(eventElements) {
        this.eventElements = this.eventElements.concat(eventElements);
        this._eventListener(eventElements);
    }

    _showElementDOM(el) {
        // ...
    }

    removeElementFromDOM(el) {
        $(el).fadeOut();
    }

    appendHTML(el, html) {
        $(el.append(html));
    }

    fadeElementDOM(el) {
        $(el).css('opacity', '.5');
    }
    
    async _runAjaxCall(url, method, data) {
        return new Promise((resolve, reject) => {      
            $.ajax({
                url: this.ajaxUrl + url + '/',
                method: method,
                data: data,
                success: (res) => {
                    resolve(res);
                }
            }).fail(function(res) {
                reject(res);
            });
        });
    }

    _eventListener(eventElements) {
        for(var ev of (eventElements ? eventElements : this.eventElements)) {
            var _this = this;
            var callback = async function(e, data) {
                // Remember: 'this' refers to the class where the function is called and not this class here!
                var response = _this._runAjaxCall(this.url, this.ajaxMethod, data);
                this.doFunction(e, response, _this);
            }
            ev.setCallback(callback);
            ev.initEvent();
        }
        
        // Fjern innslag x-knapp
        // $('.fjern-innslag-btn').off('click').click((e) => {
        //     this.removeInnslag(e);
        // });
    }
}