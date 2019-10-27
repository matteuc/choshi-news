(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['article'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "                    &nbsp;|&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression, alias6=container.lambda;

  return "<div class=\"mb-3 row justify-content-center\">\n    <div class=\"col-12 col-md-10 col-md-offset-1 colcol-lg-8 col-lg-offset-2 card article-card grow\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"card-body\">\n            <a class=\"nostyle\" href=\""
    + alias5(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n                <h5 class=\"card-title\">"
    + alias5(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">"
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.timestamp : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </h6>\n                <p class=\"card-text\">"
    + alias5(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n            </a>\n            <hr>\n            <div class=\"mt-3 row text-center\">\n                <div class=\"col-4 btn-col\">\n                    <div class=\"like-btn\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-liked=\"false\" data-likeid=\"\">\n                        <i class=\"far fa-arrow-alt-circle-up\" ></i>\n                        <p class=\"text-muted\" data-likes=\""
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">"
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.length : stack1), depth0))
    + " upvotes</span>\n                    </div>\n                </div>\n                <div class=\"col-4 btn-col\" >\n                    <div class=\"comment-btn\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n                        <i class=\"far fa-comment-alt\"></i>\n                        <p class=\"text-muted\" data-comments=\""
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + "\">"
    + alias5(alias6(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + " comments</p>\n                    </div>\n\n                </div>\n                <div class=\"col-4\">\n                    <div class=\"bookmark-btn\" data-id=\""
    + alias5(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-saved=\"false\">\n                        <i class=\"far fa-bookmark\"></i>\n                        <p class=\"text-muted\">save</span>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['channelIcon'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"row mb-5\">\n    <div class=\"col-xl-9 mx-auto text-center\">\n        <div class=\"source-icon m-auto\">\n                <img data-link=\""
    + alias5(((helper = (helper = helpers.route || (depth0 != null ? depth0.route : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"route","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias5(((helper = (helper = helpers.iconPath || (depth0 != null ? depth0.iconPath : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"iconPath","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n        </div>\n        <span class=\"icon-name\">"
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n</div>";
},"useData":true});
templates['channelOverlay'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"/styles/overlay.css\">\n<script src=\"/js/channel-overlay.js\"></script>\n\n<div class=\"my-overlay\" id=\"channel-overlay\">\n    <i class=\"close-overlay-btn fas fa-times fa-lg\"></i>\n    <div id=\"channel-icons\" class=\"container-fluid overlay-container justify-content-center\">\n        \n    </div>\n\n\n</div>";
},"useData":true});
templates['comment'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<li class=\"comment-block list-group-item\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1\">\r\n                    <div class=\"inset\">\r\n                        <img src=\""
    + alias5(((helper = (helper = helpers.authorPhoto || (depth0 != null ? depth0.authorPhoto : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"authorPhoto","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p class=\"mb-0 font-weight-bold\">\r\n                        "
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                    <p class=\"text-muted\">\r\n                        "
    + alias5(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"date","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-12\">\r\n                    <p>\r\n                        "
    + alias5(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"content","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </li>";
},"useData":true});
templates['commentsView'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "        <li class=\"comment-block list-group-item\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1\">\r\n                    <div class=\"inset\">\r\n                        <img src=\""
    + alias5(((helper = (helper = helpers.authorPhoto || (depth0 != null ? depth0.authorPhoto : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"authorPhoto","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p class=\"mb-0 font-weight-bold\">\r\n                        "
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                    <p class=\"text-muted\">\r\n                        "
    + alias5(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"date","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-12\">\r\n                    <p>\r\n                        "
    + alias5(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"content","hash":{},"data":data}) : helper)))
    + "\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </li>\r\n\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <div id=\"empty-comments-msg\" class=\"text-center\">\r\n            <p class=\"text-muted text-center\">No comments have been added yet.</p>\r\n            <p><i class=\"fas fa-comments fa-3x\"></i></p>\r\n        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return "<div id=\"commentsView\" class=\"container justify-content-center\">\r\n    <h4 class=\"text-center\">Comments</h4>\r\n    <div class=\"commentsList\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"mt-5 p-1 bg-light rounded rounded-pill shadow-sm mb-4\">\r\n        <div class=\"input-group\">\r\n            <input id=\"comment-input\" type=\"text\" placeholder=\"Enter your comment here\"\r\n                class=\"form-control border-0 bg-light\">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<script>\r\n    $(\".commentsList\").scrollTop(1E10);\r\n</script>";
},"useData":true});
templates['like'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<li class=\"like-block list-group-item\">\n    <div class=\"d-flex justify-content-between align-items-center\">\n        <div class=\"inset\">\n            <img src=\""
    + alias5(((helper = (helper = helpers.authorPhoto || (depth0 != null ? depth0.authorPhoto : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"authorPhoto","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n        </div>\n        <span class=\"text-center font-weight-bold text-muted\">"
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "</span>\n        <div class=\"like-list-btn\">\n            <i class=\"ml-3 fas fa-arrow-alt-circle-up\"></i>\n        </div>\n    </div>\n</li>";
},"useData":true});
templates['likesView'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.likes : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "    <li class=\"like-block list-group-item\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <div class=\"inset\">\n                <img src=\""
    + alias5(((helper = (helper = helpers.authorPhoto || (depth0 != null ? depth0.authorPhoto : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"authorPhoto","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n            </div>\n            <span class=\"text-center font-weight-bold text-muted\">"
    + alias5(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"author","hash":{},"data":data}) : helper)))
    + "</span>\n            <div class=\"like-list-btn\">\n                <i class=\"ml-3 fas fa-arrow-alt-circle-up\"></i>\n            </div>\n        </div>\n    </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div id=\"empty-upvotes-msg\" class=\"text-center\">\n            <p class=\"text-muted text-center\">This article has no upvotes yet.</p>\n            <p><i class=\"fas fa-arrow-alt-circle-up fa-3x\"></i></p>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return "<div class=\"likes-list container justify-content-center\">\n    <h4 class=\"text-center\">Likes</h4>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();