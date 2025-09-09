import {ImageBasePath} from "../../shared/config.js";

const MyCard = (props, children) => `
<div class="card show_inline-block ${props.category}" href="${createLink(props.routeid)}" title=${props.description}>
<img src="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg" alt=${props.name} srcset="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg 164w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}l.jpg 237w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}.jpg 310w" sizes="(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px">${children}`



function createLink(routeid) {
	let url;
	if (routeid === "map") {
		url = "map";
	} else {
		url = "avontuur/".concat(routeid)
	}
	return url;
}