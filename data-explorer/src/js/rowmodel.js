RowModel = Backbone.Model.extend({
});

RowCollection = Backbone.Collection.extend({
	model: RowModel,

	constructor: function(data) {
		var headers = data.shift();
		headers = headers.map(h => h.replace(/^data__/, ''));

		data = data.map(function(d) {
			var out = {
				competencies: []
			};

			d.forEach(function(fieldValue, fieldIdx) {
				var header = headers[fieldIdx];
				if(header === "") {
					return;
				}

				fieldValue = fieldValue.trim();

				if(header.match(/^competences\d{3}/) ||
					header == "competences-" ||
					header == "autre_competences") {
					if(fieldValue) {
						out.competencies.push(fieldValue);
					}
				} else {
					out[header] = fieldValue;
				}
			});

			return out;
		});

		Backbone.Collection.apply(this, [data]);
	}
});