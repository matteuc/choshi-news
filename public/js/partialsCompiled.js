(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['article'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "                    &nbsp;|&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression, alias6=container.lambda;

  return "<div class=\"mb-3 row justify-content-center\">\r\n    <div class=\"col-12 col-md-10 col-md-offset-1 colcol-lg-8 col-lg-offset-2 card article-card grow\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card-body\">\r\n            <a class=\"nostyle\" href=\""
    + alias5(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\r\n                <h5 class=\"card-title\">"
    + alias5(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                <h6 class=\"card-subtitle mb-2 text-muted\">"
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.timestamp : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </h6>\r\n                <p class=\"card-text\">"
    + alias5(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </a>\r\n            <hr>\r\n            <div class=\"mt-3 row text-center\">\r\n                <div class=\"col-4 btn-col\">\r\n                    <div class=\"like-btn\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-liked=\"false\" data-likeid=\"\">\r\n                        <i class=\"far far fa-arrow-alt-circle-up\" ></i>\r\n                        <p class=\"text-muted\" data-likes=\""
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">"
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.length : stack1), depth0))
    + " upvotes</span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-4 btn-col\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <div class=\"comment-btn\">\r\n                        <i class=\"far fa-comment-alt\"></i>\r\n                        <p class=\"text-muted\" data-comments=\""
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">"
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + " comments</p>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"col-4\">\r\n                    <div class=\"bookmark-btn\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-saved=\"false\">\r\n                        <i class=\"far fa-bookmark\"></i>\r\n                        <p class=\"text-muted\">save</span>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
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
    return "<link rel=\"stylesheet\" href=\"/styles/overlay.css\">\r\n<script src=\"/js/channel-overlay.js\"></script>\r\n\r\n<div class=\"my-overlay\" id=\"channel-overlay\">\r\n    <i class=\"close-overlay-btn fas fa-times fa-lg\"></i>\r\n    <div id=\"channel-icons\" class=\"container-fluid overlay-container justify-content-center\">\r\n        \r\n    </div>\r\n\r\n\r\n</div>";
},"useData":true});
templates['comment'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['like'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
})();