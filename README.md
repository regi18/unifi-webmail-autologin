# unifi-webmail-autologin
Automatically login to UniFi's webmail portal (the same login system is used to log into the Gsuite, i.e. Google, account)

# Installation

### Requirements

In order for this script to work you need an extension that is able to run userscripts. Here's some recommended ones:

| Browser  | Extension |
|----------|-----------|
| Chrome   | [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag) |
| Firefox  | [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) |
| Safari   | [Tampermonkey](http://tampermonkey.net/?browser=safari)  |
| Edge     | [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)  |
| Opera    | [Violentmonkey](https://violentmonkey.github.io/get-it/) |

### One-click installation

Once you've installed one of those extensions **[click here](https://github.com/regi18/unifi-webmail-autologin/raw/master/unifi-webmail-autologin.user.js)** to open the install panel.

# How will it work?

The first time you use this script it'll ask for the username (matricola) and password, that are gonna be saved locally on your browser. Next time you'll encounter the login portal, everything will be done automatically!
