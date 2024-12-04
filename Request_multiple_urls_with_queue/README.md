# Example script for running multiple urls
## The script
The Shelly devices has a limit of how many HTTP requests can run in parallel. `request_multiple_urls.js` script shows an example how this limit can be overcome using queue to hold the pending url requests.
The script will run maximum of `MAX_CONCURRENT_URLS` requests at the same time. It uses queue data structure to queue the other requests. When a request finishes (gives a response or timesout), next url will be taken out of the queue and requested. `MAX_CONCURRENT_URLS` is set to `4`. Currently the limit of the devices is 5 HTTP requests, but because of the nature of the solution we cannot utilize all 5 in the same time.

There is `URLS` constant defining a list of urls which will be run by `run_all_urls` function.

## Using with WebHooks
`run_all_urls()` function can be run from a WebHook using `Script.Eval` RPC method:

Example `Webhook.Create`:

```json
{
  "cid":0,
  "enable":true,
  "event":"switch.on",
  "urls":['http://127.0.0.1/rpc/Script.Eval?id=1&code="run_all_urls()"']
}
```

where script id should be set to the id of the **running** `request_multiple_urls` script

