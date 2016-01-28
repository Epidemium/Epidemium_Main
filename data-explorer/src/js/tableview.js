TableView = Backbone.View.extend({
	initialize: function(opts) {
		_.bindAll(this, 'exportEmails');

		this.data = opts.data;

		this.render();
	},
	render: function() {
		this.dataTable = $('#filteredTable').DataTable({
			paging: false,
	        data: this.data.toJSON(),
	        columns: [
	        	// baked-in data element for exportEmails method, below
				{data: _ => ("<a data-email='"+ _.email +"' href='"+ _.email +"'>"+ _.email +"</a>")},
				{data: 'first_name'},
				{data: 'last_name'},
				{data: 'competencies[, ]'}
			]
	    });

	    console.log('this.dataTable', this.dataTable);

		$("<button>", {
			html: "Exporter les adresses",
			click: this.exportEmails
		}).insertAfter($("#filteredTable_filter"));
	},
	exportEmails: function() {
		var $div = $("#js-email-export-div");
		if($div.length === 0) {
			$div = $("<div>", {
				id: "js-email-export-div"
			}).insertAfter($("#filteredTable_wrapper"));
		}

		// there's no way to get filtered objects from the datatable...!
		var $emails = $("table tr td:first-child a").each(function() {
			$("<div>", {
				html: $(this).data('email')
			}).appendTo($div);
		});

		this.scrollExportDivIntoView();
	},
	scrollExportDivIntoView: function() {
		var $div = $("#js-email-export-div");
		$('html, body').animate({
		    scrollTop: $div.offset().top - 20,
		    scrollLeft: $div.offset().left
		});
	}
})