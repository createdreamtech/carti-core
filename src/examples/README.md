## Sample Applciation of carti-lib
### Summary
Carti-lib is a library that allows users to transform machine configuration into portable packages.
It takes a machine configuration and transforms it into a carti package file and uploads the underlying data to a 
storage system of choice. The result produced by the lib is a file that links to the content addressed data that can then be given along with location information to allow another machine to readily install the required data creating a corresponding lua machine config that can be run using that user's context assuming the package directory is appropriately mounted. 
### Scope
The scope of carti-lib is not to be carti-cli which will provide convenience mechanisms, but instead to provide a basis for anyone or for downstream context to utilize to do automated things with packaging infrastructure. The example is to just showcase how a person can go from a machine config to a package config that stores assets remotely retrieves and installs them. 
### What it does
The script generate_package.sh preps a directory with the desired packages then executes hello world cartesi machine,
dumps this config to a file then packages it writing the package description to disk, and then installs it to another location and generates a another carti machine config file in a different directory. demonstrating what an installation looks like. 
### Usage
```sh
npm run build
./generate_package.sh disk /path/to/installation/directory
or 
#setup an s3 bucket and give the script your credentials
AWS_REGION=xxx AWS_API_KEY=xxx AWS_SECRET_KEY=xxx BUCKET_NAME=bucket ./generate_package.sh s3 /path/to/installation/directory
```
### Output
in this example the instllation path of /tmp/hello was chosen
```
to use disk as backing store
running: node build/src/examples/index.js disk /Users/zcstarr/src/create_dream_tech/bounties/cartesi/carti-lib /tmp/hello
$ref: keywords ignored in schema at path "#"
$ref: keywords ignored in schema at path "#"
Execute the following command to run the machine just installed
docker run -v /tmp/hello:/opt/carti/packages cartesi/playground /bin/bash -c 'cd /opt/carti/packages; luapp5.3 run-config.lua example_carti_package_run'
anon99:carti-lib zcstarr$ docker run -v /tmp/hello:/opt/carti/packages cartesi/playground /bin/bash -c 'cd /opt/carti/packages; luapp5.3 run-config.lua example_carti_package_run'Running as root

         .
        / \
      /    \
\---/---\  /----\
 \       X       \
  \----/  \---/---\
       \    / CARTESI
        \ /   MACHINE
         '

arch           dmesg          linux32        netstat        setserial
ash            dnsdomainname  linux64        nice           sh
base64         dumpkmap       ln             nuke           sleep
busybox        echo           login          pidof          stty
cat            egrep          ls             ping           su
chattr         false          lsattr         pipe_progress  sync
chgrp          fdflush        lsblk          printenv       tar
chmod          fgrep          mk_cmds        ps             touch
chown          findmnt        mkdir          pwd            true
compile_et     getopt         mknod          resume         umount
cp             grep           mktemp         rm             uname
cpio           gunzip         more           rmdir          usleep
cttyhack       gzip           mount          run-parts      vi
date           hostname       mountpoint     sed            watch
dd             kill           mt             setarch        wdctl
df             link           mv             setpriv        zcat
```