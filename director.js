export default class Director {

    constructor() {
        this._onHistoryChangeState();

        $(document).ready(() => {
            let page;
            let pageFromUrl = this._getPageFromUrl();
            let state = true;

            if(pageFromUrl && $('#'+pageFromUrl).attr('alone') == 'true') {
                page = pageFromUrl;
            }
            else {
                page = $($('.main-container.page')[0]).attr('id');
            }

            if(page) {
                this.openPage(page, state);
            }
        });
    }

    openPage(id, state=true, scrollTop=false) {
        $('.main-container.page').css('margin-top', '-38px').addClass('hide');
        
        var page = $('.main-container.page#' + id);

        page.css('opacity', '.9').removeClass('hide').animate({
            'margin-top': '-44px',
            'margin-bottom': '+=10px',
            'opacity' : '1'
        }, 500, function() {
            
        });

        // Add attributes to header
        $('#headerMainText').html(page.attr('header-main-text'));
        $('#headerUnderText').html(page.attr('header-under-text'));

        if(state) {
            // Add current arguments
            var url = '';
            var urlParams = new URLSearchParams(window.location.search);
            
            urlParams.forEach((value, key) => {
                if(key != 'page') {
                    url = url + ('&' + key + '=' + value);
                }
            });

            this._addToUrl(id, url);
        }
        

        if(scrollTop) {
            var scroll = $(window).scrollTop();
            if(scroll > 150) {
                $("html, body").animate({ scrollTop: 50 }, 350);
            }
        }
    }

    // add param
    // update param
    addParam(name, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
    }

    // Returns null if the key is not available
    getParam(key) {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(key);
    }

    removeParam(key) {

    }

    _addToUrl(pageId, otherParams = '') {
        var state = { 'page_id': pageId, 'user_id': 5 };
        var title = '';
        var url = '?page=' + pageId + otherParams;        

        history.pushState(state, title, url)
    }

    _getPageFromUrl() {
        let urlSearchParams = new URLSearchParams(window.location.search);
        let params = Object.fromEntries(urlSearchParams.entries());
        return params['page'];
    }


    // When the state is changed. The user clicks back or forward buttons (slide left right on mobile platforms)
    _onHistoryChangeState() {
        window.onpopstate = history.onpushstate = (e) => {
            this.openPage(this._getPageFromUrl(), false, false);
        }
    }

    _initPages() {
        
    }

}
