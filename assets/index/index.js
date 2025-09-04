// TODO build the index here.
// TODO inspired by the Jim-nielsen.com blog on templating in Javascript (2021-12-13)

// have a pattern with files that return strings.

// instead of this:
let app = document.getElementById("js-app");
app.classList.remove("blog");

app.innerHTML = `
<div class="modal__dismiss backdrop hide"></div>
<div id="href-top" class="index">
	<div class="index__message-bar hide"></div>
	<div class="card-filter" role="toolbar"></div>
	<nav class="card-feed"></nav>
</div>
${backToTopHtml}`

// have something like

// so you have like, index == modal/back to top and children =>  indexMessageBar/cardFilter/cardFeed

const Layout = `
${Modal}
${BackToTop(props, children)}
`
const innerHtml = Layout()
