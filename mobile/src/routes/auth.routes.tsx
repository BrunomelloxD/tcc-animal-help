// Rotas para quando o usuário não estiver logado
import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = createStackNavigator();

import IntroSlider from '../pages/Onboarding';

import FirstPage from "../pages/FirstPage";
import LoginPage from "../pages/CreateAccount/LoginPage";
import RegistrationPage from "../pages/CreateAccount/RegistrationPage";
import ForgotPasswordPage from "../pages/CreateAccount/ForgotPasswordPage";

const AuthRoutes: React.FC = () => (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >

        <AuthStack.Screen name="IntroSlider" component={IntroSlider} />

        <AuthStack.Screen name="FirstPage" component={FirstPage} />
        <AuthStack.Screen name="LoginPage" component={LoginPage} />
        <AuthStack.Screen name="RegistrationPage" component={RegistrationPage} />
        <AuthStack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
      </AuthStack.Navigator>
)

export default AuthRoutes;