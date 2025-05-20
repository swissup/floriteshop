## Installation

Add following to repositories list on server and pull the files:

```bash
cd <magento_root>
composer config repositories.floriteshop vcs git@github.com:swissup/floriteshop.git
composer require swissup/floriteshop --no-dev
bin/magento setup:upgrade
```
