import React, {Component} from 'react';
import {Box, Text} from 'react-native-design-utility';

import { Alert, Animated } from 'react-native';

import OnboardingLogo from '../commons/OnboardingLogo';
import LoginButton from '../commons/LoginButton';

const BoxAnimated=Animated.createAnimatedComponent(Box);

class LoginScreen extends Component{
    state={
        opacity: new Animated.Value(0),
        position: new Animated.Value(0),
    };

    componentDidMount(){
        Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();
        this.opacityAnim();
        this.positionAnim();
    }

    opacityAnim= () => {
        Animated.timing(this.state.opacity, {
            toValue:1,
            duration:200,
            delay: 100
        }).start()
    };

    positionAnim= () => {
        Animated.timing(this.state.opacity, {
            toValue:1,
            duration:300,
            useNativeDriver:true,
        }).start()
    };

    onGooglePress= () => {
        Alert.alert('google Press');
    };

    onFacebookPress= () => {
        Alert.alert('Facebook Press');
    };

    render(){
        const {opacity} =this.state;

        const logoTranslate = this.state.position.interpolate({
            inputRange:[0, 1],
            outputRange: [150, 0]
        })
        return(
            <Box f={1} center bg="white">
                <BoxAnimated 
                    f={1} 
                    style={{
                    transform:[
                        {
                            translateY: logoTranslate,
                        },
                    ],
                    }}>
                    <Box f={1} center >
                        <OnboardingLogo /> 
                    </Box>
                </BoxAnimated>
                
                <BoxAnimated f={0.9}  style={{opacity}} >
                    <LoginButton onPress={this.onGooglePress} type="google">
                        Continue with Google
                    </LoginButton>
                    <LoginButton onPress={this.onFacebookPress} type="facebook" >
                        Continue with FaceBook
                    </LoginButton>
                </BoxAnimated>                
            </Box>
        );
    }
}

export default LoginScreen;