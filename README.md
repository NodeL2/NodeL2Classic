# NodeL2Classic : : LINEAGE II Server Emulator (<a href="https://naden.co">https://naden.co</a>)

![GitHub Repo stars](https://img.shields.io/github/stars/nodel2/nodel2classic?color=success) ![GitHub license](https://img.shields.io/github/license/nodel2/nodel2classic?color=informational)

**LINEAGE II** Classic 1.x server emulator for **NodeJS**. The structure is comprised of **ES6 JavaScript** (as much as possible), **SQL** via **MariaDB**, **JSON** for vast data, and **JSON Schema** for data structure validation.

⚠️ Careful, this is not to be used as a private server **at all**.

## Prerequisites
* Install **[NodeJS LTS](https://nodejs.org/en/download)**, and **[MariaDB 16](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.12)**
* For convenience, also install **[MS Visual Studio Code](https://code.visualstudio.com/download)**, and **[TablePlus](https://tableplus.com/download)**

## Setup
* Fix database credentials in `database/install` script, and `config/default.ini`
* Run `database/install.bat` for **Windows**, or `database/install.sh` for **Linux** and **macOS**
* Run `npm install -i`

## Run
⚠️ It is advised to reset the database with the `database/install` script after **each pull** from the repo. A lot of quintessential implementation is worked on.
* Launch server with `npm run --silent NodeL2`
* Fire-up **LINEAGE II Client** and authenticate
* In order to access the Admin panel, use this in the chat prompt: `.admin`

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
