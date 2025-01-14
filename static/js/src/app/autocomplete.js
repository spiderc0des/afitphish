var TEMPLATE_TAGS = [
    {id: 1, name: "RId", description: "The unique ID for the recipient."},
    {id: 2, name: "FirstName", description: "The recipient's first name."},
    {id: 3, name: "LastName", description: "The recipient's last name."},
    {id: 4, name: "Department", description: "The recipient's department."},
    {id: 5, name: "From", description: "The address emails are sent from."},
    {id: 6, name: "TrackingURL", description: "The URL to track emails being opened."},
    {id: 7, name: "Tracker", description: "An HTML tag that adds a hidden tracking image (recommended instead of TrackingURL)."},
    {id: 8, name: "URL", description: "The URL to your Gophish listener."},
    {id: 9, name: "BaseURL", description: "The base URL with the path and rid parameter stripped. Useful for making links to static files."},
    {id: 10, name: "MatricNo", description: "The recipient's matric no."}
];

var textTestCallback = function(e) {
    return e.collapsed ? CKEDITOR.plugins.textMatch.match(e, matchCallback) : null;
};

var matchCallback = function(e, t) {
    var i = e.slice(0, t).match(/\{{2}\.?([A-z]|\})*$/);
    return i ? {start: i.index, end: t} : null;
};

var dataCallback = function(t, e) {
    e(TEMPLATE_TAGS.filter(function(e) {
        return 0 == ("{{." + e.name.toLowerCase() + "}}").indexOf(t.query.toLowerCase());
    }));
};

var setupAutocomplete = function(e) {
    e.on("instanceReady", function(e) {
        new CKEDITOR.plugins.autocomplete(e.editor, {
            textTestCallback: textTestCallback,
            dataCallback: dataCallback,
            itemTemplate: '<li data-id="{id}"><div><strong class="item-title">{name}</strong></div><div><i>{description}</i></div></li>',
            outputTemplate: "[[.{name}]]"
        }).getHtmlToInsert = function(e) {
            var t = this.outputTemplate.output(e);
            return t.replace("[[", "{{").replace("]]", "}}");
        };
    });
};
