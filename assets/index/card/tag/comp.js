
const MyCardTag = (props) => `<div class="card__card-tag">
<span class="card-tag__category" ${props.category === "xerbutri" ? txTag(props) : blogTag(props)} </span>
<span class="card-tag__title" data-i18nix="${props.routeid}.shortname">${props.tilename}</span></div>`;

// TODO: Translator stuff! => send in the cardTypeName with props
const blogTag = (props) => `data-i18n="category.${props.category}">${translator.translate(`category.${props.category}`)}`;

const txTag = (props) => `data-i18nix="${props.routeid}.realname">${props.name}`;