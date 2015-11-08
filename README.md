# weather-pi

## Installing

Download [the latest ARMv6 node release](https://nodejs.org/en/download/), untar it, and copy the binaries like so:

```shell
tar -xvzf node-*
cp -R node-*/ /opt/node
```

Add the node & npm binaries to the `$PATH`:

```shell
PATH=/opt/node/bin:$PATH
```

Setup port forwarding from 3000 -> 80. Add this line to `/etc/rc.local`, making sure it's before the `exit` statement. Also make sure the networking interface is correct ("eth0" in this example)

```shell
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

Clone the repo, install npm dependencies, and run the server forever:

```shell
git clone https://github.com/daviesgeek/weather-pi.git server
cd server
npm install
npm run server
```