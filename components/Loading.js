import AnimatedLoader from "react-native-animated-loader";
import React from "react";
export const ModalLoading = (props) => {
    return <AnimatedLoader
        visible={props.visible}
        source={require("../assets/loading.json")}
        animationStyle={{

            width: 150,
            height: 150,
        }}

        overlayColor="rgba(0,0,0,0)"
        speed={1}
    >

    </AnimatedLoader>



}