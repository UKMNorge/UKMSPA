# UKM SPA (Single Page Aplication)

Less mer om SPA: https://developer.mozilla.org/en-US/docs/Glossary/SPA


![alt text](https://github.com/UKMNorge/ukm-onepage-js/blob/main/docs/diagram-ukm-one-page.png?raw=true)


`UKMOnePage` representerer rammeverket og kan ikke initialiseres, derfor må en klasse som utvider det må opprettes.


`ProjectOnePage` - representerer en mer spesifikk implementasjon av rammeverket som passer for et prosjekt eller en side

## EventElement
representerer et DOM element som har et event og attributer som passer for det elementet.

```js
deltaOnePage.addEventElements([
   new EventElement('.card-body-arrangement.meldpaa', 'click', ()=>{ console.log("callback"); }, 'get_innslag_types', 'GET', ['pl_id'])        
]);
```


## Director
Director klasse brukes for å navigere gjennom sider som er definert i DOM som sider for å oppnå SPA metodologien.

```html
<div id="pageTestHello">
	<h1>Page content here...</h1>
</div>
```

```js
Director.openPage("pageTestHello");
```

Director kan brukes for å legge til attributer på URL og hente dem når det trengs.


## SPAInteraction

Brukes til å skape interaksjon i brukergrensesnittet, sende meldinger og mest viktig kjøre API kall.

```js
// Kjører AJAX kall, metode GET
var innslag = await this.spaInteraction.runAjaxCall('get_innslag/'+this.innslag_id, 'GET', {});

```

```js
// Dialog med callback
var buttons = [{
	name : 'Slett',
	class : "aaa",
	callback : async ()=> {
	    try{
		var res = await this.spaInteraction.runAjaxCall('remove_innslag/', 'POST', {pl_id : innslag.context.monstring.id, b_id : innslag.id})
		if(res) {
		    // Dont allow the user to go back
		    refreshOnBack(() => {
			window.location.href = '/';
		    });
		    // Redirect user to home page
		    window.location.href = '/';
		}
	    }catch(err) {
		// Error
		console.error(err);
	    }
	}
}];

this.spaInteraction.showDialog('Vil du melde av?', 'Vil du virkelig slette dette innslaget?', buttons);
```
