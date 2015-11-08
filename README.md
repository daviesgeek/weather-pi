# weather-pi

cp node-*/ /opt/node


To setup port forwarding

```shell
    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
