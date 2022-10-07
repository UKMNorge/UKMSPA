export default class SPAInteraction {

    /**
     * Represents the UKMOnePage functionality.
     * @constructor
     */
    constructor(interactionVue) {
       this.baseURL = '/api/';
       this.interactionVue = interactionVue;
    }

    // Interaction
    _showElementDOM(el) {
        // ...
    }

    removeElementFromDOM(el) {
        $(el).fadeOut();
    }

    removeElementFromDOMSlideUp(el) {
        $(el).animate(
            {'min-height' : 0, 'max-height' : 0, height : 0, padding : 0, margin : 0}, 400, () => {
            this.removeElementFromDOM(el);
        });
    }

    appendHTML(el, html) {
        $(el.append(html));
    }

    fadeElementDOM(el) {
        $(el).css('opacity', '.5');
    }    

    showMessage(title, message, type) { // -1 -> 'error', 0 -> 'normal', 1 -> 'warning'
        if(this.interactionVue) {
            this.interactionVue.showMessage(title, message, type);
        }
        else{
            console.warn('interactionVue has not been found!');
        }
    }
    
    showDialog(title, msg, buttons) {
        if(this.interactionVue) {
            this.interactionVue.openDialog(title, msg, buttons);
        }
        else {
            console.warn('interactionVue has not been found!');
        }
    }
    
    // Server communication
    async runAjaxCall(url, method, data, event = null) {
        var getData = [];    

        if(method == 'GET' && Object.keys(data).length > 0) {
            for(let key in data) {
                getData.push(data[key]);
            }
        }
        
        // event is the event where the call has been triggered.
        // if the element is button then a loader will be added
        var button = event ? ($(event.target).parent().parent().find('button')[0]) : null;
        if(button) {
            $(button).append('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
        }

        return new Promise((resolve, reject) => {  
            var _this = this;    
            $.ajax({
                url: this.baseURL + url,
                method: method,
                data: method == 'GET' ? {} : data,
                success: (res) => {
                    $(button).find('.spinner-border').detach();
                    resolve(res);
                }
            }).fail((res) => {
                if(res.statusCode().status == 500) {
                    if(res.responseJSON.errorMessage) {
                        this.interactionVue.showMessage('Prosessen kan ikke utføres!', res.responseJSON.errorMessage, -1);
                    }
                }
                console.log('hiding loading...')
                this.interactionVue.hideLoading();
                
                reject(res);
            });
        });
    }
}