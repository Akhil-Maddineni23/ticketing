import mongoose from 'mongoose';
import { Password } from '../services/password';


//An interface that describles the properties that 
// are required to create a new User
//Interface what it takes to create a user
interface UserAttrs{
    email : string;
    password: string;
}

/*
The set of properties that are passed to create a model is different
than the properties that are actually exist on that document
This is were we add them.

An interface that describes the properties 
that a single user has
*/
interface UserDoc extends mongoose.Document{
    email : string,
    password : string,
    //createdAt : string,
    //updatedAt : string
}

/*
An interface that descirbles the properties that
a User Model has

Describles what the entire collection of users look like or atleast
methods associated with the user Model.
*/
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs) : UserDoc;
}

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    }
},
{
    toJSON : {
        transform(doc, ret){
            ret.id = ret._id,
            delete ret._id,
            delete ret.password,
            delete ret.__v;
        }
    }
}
)

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
});
  

userSchema.statics.build = (attrs : UserAttrs) => {
    return new User(attrs);
}

/*
Custom function build into a model
Typescript does not understand what it means to assign a property to 
the statics object. If it were js it was fine.
userSchema.statics.build = (attrs : UserAttrs) => {
    return new User(attrs);
}

So we are going to write out an interface that going to essentially
tell typescript that there's going to be a build function available 
on this user model.



We have a write a new function and need to pass the attrs
It's diificult whenever to create a new user we need to 
use buildUser method
Instead we are going to include with our user model

const buildUser = (attrs : UserAttrs) => {
    return new User(attrs)
}
*/

//<> - Generic syntax inside a typescript
//You can really think of these generix things as essentially 
//being functions or types
//Types being provided to function as arguments
//Here the model returns type of 2nd one (UserModel)
const User = mongoose.model<UserDoc , UserModel>('User' , userSchema);
export { User};