import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper'


//import formiz components
import { Formiz, FormizStep, useForm, useField } from '@formiz/core';
import { isEmail } from '@formiz/validations';


export const MyField = (props) => {
  const { errorMessage, isValid, setValue, value } = useField(props)

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.form}
      />
      {
        !isValid
        && <View><Text style={{ color: 'red', padding: 5 }}>{errorMessage}</Text></View> // Display error message
      }
    </View>
  )
}


export default function App(){
    const formWithSteps = useForm()

    const handleSubmit = (values) => {
      console.log(values);
    }

    return(
      <View style={{ paddingTop: 100, marginHorizontal: 20 }}>
        <Text>Form</Text>
        <Formiz onValidSubmit={handleSubmit} connect={formWithSteps}>
          <FormizStep as={View} name="step1">
            <MyField
              name="firstname"
              label="Fisrtname"
              required="Firstname is required"
            />
          </FormizStep>
          <FormizStep as={View} name="step2">
            <MyField
              name="lastname"
              label="Lastname"
              required="Lastname is required"
            />
          </FormizStep>
        </Formiz>
        <View>
          <View>
            {!formWithSteps.isFirstStep && (
              <Button success onPress={formWithSteps.prevStep} title='Previous'/>
            )}
          </View>
          <Text>
            Step{' '}
            {formWithSteps.currentStep && formWithSteps.currentStep.index + 1}{' '}
            of {formWithSteps.steps.length}
          </Text>
          <View>
            {formWithSteps.isLastStep ? (
              <Button
                success
                onPress={formWithSteps.submit}
                disabled={!formWithSteps.isValid && formWithSteps.isStepSubmitted} title='Submit'/>
              ) : (
              <Button
                success
                onPress={formWithSteps.submitStep}
                disabled={!formWithSteps.isStepValid && formWithSteps.isStepSubmitted} title='Next'/>
            )}
          </View>
        </View>
      </View>
    )
}

const styles=StyleSheet.create({
    container:{
        //flex: 1,
      justifyContent: 'center',
      //height: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    formiz: {
      //height: '100%',
      borderWidth: 1
    },
    form: {
      width: '80%',
    },
})
