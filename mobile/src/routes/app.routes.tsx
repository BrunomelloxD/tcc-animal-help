// Rotas para quando o usuário estiver logado
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import MapScreen from "../pages/MapScreen";
import ListOng from "../pages/ListOng";
import RegistrationOng from "../pages/CreateOng/RegistrationOng";
import OngDetails from '../pages/OngDetails';

import SelectMapPosition from '../pages/CreateOng/SelectMapPosition';

const AppRoutes: React.FC = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="MapScreen" component={MapScreen} />
    </AppStack.Navigator>
)

export default AppRoutes;