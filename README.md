# rsync

This is a small Node utility program that attempts to keep folders between two systems in sync during development. This program was written when I was working on an IoT project writing some C code designed to run on an Intel Edison board. My main development box was a Windows PC with Visual Studio on it. Using the support for [remote GDB debugging](http://blogs.msdn.com/b/vcblog/archive/2015/11/18/announcing-the-vs-gdb-debugger-extension.aspx) that Visual Studio 2015 had I was able to use VS for building and debugging native code running on the Edison. But I still had to either code on the Edison or SCP files over manually.

This program makes that process a tad easier.

## Building and running

First create a file called `config.json` that looks like this:

```
{
  "watchPath": "[path to folder to watch]",
  "destPath": "[destination folder path to be synced with]",
  "watchConfig": {
      "ignoreDotFiles": true
  },
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

## setting up your ssh keys

You want to use ssh-keygen to generate the keys.  The private key goes onto the machine that runs rsync.  The public key goes on the remote system.

Create thew key on CygWin or a Linux box:
```
ssh-keygen -t rsa -f keyname
```

Append the contents of keyname.pub to ~/.ssh/authorized_keys on the remote system.  If the file doesn't exist, you need to crate it:

```
mkdir ~/.ssh
touch ~/.ssh/authorized_keys
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/authorized_keys
```

Reference the private key (created by ssh-keygen as a file with no extension) from config.json:
```
"privateKey": "h:/temp/rsynckey",
```  