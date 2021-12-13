import AnimatedLoader from "react-native-animated-loader";
import React from "react";
export const ModalLoading1 = (props) => {
    return <AnimatedLoader
        visible={props.visible}
        source={require("../assets/loading1.json")}
        animationStyle={{

            width: 150,
            height: 150,
        }}

        overlayColor="rgba(0,0,0,0.5)"
        speed={1}
    >

    </AnimatedLoader>



}