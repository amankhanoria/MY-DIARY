import * as Yup from 'yup';

class Validators{

    //static we can not use it as object.
    // we can directly call with class name
    // we use when we need this function only one time.
    static loginValidators(){
        return Yup.object().shape({
            inputEmail: Yup.string().email("Not a valid Email").required("email is required"),
            inputPassword: Yup.string().required("password is required")
        })
    }
}

export  default Validators;