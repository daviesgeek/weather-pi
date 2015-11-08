# weather-pi


Download the ARMv6 node release, unzip it, and copy the binaries like so:

```shell
cp node-*/ /opt/node
```

Add the binaries to the `$PATH`

```shell
PATH=/opt/node/bin:$PATH
```

To setup port forwarding

```shell
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
