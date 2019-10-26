(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['article'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['channelIcon'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"row mb-5\">\r\n    <div class=\"col-xl-9 mx-auto text-center\">\r\n        <div class=\"source-icon m-auto\">\r\n                <img data-link=\""
    + alias5(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"route","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias5(((helper = (helper = helpers.iconPath || (depth0 != null ? depth0.iconPath : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"iconPath","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n        </div>\r\n        <span class=\"icon-name\">"
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n</div>";
},"useData":true});
templates['channelOverlay'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"styles/overlay.css\">\r\n<script src=\"js/channel-overlay.js\"></script>\r\n\r\n<div class=\"my-overlay\" id=\"channel-overlay\">\r\n    <i class=\"close-overlay-btn fas fa-times fa-lg\"></i>\r\n    <div id=\"channel-icons\" class=\"container-fluid overlay-container justify-content-center\">\r\n        \r\n    </div>\r\n\r\n\r\n</div>";
},"useData":true});
templates['comment'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['like'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
})();