App = function(options) {
    options || (options = {});
    _.extend(this, options);
};

_.extend(App.prototype, Backbone.Events, {
	initialize: function() {
		_.bindAll(this, 'processData');
		var that = this;

		$.ajax({
			url: '/data/data.csv',
			complete: this.processData
		});
	},
	processData: function(ajaxResp) {
		var data = Papa.parse(ajaxResp.responseText).data;
		this.rows = new RowCollection(data);

		this.tableView = new TableView({
			data: this.rows
		});
	}
});