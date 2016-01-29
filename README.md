# rsync

This is a small Node utility program that attempts to keep folders between two systems in sync during development. This program was written when I was working on an IoT project writing some C code designed to run on an Intel Edison board. My main development box was a Windows PC with Visual Studio on it. Using the support for [remote GDB debugging](http://blogs.msdn.com/b/vcblog/archive/2015/11/18/announcing-the-vs-gdb-debugger-extension.aspx) that Visual Studio 2015 had I was able to use VS for building and debugging native code running on the Edison. But I still had to either code on the Edison or SCP files over manually.

This program makes that process a tad easier.

## Building and running

First create a file called `config.json` that looks like this:

```
{
  "watchPath": "[path to folder to watch]",
  "destPath": "[destination folder path to be synced with]",
  "scpConfig": {
    "username": "[ssh user name]",
    "privateKey": "[ssh private key ]",
    "port": 22,
    "host": "[ssh host name/ip]"
  }
}
```

Then run the following to get going:

```
npm install
node index.js
```

That's it. The program should continuously watch for changes and copy modified/new files over. There isn't support for syncing deleted files at this point. I am a bit wary of deletes in general and would rather have that handled manually for now.