
class SPAInteraction {

    /**
     * Represents the UKMOnePage functionality.
     * @constructor
     */
    constructor() {
       this.baseURL = '/app_dev.php/api/';
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
    

    // Server communication
    async runAjaxCall(url, method, data) {
        var getData = [];    

        if(method == 'GET' && Object.keys(data).length > 0) {
            for(let key in data) {
                getData.push(data[key]);
            }
        }
        
        return new Promise((resolve, reject) => {      
            $.ajax({
                url: this.baseURL + url,
                method: method,
                data: method == 'GET' ? {} : data,
                success: (res) => {
                    resolve(res);
                }
            }).fail(function(res) {
                reject(res);
            });
        });
    }
}

if(!spaInteraction) {
    var spaInteraction = new SPAInteraction();
}