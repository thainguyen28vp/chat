import * as React from "react";
import Svg, { Path, Defs, G, ClipPath, Rect } from "react-native-svg";
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import moment from 'moment';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export const IconUser = (props) => (
    <Svg
        width={90}
        height={90}
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M33.75 41.25C42.0343 41.25 48.75 34.5343 48.75 26.25C48.75 17.9657 42.0343 11.25 33.75 11.25C25.4657 11.25 18.75 17.9657 18.75 26.25C18.75 34.5343 25.4657 41.25 33.75 41.25Z"
            stroke="rgb(209,209,209,0.5)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M11.25 78.75V71.25C11.25 67.2718 12.8304 63.4564 15.6434 60.6434C18.4564 57.8304 22.2718 56.25 26.25 56.25H41.25C45.2282 56.25 49.0436 57.8304 51.8566 60.6434C54.6696 63.4564 56.25 67.2718 56.25 71.25V78.75"
            stroke="rgb(209,209,209,0.5)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M71.25 30V52.5M60 41.25H82.5H60Z"
            stroke="rgb(209,209,209,0.5)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);


export const Ic_goto = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9 6L15 12L9 18"
            stroke="#8EA0AB"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export const Ic_search = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.564 16.7466C11.9419 16.7466 13.2285 16.2983 14.2744 15.5513L18.209 19.4858C18.3916 19.6685 18.6323 19.7598 18.8813 19.7598C19.4209 19.7598 19.811 19.3447 19.811 18.8135C19.811 18.5645 19.728 18.332 19.5454 18.1494L15.6357 14.2314C16.4575 13.1523 16.9473 11.8159 16.9473 10.3633C16.9473 6.85205 14.0752 3.97998 10.564 3.97998C7.04443 3.97998 4.18066 6.85205 4.18066 10.3633C4.18066 13.8745 7.04443 16.7466 10.564 16.7466ZM10.564 15.3687C7.81641 15.3687 5.55859 13.1025 5.55859 10.3633C5.55859 7.62402 7.81641 5.35791 10.564 5.35791C13.3032 5.35791 15.5693 7.62402 15.5693 10.3633C15.5693 13.1025 13.3032 15.3687 10.564 15.3687Z"
            fill="#8EA0AB"
        />
    </Svg>
);

export const Ic_cong = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12 5V19"
            stroke="#8EA0AB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5 12H19"
            stroke="#8EA0AB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);



export const Ic_thongke = (props) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M23 15.3333H11.0001C10.2641 15.3333 9.66675 15.9293 9.66675 16.6666C9.66675 17.4039 10.2641 17.9999 11.0001 17.9999H23C23.736 17.9999 24.3334 17.4039 24.3334 16.6666C24.3334 15.9293 23.736 15.3333 23 15.3333Z"
            fill="#8EA0AB"
        />
        <Path
            d="M23 22H11.0001C10.2641 22 9.66675 22.596 9.66675 23.3333C9.66675 24.0706 10.2641 24.6666 11.0001 24.6666H23C23.736 24.6666 24.3334 24.0706 24.3334 23.3333C24.3334 22.596 23.736 22 23 22Z"
            fill="#8EA0AB"
        />
        <Path
            d="M26.6667 5H24.2654C23.9387 2.744 22.0107 1 19.6667 1H14.3334C11.9894 1 10.0614 2.744 9.73469 5H7.33337C5.12806 5 3.33337 6.79469 3.33337 9V29C3.33337 31.2053 5.12806 33 7.33337 33H26.6667C28.872 33 30.6667 31.2053 30.6667 29V9C30.6667 6.79469 28.872 5 26.6667 5ZM14.3333 3.66669H19.6666C20.7693 3.66669 21.6666 4.564 21.6666 5.66669C21.6666 6.76937 20.7693 7.66669 19.6666 7.66669H14.3333C13.2306 7.66669 12.3333 6.76937 12.3333 5.66669C12.3333 4.564 13.2307 3.66669 14.3333 3.66669ZM28 29C28 29.736 27.4013 30.3333 26.6667 30.3333H7.33331C6.59869 30.3333 6 29.736 6 29V9C6 8.264 6.59869 7.66669 7.33331 7.66669H10.1346C10.8866 9.23738 12.4786 10.3334 14.3333 10.3334H19.6666C21.5213 10.3334 23.1133 9.23738 23.8653 7.66669H26.6666C27.4013 7.66669 27.9999 8.264 27.9999 9L28 29Z"
            fill="#8EA0AB"
        />
    </Svg>
);


export const Ic_back = (props) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_4188_6950)">
            <Path
                d="M25.1406 14.1406H6.94085L9.95571 11.1404C10.2921 10.8056 10.2934 10.2615 9.95859 9.92507C9.62378 9.58863 9.07962 9.58738 8.74322 9.92215L4.25281 14.3909C4.25251 14.3912 4.2523 14.3915 4.25204 14.3917C3.9165 14.7265 3.91542 15.2724 4.25195 15.6083C4.25226 15.6086 4.25247 15.6089 4.25273 15.6091L8.74313 20.0779C9.07949 20.4126 9.62365 20.4115 9.95851 20.075C10.2933 19.7386 10.292 19.1945 9.95563 18.8596L6.94085 15.8594H25.1406C25.6152 15.8594 26 15.4747 26 15C26 14.5254 25.6152 14.1406 25.1406 14.1406Z"
                fill="#1A1A1A"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_4188_6950">
                <Rect width={22} height={22} fill="white" transform="translate(4 4)" />
            </ClipPath>
        </Defs>
    </Svg>
);
export const Ic_post = (props) => (
    <Svg
        width={90}
        height={90}
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M33.75 26.25H22.5C20.5109 26.25 18.6032 27.0402 17.1967 28.4467C15.7902 29.8532 15 31.7609 15 33.75V67.5C15 69.4891 15.7902 71.3968 17.1967 72.8033C18.6032 74.2098 20.5109 75 22.5 75H56.25C58.2391 75 60.1468 74.2098 61.5533 72.8033C62.9598 71.3968 63.75 69.4891 63.75 67.5V56.25"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M33.75 56.25H45L76.875 24.375C78.3668 22.8832 79.2049 20.8598 79.2049 18.75C79.2049 16.6402 78.3668 14.6168 76.875 13.125C75.3832 11.6332 73.3598 10.795 71.25 10.795C69.1402 10.795 67.1168 11.6332 65.625 13.125L33.75 45V56.25Z"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M60 18.75L71.25 30"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const Ic_admin = (props) => (
    <Svg
        width={90}
        height={90}
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M11.25 75L16.125 60.375C11.9117 54.1435 10.3875 46.7641 11.8358 39.6086C13.2842 32.4532 17.6065 26.0088 23.9991 21.4735C30.3918 16.9383 38.4197 14.6209 46.5903 14.9521C54.7609 15.2834 62.5182 18.2409 68.4198 23.2746C74.3214 28.3083 77.9658 35.0758 78.6752 42.3187C79.3847 49.5616 77.1111 56.7871 72.277 62.6517C67.443 68.5164 60.3775 72.621 52.3942 74.2026C44.411 75.7841 36.0533 74.7349 28.875 71.25L11.25 75"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M45 45V45.0375"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M30 45V45.0375"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M60 45V45.0375"
            stroke="rgb(209,209,209,0.7)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export const Ic_duyet = (props) => (
    <Svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M30 10L10 30"
            stroke="#8EA0AB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M10 10L30 30"
            stroke="#8EA0AB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export const Ic_Kduyet = (props) => (
    <Svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8.33333 20L16.6667 28.3333L33.3333 11.6667"
            stroke="#8EA0AB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);