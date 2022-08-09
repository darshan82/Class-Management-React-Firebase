# Install dependencies first

```
yarn install
```

# run app

```
yarn start
```

# build app

```
yarn build
```

# Rules Firestore Database

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{document=**} {
      allow read, write: if request.auth != null ;
      allow create: if request.auth != null ;
    }
    match /schedule/{useId}/events/{event} {
      allow read, write: if request.auth != null ;
      allow create: if request.auth != null ;
    }
    match /feedbacks/{feedback} {
      allow read, write: if request.auth != null ;
      allow read : if request.auth.uid == resource.data.to
      allow create: if request.auth != null ;
    }
    match /classes/{useId}/registered/{class} {
      allow read, write: if request.auth != null ;
      allow read : if request.auth.uid == request.resource.data.ref
      allow create: if request.auth != null ;
      allow create : if request.auth.uid == request.resource.data.ref
    }
    match /finances/{useId}/earning/{earn} {
      allow read, write: if request.auth != null ;
      allow read : if request.auth.uid == request.resource.data.ref
      allow create: if request.auth != null ;
    }
    match /finances/{useId}/expense/{expen} {
      allow read, write: if request.auth != null ;
      allow read : if request.auth.uid == request.resource.data.ref
      allow create: if request.auth != null ;
    }
    match /students/{useId}/student/{study} {
      allow read, write: if request.auth != null ;
      allow read : if request.auth.uid == request.resource.data.ref
      allow create: if request.auth != null ;
    }
  }
}
```
