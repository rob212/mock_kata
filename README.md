### Getting started 

To get dependencies:
```
npm install
```

To start the service:
```
npm start
```

### testing 
/GET
```
curl http://localhost:3000
```


/POST
```
curl -d 'insult=I am not a fan' -X POST -H "Content-Type: application/x-www-form-urlencoded" http://localhost:3000
```