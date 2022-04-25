import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

export default function Home() {
  const [config, setConfig] = useState('')

  const runJourney = () => {
    const connection = new Postmonger.Session()

    // Startup Sequence
    connection.trigger('ready')
    let payload = {}

    connection.on('initActivity', function (data) {
      if (data) payload = data
      setConfig(JSON.stringify(data, null, 2))
    })

    // Save Sequence
    connection.on('clickedNext', function () {
      payload = JSON.parse(config)
      payload['arguments'].execute.inArguments = [{ message: 'Test Message' }]
      payload['arguments'].execute.url =
        'https://eoa0h5k9iak1fxb.m.pipedream.net?name={{Contact.Attribute.202204_Demo2.Name}}'
      payload['metaData'].isConfigured = true
      connection.trigger('updateActivity', payload)
    })
  }

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <Head>
        <title>Journey Builder Demo</title>
      </Head>
      <Script src="/postmonger.min.js" onLoad={runJourney} />
      <h1 className="text-center text-2xl my-8">Journey Builder Demo</h1>
      <textarea
        value={config}
        onChange={(e) => setConfig(e.target.value)}
        className="p-4 border rounded-md shadow-sm w-full min-h-[70vh] overflow-scroll"
      />
    </div>
  )
}
