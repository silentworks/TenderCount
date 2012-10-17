(function($){
	$(function() {
		var settings = ['subdomain', 'customdomain', 'apikey'];

		/* Save Settings */
		$('#settings').submit(function(e) {
			e.preventDefault();
			
			$.each(settings, function(i, name) {
				var value = $('input[name=' + name + ']').val();

				if (value !== '') {
					localStorage[name] = value;
				}
			});
		});

		/* Load Settings */
		var loadSettings = function () {
			$.each(settings, function(i, name) {
				var field = $('input[name=' + name + ']');
				field.val(localStorage[name]);
			});
		};

		loadSettings();
	});
})(jQuery);