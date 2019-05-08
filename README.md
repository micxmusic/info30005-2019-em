# Sustineo
A social food sharing web app that tackles food wastage due to bulk buying at the source

## Usage

```sh
npm install
```

Ensure that a .env file is created with the following

```
NODE_ENV=<development/production>
MONGO_URI=mongodb+srv://<username>:<password>@<server>
PORT=<default 3000>
SECRET=<securely generated>
```

### Production

```sh
npm run build
npm start
```

### Development

```sh
npm run dev
```