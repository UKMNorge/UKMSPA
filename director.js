var Director = class Director {

    constructor() {
        this._onHistoryChangeState();

        $(document).ready(() => {
            let page;
            let pageFromUrl = this._getPageFromUrl();
            if(pageFromUrl && $('#'+pageFromUrl).attr('alone') == 'true') {
                page = pageFromUrl;
            }
            else {
                page = $($('.main-container.page')[0]).attr('id');
            }

            this.openPage(page);
        });
    }

    openPage(id, state=true, scrollTop=true) {
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
            this._addToUrl(id);
        }
        

        if(scrollTop) {
            var scroll = $(window).scrollTop();
            if(scroll > 150) {
                $("html, body").animate({ scrollTop: 50 }, 350);
            }
        }
    }

    _addToUrl(pageId) {
        const state = { 'page_id': pageId, 'user_id': 5 };
        const title = '';
        const url = '?page='+pageId;

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

var director = new Director();
