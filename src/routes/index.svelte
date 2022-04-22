<script>
	import { onMount } from 'svelte';

	let config = '';

	onMount(() => {
		const connection = new Postmonger.Session();

		// Startup Sequence
		connection.trigger('ready');
		const payload = {};

		connection.on('initActivity', function (data) {
			if (data) payload = data;
			config = JSON.stringify(data, null, 2);
		});

		// Save Sequence
		connection.on('clickedNext', function () {
			payload = JSON.parse(config);
			payload['arguments'].execute.inArguments = [{ message: 'Test Message' }];
			payload['arguments'].execute.url =
				'https://eoa0h5k9iak1fxb.m.pipedream.net?name={{Contact.Attribute.202204_Demo2.Name}}';
			payload['metaData'].isConfigured = true;
			connection.trigger('updateActivity', payload);
		});
	});
</script>

<svelte:head>
	<title>Journey Builder Demo</title>
</svelte:head>

<h1 class="text-center text-2xl my-8">Journey Builder Demo</h1>
<textarea
	bind:value={config}
	class="p-4 border rounded-md shadow-sm w-full min-h-[70vh] overflow-scroll"
/>
