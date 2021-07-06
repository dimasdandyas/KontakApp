/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import App from '../App';
 import { validateContact } from '../src/validation/contact.validation'
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer'
 
 // it('renders correctly', () => {
 //   renderer.create(<App />);
 // });
 
 test('validation for contact form', () => {
   expect(validateContact('firstName','lastName','age','photo')).toEqual('')
   expect(validateContact('','lastName','age','photo')).toEqual('First Name cannot be empty!')
   expect(validateContact('2','lastName','age','photo')).toEqual('First Name cannot be less than 3 characters')
   expect(validateContact('31','lastName','age','photo')).toEqual('First Name cannot be less than 3 characters')
   expect(validateContact('firstName','','age','photo')).toEqual('Last Name cannot be empty!')
   expect(validateContact('firstName','2','age','photo')).toEqual('Last Name cannot be less than 3 characters')
   expect(validateContact('firstName','31','age','photo')).toEqual('Last Name cannot be less than 3 characters')
   expect(validateContact('firstName','lastName','','photo')).toEqual('Age cannot be empty!')
   expect(validateContact('firstname','lastname',101,'photo')).toEqual('Age cannot be more than 100 years old')
   expect(validateContact('firstName','lastName','age','')).toEqual('Select your image before!')
 })
 