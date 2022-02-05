import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {saveData} from '../components/asyncStorageUtils'
import {Formik ,  Field} from 'formik';
import * as yup from 'yup'
import CustomInput from '../components/CustumInput';

const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  })

const Signup = ({navigation}) => {

  const handleFormData = (data)=>{
      saveData(data);
      navigation.navigate('Home');
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#ffff'}}>

       <View style={{marginVertical: 30,marginHorizontal: 10, alignItems:'center'}}>
            <Text style={{fontSize: 30, fontWeight:'bold'}}> SIGN UP </Text>
       </View>
      <View  styles={{marginHorizontal: 10}}>
      <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={values => handleFormData(values)}
          >
            {({ handleSubmit, isValid }) => (
              <>

                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                 
                 <TouchableOpacity
                     onPress={handleSubmit}
                   style={styles.btnContainer}
                  >
                     <Text  style={styles.btnText}>SIGN UP</Text>
                 </TouchableOpacity>
              </>
            )}
          </Formik>
      </View>
       <View  style={{
           marginTop: 10, 
           paddingHorizontal: 30,
           flexDirection:'row', 
           justifyContent:'flex-end'}}>
            <View  style={{flexDirection:'row'}}>
               <Text>Already have account</Text>
               <TouchableOpacity
                  onPress={()=>navigation.navigate('Login')}
                >
                  <Text style={{fontWeight:'bold',color: 'red', marginLeft:5}}>Sigin </Text>
               </TouchableOpacity>
            </View>
       </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  formContainer: {
    padding: 30,
  },
  imputStyle: {
      borderColor:'gray'
  },
  btnContainer:{
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor:'blue',
      borderRadius:5, 
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal: 10,
  },
  btnText:{
      color: '#ffff',
      fontSize: 18,
      fontWeight: 'bold',
  }
});
