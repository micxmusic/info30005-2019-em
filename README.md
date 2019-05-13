# Sustineo

A social food sharing web app that tackles food wastage due to bulk buying at the source

## Usage

```sh
npm install
```

Create an S3 bucket with public access control lists (ACLs) values set to false to allow access
and uploads. Get an access key for a separate AWS IAM user created with limited attached permission
policy AmazonS3FullAccess. Permissions boundary may be setup if additional granularity is needed.
S3 bucket configuration is needed for image uploads. 

Ensure that a .env file is created with the following

```
NODE_ENV=<development/production>
MONGO_URI=mongodb+srv://<username>:<password>@<server>
PORT=<default 3000>
SECRET=<securely generated for JWT signing>
AWS_ACCESS_KEY_ID=<New IAM user access key>
AWS_SECRET_ACCESS_KEY=<New IAM user secret key>
S3_BUCKET=<S3 bucket name>
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
