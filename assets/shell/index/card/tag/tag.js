export const tagComponent = (categoryTypes, props) => `<div class="card__card-tag">
<span class="card-tag__category" ${props.category === "xerbutri" ? txTag(props) : blogTag(props, categoryTypes)} </span>
<span class="card-tag__title" data-i18nix="${props.routeid}.shortname">${props.tilename}</span>
</div>`;

const blogTag = (props, categoryTypes) => `data-i18n="category.${props.category}">${categoryTypes[props.category]}`;

const txTag = (props) => `data-i18nix="${props.routeid}.realname">${props.name}`;