# Log rotate reconfiguration issue

## Description

### Actual behaviour
When logger is reconfigured, the open streams are destroyed and `winston` tries to write to an already destroyed stream.

### Expected behaviour
`winston` creates a new stream.

Note: if logger is closed and a new logger is created, it works fine.

## How to start?
Tested with Node v10.15.0 but should work with 6.4+ based on [winston's requirement](https://github.com/winstonjs/winston/blob/master/package.json#L70).

```sh
npm i
npm start
```


## Error after reconfiguration
```sh
$ npm start

> winston-log-rotate-reconfiguration-issue@1.0.0 start C:\Github\winston-log-rotate-reconfiguration-issue
> node index.js

{"message":"app started","level":"info"}
C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\winston\lib\winston\logger.js:237
      throw ex;
      ^

Error: write after end
    at writeAfterEnd (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_writable.js:288:12)
    at PassThrough.Writable.write (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_writable.js:332:20)
    at File.log (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\winston\lib\winston\transports\file.js:158:34)
    at File._write (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\winston-transport\index.js:81:19)
    at doWrite (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_writable.js:428:64)
    at writeOrBuffer (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_writable.js:417:5)
    at File.Writable.write (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_writable.js:334:11)
    at DerivedLogger.ondata (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_readable.js:619:20)
    at DerivedLogger.emit (events.js:187:15)
    at addChunk (C:\Github\winston-log-rotate-reconfiguration-issue\node_modules\readable-stream\lib\_stream_readable.js:291:12)
Emitted 'error' event at:
```